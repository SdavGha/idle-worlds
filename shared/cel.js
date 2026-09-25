"use strict";
/* ================= cel-shaded art toolkit =================
   The cartoon style Job chose: real outlines made of curves, flat colours only, three tones per colour
   (mid; a dark shape on the shadow side; a small light shape where the light hits), light always from the
   top left, thin lines one tone darker for details, eyes = dark circle + one light dot.
   No gradients and no see-through colours. Pages turn it on with ?art=cel for now. */
const ART_CEL = typeof location !== 'undefined' && new URLSearchParams(location.search).get('art') === 'cel';

/* ---- colour tones: from one mid colour get the dark, light and line tones ---- */
function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16), r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return [h, s * 100, l * 100];
}
const lim = (v, a, b) => Math.max(a, Math.min(b, v));
const hsl = (h, s, l) => `hsl(${Math.round(h)},${Math.round(lim(s, 0, 100))}%,${Math.round(lim(l, 0, 100))}%)`;
// tones('#ff7a1a') -> { mid, dark, light, line }
function tones(hex, darkBy = 13, lightBy = 12) {
  const [h, s, l] = hexToHsl(hex);
  return { mid: hex, dark: hsl(h, s + 4, l - darkBy), light: hsl(h, s - 6, Math.min(96, l + lightBy)), line: hsl(h, s + 6, l - darkBy * 2.1) };
}

/* ---- path builders (each returns a function that traces the path on a context) ---- */
// Smooth closed outline through points (Catmull-Rom turned into curves). tension .5 = standard, lower = rounder.
function blob(pts, tension = .5) {
  return c => {
    const n = pts.length, k = (1.5 - tension) / 6;
    c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      c.bezierCurveTo(p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k, p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k, p2[0], p2[1]);
    }
    c.closePath();
  };
}
// Leaf / lens between two points, bulging by b on the left and b2 on the right (fins, leaves, feathers, highlights).
function lens(x0, y0, x1, y1, b, b2 = b) { return c => { c.beginPath(); lensTo(c, x0, y0, x1, y1, b, b2); }; }
// The same leaf shape added to the current path, so many leaves can be filled with one call.
function lensTo(c, x0, y0, x1, y1, b, b2 = b) {
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  c.moveTo(x0, y0);
  c.quadraticCurveTo(mx + nx * b * 2, my + ny * b * 2, x1, y1);
  c.quadraticCurveTo(mx - nx * b2 * 2, my - ny * b2 * 2, x0, y0);
  c.closePath();
}
// Many leaves at once, lit from above: whole leaves in the dark tone, their upper halves in the mid tone,
// then all outlines. leaves = [[x0, y0, x1, y1, bulge], ...]
function leafBatch(c, leaves, t, lw) {
  if (!leaves.length) return;
  const all = cc => { cc.beginPath(); for (const [a, b, d, e, w] of leaves) lensTo(cc, a, b, d, e, w); };
  fillPath(c, all, t.dark);
  // the left bulge points down when the leaf runs rightwards, so keep only the other one
  fillPath(c, cc => { cc.beginPath(); for (const [a, b, d, e, w] of leaves) d >= a ? lensTo(cc, a, b, d, e, 0, w) : lensTo(cc, a, b, d, e, w, 0); }, t.mid);
  if (lw) strokePath(c, all, t.line, lw);
}
// Tapered tube along a polyline (tails, tentacles, legs, arms, snake bodies). w0 at the start, w1 at the end.
function tube(pts, w0, w1 = w0 * .3, capEnd = true) {
  return c => {
    const n = pts.length, left = [], right = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const w = (w0 + (w1 - w0) * (i / (n - 1))) / 2, nx = -dy / L * w, ny = dx / L * w;
      left.push([pts[i][0] + nx, pts[i][1] + ny]); right.push([pts[i][0] - nx, pts[i][1] - ny]);
    }
    c.beginPath(); c.moveTo(left[0][0], left[0][1]);
    for (let i = 1; i < n; i++) { const p = left[i - 1], q = left[i]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); }
    c.lineTo(left[n - 1][0], left[n - 1][1]);
    if (capEnd) { const e = pts[n - 1]; c.quadraticCurveTo(e[0] + (e[0] - pts[n - 2][0]) * .6, e[1] + (e[1] - pts[n - 2][1]) * .6, right[n - 1][0], right[n - 1][1]); }
    else c.lineTo(right[n - 1][0], right[n - 1][1]);
    for (let i = n - 2; i >= 0; i--) { const p = right[i + 1], q = right[i]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); }
    c.lineTo(right[0][0], right[0][1]);
    const s = pts[0]; c.quadraticCurveTo(s[0] - (pts[1][0] - s[0]) * .5, s[1] - (pts[1][1] - s[1]) * .5, left[0][0], left[0][1]);
    c.closePath();
  };
}
// Everything below a gentle curve through (x0,y)..(x1,y), sagging by bend: the usual shadow side.
function below(y, bend = .12, x0 = -9, x1 = 9) { return c => { c.beginPath(); c.moveTo(x0, y); c.quadraticCurveTo((x0 + x1) / 2, y + bend, x1, y); c.lineTo(x1, 99); c.lineTo(x0, 99); c.closePath(); }; }
function rightOf(x) { return c => { c.beginPath(); c.rect(x, -99, 198, 198); }; }
function ringPath(x, y, r) { return c => { c.beginPath(); c.arc(x, y, r, 0, TAU); }; }

