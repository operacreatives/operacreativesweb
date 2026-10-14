# Traces the logo and mascot into single-colour vector SVGs for engraving (metal cards).
# Etched area = coloured/dark parts; light parts (the cream face, highlights) stay unetched.
import numpy as np, potrace, sys
from PIL import Image
here = sys.path[0]
def trace(src, out, scale=3):
    im = Image.open(src).convert("RGBA")
    im = im.resize((im.width * scale, im.height * scale), Image.LANCZOS)
    a = np.asarray(im).astype(float)
    luma = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    mask = (a[..., 3] > 128) & (luma < 170)
    bm = potrace.Bitmap(~mask)
    plist = bm.trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.3)
    d = []
    for c in plist:
        s = c.start_point
        d.append(f"M{s.x:.1f},{s.y:.1f}")
        for seg in c.segments:
            if seg.is_corner:
                d.append(f"L{seg.c.x:.1f},{seg.c.y:.1f}L{seg.end_point.x:.1f},{seg.end_point.y:.1f}")
            else:
                d.append(f"C{seg.c1.x:.1f},{seg.c1.y:.1f} {seg.c2.x:.1f},{seg.c2.y:.1f} {seg.end_point.x:.1f},{seg.end_point.y:.1f}")
        d.append("Z")
    w, h = im.size
    open(out, "w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><path fill="#000" fill-rule="evenodd" d="{"".join(d)}"/></svg>')
    print(out, w, h, len(plist))
trace(f"{here}/assets/logo-mark.png", f"{here}/assets/logo-mark.svg")
trace(f"{here}/assets/mascot.png", f"{here}/assets/mascot.svg", scale=2)
