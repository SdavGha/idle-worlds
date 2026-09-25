"use strict";
// The world page loads helpers.js, then its own theme.js (animals, scenery, words), then this engine.
document.body.insertAdjacentHTML('afterbegin', `<canvas id="c"></canvas>

<div class="ui hud">
  <div class="pearl"><span class="gem"></span><span id="pearls">0</span></div>
  <div class="rate" id="rate">+0 / sec</div>
</div>
<div class="ui btns">
  <button id="shopBtn">Shop</button>
  <button id="bookBtn">Collection</button>
</div>
<aside id="shop" class="ui glass shop hidden">
  <div class="tabs" id="shopTabs">
    <button data-tab="real" class="on">${THEME.text.tabReal}</button>
    <button data-tab="legend">Legends</button>
    <button data-tab="decor">Decor</button>
  </div>
  <div id="list"></div>
</aside>
<section id="book" class="ui glass book hidden">
  <header><h2>Collection Book</h2><span id="bookCount"></span><button id="bookClose">Close</button></header>
  <div class="tabs" id="bookTabs">
    <button data-tab="real" class="on">Real Animals</button>
    <button data-tab="legend">Legendary</button>
    <button data-tab="ach">Stickers</button>
  </div>
  <div id="bookDetail" class="detail hidden"></div>
  <div id="bookGrid" class="grid"></div>
</section>
<div class="ui hint">${THEME.text.hint}</div>
<div class="ui parent">
  <div id="parentMenu" class="glass pmenu hidden">
    <small>Parent menu</small>
    <button id="fsBtn">Fullscreen</button>
    <button id="dualBtn" class="hidden">Two screens</button>
    <button id="exitBtn">Exit fullscreen</button>
  </div>
  <button id="gear" class="gear" aria-label="Parent menu (hold for 2 seconds)">⚙</button>
</div>
<div class="ui minimap" id="minimap"><div id="miniView"></div></div>
<div id="viewTap" class="viewtap hidden">Tap this screen once to go fullscreen</div>
<div id="card" class="glass card"><h3 id="cName"></h3><div class="zone" id="cZone"></div><p id="cFact"></p><div id="cAct"></div></div>
<div id="toast" class="toast"></div>`);