/* ---- painting ---- */
function strokePath(c, path, col, w) { c.strokeStyle = col; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; path(c); c.stroke(); }
function fillPath(c, path, col) { c.fillStyle = col; path(c); c.fill(); }
// One part in three tones: mid everywhere, dark where shade() covers, light where light() covers, then the outline.
// t: tones(...) object or { mid, dark, light, line }. shade/light are path functions (optional).
function part(c, path, t, shade = below(.1), light = null, lw = .035) {
  fillPath(c, path, t.mid);
  if (shade || light) {
    c.save(); path(c); c.clip();
    if (shade) fillPath(c, shade, t.dark);
    if (light) fillPath(c, light, t.light);
    c.restore();
  }
  if (lw) strokePath(c, path, t.line, lw);
}
// Paint a group (several parts drawn by paint(c, pal)) twice: normal, then its shadow side with the dark palette.
function celShade(c, shadowPath, paint, pal) {
  paint(c, pal.mid);
  c.save(); shadowPath(c); c.clip(); paint(c, pal.dark); c.restore();
}
// Detail lines one tone darker, e.g. fin rays or scale rows: segments = [[x0,y0,x1,y1], ...]
function lines(c, segs, col, w = .022) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); for (const [a, b, d, e] of segs) { c.moveTo(a, b); c.lineTo(d, e); } c.stroke(); }
function celEye(c, x, y, r, iris) {
  if (iris) { ell(c, x, y, r, r, iris); ell(c, x + r * .1, y, r * .62, r * .62, '#15131a'); }
  else ell(c, x, y, r, r, '#15131a');
  ell(c, x + r * .32, y - r * .32, r * .3, r * .3, '#ffffff');
}
function celSmile(c, x, y, r, col) { strokePath(c, cc => { cc.beginPath(); cc.arc(x, y, r, .2 * Math.PI, .8 * Math.PI); }, col, .035); }
// A solid "glow": rings of flat colour instead of a soft gradient (lures, glowing eyes, fire).
function celGlow(c, x, y, r, cols) { cols.forEach((col, i) => ell(c, x, y, r * (1 - i / cols.length), r * (1 - i / cols.length), col)); }
// Flat shadow on the ground under something standing at y=0.
function groundShadow(c, w, col, h = .08) { fillPath(c, blob([[w / 2, 0], [0, -h * .45], [-w / 2, 0], [0, h]], .5), col); }

// The part of the world this window shows, set by each world's render (plants outside it are skipped).
let celView = [0, 1e9];

/* ---- more shapes shared by all worlds ---- */
// A tube body shaded like a cylinder lit from the top: dark lower edge, light stripe along the top.
// No clipping (clips are slow on phones): the whole tube in the dark tone, a narrower mid tube lifted
// towards the top edge on it, then a thin light stripe, then the outline.
function tubePart(c, pts, w0, w1, t, lw = .03) {
  const lift = dy => pts.map(([x, y]) => [x, y - dy]);
  fillPath(c, tube(pts, w0, w1), t.dark);
  fillPath(c, tube(lift(w0 * .13), w0 * .72, w1 * .72), t.mid);
  fillPath(c, tube(lift(w0 * .28), w0 * .22, w1 * .2), t.light);
  if (lw) strokePath(c, tube(pts, w0, w1), t.line, lw);
}
const wave = (n, x0, dx, amp, t, speed, ph = .55, y0 = 0, grow = 4) =>
  Array.from({ length: n }, (_, k) => [x0 - k * dx, y0 + Math.sin(t * speed - k * ph) * amp * Math.min(1, k / grow)]);

