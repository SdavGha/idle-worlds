"use strict";
/* ================= Deep sea: layered scenery =================
   The default since Job picked it; ?scene=old shows the two flat ridges from before.
   The background is built from several layers of rock pillars, flat-topped rock tables, boulders, sea fans and whip corals. Each layer
   sits further away and is mixed more with the colour of the water at its height (haze), so the view
   has real depth. Big dark boulders in front frame the picture.
   Everything stays in the cartoon style: flat colour pieces, lit from the top left, no gradients (the
   water itself is the only gradient). Rocks are cut into faceted pieces instead of being clipped, so
   they stay cheap to paint. Shapes are made once when the world is built and reused every frame. */
const SCENE_NEW = ART_CEL && !(typeof location !== 'undefined' && new URLSearchParams(location.search).get('scene') === 'old');

/* ---- colour helpers ---- */
const cssRgb = (() => {
  const g = document.createElement('canvas').getContext('2d'), memo = {};
  return col => {
    if (memo[col]) return memo[col];
    g.fillStyle = '#000'; g.fillStyle = col;
    const n = parseInt(g.fillStyle.slice(1), 16);
    return memo[col] = [n >> 16 & 255, n >> 8 & 255, n & 255];
  };
})();
const mixRgb = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const rgbCss = c => `rgb(${c[0]},${c[1]},${c[2]})`;
// the water colour at height y (same stops as drawWaterCel)
function waterAt(y) {
  const f = lim(y / H, 0, 1);
  let i = 0;
  while (i < WATER_AT.length - 2 && WATER_AT[i + 1] < f) i++;
  return mixRgb(cssRgb(WATER[i]), cssRgb(WATER[i + 1]), (f - WATER_AT[i]) / (WATER_AT[i + 1] - WATER_AT[i]));
}
// a colour seen through h of water at height y (h = 0 clear, 1 = only water)
const haze = (col, y, h) => rgbCss(mixRgb(cssRgb(col), waterAt(y), h));