/* ================= state ================= */
// A window opened as "#view" is the second screen: it only draws what the main window sends it.
const IS_VIEW = location.hash === '#view';
const KEY = THEME.key;
let state = { pearls: 15, owned: Object.assign({}, THEME.start), decor: {}, lastSeen: Date.now() };
try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.owned) state = s; } catch (e) {}
state.decor = state.decor || {};
// Pearl vault cap: well above the most expensive item (20 billion) so nothing ever becomes unreachable,
// but low enough that numbers stay exact and readable no matter how long the tank runs.
const CAP = 1e11;
function addPearls(n) {
  if (!Number.isFinite(n) || n <= 0) return;
  state.pearls = Math.min(CAP, state.pearls + n);
  if (state.stats && state.stats.earned < 1e15) state.stats.earned += n;
}
state.pearls = Number.isFinite(state.pearls) ? Math.max(0, Math.min(CAP, state.pearls)) : 0;
for (const sp of SP) {
  const n = Math.floor(Number(state.owned[sp.id]) || 0);
  state.owned[sp.id] = Math.max(0, Math.min(sp.max, n));
}
function save() { if (IS_VIEW) return; try { state.lastSeen = Date.now(); localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
const has = sp => (state.owned[sp.id] || 0) > 0;
const mult = () => 1 + DECOR.reduce((a, d) => a + (state.decor[d.id] ? d.bonus : 0), 0);
const income = () => SP.reduce((a, s) => a + (state.owned[s.id] || 0) * s.inc, 0) * mult();
const price = sp => Math.ceil(sp.cost * Math.pow(1.15, state.owned[sp.id] || 0));
const unlocked = sp => { const i = SP.indexOf(sp); return i === 0 || has(sp) || has(SP[i - 1]); };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function fmt(n) {
  if (n < 10 && n % 1) return n.toFixed(1);
  if (n < 1e6) return Math.floor(n).toLocaleString('en-US');
  const m = n / 1e6;
  if (m < 1000) return (Math.floor(m * 10) / 10) + 'M';
  return (Math.floor(m / 100) / 10).toLocaleString('en-US') + 'B';
}

/* ================= world & camera =================
   The tank is WORLD_SCREENS screens wide. W×H is one screen of the main window (world units = its CSS px).
   camX is the left edge of everything on show; with two screens, slot 0 is the left screen, slot 1 the right. */
const WORLD_SCREENS = 3;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const sil = document.createElement('canvas');
let W = 0, H = 0, u = 1, WW = 0, DPR = 1, VW = 0, VH = 0, vs = 1;
let camX = 0, camPhase = 0, autoPause = 0, slot = 0, span = 1;
let seabed = [], rocks = [], plants = [], rays = [], vents = [], trees = [], branches = [];
let creatures = [], pellets = [], bubbles = [], snow = [], texts = [], sparks = [];
let pass = null, passTimer = 60, lastPass = '', nextId = 1;
const chest = { t: rand(40, 80), open: 0, phase: 0, hold: 0 };

function mulberry32(a) {
  return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function seabedY(x) {
  for (let i = 1; i < seabed.length; i++) if (x <= seabed[i].x) {
    const a = seabed[i - 1], b = seabed[i], f = (x - a.x) / (b.x - a.x);
    return a.y + (b.y - a.y) * f;
  }
  return H * SEABED;
}
// Same seed in both windows, so the seabed and plants line up across the screen edge.
function setWorld(w, h) {
  const oWW = WW, oH = H;
  W = w; H = h; u = Math.min(W, H) / 100; WW = W * WORLD_SCREENS;
  if (oWW && !IS_VIEW) {
    for (const o of creatures) { o.x *= WW / oWW; o.y *= H / oH; o.tx *= WW / oWW; o.ty *= H / oH; }
    camX *= WW / oWW;
  }
  pass = null;
  buildScene();
}
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  VW = innerWidth; VH = innerHeight; cv.width = VW * DPR; cv.height = VH * DPR;
  sil.width = cv.width; sil.height = cv.height;
  if (!IS_VIEW) setWorld(VW, VH);
  vs = H ? VH / H : 1;
}
const maxCam = () => Math.max(0, WW - span * W);
function syncPhase() { const m = maxCam(); if (m > 0) camPhase = Math.acos(1 - 2 * clamp(camX / m, 0, 1)); }
function updCamera(dt) {
  const m = maxCam();
  if (pass && !pass.tease) {
    camX += (clamp(pass.x - span * W / 2, 0, m) - camX) * Math.min(1, dt * .8); syncPhase();
  } else if (T >= autoPause) {
    camPhase += dt * TAU / 240;
    camX += (m * (.5 - .5 * Math.cos(camPhase)) - camX) * Math.min(1, dt * .5);
  }
  camX = clamp(camX, 0, m);
}
function panBy(dx) { camX = clamp(camX + dx, 0, maxCam()); autoPause = T + 20; syncPhase(); }

/* ================= creatures ================= */
function newTarget(o) {
  const sp = o.sp;
  // Cruisers (whale shark) swim long, fairly level stretches instead of zig-zagging.
  o.tx = sp.cruise ? clamp(o.x + (Math.random() < .5 ? -1 : 1) * W * rand(.7, 1.3), WW * .03, WW * .97) : rand(WW * .03, WW * .97);
  o.ty = H * rand(sp.zone[0], sp.zone[1]);
}
// A real giant visitor passing close by: which way (-1 / 1) should this animal get away, or 0 if it needn't.
// Only animals less than half the giant's size are scared, so the kraken doesn't flee from the megalodon.
function fleeDir(o) {
  if (!pass || pass.tease || o.leaving || o.sp.size >= pass.sp.size * .5) return 0;
  const dx = o.x - pass.x, dy = o.y - pass.y;
  if (Math.abs(dx) > pass.s * 2.4 || Math.abs(dy) > pass.s * 1.3) return 0;
  return dx === 0 ? pass.dir : Math.sign(dx);
}
function schoolLeader(sp) { for (const c of creatures) if (c.sp === sp && !c.leaving) return c; return null; }
function spawn(sp, init) {
  const nearCam = camX + rand(0, span * W);
  const o = { id: nextId++, sp, x: init ? rand(WW * .05, WW * .95) : nearCam, y: init ? H * rand(sp.zone[0], sp.zone[1]) : -u * 10,
    vx: 0, vy: 0, t: rand(0, 100), face: 1, fs: 1, puff: 0, puffT: 0, z: sp.max === 1 ? 0 : sp.perch ? rand(0, .15) : rand(0, 1) };
  o.k = sp.max === 1 ? 1 : rand(.85, 1.15) * (1 - .3 * o.z);
  if (!init) o.y = H * sp.zone[0] - u * 12;
  newTarget(o); if (!init) o.ty = H * rand(sp.zone[0], sp.zone[1]);
  creatures.push(o); sortByDepth(); return o;
}
function sortByDepth() { creatures.sort((a, b) => b.z - a.z || b.sp.size - a.sp.size); }
function populate() {
  creatures = [];
  for (const sp of SP) if (!sp.pass) for (let i = 0; i < (state.owned[sp.id] || 0); i++) spawn(sp, true);
  sortByDepth();
}
function floatText(x, y, s) { texts.push({ x, y, s, life: 1.8 }); }
function eat(p, o) {
  pellets.splice(pellets.indexOf(p), 1);
  const bonus = Math.max(1, income() * 2);
  addPearls(bonus); floatText(o.x, o.y - o.sp.size * u, '+' + fmt(bonus));
}
/* ---- perching: climbers, sitters and birds live on the tree branches ----
   Each perching animal sits at a spot on a branch (branch b, position f from trunk 0 to tip 1). It rests,
   then walks along the branch or moves to another one in its own way: frogs jump in an arc, monkeys and
   orangutans swing underneath, birds fly, and slow climbers crawl back to the trunk and climb it. */
function branchPt(b, f) { return [b.x0 + (b.x1 - b.x0) * f, b.y0 + (b.y1 - b.y0) * f]; }
function perchPos(o, b, f) {
  const [x, y] = branchPt(b, f), a = o.sp.perch.anchor;
  return [x, y + a * o.sp.size * u * o.k + (a < 0 ? -u * .45 : u * .45)];
}
function perchBranches(sp) {
  const list = branches.filter(b => { const m = (b.y0 + b.y1) / 2 / H; return m > sp.zone[0] && m < sp.zone[1]; });
  return list.length ? list : branches;
}
function queueMove(o, b, f, kind) {
  const [x1, y1] = perchPos(o, b, f), d = Math.hypot(x1 - o.x, y1 - o.y), sp = o.sp, v = Math.max(sp.speed, .4) * u;
  const dur = kind === 'walk' ? d / v : kind === 'climb' ? d / (v * .7) : kind === 'hop' ? .45 + d / (u * 40)
    : kind === 'jump' ? .6 + d / (u * 55) : kind === 'swing' ? .8 + d / (u * 45) : d / (v * 1.2);
  o.plan.push({ b, f, kind, dur: Math.max(.25, dur) });
}
function decidePerch(o) {
  const P = o.sp.perch, b = o.b;
  o.plan = [];
  if (Math.random() < P.walk) { queueMove(o, b, clamp(o.f + rand(-.5, .5), .12, 1), P.step || 'walk'); return; }
  if (P.move === 'climb') {
    const same = perchBranches(o.sp).filter(x => x.tree === b.tree && x !== b);
    if (!same.length) { queueMove(o, b, rand(.15, 1), 'walk'); return; }
    const nb = same[Math.floor(Math.random() * same.length)];
    queueMove(o, b, .03, 'walk');
    o.plan.push({ b: nb, f: .03, kind: 'climb', dur: Math.abs((nb.y0 - b.y0)) / (Math.max(o.sp.speed, .4) * u * .7) + .3 });
    o.plan.push({ b: nb, f: rand(.3, 1), kind: 'walk', dur: 0 });
    return;
  }
  const reach = P.reach * u, near = perchBranches(o.sp).filter(x => x !== b && Math.hypot((x.x0 + x.x1) / 2 - o.x, (x.y0 + x.y1) / 2 - o.y) < reach);
  if (!near.length) { queueMove(o, b, clamp(o.f + rand(-.5, .5), .12, 1), P.step || 'walk'); return; }
  queueMove(o, near[Math.floor(Math.random() * near.length)], rand(.25, 1), P.move);
}
function updPerch(o, dt) {
  const sp = o.sp, P = sp.perch, s = sp.size * u * o.k;
  o.perched = true;
  o.mvKind = o.mv ? o.mv.kind : null;
  if (!o.b || !branches.includes(o.b)) {
    const list = perchBranches(sp); o.b = list[Math.floor(Math.random() * list.length)]; o.f = rand(.2, 1);
    [o.x, o.y] = perchPos(o, o.b, o.f); o.plan = []; o.mv = null; o.wait = rand(.5, P.rest[1]);
  }
  // Birds fly down to grab falling berries; everyone else catches the ones that fall within reach.
  if (P.fly && !o.mv && pellets.length) {
    let best = u * 45, pick = null;
    for (const p of pellets) { const d = Math.hypot(p.x - o.x, p.y - o.y); if (d < best) { best = d; pick = p; } }
    if (pick) { o.plan = []; o.mv = { pel: pick, kind: 'fly', x0: o.x, y0: o.y, p: 0, dur: .4 + best / (sp.speed * u * 1.4) }; o.face = pick.x >= o.x ? 1 : -1; }
  }
  if (!P.fly) for (const p of pellets) if (Math.hypot(p.x - o.x, p.y - o.y) < s * .9) { eat(p, o); break; }
  // A giant is coming: fliers, swingers and jumpers move to a branch further away; slow climbers freeze and hide.
  o.fleeCD = (o.fleeCD || 0) - dt;
  const away = fleeDir(o);
  if (away && o.fleeCD <= 0) {
    o.fleeCD = 6;
    if (P.move === 'climb') { if (!o.mv) { o.plan = []; o.wait = Math.max(o.wait, 5); } }
    else {
      const reach = P.reach * u * 2.5, list = perchBranches(sp).filter(b => b !== o.b && Math.abs((b.x0 + b.x1) / 2 - o.x) < reach && Math.sign((b.x0 + b.x1) / 2 - o.x) === away);
      if (list.length) {
        const far = list.reduce((a, b) => Math.abs((b.x0 + b.x1) / 2 - pass.x) > Math.abs((a.x0 + a.x1) / 2 - pass.x) ? b : a);
        o.mv = null; o.plan = []; o.wait = 0; queueMove(o, far, rand(.4, 1), P.move); o.plan[0].dur *= .6;
      }
    }
  }
  if (!o.mv && o.plan && o.plan.length && o.wait <= 0) {
    const m = o.plan.shift();
    const [x1] = perchPos(o, m.b, m.f);
    if (m.dur === 0) { const d = Math.hypot(x1 - o.x, perchPos(o, m.b, m.f)[1] - o.y); m.dur = Math.max(.25, d / (Math.max(sp.speed, .4) * u)); }
    o.mv = Object.assign(m, { x0: o.x, y0: o.y, p: 0 });
    if (m.kind !== 'climb' && Math.abs(x1 - o.x) > u * .2) o.face = x1 >= o.x ? 1 : -1;
  }
  if (o.mv) {
    const m = o.mv; m.p += dt / m.dur;
    const p = Math.min(1, m.p);
    let x1, y1;
    if (m.pel) {
      if (!pellets.includes(m.pel)) { o.mv = null; o.plan = []; queueMove(o, perchBranches(sp).reduce((a, b) => Math.hypot(b.x1 - o.x, b.y1 - o.y) < Math.hypot(a.x1 - o.x, a.y1 - o.y) ? b : a), rand(.4, 1), 'fly'); return; }
      x1 = m.pel.x; y1 = m.pel.y;
    } else [x1, y1] = perchPos(o, m.b, m.f);
    const smooth = m.kind === 'walk' || m.kind === 'climb' ? p : p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    let x = m.x0 + (x1 - m.x0) * smooth, y = m.y0 + (y1 - m.y0) * smooth;
    const d = Math.hypot(x1 - m.x0, y1 - m.y0);
    if (m.kind === 'jump') y -= Math.min(d * .5, u * 12) * 4 * p * (1 - p);
    if (m.kind === 'hop') y -= Math.min(d * .6 + u * 1.5, u * 4) * 4 * p * (1 - p);
    if (m.kind === 'swing') y += Math.min(d * .35 + u * 2, u * 9) * Math.sin(p * Math.PI);
    if (m.kind === 'fly' && !m.pel) y -= Math.min(d * .25, u * 8) * Math.sin(p * Math.PI);
    o.vx = (x - o.x) / Math.max(dt, 1e-3); o.vy = (y - o.y) / Math.max(dt, 1e-3);
    o.x = x; o.y = y;
    o.t += dt * (m.kind === 'fly' || m.kind === 'swing' ? 1 : Math.max(P.anim, .6));
    if (m.pel && Math.hypot(x1 - x, y1 - y) < s * .6) { eat(m.pel, o); o.mv = null; o.plan = []; queueMove(o, perchBranches(sp).reduce((a, b) => Math.hypot(b.x1 - o.x, b.y1 - o.y) < Math.hypot(a.x1 - o.x, a.y1 - o.y) ? b : a), rand(.4, 1), 'fly'); }
    else if (p >= 1) { if (m.b) { o.b = m.b; o.f = m.f; } o.mv = null; o.wait = o.plan.length ? 0 : rand(P.rest[0], P.rest[1]); }
  } else {
    [o.x, o.y] = perchPos(o, o.b, o.f); o.vx = 0; o.vy = 0;
    o.t += dt * P.anim;
    o.wait -= dt;
    if (o.wait <= 0 && !(o.plan && o.plan.length)) decidePerch(o);
  }
  o.fs += (o.face - o.fs) * Math.min(1, dt * 6);
  if (o.puffT > 0) { o.puffT -= dt; o.puff = Math.min(1, o.puff + dt * 4); } else o.puff = Math.max(0, o.puff - dt * .8);
}

function updCreature(o, dt) {
  const sp = o.sp;
  if (sp.perch && !o.leaving) { updPerch(o, dt); return; }
  o.t += dt;
  if (o.leaving) {
    o.vx += (o.face * Math.max(sp.speed, 4) * u * 2.5 - o.vx) * Math.min(1, dt * 2); o.vy *= .95;
    o.x += o.vx * dt; o.y += o.vy * dt;
    o.fs += (o.face - o.fs) * Math.min(1, dt * 6);
    if (o.x < -u * 30 || o.x > WW + u * 30) o.gone = true;
    return;
  }
  // A giant is passing: swim, fly or run away from it, up or down away from its path, and fast.
  const away = fleeDir(o);
  if (away) {
    o.scared = 3;
    o.tx = clamp(o.x + away * W * .6, WW * .02, WW * .98);
    o.ty = clamp(o.y + (o.y < pass.y ? -1 : 1) * H * .2, H * .04, H * .88);
  }
  o.scared = Math.max(0, (o.scared || 0) - dt);
  // Turtles swim up to the surface for a breath every so often.
  if (sp.surface && !o.scared) {
    o.breath = (o.breath ?? rand(10, 40)) - dt;
    if (o.breath <= 0 && !o.breathing) { o.breathing = true; o.tx = clamp(o.x + rand(-1, 1) * W * .2, WW * .03, WW * .97); o.ty = H * .035; }
    if (o.breathing && o.y < H * .06) { o.breathing = false; o.breath = rand(35, 70); newTarget(o); }
  }
  let tx = o.tx, ty = o.ty, chase = null;
  if (sp.eats && pellets.length && !o.scared) {
    let best = u * 45;
    for (const p of pellets) { const d = Math.hypot(p.x - o.x, p.y - o.y); if (d < best) { best = d; chase = p; } }
    if (chase) { tx = chase.x; ty = chase.y; }
  }
  // School fish follow the first of their kind, each keeping its own spot in the group.
  let catchUp = 1;
  if (sp.school && !chase && !o.scared) {
    const L = schoolLeader(sp);
    if (L && L !== o) {
      if (o.offX == null) { o.offX = rand(2, 11) * u; o.offY = rand(-5, 5) * u; }
      tx = L.x - L.face * o.offX; ty = L.y + o.offY;
      catchUp = clamp(Math.hypot(tx - o.x, ty - o.y) / (u * 6), .6, 2);
    }
  }
  if (sp.walk) ty = o.y;
  const dx = tx - o.x, dy = ty - o.y, d = Math.hypot(dx, dy) || 1;
  let spd = sp.speed * u * (chase ? 1.8 : 1) * (o.scared ? 2.4 : 1) * catchUp;
  if (sp.pulse) spd *= Math.max(.15, Math.sin(o.t * 3) + .3);
  // Lurkers (anglerfish) hang almost still with their light on, then dart a short way now and then.
  if (sp.lurk && !o.scared) {
    o.dash = (o.dash ?? rand(4, 12)) - dt;
    spd *= o.dash < 0 ? 4 : .12;
    if (o.dash < -.7) { o.dash = rand(8, 18); o.tx = clamp(o.x + rand(-1, 1) * u * 25, WW * .03, WW * .97); o.ty = H * rand(sp.zone[0], sp.zone[1]); }
  }
  if (!chase && !o.breathing && !o.scared && d < u * 3) newTarget(o);
  const e = Math.min(1, dt * 1.2);
  o.vx += (dx / d * spd - o.vx) * e; o.vy += (dy / d * spd * .6 - o.vy) * e;
  o.x += o.vx * dt; o.y += o.vy * dt + Math.sin(o.t * 1.3) * u * .05;
  if (sp.walk) {
    const gy = seabedY(o.x) - sp.box[3] * sp.size * u * o.k + u * .3;
    o.vy = 0; o.y = gy - (sp.hop ? Math.abs(Math.sin(o.t * 5)) * u * 2.5 * Math.min(1, Math.abs(o.vx) / u) : 0);
  }
  if (o.vx > u * .3) o.face = 1; else if (o.vx < -u * .3) o.face = -1;
  o.fs += (o.face - o.fs) * Math.min(1, dt * 6);
  if (chase && Math.hypot(chase.x - o.x, chase.y - o.y) < sp.size * u * o.k * .8) eat(chase, o);
  if (o.puffT > 0) { o.puffT -= dt; o.puff = Math.min(1, o.puff + dt * 4); } else o.puff = Math.max(0, o.puff - dt * .8);
}
function drawCreature(o, x0, x1) {
  const sp = o.sp, s = sp.size * u * o.k, reach = s * 5;
  if (o.x < x0 - reach || o.x > x1 + reach) return;
  ctx.save(); ctx.translate(o.x, o.y); ctx.globalAlpha = 1 - .4 * (o.z || 0);
  if (sp.perch && o.perched) { if (o.mvKind === 'walk' || o.mvKind === 'climb') ctx.rotate(Math.atan2(o.vy, Math.abs(o.vx) + 1e-6) * o.face); }
  else if (!sp.noflip) ctx.rotate(Math.atan2(o.vy, Math.abs(o.vx) + u) * .5 * o.face);
  ctx.scale(s * (sp.noflip ? 1 : o.fs), s);
  sp.draw(ctx, o.t, o); ctx.restore();
}
function inBox(sp, lx, ly) { const b = sp.box; return lx > b[0] && lx < b[2] && ly > b[1] && ly < b[3]; }
function hitCreature(o, x, y) {
  const s = o.sp.size * u * o.k; let lx = (x - o.x) / s; const ly = (y - o.y) / s;
  if (!o.sp.noflip && o.face < 0) lx = -lx;
  return inBox(o.sp, lx, ly);
}
function release(sp, o) {
  if (creatures.filter(c => !c.leaving).length <= 1) { toast(THEME.text.keepOne); return false; }
  o = o && !o.leaving ? o : creatures.find(c => c.sp === sp && !c.leaving);
  if (!o) return false;
  o.leaving = true; o.face = o.x < WW / 2 ? -1 : 1;
  state.owned[sp.id] = Math.max(0, (state.owned[sp.id] || 0) - 1);
  S.releases++; toast(sp.name + THEME.text.wentHome);
  save(); updateHud(); return true;
}
function releaseById(id) { const o = creatures.find(c => c.id === id); return o ? release(o.sp, o) : false; }

/* ================= giant visitors ================= */
const PASSERS = SP.filter(s => s.pass);
function teaseCandidate() { return PASSERS.find(s => !has(s) && unlocked(s)); }
function startPass(sp, tease, summoned) {
  const s = sp.size * u, b = sp.box, dir = Math.random() < .5 ? 1 : -1;
  // A real visit crosses the whole tank and the camera follows it.
  // A mystery shadow only crosses what is on screen right now, so it isn't missed.
  const L = tease ? camX : 0, R = tease ? camX + span * W : WW;
  const x0 = dir > 0 ? L - b[2] * s - u * 2 : R + b[2] * s + u * 2;
  const x1 = dir > 0 ? R - b[0] * s + u * 2 : L + b[0] * s - u * 2;
  const secs = tease ? sp.pass.secs : sp.pass.secs * 2;
  pass = { sp, tease, dir, x: x0, x0, x1, y: sp.pass.ground ? H * SEABED - b[3] * s + u * .5 : H * sp.pass.y, s, t: 0, speed: Math.abs(x1 - x0) / secs };
  lastPass = sp.id;
  if (tease) S.teases++; else if (!summoned) S.seen[sp.id] = (S.seen[sp.id] || 0) + 1;
  toast(tease ? THEME.text.teaseToast : sp.pass.msg);
}
function schedulePass() {
  const owned = PASSERS.filter(has), cand = teaseCandidate();
  if (!owned.length && !cand) { passTimer = 60; return; }
  if (cand && (!owned.length || Math.random() < .3)) startPass(cand, true);
  else {
    const pool = owned.length > 1 ? owned.filter(s => s.id !== lastPass) : owned;
    startPass(pool[Math.floor(Math.random() * pool.length)], false);
  }
  passTimer = owned.length ? rand(150, 240) : rand(480, 720);
}
function updPass(dt) {
  if (!pass) { passTimer -= dt; if (passTimer <= 0) schedulePass(); return; }
  pass.t += dt; pass.x += pass.dir * pass.speed * dt;
  if ((pass.x - pass.x0) / (pass.x1 - pass.x0) >= 1) pass = null;
}
function passEdge() { const p = (pass.x - pass.x0) / (pass.x1 - pass.x0); return Math.max(0, Math.min(1, p * 8, (1 - p) * 8)); }
function paintPass(c) {
  c.save(); c.translate(pass.x, pass.y + Math.sin(pass.t * .6) * u * 1.5); c.scale(pass.s * pass.dir, pass.s);
  pass.sp.draw(c, pass.t, { puff: 0 }); c.restore();
}
function drawPass(viewX) {
  if (!pass) return;
  const edge = passEdge();
  if (!pass.tease) {
    ctx.fillStyle = `rgba(0,0,12,${.18 * edge})`; ctx.fillRect(viewX - u * 5, -u * 5, VW / vs + u * 10, H + u * 10);
    ctx.globalAlpha = edge; paintPass(ctx); ctx.globalAlpha = 1;
  } else {
    const sc = sil.getContext('2d');
    sc.setTransform(1, 0, 0, 1, 0, 0); sc.clearRect(0, 0, sil.width, sil.height);
    sc.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0); sc.translate(-viewX, 0); paintPass(sc);
    sc.setTransform(1, 0, 0, 1, 0, 0);
    sc.globalCompositeOperation = 'source-in'; sc.fillStyle = '#020812'; sc.fillRect(0, 0, sil.width, sil.height); sc.globalCompositeOperation = 'source-over';
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = .6 * edge; ctx.drawImage(sil, 0, 0); ctx.restore();
  }
}
function hitPass(x, y) {
  if (!pass) return false;
  return inBox(pass.sp, (x - pass.x) / (pass.s * pass.dir), (y - pass.y) / pass.s);
}

/* ================= decorations ================= */
function decorSpots() {
  const out = [];
  for (const d of DECOR) if (state.decor[d.id]) for (const fx of d.xs) out.push({ d, x: WW * fx, y: seabedY(WW * fx) + u * .6, s: d.size * u });
  return out;
}
function drawDecor(t) {
  for (const p of decorSpots()) { ctx.save(); ctx.translate(p.x, p.y); ctx.scale(p.s, p.s); p.d.draw(ctx, t, chest); ctx.restore(); }
}
function updChest(dt) {
  if (!state.decor.chest) return;
  if (chest.phase === 0) { chest.t -= dt; if (chest.t <= 0) chest.phase = 1; }
  else if (chest.phase === 1) {
    chest.open = Math.min(1, chest.open + dt);
    if (chest.open >= 1) {
      chest.phase = 2; chest.hold = 3;
      const bonus = Math.max(10, income() * 30); addPearls(bonus); S.chests++;
      const x = WW * DECOR.find(d => d.id === 'chest').xs[0], y = seabedY(x) - u * 3;
      floatText(x, y - u * 4, '+' + fmt(bonus));
      for (let i = 0; i < 26; i++) sparks.push({ x: x + rand(-2, 2) * u, y, vx: rand(-4, 4) * u, vy: rand(-18, -8) * u, life: rand(1.5, 2.6) });
    }
  } else if (chest.phase === 2) { chest.hold -= dt; if (chest.hold <= 0) chest.phase = 3; }
  else { chest.open = Math.max(0, chest.open - dt * .7); if (chest.open <= 0) { chest.phase = 0; chest.t = rand(90, 150); } }
}

/* ================= main loop (main window: runs the whole tank) ================= */
let last = performance.now(), T = 0, hudT = 0;
function frame(now) {
  const rdt = Math.max(0, (now - last) / 1000); last = now;
  const dt = Math.min(rdt, .05); T += dt;
  addPearls(income() * rdt); sessionT += rdt;

  for (const o of creatures) updCreature(o, dt);
  creatures = creatures.filter(o => !o.gone);
  updPass(dt); updChest(dt); updCamera(dt);
  for (const p of pellets) { p.y += u * 3 * dt; p.x += Math.sin(T * 2 + p.ph) * u * .3 * dt; }
  pellets = pellets.filter(THEME.pelletAlive);
  for (const s of sparks) { s.life -= dt; s.vy += u * 6 * dt; s.x += s.vx * dt; s.y += s.vy * dt; }
  sparks = sparks.filter(s => s.life > 0);
  for (const x of texts) { x.life -= dt; x.y -= u * 3 * dt; }
  texts = texts.filter(x => x.life > 0);
  updCosmetics(dt, T);

  render(T, camX + slot * W, slot === span - 1);
  sendSnapshot();

  hudT -= rdt;
  if (hudT <= 0) { hudT = .25; updateHud(); countDay(); checkAch(false); }
  requestAnimationFrame(frame);
}

/* ================= two screens =================
   The main window opens a second window on the other screen and sends it a snapshot every frame.
   The second window sends taps, drags and release requests back. */
let companion = null, companionSlot = 1;
function post(msg) { try { if (companion && !companion.closed) companion.postMessage(msg, '*'); } catch (e) {} }
function sendSnapshot() {
  if (!companion) return;
  if (companion.closed) { endDual(); return; }
  post({
    type: 'snap', W, H, T, camX, span, slot: companionSlot, decor: state.decor, chestOpen: chest.open,
    cr: creatures.map(o => [SP.indexOf(o.sp), o.x, o.y, o.t, o.fs, o.face, o.puff, o.k, o.vx, o.vy, o.id, o.leaving ? 1 : 0, o.z, o.hue, o.perched ? 1 : 0, o.mvKind]),
    pel: pellets.map(p => [p.x, p.y]),
    pass: pass ? { i: SP.indexOf(pass.sp), x: pass.x, y: pass.y, s: pass.s, dir: pass.dir, t: pass.t, tease: pass.tease, x0: pass.x0, x1: pass.x1 } : null,
    texts, sparks,
  });
}
let screenDetails = null;
async function prepareDual() {
  if (IS_VIEW || !('getScreenDetails' in window)) return;
  // Shown whenever the browser can place windows; startDual says so if there is no second screen.
  $('dualBtn').classList.remove('hidden');
  try {
    const p = await navigator.permissions.query({ name: 'window-management' });
    if (p.state === 'granted') screenDetails = await window.getScreenDetails();
  } catch (e) {}
}
async function startDual() {
  try {
    if (!screenDetails) {
      screenDetails = await window.getScreenDetails();
      toast('Allowed. Press "Two screens" again.');
      return;
    }
    const cur = screenDetails.currentScreen, other = screenDetails.screens.find(s => s !== cur);
    if (!other) { toast('Couldn\'t find a second screen'); return; }
    const url = location.href.split('#')[0] + '#view';
    const feat = `popup,fullscreen,left=${other.availLeft},top=${other.availTop},width=${other.availWidth},height=${other.availHeight}`;
    companion = window.open(url, 'aquarium-view', feat);
    wantFS = 'dual'; goFullscreen(); closeParent();
    if (!companion) { toast('The browser blocked the second window. Try again.'); return; }
    slot = cur.left < other.left ? 0 : 1; companionSlot = 1 - slot; span = 2;
    camX = clamp(camX, 0, maxCam()); syncPhase(); keepAwake();
    toast('Tap the other screen once to make it fullscreen');
  } catch (e) {
    screenDetails = null;
    toast('Two screens didn\'t work: the browser won\'t allow using multiple screens');
  }
}
function endDual() {
  if (companion && !companion.closed) { try { companion.close(); } catch (e) {} }
  companion = null; span = 1; slot = 0; camX = clamp(camX, 0, maxCam()); syncPhase();
}
function onViewMessage(m) {
  if (m.type === 'tap') tapAt(m.wx, m.wy, true);
  else if (m.type === 'drag') panBy(m.dx);
  else if (m.type === 'release') releaseById(m.id);
  else if (m.type === 'exit') exitAll();
}

/* ================= UI (main window) ================= */
const $ = id => document.getElementById(id);
function drawFit(el, draw, box, silhouette, fill = 1) {
  const c = el.getContext('2d'); c.clearRect(0, 0, el.width, el.height);
  const bw = box[2] - box[0], bh = box[3] - box[1], s = Math.min(el.width * .86 / bw, el.height * .82 / bh) * fill;
  c.save(); c.translate(el.width / 2 - (box[0] + bw / 2) * s, el.height / 2 - (box[1] + bh / 2) * s); c.scale(s, s);
  draw(c); c.restore();
  if (silhouette) { c.globalCompositeOperation = 'source-in'; c.fillStyle = 'rgba(150,190,230,.3)'; c.fillRect(0, 0, el.width, el.height); c.globalCompositeOperation = 'source-over'; }
}
function preview(item, w, h, silhouette) {
  const el = document.createElement('canvas'); el.width = w; el.height = h;
  drawFit(el, c => item.draw(c, 1.3, { puff: 0, open: 0 }), item.box, silhouette);
  return el;
}
function updateHud() {
  $('pearls').textContent = fmt(state.pearls);
  const m = mult();
  $('rate').textContent = state.pearls >= CAP
    ? `${THEME.text.vault} full (max ${fmt(CAP)})`
    : '+' + fmt(income()) + ' / sec' + (m > 1 ? `  (decor +${Math.round((m - 1) * 100)}%)` : '');
  const mv = $('miniView'); mv.style.left = (camX / WW * 100) + '%'; mv.style.width = (span * W / WW * 100) + '%';
  if (!$('shop').classList.contains('hidden')) updateShop();
}

let shopTab = 'real', shopSig = '', rows = [];
function shopItems() { return shopTab === 'decor' ? DECOR : SP.filter(s => shopTab === 'legend' ? s.legend : !s.legend); }
function buildShop() {
  const list = $('list'); list.innerHTML = ''; rows = [];
  for (const it of shopItems()) {
    const isDecor = shopTab === 'decor', open = isDecor || unlocked(it);
    const row = document.createElement('div'); row.className = 'row' + (open ? '' : ' locked');
    const pv = preview(it, 108, 78, !open); pv.className = 'pv';
    const info = document.createElement('div'); info.className = 'info';
    row.append(pv, info);
    if (!open) {
      const i = SP.indexOf(it);
      info.innerHTML = `<b>???</b><small>Mystery animal. Buy the ${SP[i - 1].name} first</small>`;
    } else {
      const btn = document.createElement('button'); btn.className = 'buy';
      btn.onclick = () => isDecor ? buyDecor(it) : buy(it);
      let rel = null;
      const acts = document.createElement('div'); acts.className = 'acts';
      if (!isDecor && !it.pass) { rel = confirmBtn('Release 1', () => release(it)); acts.append(rel); }
      acts.append(btn); row.append(acts); rows.push({ it, info, btn, rel, isDecor });
    }
    list.append(row);
  }
}
function updateShop() {
  const sig = shopTab + SP.map(s => unlocked(s) ? 1 : 0).join('');
  if (sig !== shopSig) { shopSig = sig; buildShop(); }
  for (const r of rows) {
    if (r.isDecor) {
      const own = !!state.decor[r.it.id];
      r.btn.textContent = own ? 'Owned' : '◉ ' + fmt(r.it.cost);
      r.btn.disabled = own || state.pearls < r.it.cost;
      r.info.innerHTML = `<b>${r.it.name}</b><small>${r.it.bonus ? '+' + Math.round(r.it.bonus * 100) + '% ' + THEME.text.bonus : r.it.desc}</small>`;
      continue;
    }
    const sp = r.it, n = state.owned[sp.id] || 0, full = n >= sp.max, p = price(sp);
    r.btn.textContent = full ? (sp.max === 1 ? 'Owned' : 'Full') : '◉ ' + fmt(p);
    r.btn.disabled = full || state.pearls < p;
    if (r.rel) r.rel.classList.toggle('hidden', n === 0);
    const note = sp.pass ? 'Visits now and then' : `Have ${n}/${sp.max}`;
    r.info.innerHTML = `<b>${sp.name}</b><small>${note} · +${fmt(sp.inc)} / sec</small>`;
  }
}
function buy(sp) {
  const p = price(sp), n = state.owned[sp.id] || 0;
  if (state.pearls < p || n >= sp.max) return;
  state.pearls -= p; state.owned[sp.id] = n + 1;
  if (sp.pass) { if (!pass) passTimer = 4; toast(sp.name + THEME.text.nowLives); showSpecies(sp); }
  else { const o = spawn(sp, false); showSpecies(sp, o); }
  save(); updateHud();
}
function buyDecor(d) {
  if (state.decor[d.id] || state.pearls < d.cost) return;
  state.pearls -= d.cost; state.decor[d.id] = 1;
  if (d.id === 'chest') { chest.t = 8; chest.phase = 0; }
  const x = WW * d.xs[0]; camX = clamp(x - span * W / 2, 0, maxCam()); autoPause = T + 20; syncPhase();
  showInfo(d.name, 'Decoration', d.desc); save(); updateHud();
}
document.querySelectorAll('#shopTabs button').forEach(b => b.onclick = () => {
  shopTab = b.dataset.tab; document.querySelectorAll('#shopTabs button').forEach(x => x.classList.toggle('on', x === b)); updateShop();
});

/* ----- collection stickers -----
   Every found animal becomes a die-cut sticker (white border + shadow). Rare ones sparkle with glitter;
   legendary ones get a moving rainbow holo sheen, a glare band and glitter. The sheen follows the finger
   or mouse over the sticker, and drifts on its own otherwise. */
const RARITY = ['', 'rare', 'legendary'];
const tierOf = sp => sp.tier != null ? sp.tier : sp.legend || sp.pass ? 2 : SP.indexOf(sp) >= SP.indexOf(BY[THEME.rareFrom]) ? 1 : 0;
const stickerCache = new Map();
function tinted(src, color) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const g = c.getContext('2d'); g.drawImage(src, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
  return c;
}
function makeSticker(sp, w, h) {
  const key = sp.id + ':' + w;
  if (stickerCache.has(key)) return stickerCache.get(key);
  const art = document.createElement('canvas'); art.width = w; art.height = h;
  drawFit(art, c => sp.draw(c, 1.3, { puff: 0, open: 0 }), sp.box, false, sp.stickerFill || .8);
  const r = Math.max(3, h * .045), white = tinted(art, '#fff');
  const mask = document.createElement('canvas'); mask.width = w; mask.height = h;
  const m = mask.getContext('2d');
  for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; m.drawImage(white, Math.cos(a) * r, Math.sin(a) * r); }
  m.drawImage(white, 0, 0);
  const base = document.createElement('canvas'); base.width = w; base.height = h;
  const b = base.getContext('2d');
  b.globalAlpha = .45; b.drawImage(tinted(mask, '#00070f'), 0, r * .7); b.globalAlpha = 1;
  b.drawImage(mask, 0, 0); b.drawImage(art, 0, 0);
  // Glitter spots sampled from inside the sticker shape.
  const stars = [], data = m.getImageData(0, 0, w, h).data;
  for (let tries = 0; tries < 4000 && stars.length < 26; tries++) {
    const x = Math.floor(Math.random() * w), y = Math.floor(Math.random() * h);
    if (data[(y * w + x) * 4 + 3] > 200) stars.push({ x, y, ph: rand(0, TAU), s: rand(.5, 1) * h * .045, gold: Math.random() < .35 });
  }
  const layer = document.createElement('canvas'); layer.width = w; layer.height = h;
  const out = { base, mask, layer, stars };
  stickerCache.set(key, out); return out;
}
function star(c, x, y, s) {
  c.beginPath(); c.moveTo(x, y - s); c.quadraticCurveTo(x, y, x + s, y); c.quadraticCurveTo(x, y, x, y + s);
  c.quadraticCurveTo(x, y, x - s, y); c.quadraticCurveTo(x, y, x, y - s); c.fill();
}
function paintSticker(fx, t) {
  const c = fx.canvas.getContext('2d'), w = fx.canvas.width, h = fx.canvas.height, st = fx.st;
  c.clearRect(0, 0, w, h); c.drawImage(st.base, 0, 0);
  if (!fx.tier) return;
  const k = fx.mx != null ? fx.mx : .5 + .5 * Math.sin(t * .5 + fx.seed);
  const L = st.layer.getContext('2d');
  L.globalCompositeOperation = 'source-over'; L.clearRect(0, 0, w, h);
  if (fx.tier === 2) {
    const g = L.createLinearGradient(w * (k - 1), 0, w * (k + .6), h);
    ['#ff6fa8', '#ffc86b', '#fff67a', '#7dffb2', '#6fd8ff', '#9d8cff', '#ff7ad9', '#ff6fa8', '#ffc86b', '#7dffb2']
      .forEach((col, i, a) => g.addColorStop(i / (a.length - 1), col));
    L.fillStyle = g; L.fillRect(0, 0, w, h);
  }
  const gx = w * (k * 1.8 - .4), gg = L.createLinearGradient(gx - w * .18, 0, gx + w * .18, h * .5);
  gg.addColorStop(0, 'rgba(255,255,255,0)'); gg.addColorStop(.5, 'rgba(255,255,255,.95)'); gg.addColorStop(1, 'rgba(255,255,255,0)');
  L.fillStyle = gg; L.fillRect(0, 0, w, h);
  L.globalCompositeOperation = 'destination-in'; L.drawImage(st.mask, 0, 0);
  c.save();
  if (fx.tier === 2) {
    c.globalCompositeOperation = 'overlay'; c.globalAlpha = .7; c.drawImage(st.layer, 0, 0);
    c.globalCompositeOperation = 'source-atop'; c.globalAlpha = .26; c.drawImage(st.layer, 0, 0);
  } else {
    c.globalCompositeOperation = 'source-atop'; c.globalAlpha = .3; c.drawImage(st.layer, 0, 0);
  }
  c.globalCompositeOperation = 'lighter'; c.globalAlpha = 1;
  for (const p of st.stars) {
    const a = Math.pow(Math.max(0, Math.sin(t * 2.2 + p.ph)), 4);
    if (a < .02) continue;
    c.fillStyle = p.gold ? `rgba(255,220,130,${a})` : `rgba(255,255,255,${a})`;
    star(c, p.x, p.y, p.s * (.4 + a));
  }
  c.restore();
}
let bookFx = [], bookRAF = 0;
function bookLoop(now) {
  if ($('book').classList.contains('hidden')) { bookRAF = 0; return; }
  for (const fx of bookFx) if (fx.tier) paintSticker(fx, now / 1000);
  bookRAF = requestAnimationFrame(bookLoop);
}
function stickerEl(sp, w, h, hoverTarget) {
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
  const fx = { canvas, st: makeSticker(sp, w, h), tier: tierOf(sp), mx: null, seed: rand(0, TAU) };
  paintSticker(fx, performance.now() / 1000);
  const t = hoverTarget || canvas;
  t.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); fx.mx = clamp((e.clientX - r.left) / r.width, 0, 1); });
  t.addEventListener('pointerleave', () => { fx.mx = null; });
  bookFx.push(fx);
  return canvas;
}
function badge(sp) {
  const tier = tierOf(sp);
  if (!tier) return null;
  const b = document.createElement('div'); b.className = 'badge ' + RARITY[tier]; b.textContent = RARITY[tier].toUpperCase();
  return b;
}

