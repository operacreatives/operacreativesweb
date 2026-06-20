import fs from "node:fs/promises";
import sharp from "sharp";

const input = process.argv[2];
if (!input) throw new Error("Pass the source logo path as the first argument.");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let head = 0;
let tail = 0;

const isBackground = (index) => {
  const offset = index * channels;
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  return Math.abs(r - 249) < 30 && Math.abs(g - 228) < 30 && Math.abs(b - 210) < 30;
};

const push = (index) => {
  if (!visited[index] && isBackground(index)) {
    visited[index] = 1;
    queue[tail++] = index;
  }
};

for (let x = 0; x < width; x++) {
  push(x);
  push((height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  push(y * width);
  push(y * width + width - 1);
}

while (head < tail) {
  const index = queue[head++];
  const x = index % width;
  const y = Math.floor(index / width);
  if (x > 0) push(index - 1);
  if (x + 1 < width) push(index + 1);
  if (y > 0) push(index - width);
  if (y + 1 < height) push(index + width);
}

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;
for (let i = 0; i < visited.length; i++) {
  const alphaOffset = i * channels + 3;
  if (visited[i]) data[alphaOffset] = 0;
  if (data[alphaOffset] > 16) {
    const x = i % width;
    const y = Math.floor(i / width);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
}

const pad = 8;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);
const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;

const transparent = await sharp(data, { raw: info })
  .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
  .png()
  .toBuffer();

await fs.writeFile("public/logo-oc.png", transparent);

// Approximate the enclosed socket in the supplied master, then fill it red for the animated base.
const socket = {
  left: Math.round(cropWidth * 0.199),
  top: Math.round(cropHeight * 0.326),
  width: Math.round(cropWidth * 0.223),
  height: Math.round(cropHeight * 0.377),
};
const socketSvg = Buffer.from(
  `<svg width="${cropWidth}" height="${cropHeight}"><ellipse cx="${socket.left + socket.width / 2}" cy="${socket.top + socket.height / 2}" rx="${socket.width / 2 + 5}" ry="${socket.height / 2 + 5}" fill="#EA0916"/></svg>`,
);
await sharp(transparent).composite([{ input: socketSvg }]).png().toFile("public/logo-oc-base.png");

const metrics = {
  socketLeft: Number(((socket.left / cropWidth) * 100).toFixed(3)),
  socketTop: Number(((socket.top / cropHeight) * 100).toFixed(3)),
  socketWidth: Number(((socket.width / cropWidth) * 100).toFixed(3)),
  socketHeight: Number(((socket.height / cropHeight) * 100).toFixed(3)),
  pupilOneX: 38,
  pupilTwoX: 64,
  pupilY: 52,
};
await fs.writeFile("data/logo-metrics.json", `${JSON.stringify(metrics, null, 2)}\n`);
console.log(JSON.stringify({ cropWidth, cropHeight, ...metrics }, null, 2));