/* ---- shape builders: each returns a list of [Path2D, colour] pieces ---- */
const LIGHT = [-.6, -.8];   // light comes from the top left
// A faceted rock: a fan of triangles around a point inside it, each facet coloured by which way it faces.
function rockPieces(r, cx, by, w, h, T, hz) {
  const n = 6 + Math.floor(r() * 3), pts = [];
  for (let k = 0; k <= n; k++) {
    const a = Math.PI - k / n * Math.PI, rw = .85 + r() * .3, rh = .75 + r() * .4;
    pts.push([cx + Math.cos(a) * w / 2 * rw, by - Math.sin(a) * h * rh]);
  }
  pts.push([cx + w * .45, by + h * .15], [cx - w * .45, by + h * .15]);
  const c = [cx - w * .1, by - h * .5], out = [], y = by - h / 2;
  const col = { mid: haze(T.mid, y, hz), dark: haze(T.dark, y, hz), light: haze(T.light, y, hz), line: haze(T.line, y, hz) };
  // facets facing the same way go into one shape, so a rock costs four paint calls, not twenty
  const lightP = new Path2D(), darkP = new Path2D();
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length], mx = (p[0] + q[0]) / 2 - c[0], my = (p[1] + q[1]) / 2 - c[1];
    const d = (mx * LIGHT[0] + my * LIGHT[1]) / (Math.hypot(mx, my) || 1);
    const into = d > .45 ? lightP : d < -.15 ? darkP : null;
    if (into) { into.moveTo(c[0], c[1]); into.lineTo(p[0], p[1]); into.lineTo(q[0], q[1]); into.closePath(); }
  }
  const outline = new Path2D(); pts.forEach((p, i) => i ? outline.lineTo(p[0], p[1]) : outline.moveTo(p[0], p[1])); outline.closePath();
  out.push([outline, col.mid], [lightP, col.light], [darkP, col.dark], [outline, col.line, 'stroke']);
  return out;
}
// A flat-topped rock table: a narrow stem holding up a wide slab whose top is crusted with pale-green sponge.
function tablePieces(r, x, by, ty, pw, T, top, hz) {
  const sw = pw * (.16 + r() * .08), pt = pw * (.09 + r() * .04), y = (ty + by) / 2, out = [];
  const c = { mid: haze(T.mid, y, hz), dark: haze(T.dark, y, hz), light: haze(T.light, y, hz), line: haze(T.line, y, hz) };
  const tc = { mid: haze(top.mid, ty, hz), light: haze(top.light, ty, hz), dark: haze(top.dark, ty, hz) };
  const midY = ty + (by - ty) * .55, lean = (r() - .5) * sw;
  const stem = new Path2D();
  stem.moveTo(x - sw * .8, by); stem.quadraticCurveTo(x - sw * .35 + lean, midY, x - sw * .5 + lean, ty + pt);
  stem.lineTo(x + sw * .5 + lean, ty + pt); stem.quadraticCurveTo(x + sw * .35 + lean, midY, x + sw * .8, by); stem.closePath();
  out.push([stem, c.mid]);
  const stemDark = new Path2D();
  stemDark.moveTo(x + sw * .05, by); stemDark.quadraticCurveTo(x + sw * .1 + lean, midY, x + sw * .1 + lean, ty + pt);
  stemDark.lineTo(x + sw * .5 + lean, ty + pt); stemDark.quadraticCurveTo(x + sw * .35 + lean, midY, x + sw * .8, by); stemDark.closePath();
  out.push([stemDark, c.dark]);
  const stemLight = new Path2D();
  stemLight.moveTo(x - sw * .55, by); stemLight.quadraticCurveTo(x - sw * .25 + lean, midY, x - sw * .35 + lean, ty + pt * 2);
  stemLight.lineTo(x - sw * .22 + lean, ty + pt * 2); stemLight.quadraticCurveTo(x - sw * .12 + lean, midY, x - sw * .35, by); stemLight.closePath();
  out.push([stemLight, c.light]);
  // the shadow the slab throws on its stem
  const under = new Path2D(); under.rect(x - sw * .5 + lean, ty + pt * .8, sw + lean * 0, pt * 1.3);
  out.push([under, c.dark]);
  out.push([stem, c.line, 'stroke']);
  // slab: a thick flat lens, darker below, with a pale crust on top
  const L = x - pw / 2 + lean, R = x + pw / 2 + lean, cxs = x + lean;
  const slab = new Path2D();
  slab.moveTo(L, ty); slab.quadraticCurveTo(cxs, ty - pt * 1.1, R, ty); slab.quadraticCurveTo(R + pt * .3, ty + pt * .9, R - pt, ty + pt * 1.1);
  slab.quadraticCurveTo(cxs, ty + pt * 1.9, L + pt, ty + pt * 1.1); slab.quadraticCurveTo(L - pt * .3, ty + pt * .9, L, ty); slab.closePath();
  out.push([slab, c.mid]);
  const slabDark = new Path2D();
  slabDark.moveTo(L + pt * .4, ty + pt * .8); slabDark.quadraticCurveTo(cxs, ty + pt * 1.2, R - pt * .2, ty + pt * .7);
  slabDark.quadraticCurveTo(R - pt * .3, ty + pt * 1.05, R - pt, ty + pt * 1.1); slabDark.quadraticCurveTo(cxs, ty + pt * 1.9, L + pt, ty + pt * 1.1); slabDark.closePath();
  out.push([slabDark, c.dark]);
  const crust = new Path2D();
  crust.moveTo(L - pt * .1, ty + pt * .05); crust.quadraticCurveTo(cxs, ty - pt * 1.25, R + pt * .1, ty + pt * .05);
  crust.quadraticCurveTo(cxs, ty + pt * .55, L - pt * .1, ty + pt * .05); crust.closePath();
  out.push([crust, tc.mid]);
  const crustLight = new Path2D();
  crustLight.moveTo(L + pw * .12, ty - pt * .25); crustLight.quadraticCurveTo(L + pw * .3, ty - pt * .75, L + pw * .5, ty - pt * .55);
  crustLight.quadraticCurveTo(L + pw * .3, ty - pt * .3, L + pw * .12, ty - pt * .25); crustLight.closePath();
  out.push([crustLight, tc.light]);
  out.push([slab, c.line, 'stroke']);
  return out;
}
// A sea fan: a flat branching tree, built once around its own base (it sways as a whole).
function fanShape(r, h) {
  const segs = [];
  const grow = (x, y, a, len, d) => {
    const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
    segs.push([x, y, x2, y2, d]);
    if (d < 4) for (const s of [-1, 1]) grow(x2, y2, a + s * (.32 + r() * .2), len * (.68 + r() * .1), d + 1);
  };
  grow(0, 0, -Math.PI / 2 + (r() - .5) * .3, h * .3, 0);
  const byDepth = [0, 1, 2, 3, 4].map(d => { const p = new Path2D(); for (const s of segs) if (s[4] === d) { p.moveTo(s[0], s[1]); p.lineTo(s[2], s[3]); } return p; });
  return byDepth;
}
/* ---- the layers ---- */
let reef = null;
const REEF_ROCK = tones('#2d6283'), REEF_TABLE = tones('#2a5d7c'), REEF_TOP = tones('#49b9a0'), FRONT_ROCK = tones('#0f2c40', 7, 9);
const FAN_COLS = ['#e0567a', '#f08a3c', '#c95be0', '#ffb44a'];
function buildReef() {
  const r = mulberry32(31337), S = WORLD_SCREENS, floorY = H * SEABED;
  const layer = (f, hz) => ({ f, hz, span: WW * f + W * 1.4, items: [] });
  const X = L => -W * .2 + r() * L.span;
  const add = (L, x0, x1, pieces, sway) => L.items.push({ x0, x1, pieces, sway });
  reef = [layer(.3, .8), layer(.55, .55), layer(.8, .28)];
  const [far, mid, near] = reef;
  // Sizes follow a landscape-shaped unit Z, so on a tall phone screen the tables stay wide and low
  // instead of turning into thin mushrooms; counts shrink by the same amount so they don't pile up.
  const Z = Math.max(W, H * 1.6), n = k => Math.max(1, Math.round(k * S * W / Z));
  const tableTop = (frac, pw, base) => Math.max(H * frac, base - pw * 1.2);
  // far: wide hazy mounds and tall rock tables
  for (let i = 0; i < n(6); i++) { const x = X(far), w = Z * (.18 + r() * .22), h = H * (.12 + r() * .2); add(far, x - w, x + w, rockPieces(r, x, floorY + u * 3, w, h, REEF_ROCK, far.hz)); }
  for (let i = 0; i < n(3); i++) { const x = X(far), pw = Z * (.14 + r() * .14); add(far, x - pw, x + pw, tablePieces(r, x, floorY + u * 3, tableTop(.3 + r() * .22, pw, floorY), pw, REEF_TABLE, REEF_TOP, far.hz)); }
  // middle: tables, rocks and fans
  for (let i = 0; i < n(2); i++) { const x = X(mid), pw = Z * (.16 + r() * .14); add(mid, x - pw, x + pw, tablePieces(r, x, floorY + u * 2, tableTop(.45 + r() * .2, pw, floorY), pw, REEF_TABLE, REEF_TOP, mid.hz)); }
  for (let i = 0; i < n(5); i++) { const x = X(mid), w = Z * (.1 + r() * .12), h = H * (.07 + r() * .1); add(mid, x - w, x + w, rockPieces(r, x, floorY + u * 2, w, h, REEF_ROCK, mid.hz)); }
  for (let i = 0; i < 5 * S; i++) { const x = X(mid), h = H * (.08 + r() * .08), col = FAN_COLS[Math.floor(r() * 4)]; add(mid, x - h, x + h, null, { kind: 'fan', x, y: floorY - u, h, shape: fanShape(r, h), col: haze(col, floorY - h / 2, mid.hz), ph: r() * 9 }); }
  // near: a couple of big tables, rocks, more fans, whip corals
  for (let i = 0; i < n(2); i++) { const x = X(near), pw = Z * (.18 + r() * .12); add(near, x - pw, x + pw, tablePieces(r, x, floorY + u * 2, tableTop(.58 + r() * .14, pw, floorY), pw, REEF_TABLE, REEF_TOP, near.hz)); }
  for (let i = 0; i < n(4); i++) { const x = X(near), w = Z * (.08 + r() * .1), h = H * (.05 + r() * .07); add(near, x - w, x + w, rockPieces(r, x, floorY + u * 2, w, h, REEF_ROCK, near.hz)); }
  for (let i = 0; i < 6 * S; i++) { const x = X(near), h = H * (.07 + r() * .07), col = FAN_COLS[Math.floor(r() * 4)]; add(near, x - h, x + h, null, { kind: 'fan', x, y: floorY, h, shape: fanShape(r, h), col: haze(col, floorY - h / 2, near.hz), ph: r() * 9 }); }
  for (let i = 0; i < 5 * S; i++) { const x = X(near), h = H * (.08 + r() * .1); add(near, x - h * .4, x + h * .4, null, { kind: 'whip', x, y: floorY, h, col: haze('#f2a03a', floorY - h / 2, near.hz), ph: r() * 9 }); }
  // in front of everything: big dark boulders along the bottom that frame the view
  const front = { f: 1.3, hz: 0, span: WW * 1.3 + W * 1.4, items: [] }, nf = n(3);
  for (let i = 0; i < nf; i++) { const x = -W * .2 + (i + .5) / nf * front.span + (r() - .5) * W * .3, w = Z * (.3 + r() * .2), h = H * (.1 + r() * .08); add(front, x - w, x + w, rockPieces(r, x, H + u * 3, w, h, FRONT_ROCK, 0)); }
  reef.front = front;
}
function drawReefLayer(L, viewX, t) {
  ctx.save(); ctx.translate(viewX * (1 - L.f), 0);
  const lx0 = viewX * L.f - W * .1, lx1 = viewX * L.f + VW / vs + W * .1;
  for (const it of L.items) {
    if (it.x1 < lx0 || it.x0 > lx1) continue;
    if (it.pieces) {
      for (const [p, col, how] of it.pieces) {
        if (how === 'stroke') { ctx.strokeStyle = col; ctx.lineWidth = u * .18; ctx.lineJoin = 'round'; ctx.stroke(p); }
        else if (how === 'thin') { ctx.strokeStyle = col; ctx.lineWidth = u * .1; ctx.stroke(p); }
        else { ctx.fillStyle = col; ctx.fill(p); }
      }
      continue;
    }
    const s = it.sway, a = Math.sin(t * .6 + s.ph) * .05;
    ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(a);
    ctx.strokeStyle = s.col; ctx.lineCap = 'round';
    if (s.kind === 'fan') s.shape.forEach((p, d) => { ctx.lineWidth = u * (.7 - d * .12); ctx.stroke(p); });
    else { ctx.lineWidth = u * .35; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(s.h * .15, -s.h * .5, Math.sin(t * .8 + s.ph) * s.h * .12, -s.h); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
}
// The floor: pale flat stone slabs set in the sand, and faceted rocks.
const REEF_FLOOR = tones('#224861'), SLAB = tones('#3a6f8c');
let slabs = null;
function drawSeabedReef() {
  if (!slabs) {
    const r = mulberry32(99); slabs = [];
    for (let i = 0; i < 26 * WORLD_SCREENS; i++) { const x = r() * WW, w = u * (3 + r() * 5); slabs.push({ x, w, dy: u * (1 + r() * 7) }); }
    for (const rk of rocks) rk.pieces = rockPieces(r, rk.x, rk.y + rk.ry * .4, rk.rx * 2, rk.ry * 1.6, REEF_ROCK, .35);
  }
  const edge = cc => { for (let i = 1; i < seabed.length; i++) { const a = seabed[i - 1], b = seabed[i]; cc.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2); } };
  fillPath(ctx, cc => { cc.beginPath(); cc.moveTo(0, H + u * 5); cc.lineTo(seabed[0].x, seabed[0].y); edge(cc); cc.lineTo(WW, seabed[seabed.length - 1].y); cc.lineTo(WW, H + u * 5); cc.closePath(); }, REEF_FLOOR.mid);
  const [v0, v1] = celView;
  fillPath(ctx, cc => { cc.beginPath(); for (const s of slabs) { if (s.x < v0 - s.w || s.x > v1 + s.w) continue; const y = seabedY(s.x) + s.dy; lensTo(cc, s.x - s.w, y, s.x + s.w, y, s.w * .12, s.w * .2); } }, SLAB.mid);
  fillPath(ctx, cc => { cc.beginPath(); for (const s of slabs) { if (s.x < v0 - s.w || s.x > v1 + s.w) continue; const y = seabedY(s.x) + s.dy; lensTo(cc, s.x - s.w * .8, y - s.w * .03, s.x + s.w * .2, y - s.w * .06, s.w * .04, 0); } }, SLAB.light);
  strokePath(ctx, cc => { cc.beginPath(); cc.moveTo(seabed[0].x, seabed[0].y); edge(cc); }, REEF_FLOOR.light, u * .5);
  for (const rk of rocks) {
    if (rk.x < v0 - rk.rx * 2 || rk.x > v1 + rk.rx * 2) continue;
    for (const [p, col, how] of rk.pieces) if (how === 'stroke') { ctx.strokeStyle = col; ctx.lineWidth = u * .15; ctx.stroke(p); } else { ctx.fillStyle = col; ctx.fill(p); }
  }
}
function renderReef(t, viewX, showLabels) {
  let sx = 0, sy = 0;
  if (pass && !pass.tease && pass.sp.pass.shake) {
    const a = u * .35 * passEdge() * Math.pow(Math.max(0, Math.sin(pass.t * .7)), 6);
    sx = Math.sin(t * 41) * a; sy = Math.cos(t * 37) * a;
  }
  const x0 = viewX, x1 = viewX + VW / vs;
  celView = [x0, x1];
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  ctx.fillStyle = WATER[WATER.length - 1]; ctx.fillRect(0, 0, VW / vs, VH / vs);
  ctx.translate(-viewX + sx, sy);
  drawWater(viewX);
  if (far && far.school) drawLayerCel({ f: far.f, school: far.school, peaks: [] }, viewX, t);
  drawReefLayer(reef[0], viewX, t);
  drawReefLayer(reef[1], viewX, t);
  drawRays(t);
  drawReefLayer(reef[2], viewX, t);
  for (const s of snow) { if (s.x < x0 || s.x > x1) continue; ell(ctx, s.x, s.y, s.r * .8, s.r * .8, s.y < H * .45 ? '#bfe3f2' : '#5f86a3'); }
  drawPass(viewX - sx);
  drawSeabedReef();
  drawPlants(t);
  drawDecor(t);
  for (const o of creatures) drawCreature(o, x0, x1);
  for (const p of pellets) { ell(ctx, p.x, p.y, u * .45, u * .45, '#c8894a'); ell(ctx, p.x - u * .12, p.y - u * .12, u * .14, u * .14, '#e8b27a'); }
  ctx.strokeStyle = '#bfe3f5'; ctx.lineWidth = Math.max(1, u * .12);
  for (const b of bubbles) { if (b.x < x0 - 9 || b.x > x1 + 9) continue; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.stroke(); ell(ctx, b.x - b.r * .35, b.y - b.r * .35, b.r * .25, b.r * .25, '#ffffff'); }
  for (const s of sparks) { const r = u * .5 * Math.min(1, s.life); ell(ctx, s.x, s.y, r, r, '#f6fbff'); }
  drawReefLayer(reef.front, viewX, t);
  drawSurface(viewX, t);
  ctx.font = `bold ${Math.max(14, u * 2)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'center';
  for (const x of texts) { ctx.globalAlpha = Math.min(1, x.life); ctx.fillStyle = '#fff6c8'; ctx.fillText(x.s, x.x, x.y); }
  ctx.globalAlpha = 1;
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  if (showLabels) drawLabels();
}
if (SCENE_NEW) {
  const buildAtmosphereOld = buildAtmosphere;
  buildAtmosphere = function () { buildAtmosphereOld(); slabs = null; buildReef(); };
  render = renderReef;
}