/* ----- achievement stickers -----
   Deliberately slow: common ones take days of play, rare ones weeks, legendary ones a long-running tank.
   Summoning a visitor from the book does not count as seeing it, so the counts can't be farmed. */
const S = state.stats = Object.assign({ feeds: 0, tapped: [], puffs: 0, releases: 0, chests: 0, teases: 0, seen: {},
  earned: state.pearls, days: 0, lastDay: '' }, state.stats || {});
state.ach = state.ach || {};
let sessionT = 0;
const REAL = SP.filter(s => !s.legend && !s.pass), LEGENDS = SP.filter(s => s.legend);
const own = id => state.owned[id] || 0;
const achCols = [['#8ff5e8', '#0f7c86'], ['#d6bdff', '#5b2fc0'], ['#fff1a8', '#d98200']];
function achArt(tier, icon) {
  return (c, t) => {
    const [hi, lo] = achCols[tier];
    if (tier) { c.fillStyle = lo; c.beginPath(); for (let i = 0; i < 36; i++) { const a = i / 36 * TAU, r = i % 2 ? 1 : .9; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.fill(); }
    const g = c.createRadialGradient(-.25, -.3, .05, 0, 0, .85); g.addColorStop(0, hi); g.addColorStop(1, lo);
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, .82, 0, TAU); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = .05; c.beginPath(); c.arc(0, 0, .7, 0, TAU); c.stroke();
    c.save(); icon(c, t, lo); c.restore();
  };
}
const ic = Object.assign({
  sp: (id, k = 1, dx = 0, dy = 0) => c => {
    const sp = BY[id], b = sp.box, bw = b[2] - b[0], bh = b[3] - b[1], s = 1.05 * k / Math.max(bw, bh);
    c.translate(dx - (b[0] + bw / 2) * s, dy - (b[1] + bh / 2) * s); c.scale(s, s); sp.draw(c, 1.3, { puff: 0, open: 0 });
  },
  glass: c => {
    c.strokeStyle = '#fff'; c.lineWidth = .1; c.lineCap = 'round';
    c.beginPath(); c.arc(-.08, -.08, .28, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(.13, .13); c.lineTo(.38, .38); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.arc(-.08, -.08, .23, 0, TAU); c.fill();
  },
  heart: c => { c.fillStyle = '#ff7aa8'; c.beginPath(); c.moveTo(0, .32); c.bezierCurveTo(-.55, -.02, -.3, -.5, 0, -.2); c.bezierCurveTo(.3, -.5, .55, -.02, 0, .32); c.fill(); },
  moon: (c, t, lo) => { ell(c, 0, 0, .36, .36, '#fff3b0'); ell(c, .16, -.1, .3, .3, lo); for (const [x, y] of [[-.35, -.3], [.3, .3], [-.1, .38]]) star(c, x, y, .06); },
  q: c => { c.fillStyle = '#fff'; c.font = '600 0.9px Fredoka, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', 0, .05); },
  crown: c => {
    c.fillStyle = '#fff6cf'; c.strokeStyle = '#9a5a00'; c.lineWidth = .04;
    c.beginPath(); c.moveTo(-.4, .22); c.lineTo(-.44, -.2); c.lineTo(-.2, .02); c.lineTo(0, -.32); c.lineTo(.2, .02); c.lineTo(.44, -.2); c.lineTo(.4, .22); c.closePath(); c.fill(); c.stroke();
    for (const [x, col] of [[-.2, '#ff5d7a'], [0, '#5dd6ff'], [.2, '#7dff9a']]) ell(c, x, .1, .05, .05, col);
  },
  star: c => { c.fillStyle = '#fff'; c.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? .17 : .42; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.fill(); },
}, THEME.icons);
function A(id, name, tier, icon, desc, goal) { return { id: 'a_' + id, name, tier, desc, goal, draw: achArt(tier, icon), box: [-1.02, -1.02, 1.02, 1.02], stickerFill: 1.08 }; }
const ACH = THEME.achievements(ic, A);
const achDone = a => { const [cur, max] = a.goal(); return cur >= max; };
function checkAch(silent) {
  const fresh = [];
  for (const a of ACH) if (!state.ach[a.id] && achDone(a)) { state.ach[a.id] = Date.now(); fresh.push(a); }
  if (!fresh.length) return;
  save();
  if (silent) { setTimeout(() => toast(`You earned ${fresh.length} new sticker${fresh.length > 1 ? 's' : ''}! Look in the Collection.`), 6000); return; }
  const a = fresh[fresh.length - 1];
  showInfo('New sticker: ' + a.name, RARITY[a.tier] ? RARITY[a.tier] + ' sticker' : 'Sticker', a.desc);
  const cx = camX + slot * W + W / 2, cy = H * .4;
  for (let i = 0; i < 60; i++) sparks.push({ x: cx + rand(-3, 3) * u, y: cy, vx: rand(-14, 14) * u, vy: rand(-26, -6) * u, life: rand(1.6, 3) });
  if (fresh.length > 1) toast(`You earned ${fresh.length} new stickers!`);
}
function countDay() {
  const d = new Date(), day = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  if (S.lastDay !== day) { S.lastDay = day; S.days++; }
}
const achProgress = a => { const [cur, max] = a.goal(); return `${fmt(Math.min(cur, max))} / ${fmt(max)}`; };

