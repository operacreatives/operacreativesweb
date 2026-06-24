import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("collaborate mascot layout", () => {
  it("rotates each mascot toward the center of the page", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toMatch(
      /\.peekaboo-mascot--left \.peekaboo-mascot__image\s*{[^}]*transform:\s*rotate\(90deg\)/s,
    );
    expect(css).toMatch(
      /\.peekaboo-mascot--right \.peekaboo-mascot__image\s*{[^}]*transform:\s*rotate\(270deg\)/s,
    );
  });

  it("moves the mascots farther inside when they celebrate", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toMatch(
      /\.peekaboo-mascot--left\.peekaboo-mascot--peek\s*{[^}]*translate\(-38%,\s*-50%\)/s,
    );
    expect(css).toMatch(
      /\.peekaboo-mascot--right\.peekaboo-mascot--peek\s*{[^}]*translate\(38%,\s*-50%\)/s,
    );
    expect(css).toMatch(
      /\.peekaboo-mascot--left\.peekaboo-mascot--celebrate\s*{[^}]*translate\(0%,\s*-50%\)/s,
    );
    expect(css).toMatch(
      /\.peekaboo-mascot--right\.peekaboo-mascot--celebrate\s*{[^}]*translate\(0%,\s*-50%\)/s,
    );
  });

  it("dances horizontally and vertically without replacing the side position", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toMatch(
      /\.peekaboo-mascot--dancing \.peekaboo-mascot__crop\s*{[^}]*animation:\s*mascot-dance/s,
    );
    expect(css).toMatch(/@keyframes mascot-dance[\s\S]*translate3d\(-12px,\s*-10px,\s*0\)/s);
    expect(css).toMatch(/@keyframes mascot-dance[\s\S]*translate3d\(12px,\s*10px,\s*0\)/s);
  });
});