/* ----- collection book ----- */
let bookTab = 'real', bookSel = null;
function renderBook() {
  bookFx = [];
  if (!bookRAF) bookRAF = requestAnimationFrame(bookLoop);
  if (bookTab === 'ach') { renderStickers(); return; }
  const all = SP.length, found = SP.filter(has).length;
  $('bookCount').textContent = `Found ${found} of ${all}`;
  const grid = $('bookGrid'); grid.innerHTML = '';
  for (const sp of SP.filter(s => bookTab === 'legend' ? s.legend : !s.legend)) {
    const known = has(sp);
    const tile = document.createElement('div'); tile.className = 'tile' + (known ? '' : ' unk') + (bookSel === sp ? ' sel' : '');
    tile.append(known ? stickerEl(sp, 240, 172, tile) : preview(sp, 240, 172, true));
    const bd = known && badge(sp); if (bd) tile.append(bd);
    const label = document.createElement('div'); label.textContent = known ? sp.name : '???'; tile.append(label);
    tile.onclick = () => { bookSel = sp; renderBook(); };
    grid.append(tile);
  }
  const det = $('bookDetail');
  if (!bookSel) { det.classList.add('hidden'); return; }
  det.classList.remove('hidden'); det.innerHTML = '';
  const known = has(bookSel);
  det.append(known ? stickerEl(bookSel, 480, 300) : preview(bookSel, 480, 300, true));
  const box = document.createElement('div');
  if (known) {
    const bd = badge(bookSel);
    box.innerHTML = `${bd ? bd.outerHTML : ''}<h3>${bookSel.name}</h3><div class="zone">${bookSel.legend || bookSel.pass ? bookSel.origin : zoneName(bookSel)}</div><p>${bookSel.fact}</p>`;
    if (bookSel.pass) {
      const b = document.createElement('button'); b.textContent = 'Call it to visit';
      b.onclick = () => {
        if (pass) { toast('Wait for the one visiting now to pass by'); return; }
        startPass(bookSel, false, true); passTimer = rand(150, 240); $('book').classList.add('hidden'); wake();
      };
      box.append(b);
    }
  } else {
    box.innerHTML = unlocked(bookSel)
      ? `<h3>???</h3><div class="zone">Not found yet</div><p>Collect ${fmt(price(bookSel))} ${THEME.text.currency}, then buy it in the Shop.</p>`
      : `<h3>???</h3><div class="zone">Not found yet</div><p>Buy the ${SP[SP.indexOf(bookSel) - 1].name} first to find out what this is.</p>`;
  }
  det.append(box);
}
function renderStickers() {
  const got = ACH.filter(a => state.ach[a.id]).length;
  $('bookCount').textContent = `Stickers ${got} of ${ACH.length}`;
  const grid = $('bookGrid'); grid.innerHTML = '';
  for (const a of ACH) {
    const done = !!state.ach[a.id];
    const tile = document.createElement('div'); tile.className = 'tile' + (done ? '' : ' unk') + (bookSel === a ? ' sel' : '');
    tile.append(done ? stickerEl(a, 240, 172, tile) : preview(a, 240, 172, true));
    const bd = done && badge(a); if (bd) tile.append(bd);
    const label = document.createElement('div'); label.textContent = a.name; tile.append(label);
    if (!done) { const p = document.createElement('small'); p.className = 'prog'; p.textContent = achProgress(a); tile.append(p); }
    tile.onclick = () => { bookSel = a; renderBook(); };
    grid.append(tile);
  }
  const det = $('bookDetail');
  if (!bookSel || !ACH.includes(bookSel)) { det.classList.add('hidden'); return; }
  det.classList.remove('hidden'); det.innerHTML = '';
  const a = bookSel, done = !!state.ach[a.id];
  det.append(done ? stickerEl(a, 480, 300) : preview(a, 480, 300, true));
  const box = document.createElement('div'), bd = badge(a);
  const when = done ? 'Earned ' + new Date(state.ach[a.id]).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Locked · ' + achProgress(a);
  box.innerHTML = `${bd ? bd.outerHTML : ''}<h3>${a.name}</h3><div class="zone">${when}</div><p>${a.desc}</p>`;
  det.append(box);
}
document.querySelectorAll('#bookTabs button').forEach(b => b.onclick = () => {
  bookTab = b.dataset.tab; bookSel = null; document.querySelectorAll('#bookTabs button').forEach(x => x.classList.toggle('on', x === b)); renderBook();
});
$('bookBtn').onclick = () => { const bk = $('book'); bk.classList.toggle('hidden'); if (!bk.classList.contains('hidden')) { $('shop').classList.add('hidden'); renderBook(); } wake(); };
$('bookClose').onclick = () => { $('book').classList.add('hidden'); wake(); };

/* ----- info card & toast (both windows) ----- */
let cardT, toastT;
function showInfo(title, sub, text, releaseId) {
  $('cName').textContent = title; $('cZone').textContent = sub; $('cFact').textContent = text; $('cAct').innerHTML = '';
  if (releaseId) $('cAct').append(confirmBtn(THEME.text.releaseBack, () => {
    if (IS_VIEW) window.opener && window.opener.postMessage({ type: 'release', id: releaseId }, '*');
    else releaseById(releaseId);
    $('card').classList.remove('show');
  }));
  $('card').classList.add('show'); clearTimeout(cardT);
  cardT = setTimeout(() => $('card').classList.remove('show'), 8000);
}
function speciesCard(sp, o) { return [sp.name, sp.legend || sp.pass ? sp.origin : zoneName(sp), sp.fact, o && !sp.pass ? o.id : 0]; }
function showSpecies(sp, o) { showInfo(...speciesCard(sp, o)); }
// Two-tap button so a child can't release a creature by accident.
function confirmBtn(label, fn, cls = 'rel') {
  const b = document.createElement('button'); b.className = cls; b.textContent = label;
  let armed = false, tm;
  b.onclick = e => {
    e.stopPropagation();
    if (!armed) { armed = true; b.textContent = 'Tap again to confirm'; tm = setTimeout(() => { armed = false; b.textContent = label; }, 3000); return; }
    clearTimeout(tm); armed = false; b.textContent = label; fn();
  };
  return b;
}
function toast(s, fromMain) {
  $('toast').textContent = s; $('toast').classList.add('show'); clearTimeout(toastT);
  toastT = setTimeout(() => $('toast').classList.remove('show'), 5000);
  if (!IS_VIEW && !fromMain) post({ type: 'toast', s });
}

/* ----- taps & drags (world coordinates) ----- */
// Returns the card to show, or feeds the fish when the tap lands on open water.
function tapAt(wx, wy, fromView) {
  let card = null;
  for (let i = creatures.length - 1; i >= 0 && !card; i--) {
    const o = creatures[i];
    if (!o.leaving && hitCreature(o, wx, wy)) {
      card = speciesCard(o.sp, o);
      if (!S.tapped.includes(o.sp.id)) S.tapped.push(o.sp.id);
      if (o.sp.onTap) { o.sp.onTap(o); S.puffs++; }
    }
  }
  if (!card) for (const p of decorSpots()) if (inBox(p.d, (wx - p.x) / p.s, (wy - p.y) / p.s)) { card = [p.d.name, 'Decoration', p.d.desc, 0]; break; }
  if (!card && hitPass(wx, wy)) card = pass.tease
    ? ['???', 'Mystery animal', `${THEME.text.teaseCard} Collect ${fmt(price(pass.sp))} ${THEME.text.currency} to meet it.`, 0]
    : speciesCard(pass.sp);
  if (card) { if (fromView) post({ type: 'card', card }); else showInfo(...card); return; }
  if (wy < H * THEME.feedMaxY) S.feeds++;
  if (wy < H * THEME.feedMaxY) for (let i = 0; i < 4 && pellets.length < 60; i++) pellets.push({ x: wx + rand(-2, 2) * u, y: wy + rand(-1, 1) * u, ph: rand(0, 9) });
}
function viewToWorld(x, y) { return [camX + slot * W + x / vs, y / vs]; }
let down = null;
cv.addEventListener('pointerdown', e => {
  if (!IS_VIEW && wantFS !== 'none' && !document.fullscreenElement) goFullscreen();
  down ={ x: e.clientX, y: e.clientY, lx: e.clientX, moved: false }; cv.setPointerCapture(e.pointerId); });
cv.addEventListener('pointermove', e => {
  if (!down) return;
  if (!down.moved && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 10) down.moved = true;
  if (down.moved) {
    const dx = -(e.clientX - down.lx) / vs; down.lx = e.clientX;
    if (IS_VIEW) window.opener && window.opener.postMessage({ type: 'drag', dx }, '*'); else panBy(dx);
  }
});
cv.addEventListener('pointerup', e => {
  if (!down) return;
  const wasTap = !down.moved; down = null;
  if (!wasTap) return;
  const [wx, wy] = viewToWorld(e.clientX, e.clientY);
  if (IS_VIEW) window.opener && window.opener.postMessage({ type: 'tap', wx, wy }, '*'); else tapAt(wx, wy, false);
});
cv.addEventListener('pointercancel', () => { down = null; });

/* ----- idle, fullscreen, keys ----- */
let idleT;
function wake() {
  document.body.classList.remove('idle'); clearTimeout(idleT);
  const panelOpen = ['shop', 'book', 'parentMenu'].some(id => !$(id).classList.contains('hidden'));
  document.body.classList.toggle('panel-open', panelOpen);
  document.body.classList.toggle('book-open', !$('book').classList.contains('hidden'));
  idleT = setTimeout(() => document.body.classList.add('idle'), panelOpen ? 60000 : 5000);
}
['mousemove', 'pointerdown', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, wake, { passive: true }));
let wakeLock = null;
async function keepAwake() { try { if ('wakeLock' in navigator && !wakeLock) { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => wakeLock = null); } } catch (e) {} }
// Fullscreen is switched on and off from the parent menu only. If a child knocks it out by accident,
// the next tap on the tank puts it back. Esc is locked while fullscreen, so leaving needs Esc held down,
// and a long Esc press counts as a grown-up leaving on purpose.
let wantFS = 'none', escDownAt = 0;
addEventListener('keydown', e => { if (e.key === 'Escape' && !e.repeat) escDownAt = performance.now(); });
addEventListener('keyup', e => { if (e.key === 'Escape') escDownAt = 0; });
const heldEsc = () => escDownAt && performance.now() - escDownAt > 800;
function lockEsc() { try { navigator.keyboard.lock(['Escape']).catch(() => {}); } catch (e) {} }
function goFullscreen() {
  const opts = wantFS === 'dual' && screenDetails ? { screen: screenDetails.currentScreen } : undefined;
  return document.documentElement.requestFullscreen(opts).then(lockEsc).catch(() => {});
}
function enterSingle() { wantFS = 'single'; goFullscreen(); keepAwake(); closeParent(); }
function exitAll() { wantFS = 'none'; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); endDual(); closeParent(); }

let holdT, parentT;
function openParent() {
  $('parentMenu').classList.remove('hidden');
  prepareDual();
  $('exitBtn').classList.toggle('hidden', wantFS === 'none' && !document.fullscreenElement);
  clearTimeout(parentT); parentT = setTimeout(closeParent, 15000); wake();
}
function closeParent() { $('parentMenu').classList.add('hidden'); }
function setupGear() {
  const g = $('gear');
  g.addEventListener('pointerdown', e => {
    e.preventDefault(); g.classList.add('holding');
    holdT = setTimeout(() => { g.classList.remove('holding'); openParent(); }, 2000);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => g.addEventListener(ev, () => { clearTimeout(holdT); g.classList.remove('holding'); }));
  g.addEventListener('contextmenu', e => e.preventDefault());
}
addEventListener('pointerdown', keepAwake, { once: true });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') keepAwake(); else save(); });
addEventListener('resize', resize);

/* ================= start ================= */
function startMain() {
  $('fsBtn').onclick = enterSingle;
  $('dualBtn').onclick = startDual;
  $('exitBtn').onclick = exitAll;
  setupGear();
  $('shopBtn').onclick = () => { const sh = $('shop'); sh.classList.toggle('hidden'); if (!sh.classList.contains('hidden')) $('book').classList.add('hidden'); updateHud(); wake(); };
  addEventListener('keydown', e => {
    if ((e.key === 'f' || e.key === 'F') && !document.fullscreenElement) enterSingle();
    if (e.key === 's' || e.key === 'S') $('shopBtn').click();
    if (e.key === 'b' || e.key === 'B') $('bookBtn').click();
    if (e.key === 'ArrowLeft') panBy(-W * .25);
    if (e.key === 'ArrowRight') panBy(W * .25);
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && heldEsc()) exitAll(); });
  addEventListener('message', e => { if (companion && e.source === companion && e.data && e.data.type) onViewMessage(e.data); });
  addEventListener('beforeunload', () => { save(); endDual(); });
  setInterval(save, 5000);

  resize(); populate();
  camX = maxCam() / 2; syncPhase();
  const away = (Date.now() - (state.lastSeen || Date.now())) / 1000;
  if (away > 60) {
    const got = income() * Math.min(away, 12 * 3600) * .5;
    addPearls(got);
    setTimeout(() => toast(THEME.text.away(fmt(got))), 600);
  } else setTimeout(() => toast(THEME.text.welcome), 600);
  passTimer = PASSERS.some(has) ? 30 : 90;
  countDay(); checkAch(true);
  prepareDual();
  wake();
  requestAnimationFrame(frame);
}

// Second screen: draw whatever the main window last sent; keep bubbles and snow moving locally.
let snap = null, viewLast = performance.now();
function applySnap(m) {
  if (m.W !== W || m.H !== H) { setWorld(m.W, m.H); vs = VH / H; }
  T = m.T; camX = m.camX; span = m.span; slot = m.slot; state.decor = m.decor; chest.open = m.chestOpen;
  creatures = m.cr.map(a => ({ sp: SP[a[0]], x: a[1], y: a[2], t: a[3], fs: a[4], face: a[5], puff: a[6], k: a[7], vx: a[8], vy: a[9], id: a[10], leaving: !!a[11], z: a[12], hue: a[13], perched: !!a[14], mvKind: a[15] }));
  pellets = m.pel.map(p => ({ x: p[0], y: p[1] }));
  pass = m.pass ? Object.assign({}, m.pass, { sp: SP[m.pass.i] }) : null;
  texts = m.texts; sparks = m.sparks;
  snap = m;
}
function viewFrame(now) {
  const dt = Math.min(.05, Math.max(0, (now - viewLast) / 1000)); viewLast = now;
  if (!window.opener || window.opener.closed) { window.close(); return; }
  if (snap) { updCosmetics(dt, T); render(T, camX + slot * W, slot === span - 1); }
  requestAnimationFrame(viewFrame);
}
function startView() {
  document.body.classList.add('view');
  $('viewTap').classList.remove('hidden');
  addEventListener('message', e => {
    if (e.source !== window.opener || !e.data) return;
    const m = e.data;
    if (m.type === 'snap') applySnap(m);
    else if (m.type === 'card') showInfo(...m.card);
    else if (m.type === 'toast') toast(m.s, true);
  });
  addEventListener('pointerdown', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().then(() => $('viewTap').classList.add('hidden')).catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) { $('viewTap').classList.add('hidden'); lockEsc(); }
    else if (heldEsc()) window.opener && window.opener.postMessage({ type: 'exit' }, '*');
  });
  resize();
  requestAnimationFrame(viewFrame);
}
if (IS_VIEW) startView(); else startMain();
// Installed as an app on a phone: keep working offline. Only possible when served over http(s).
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
