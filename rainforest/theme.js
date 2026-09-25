"use strict";
/* ================= real animals ================= */
function dMorpho(c, t) {
  const f = .3 + .7 * Math.abs(Math.sin(t * 8));
  c.save(); c.scale(1, f);
  for (const s of [-1, 1]) {
    const g = c.createLinearGradient(0, 0, 0, s);
    g.addColorStop(0, '#9af0ff'); g.addColorStop(.55, '#2a86ff'); g.addColorStop(1, '#10205a');
    c.fillStyle = '#0b1030';
    c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(.25, s * 1.15, 1.15, s * 1.05, .95, s * .2); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(-.2, s * .95, -1, s * .85, -.75, s * .12); c.closePath(); c.fill();
    c.fillStyle = g;
    c.beginPath(); c.moveTo(.02, s * .02); c.bezierCurveTo(.25, s * .98, 1, s * .9, .8, s * .2); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(-.02, s * .02); c.bezierCurveTo(-.2, s * .8, -.85, s * .72, -.62, s * .12); c.closePath(); c.fill();
    ell(c, .6, s * .72, .05, .05, '#fff');
  }
  c.restore();
  ell(c, 0, 0, .55, .09, '#1b1410'); ell(c, .58, 0, .11, .1, '#1b1410');
  c.strokeStyle = '#1b1410'; c.lineWidth = .04; c.lineCap = 'round';
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(.64, s * .04); c.quadraticCurveTo(.9, s * .15, 1, s * .3); c.stroke(); ell(c, 1, s * .3, .04, .04, '#1b1410'); }
}
function dDartFrog(c) {
  const B = '#2b6cff', D = '#0a1a3a';
  limb(c, -.35, .3, .45, .14, 2.6, B);
  ell(c, 0, 0, .78, .5, B);
  for (const [x, y, r] of [[-.35, -.15, .13], [0, -.3, .1], [.1, .05, .12], [-.15, .25, .09], [.35, -.1, .08]]) ell(c, x, y, r, r * .8, D);
  ell(c, .5, -.12, .38, .32, B);
  limb(c, .35, .3, .35, .1, 1.9, B);
  ell(c, .62, -.38, .15, .15, '#0a0a14'); ell(c, .66, -.42, .05, .05, '#fff');
  smile(c, .78, -.05, .1, D);
}
function dTreeFrog(c) {
  const G = '#3ccf4e', O = '#ff8a1c';
  limb(c, -.4, .3, .5, .13, 2.5, G); ell(c, -.75, .55, .12, .08, O);
  ell(c, 0, 0, .78, .48, G);
  c.save(); c.beginPath(); c.ellipse(0, 0, .78, .48, 0, 0, TAU); c.clip();
  ell(c, -.05, .32, .6, .2, '#2f6bd8'); c.fillStyle = '#ffe14a'; for (const x of [-.35, -.1, .15]) c.fillRect(x, .18, .05, .3);
  c.restore();
  ell(c, .5, -.1, .36, .3, G);
  limb(c, .35, .3, .35, .1, 1.9, G); ell(c, .72, .55, .1, .07, O);
  ell(c, .55, -.38, .2, .2, '#e2231a'); ell(c, .58, -.38, .07, .12, '#111'); ell(c, .62, -.45, .05, .05, '#fff');
  smile(c, .78, -.05, .1, '#1b5e20');
}
function dToucan(c, t) {
  const w = Math.sin(t * 10) * .35;
  c.fillStyle = '#15151b'; c.beginPath(); c.moveTo(-.6, .05); c.lineTo(-1.35, .35); c.lineTo(-1.3, .5); c.lineTo(-.55, .3); c.fill();
  limb(c, .28, -.14, .5, .16, Math.PI + .3 + Math.sin(t * 10 - .4) * .35 * .9, '#0a0a0e');
  ell(c, -.1, .08, .75, .48, '#15151b');
  ell(c, -.1, .45, .28, .1, '#e8313a');
  ell(c, .42, -.22, .32, .3, '#15151b');
  ell(c, .4, .02, .26, .26, '#fff1b0');
  const g = c.createLinearGradient(.55, 0, 1.7, 0); g.addColorStop(0, '#ffcf2e'); g.addColorStop(.6, '#ff8a1c'); g.addColorStop(1, '#d63a1c');
  c.fillStyle = g; c.beginPath(); c.moveTo(.58, -.4); c.quadraticCurveTo(1.45, -.5, 1.7, -.12); c.quadraticCurveTo(1.25, -.02, .6, -.1); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = .02; c.beginPath(); c.moveTo(.62, -.25); c.quadraticCurveTo(1.2, -.28, 1.66, -.14); c.stroke();
  ell(c, .45, -.28, .11, .11, '#5ad1ff'); ell(c, .46, -.28, .055, .055, '#111'); ell(c, .48, -.3, .02, .02, '#fff');
  limb(c, .2, -.05, .55, .18, Math.PI + .1 + w * .9, '#26262e');
  c.strokeStyle = '#6b5a3a'; c.lineWidth = .05; c.beginPath(); c.moveTo(0, .5); c.lineTo(0, .66); c.moveTo(.15, .5); c.lineTo(.15, .66); c.stroke();
}
function dChameleon(c, t, o) {
  const h = o && o.hue != null ? o.hue : 110, col = `hsl(${h},65%,45%)`, dark = `hsl(${h},60%,28%)`, light = `hsl(${(h + 40) % 360},75%,62%)`;
  c.lineCap = 'round';
  c.strokeStyle = col; c.lineWidth = .16;
  c.beginPath(); c.moveTo(-.55, .1); c.quadraticCurveTo(-1.1, .1, -1.05, .45); c.arc(-.85, .45, .2, Math.PI, Math.PI * 2.6); c.stroke();
  c.strokeStyle = dark; c.lineWidth = .1;
  for (const x of [-.3, .35]) { c.beginPath(); c.moveTo(x, .2); c.lineTo(x - .08, .5); c.stroke(); }
  c.fillStyle = col; c.beginPath(); c.moveTo(-.65, .15); c.quadraticCurveTo(-.4, -.6, .35, -.35); c.quadraticCurveTo(.7, -.2, .7, .05); c.quadraticCurveTo(.2, .35, -.65, .15); c.fill();
  c.strokeStyle = light; c.lineWidth = .06; c.beginPath(); c.moveTo(-.5, .05); c.quadraticCurveTo(0, .2, .5, .05); c.stroke();
  c.fillStyle = col; c.beginPath(); c.moveTo(.35, -.35); c.lineTo(.55, -.62); c.lineTo(.95, -.05); c.lineTo(.7, .1); c.fill();
  ell(c, .66, -.2, .14, .14, light); ell(c, .7 + Math.sin(t * 1.3) * .03, -.2, .05, .05, '#111');
  smile(c, .82, -.02, .07, dark);
}
function dMacaw(c, t) {
  const w = Math.sin(t * 9) * .5;
  c.fillStyle = '#d21f2b'; c.beginPath(); c.moveTo(-.5, .05); c.lineTo(-1.7, .35); c.lineTo(-1.65, .5); c.lineTo(-.45, .25); c.fill();
  c.fillStyle = '#2a5bd7'; c.beginPath(); c.moveTo(-.6, .1); c.lineTo(-1.45, .45); c.lineTo(-1.4, .52); c.lineTo(-.55, .22); c.fill();
  c.save(); c.translate(.06, -.14); c.rotate(.35 + Math.sin(t * 9 - .4) * .5 * .9);
  ell(c, -.25, 0, .6, .22, '#1c3f99'); ell(c, -.05, 0, .4, .2, '#23803a'); c.restore();
  ell(c, 0, .05, .7, .42, '#e3262f');
  c.save(); c.translate(-.05, -.05); c.rotate(.15 + w * .9);
  ell(c, -.25, 0, .6, .22, '#2a5bd7'); ell(c, -.05, 0, .4, .2, '#34b24a'); ell(c, .1, 0, .25, .17, '#ffd02e'); c.restore();
  ell(c, .5, -.2, .3, .28, '#e3262f');
  ell(c, .6, -.2, .16, .14, '#fbeee6'); ell(c, .6, -.22, .05, .05, '#111');
  c.fillStyle = '#f4efe6'; c.beginPath(); c.moveTo(.72, -.32); c.quadraticCurveTo(1.05, -.3, .98, .02); c.quadraticCurveTo(.9, -.08, .76, -.05); c.fill();
  c.fillStyle = '#2a2a2a'; c.beginPath(); c.moveTo(.76, -.05); c.quadraticCurveTo(.88, .02, .8, .08); c.lineTo(.72, -.02); c.fill();
}
function dSloth(c, t, o) {
  if (!(o && o.perched)) {
  c.strokeStyle = '#6b4a2a'; c.lineWidth = .14; c.lineCap = 'round'; c.beginPath(); c.moveTo(-1.1, -.75); c.lineTo(1.1, -.72); c.stroke();
  ell(c, .8, -.82, .12, .06, '#4f9a3e', -.5); ell(c, -.7, -.84, .1, .05, '#4f9a3e', .4);
  }
  const sw = Math.sin(t * 1.2) * .05;
  c.strokeStyle = '#8a7258'; c.lineWidth = .16;
  for (const [x0, x1] of [[-.45, -.6], [-.2, -.25], [.25, .3], [.5, .6]]) { c.beginPath(); c.moveTo(x0, -.1); c.lineTo(x1 + sw, -.72); c.stroke(); }
  ell(c, sw, 0, .62, .36, '#9b8264'); ell(c, sw, .06, .5, .26, '#a88f70');
  ell(c, .2 + sw, -.05, .12, .08, 'rgba(90,140,70,.35)');
  const hx = .55 + sw, hy = .12;
  ell(c, hx, hy, .28, .26, '#b39a7a'); ell(c, hx + .02, hy + .02, .2, .18, '#efe2c8');
  ell(c, hx - .08, hy, .08, .05, '#4a3624', -.4); ell(c, hx + .12, hy, .08, .05, '#4a3624', .4);
  ell(c, hx - .07, hy, .03, .03, '#111'); ell(c, hx + .11, hy, .03, .03, '#111');
  ell(c, hx + .02, hy + .07, .03, .02, '#3a2a1a'); smile(c, hx + .02, hy + .06, .07, '#3a2a1a');
}
function dMonkey(c, t) {
  const sw = Math.sin(t * 3) * .3;
  c.strokeStyle = '#3a2a20'; c.lineWidth = .07; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-.35, .1); c.bezierCurveTo(-1.1, .2, -1.1, -.7, -.7, -.8); c.arc(-.62, -.72, .1, Math.PI, Math.PI * 2.4); c.stroke();
  c.lineWidth = .09;
  c.beginPath(); c.moveTo(.1, -.15); c.quadraticCurveTo(.4 + sw * .3, -.7, .3 + sw, -1); c.stroke();
  c.beginPath(); c.moveTo(-.05, -.1); c.quadraticCurveTo(-.3, -.5, -.1 - sw * .5, -.95); c.stroke();
  c.beginPath(); c.moveTo(-.2, .25); c.quadraticCurveTo(-.25, .55, -.1, .7); c.moveTo(.15, .25); c.quadraticCurveTo(.25, .55, .35, .7); c.stroke();
  ell(c, 0, .05, .32, .36, '#3a2a20');
  ell(c, .18, -.38, .26, .24, '#3a2a20'); ell(c, .24, -.34, .17, .15, '#d8b08a');
  ell(c, .19, -.38, .035, .035, '#111'); ell(c, .31, -.38, .035, .035, '#111');
  smile(c, .25, -.3, .06, '#5a3a20');
}
function dBoa(c, t, o) {
  // On the move it stretches out and slithers; at rest it drapes over the branch in loops.
  if (o && (o.mvKind === 'walk' || o.mvKind === 'climb')) {
    const pts = [];
    for (let k = 0; k < 18; k++) pts.push([.85 - k * .16, Math.sin(t * 5 - k * .55) * .07 * Math.min(1, k / 3)]);
    for (let k = pts.length - 1; k >= 0; k--) {
      const [x, y] = pts[k], r = .2 - k * .008;
      ell(c, x, y, r * 1.2, r, k % 2 ? '#1fa04a' : '#23b453');
      if (k % 3 === 1) { c.strokeStyle = '#e9fbe0'; c.lineWidth = .025; c.beginPath(); c.moveTo(x - .06, y - r * .2); c.lineTo(x, y - r * .75); c.lineTo(x + .06, y - r * .2); c.stroke(); }
    }
    const y0 = pts[0][1];
    ell(c, 1.02, y0 - .02, .22, .13, '#23b453'); ell(c, 1.18, y0, .1, .08, '#1fa04a');
    ell(c, 1.06, y0 - .08, .045, .045, '#f5e04a'); ell(c, 1.07, y0 - .08, .018, .035, '#111');
    if (Math.sin(t * 3) > .6) { c.strokeStyle = '#e0304a'; c.lineWidth = .02; c.beginPath(); c.moveTo(1.27, y0); c.lineTo(1.42, y0 + .02); c.stroke(); }
    return;
  }
  if (!(o && o.perched)) { c.strokeStyle = '#6b4a2a'; c.lineWidth = .14; c.lineCap = 'round'; c.beginPath(); c.moveTo(-1.1, .2); c.lineTo(1.1, .18); c.stroke(); }
  for (let i = 0; i < 4; i++) {
    const x = -.55 + i * .32;
    ell(c, x, .12, .2, .34, i % 2 ? '#1fa04a' : '#23b453');
    c.strokeStyle = '#e9fbe0'; c.lineWidth = .03; c.beginPath(); c.moveTo(x - .1, .05); c.lineTo(x, -.05); c.lineTo(x + .1, .05); c.stroke();
  }
  const b = Math.sin(t * 1.5) * .03;
  ell(c, .55, -.22 + b, .3, .16, '#23b453'); ell(c, .72, -.18 + b, .13, .1, '#1fa04a');
  ell(c, .62, -.28 + b, .05, .05, '#f5e04a'); ell(c, .63, -.28 + b, .02, .04, '#111');
  if (Math.sin(t * 2) > .7) { c.strokeStyle = '#e0304a'; c.lineWidth = .02; c.beginPath(); c.moveTo(.84, -.17 + b); c.lineTo(.98, -.15 + b); c.stroke(); }
}
function dTapir(c, t) {
  const st = Math.sin(t * 6) * .08;
  c.fillStyle = '#1c1c22';
  for (const [x, s] of [[-.55, 1], [-.35, -1], [.35, -1], [.55, 1]]) c.fillRect(x - .07, .2, .14, .42 + s * st);
  ell(c, 0, 0, .85, .45, '#1c1c22');
  c.save(); c.beginPath(); c.ellipse(0, 0, .85, .45, 0, 0, TAU); c.clip(); ell(c, -.25, -.05, .5, .5, '#f2efe9'); c.restore();
  ell(c, .8, -.12, .3, .25, '#1c1c22');
  c.fillStyle = '#1c1c22'; c.beginPath(); c.moveTo(1, -.18); c.quadraticCurveTo(1.25, -.1, 1.2, .08); c.lineTo(1.05, .02); c.fill();
  ell(c, .72, -.35, .07, .1, '#1c1c22'); ell(c, .72, -.35, .035, .06, '#f2efe9');
  ell(c, .88, -.18, .04, .04, '#fff'); ell(c, .89, -.18, .025, .025, '#111');
}
function dCentipede(c, t) {
  c.lineCap = 'round';
  for (let i = 11; i >= 0; i--) {
    const x = .9 - i * .17, y = Math.sin(t * 6 - i * .7) * .04, lp = Math.sin(t * 14 - i * 1.2) * .07;
    c.strokeStyle = '#f2c230'; c.lineWidth = .035;
    c.beginPath(); c.moveTo(x, y + .05); c.lineTo(x - .05 + lp, y + .26); c.moveTo(x, y + .05); c.lineTo(x + .05 - lp, y + .26); c.stroke();
    ell(c, x, y, .12, .1, i % 2 ? '#8a2a1a' : '#a3321f'); ell(c, x, y - .03, .08, .03, 'rgba(255,200,150,.25)');
  }
  ell(c, 1.02, -.02, .13, .1, '#c2401f');
  c.strokeStyle = '#c2401f'; c.lineWidth = .03;
  c.beginPath(); c.moveTo(1.08, -.08); c.quadraticCurveTo(1.25, -.3, 1.35, -.25); c.moveTo(1.1, -.06); c.quadraticCurveTo(1.3, -.15, 1.4, -.08); c.stroke();
  c.beginPath(); c.moveTo(-.98, 0); c.quadraticCurveTo(-1.2, -.1, -1.3, .05); c.moveTo(-.98, .02); c.quadraticCurveTo(-1.2, .1, -1.3, .18); c.stroke();
  ell(c, 1.06, -.06, .025, .025, '#111');
}
function dTiger(c, t) {
  const st = Math.sin(t * 6) * .1, O = '#e87a1f', K = '#1a1008', Wh = '#fbeee0';
  c.lineCap = 'round';
  c.strokeStyle = O; c.lineWidth = .11; c.beginPath(); c.moveTo(-.85, -.05); c.quadraticCurveTo(-1.3, 0, -1.4, -.35); c.stroke();
  c.strokeStyle = K; c.lineWidth = .04; for (const [x, y] of [[-1.05, -.05], [-1.22, -.1], [-1.35, -.25]]) { c.beginPath(); c.moveTo(x - .05, y - .06); c.lineTo(x + .05, y + .06); c.stroke(); }
  for (const [x, s] of [[-.58, 1], [-.36, -1], [.42, -1], [.62, 1]]) { c.fillStyle = s > 0 ? '#d86a14' : O; c.fillRect(x - .08, .1, .16, .45 + s * st); }
  c.save(); c.beginPath(); c.ellipse(0, 0, .9, .36, 0, 0, TAU); c.fillStyle = O; c.fill(); c.clip();
  ell(c, 0, .22, .7, .16, Wh);
  c.strokeStyle = K; c.lineWidth = .06;
  for (let x = -.75; x < .7; x += .16) { c.beginPath(); c.moveTo(x, -.38); c.quadraticCurveTo(x + .07, -.12, x - .02, .12); c.stroke(); }
  c.restore();
  ell(c, .88, -.2, .32, .28, O);
  ell(c, .76, -.45, .08, .08, O); ell(c, 1.0, -.45, .08, .08, O); ell(c, .76, -.45, .04, .04, Wh); ell(c, 1.0, -.45, .04, .04, Wh);
  ell(c, 1.0, -.08, .17, .12, Wh); ell(c, .78, -.1, .1, .08, Wh);
  c.strokeStyle = K; c.lineWidth = .035;
  for (const dx of [-.07, 0, .07]) { c.beginPath(); c.moveTo(.88 + dx, -.46); c.lineTo(.88 + dx * 1.3, -.34); c.stroke(); }
  ell(c, .82, -.25, .045, .045, '#f2c230'); ell(c, .83, -.25, .02, .035, '#111');
  ell(c, 1.0, -.26, .045, .045, '#f2c230'); ell(c, 1.01, -.26, .02, .035, '#111');
  ell(c, 1.06, -.15, .04, .03, '#e8837a'); smile(c, 1.03, -.09, .05, '#3a1a0a');
}
function dJaguar(c, t) {
  const st = Math.sin(t * 7) * .1, O = '#e8a33a';
  c.strokeStyle = O; c.lineWidth = .1; c.lineCap = 'round'; c.beginPath(); c.moveTo(-.8, -.05); c.quadraticCurveTo(-1.3, 0, -1.35, -.35); c.stroke();
  ell(c, -1.35, -.35, .06, .06, '#1a1208');
  for (const [x, s] of [[-.55, 1], [-.35, -1], [.4, -1], [.6, 1]]) { c.fillStyle = s > 0 ? '#d8922e' : O; c.fillRect(x - .07, .1, .14, .45 + s * st); }
  ell(c, 0, 0, .85, .35, O); ell(c, 0, .12, .6, .18, '#f6e2b8');
  c.strokeStyle = '#2a1a0a'; c.lineWidth = .035;
  for (const [x, y] of [[-.55, -.12], [-.25, -.18], [.05, -.12], [.3, -.18], [-.4, .08], [-.1, .02], [.2, 0]]) { c.beginPath(); c.arc(x, y, .07, 0, TAU * .8); c.stroke(); }
  ell(c, .85, -.2, .3, .27, O);
  ell(c, .75, -.43, .07, .07, O); ell(c, .98, -.43, .07, .07, O);
  ell(c, 1, -.12, .13, .1, '#f6e2b8');
  ell(c, .83, -.25, .045, .045, '#e8e36a'); ell(c, .84, -.25, .02, .035, '#111');
  ell(c, 1, -.26, .045, .045, '#e8e36a'); ell(c, 1.01, -.26, .02, .035, '#111');
  ell(c, 1.05, -.16, .035, .025, '#3a1a0a'); smile(c, 1.02, -.1, .05, '#3a1a0a');
}
function dHarpy(c, t) {
  const f = Math.sin(t * 5);
  const wing = (dx, dy, a, col, tip) => {
    c.save(); c.translate(dx, dy); c.rotate(a);
    ell(c, -.55, 0, .75, .22, col); for (let i = 0; i < 4; i++) ell(c, -1.1 + i * .12, .12, .12, .06, tip, .4);
    c.restore();
  };
  // far wing behind the body, a little out of step with the near one
  wing(.12, -.12, .6 + Math.sin(t * 5 - .35) * .75, '#3a3f47', '#2c2f35');
  c.fillStyle = '#3a3d44'; c.beginPath(); c.moveTo(-.45, .1); c.lineTo(-1.05, .35); c.lineTo(-.95, .5); c.lineTo(-.4, .3); c.fill();
  ell(c, 0, .05, .6, .38, '#5a606a'); ell(c, .1, .15, .4, .25, '#f4f1ea'); ell(c, .2, -.05, .3, .08, '#2a2d33');
  wing(0, -.02, .45 + f * .75, '#4f555e', '#3a3d44');
  c.fillStyle = '#3a3d44';
  c.beginPath(); c.moveTo(.4, -.38); c.lineTo(.2, -.72); c.lineTo(.5, -.45); c.fill();
  c.beginPath(); c.moveTo(.5, -.42); c.lineTo(.42, -.78); c.lineTo(.62, -.45); c.fill();
  ell(c, .55, -.25, .26, .24, '#c9ccd2');
  c.fillStyle = '#2a2a2a'; c.beginPath(); c.moveTo(.75, -.3); c.quadraticCurveTo(.98, -.28, .9, -.08); c.lineTo(.76, -.16); c.fill();
  ell(c, .62, -.3, .05, .05, '#111'); ell(c, .63, -.31, .018, .018, '#fff');
  c.strokeStyle = '#e8c23a'; c.lineWidth = .07; c.beginPath(); c.moveTo(0, .38); c.lineTo(0, .6); c.moveTo(.2, .38); c.lineTo(.22, .6); c.stroke();
  c.strokeStyle = '#111'; c.lineWidth = .03;
  for (const x of [0, .22]) { c.beginPath(); c.moveTo(x, .6); c.quadraticCurveTo(x + .1, .62, x + .12, .7); c.moveTo(x, .6); c.quadraticCurveTo(x - .1, .62, x - .1, .7); c.stroke(); }
}
function dOrangutan(c, t, o) {
  const sw = Math.sin(t * 2) * .2, O = '#c9571f', D = '#8a3712';
  if (!(o && o.perched)) { c.strokeStyle = '#3f7a2f'; c.lineWidth = .05; c.beginPath(); c.moveTo(.45 + sw * .3, -1.45); c.lineTo(.45 + sw * .3, -1.05); c.stroke(); }
  c.strokeStyle = O; c.lineWidth = .2; c.lineCap = 'round';
  c.beginPath(); c.moveTo(.2, -.3); c.quadraticCurveTo(.5, -.8, .45 + sw * .3, -1.2); c.stroke();
  c.beginPath(); c.moveTo(-.25, -.25); c.quadraticCurveTo(-.7, .1, -.6, .55); c.stroke();
  c.lineWidth = .18; c.beginPath(); c.moveTo(-.1, .35); c.lineTo(-.2, .7); c.moveTo(.2, .35); c.lineTo(.3, .7); c.stroke();
  ell(c, 0, .05, .48, .45, O);
  c.strokeStyle = D; c.lineWidth = .03;
  for (let i = 0; i < 7; i++) { const a = -.3 + i * .35; c.beginPath(); c.moveTo(Math.cos(a) * .38, Math.sin(a) * .38 + .05); c.lineTo(Math.cos(a) * .52, Math.sin(a) * .5 + .08); c.stroke(); }
  ell(c, .1, -.42, .28, .26, O); ell(c, .14, -.38, .2, .19, '#e7a77a');
  ell(c, .08, -.43, .035, .035, '#111'); ell(c, .21, -.43, .035, .035, '#111');
  smile(c, .15, -.32, .07, '#6a2a0a');
}
function dMegatherium(c, t) {
  const st = Math.sin(t * 2.5) * .06, B = '#7a5a3c', D = '#5e4430';
  for (const [x, s] of [[-.7, 1], [-.4, -1], [.45, -1], [.75, 1]]) { c.fillStyle = D; c.fillRect(x - .1, .15, .2, .55 + s * st); ell(c, x + .08, .72 + s * st, .14, .05, '#2a1e14'); }
  c.fillStyle = B; c.beginPath(); c.moveTo(-1, 0); c.quadraticCurveTo(-1.5, .2, -1.45, .55); c.quadraticCurveTo(-1.2, .35, -.9, .25); c.fill();
  ell(c, 0, -.05, 1.1, .6, B);
  c.strokeStyle = D; c.lineWidth = .03; for (let i = 0; i < 14; i++) { const x = -.9 + i * .13; c.beginPath(); c.moveTo(x, .3); c.lineTo(x - .04, .52); c.stroke(); }
  ell(c, 1.05, -.25, .33, .26, B); ell(c, 1.3, -.2, .14, .12, '#8a6a4a');
  ell(c, 1.1, -.32, .05, .05, '#111'); ell(c, 1.11, -.33, .02, .02, '#fff');
  smile(c, 1.3, -.15, .06, '#2a1e14');
  c.strokeStyle = '#e8dcc0'; c.lineWidth = .03; for (const dx of [-.05, .03, .11]) { c.beginPath(); c.moveTo(.8 + dx, .72); c.lineTo(.86 + dx, .8); c.stroke(); }
}

/* ================= legends ================= */
function serpentBody(c, t, o) {
  const pts = [];
  for (let k = 0; k < o.n; k++) pts.push([.55 - k * o.seg, Math.sin(t * 2.2 - k * .45) * o.amp * Math.min(1, k / 4)]);
  if (o.spine) {
    c.fillStyle = o.spine;
    for (let k = 1; k < o.n - 2; k += 2) {
      const [x, y] = pts[k], r = o.r * (1 - k / o.n * .75);
      c.beginPath(); c.moveTo(x - r * .6, y - r * .7); c.lineTo(x, y - r * 1.7); c.lineTo(x + r * .6, y - r * .7); c.fill();
    }
  }
  for (let k = o.n - 1; k >= 0; k--) {
    const [x, y] = pts[k], r = o.r * (1 - k / o.n * .75);
    ell(c, x, y, r * 1.1, r, k % 2 ? o.c1 : o.c2);
    if (o.belly) ell(c, x, y + r * .5, r * .8, r * .38, o.belly);
  }
  if (o.sparkle) for (let k = 2; k < o.n; k += 3) ell(c, pts[k][0], pts[k][1] - .05, .03, .03, `rgba(255,250,210,${.3 + .7 * Math.max(0, Math.sin(t * 3 + k))})`);
  return pts;
}
function dKinnaree(c, t) {
  const f = Math.sin(t * 4);
  c.fillStyle = '#fff7e8'; c.beginPath(); c.moveTo(-.6, .1); c.lineTo(-1.2, -.1); c.lineTo(-1.1, .1); c.lineTo(-1.25, .25); c.lineTo(-.55, .3); c.fill();
  c.save(); c.translate(0, -.05); c.rotate(.95 + Math.sin(t * 4 - .4) * .45); ell(c, -.5, 0, .65, .2, '#eadcbc'); ell(c, -.85, 0, .32, .12, '#d9ad45'); c.restore();
  ell(c, -.1, .15, .62, .32, '#fffaf0');
  c.save(); c.translate(-.12, .02); c.rotate(.7 + f * .45); ell(c, -.5, 0, .65, .2, '#fdf1d6'); ell(c, -.85, 0, .32, .12, '#f2c85a'); c.restore();
  c.strokeStyle = '#e8a317'; c.lineWidth = .05; c.beginPath(); c.moveTo(-.2, .45); c.lineTo(-.25, .7); c.moveTo(.05, .45); c.lineTo(.05, .7); c.stroke();
  ell(c, .45, -.15, .2, .28, '#f0c060'); ell(c, .45, -.05, .22, .08, '#d6452f');
  limb(c, .5, -.25, .3, .05, -.9 + f * .2, '#f0c060');
  ell(c, .55, -.55, .18, .18, '#f5cc6e');
  c.fillStyle = '#1a1216'; c.beginPath(); c.arc(.53, -.56, .19, .55 * Math.PI, 1.45 * Math.PI); c.fill();
  c.fillStyle = '#e8a317'; c.beginPath(); c.moveTo(.42, -.68); c.lineTo(.68, -.68); c.lineTo(.55, -1.05); c.fill(); c.fillRect(.41, -.72, .28, .06);
  eye(c, .62, -.56, .05); blush(c, .62, -.47, .045); smile(c, .64, -.5, .045, '#8a3a2a');
}
function dCurupira(c, t) {
  const st = Math.sin(t * 6) * .08;
  c.strokeStyle = '#b8744a'; c.lineWidth = .12; c.lineCap = 'round';
  for (const [x, s] of [[-.1, 1], [.15, -1]]) { c.beginPath(); c.moveTo(x, .35); c.lineTo(x, .72 + s * st); c.stroke(); ell(c, x - .1, .76 + s * st, .14, .06, '#b8744a'); }
  c.fillStyle = '#3f9a3a'; for (let i = 0; i < 5; i++) { const x = -.25 + i * .12; c.beginPath(); c.moveTo(x, .15); c.lineTo(x + .06, .45); c.lineTo(x + .12, .15); c.fill(); }
  limb(c, -.12, -.12, .28, .06, 2.3 + Math.sin(t * 3 + 1) * .3, '#b8744a');
  ell(c, 0, -.05, .28, .3, '#c98456');
  limb(c, .1, -.1, .3, .06, .6 + Math.sin(t * 3) * .3, '#c98456');
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI * (.15 + i * .14), fl = Math.sin(t * 8 + i) * .05;
    c.fillStyle = i % 2 ? '#ff5a1f' : '#ffb02e';
    c.beginPath(); c.moveTo(.05 + Math.cos(a) * .18, -.5 + Math.sin(a) * .18);
    c.quadraticCurveTo(.05 + Math.cos(a) * .48, -.55 + Math.sin(a) * .48 + fl, .05 + Math.cos(a + .25) * .2, -.5 + Math.sin(a + .25) * .2); c.fill();
  }
  ell(c, .05, -.48, .24, .23, '#d99466');
  eye(c, .13, -.5, .06); smile(c, .14, -.4, .06, '#5a2a10'); blush(c, .18, -.42, .04);
}
function dTitanoboa(c, t) {
  const pts = serpentBody(c, t * .6, { n: 30, seg: .2, r: .3, amp: .18, c1: '#566634', c2: '#687a40', belly: '#c9b98a' });
  for (let k = 3; k < 28; k += 3) ell(c, pts[k][0], pts[k][1] - .08, .08, .05, 'rgba(40,50,20,.6)');
  const y0 = pts[0][1];
  ell(c, .85, y0, .4, .27, '#687a40'); ell(c, 1.12, y0 + .05, .2, .15, '#71854a');
  ell(c, .92, y0 - .12, .08, .08, '#f2e27a'); ell(c, .93, y0 - .12, .03, .06, '#111');
  smile(c, 1.1, y0 + .04, .08, '#2a3014');
}
function dBoitata(c, t) {
  for (let i = 0; i < 10; i++) { const x = .4 - i * .38, fl = Math.sin(t * 7 + i) * .1; glow(c, x, Math.sin(t * 2.2 - i * .9) * .2 * Math.min(1, i / 2) - .1 + fl, .45, 'rgba(255,230,140,.8)', 'rgba(255,110,30,.3)'); }
  const pts = serpentBody(c, t, { n: 22, seg: .2, r: .3, amp: .25, c1: '#ff7a1f', c2: '#ffb52e', belly: '#fff1a0', spine: '#ff4a1a' });
  const y0 = pts[0][1];
  ell(c, .82, y0, .36, .26, '#ff9a2a'); ell(c, 1.06, y0 + .05, .2, .15, '#ffb52e');
  glow(c, .9, y0 - .1, .25, 'rgba(210,250,255,1)', 'rgba(80,190,255,.6)'); ell(c, .9, y0 - .1, .05, .05, '#fff');
}
function dMapinguari(c, t) {
  const st = Math.sin(t * 2) * .05, B = '#7a3b22', D = '#5a2a16';
  c.fillStyle = D; for (const [x, s] of [[-.35, 1], [.35, -1]]) c.fillRect(x - .12, .4, .24, .4 + s * st);
  limb(c, -.42, -.02, .38, .12, 2.2 - Math.sin(t * 1.5) * .2, D);
  ell(c, 0, 0, .7, .62, B);
  c.strokeStyle = D; c.lineWidth = .04; for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; c.beginPath(); c.moveTo(Math.cos(a) * .55, Math.sin(a) * .5); c.lineTo(Math.cos(a) * .75, Math.sin(a) * .68); c.stroke(); }
  limb(c, .4, 0, .4, .12, .9 + Math.sin(t * 1.5) * .2, B);
  ell(c, .15, -.2, .3, .3, '#f3efe6'); ell(c, .2, -.2, .16, .16, '#3b7a2a'); ell(c, .22, -.2, .08, .08, '#111'); ell(c, .26, -.25, .04, .04, '#fff');
  smile(c, .2, .12, .14, '#2a1208');
}
function dQuetzal(c, t) {
  const f = Math.sin(t * 3);
  c.save(); c.translate(.3, -.14); c.rotate(.8 + Math.sin(t * 3 - .4) * .6);
  ell(c, -.55, 0, .7, .2, '#1f8a60'); ell(c, -.95, 0, .35, .12, '#d9c45a'); c.restore();
  const pts = serpentBody(c, t, { n: 24, seg: .2, r: .32, amp: .3, c1: '#1f9a6a', c2: '#29b57a', belly: '#f5e27a' });
  for (let k = 4; k < 22; k += 3) ell(c, pts[k][0], pts[k][1] - .1, .1, .04, '#7df0c0');
  const y0 = pts[0][1];
  c.save(); c.translate(.2, y0 - .1); c.rotate(.55 + f * .6);
  ell(c, -.55, 0, .7, .2, '#2fc48a'); ell(c, -.95, 0, .35, .12, '#f5e27a'); c.restore();
  const cols = ['#ff5d7a', '#ffb02e', '#fff27a', '#7dffb2', '#5ad1ff', '#b28dff'];
  for (let i = 0; i < 6; i++) { const a = Math.PI * (.55 + i * .17); ell(c, .8 + Math.cos(a) * .38, y0 + Math.sin(a) * .38, .2, .07, cols[i], a); }
  ell(c, .85, y0, .34, .25, '#29b57a'); ell(c, 1.1, y0 + .05, .18, .13, '#f5c542');
  eye(c, .92, y0 - .1, .08); smile(c, 1.1, y0 + .02, .06, '#12392f');
}
function dGaruda(c, t) {
  const f = Math.sin(t * 3);
  const gwing = (dx, dy, a, far) => {
    c.save(); c.translate(dx, dy); c.rotate(a);
    const g = c.createLinearGradient(0, 0, -1.6, 0);
    g.addColorStop(0, far ? '#a81f16' : '#d62a1f'); g.addColorStop(.6, far ? '#d97a14' : '#ff9a1f'); g.addColorStop(1, far ? '#e0c060' : '#ffe07a');
    c.fillStyle = g; c.beginPath(); c.moveTo(0, -.12); c.quadraticCurveTo(-.9, -.35, -1.7, -.05);
    for (let i = 0; i < 6; i++) c.lineTo(-1.6 + i * .26, .12 + (i % 2) * .08);
    c.lineTo(0, .12); c.fill(); c.restore();
  };
  gwing(.05, -.2, .75 + Math.sin(t * 3 - .4) * .6, true);
  c.fillStyle = '#ff9a1f'; c.beginPath(); c.moveTo(-.45, .2); c.lineTo(-1.1, .55); c.lineTo(-.9, .6); c.lineTo(-1, .75); c.lineTo(-.4, .4); c.fill();
  ell(c, 0, .1, .55, .4, '#d62a1f'); ell(c, .1, .15, .35, .25, '#ffcf5a');
  gwing(-.1, -.05, .5 + f * .6, false);
  ell(c, .55, -.35, .26, .24, '#2f9a4a');
  c.fillStyle = '#e8a317'; c.beginPath(); c.moveTo(.4, -.52); c.lineTo(.7, -.52); c.lineTo(.55, -.95); c.fill(); c.fillRect(.38, -.56, .34, .07);
  c.fillStyle = '#ffcf2e'; c.beginPath(); c.moveTo(.75, -.4); c.quadraticCurveTo(1, -.35, .92, -.18); c.lineTo(.74, -.28); c.fill();
  ell(c, .64, -.4, .06, .06, '#fff'); ell(c, .66, -.4, .03, .03, '#111');
  c.strokeStyle = '#ffcf2e'; c.lineWidth = .06; c.beginPath(); c.moveTo(0, .45); c.lineTo(0, .72); c.moveTo(.2, .45); c.lineTo(.22, .72); c.stroke();
}

/* ================= species ================= */
const SP = [
  { id: 'morpho', name: 'Blue Morpho', zone: [.3, .7], cost: 10, inc: .3, size: 2.2, speed: 6, eats: 1, max: 12, draw: dMorpho, box: [-1.05, -1.15, 1.05, 1.15],
    fact: 'Its wings aren\'t really blue! Tiny scales on them bounce the light around, so they shine bright blue.' },
  { id: 'dartfrog', name: 'Poison Dart Frog', zone: [.86, .88], walk: 1, hop: 1, cost: 60, inc: 1.2, size: 1.8, speed: 3, eats: 0, max: 10, draw: dDartFrog, box: [-1, -.62, .95, .62],
    fact: 'Its bright colors are a warning to other animals: don\'t eat me, I\'m poisonous!' },
  { id: 'treefrog', name: 'Red-eyed Tree Frog', zone: [.5, .72], perch: { anchor: -.55, move: 'jump', step: 'hop', reach: 30, walk: .45, rest: [2, 7], anim: .4 }, cost: 250, inc: 4, size: 2.2, speed: 2, eats: 0, max: 10, draw: dTreeFrog, box: [-1, -.62, .95, .66],
    fact: 'It sleeps all day with its eyes shut. If something scares it, it pops open its big red eyes, which may surprise the hunter.' },
  { id: 'toucan', name: 'Toucan', zone: [.2, .46], perch: { anchor: -.66, move: 'fly', reach: 70, walk: .15, rest: [3, 10], anim: .12, fly: 1 }, cost: 900, inc: 12, size: 3, speed: 6, eats: 1, max: 8, draw: dToucan, box: [-1.4, -.6, 1.72, .7],
    fact: 'Its huge beak is surprisingly light because it is mostly hollow inside. It also helps the toucan stay cool.' },
  { id: 'chameleon', onTap: o => { o.hue = ((o.hue ?? 110) + 70) % 360; }, name: 'Chameleon', zone: [.5, .72], perch: { anchor: -.5, move: 'climb', walk: .75, rest: [3, 9], anim: .5 }, cost: 2000, inc: 22, size: 2.8, speed: 1.2, eats: 0, max: 8, draw: dChameleon, box: [-1.3, -.7, 1, .7],
    fact: 'Each eye can look a different way at the same time, and it can change color. Try tapping it!' },
  { id: 'centipede', name: 'Giant Centipede', zone: [.86, .88], walk: 1, cost: 2500, inc: 28, size: 3.8, speed: 2.5, eats: 0, max: 8, draw: dCentipede, box: [-1.35, -.32, 1.42, .3],
    fact: 'The Amazonian giant centipede can grow as long as a school ruler. Some hang from cave ceilings to catch bats!' },
  { id: 'macaw', name: 'Scarlet Macaw', zone: [.2, .4], perch: { anchor: -.48, move: 'fly', reach: 90, walk: .1, rest: [2, 8], anim: .12, fly: 1 }, cost: 3000, inc: 35, size: 3.4, speed: 8, eats: 1, max: 8, draw: dMacaw, box: [-1.75, -.55, 1.05, .6],
    fact: 'Flocks of macaws gather on riverbanks to lick clay. Scientists think the clay gives them salt they need.' },
  { id: 'sloth', name: 'Three-toed Sloth', zone: [.2, .46], perch: { anchor: .72, move: 'climb', walk: .8, rest: [10, 30], anim: .5 }, cost: 6000, inc: 60, size: 3.6, speed: .6, eats: 0, max: 6, draw: dSloth, box: [-1.15, -.9, 1.15, .5],
    fact: 'It moves so slowly that tiny green algae grow in its fur, helping it hide. It climbs down only about once a week, to poop!' },
  { id: 'monkey', name: 'Spider Monkey', zone: [.2, .46], perch: { anchor: 1, move: 'swing', step: 'swing', reach: 38, walk: .25, rest: [1.5, 5], anim: .6 }, cost: 10000, inc: 100, size: 3.4, speed: 6, eats: 1, max: 8, draw: dMonkey, box: [-1.1, -1.05, .55, .75],
    fact: 'Its long tail works like a fifth hand for holding on to branches.' },
  { id: 'boa', name: 'Emerald Tree Boa', zone: [.5, .72], perch: { anchor: -.2, move: 'climb', walk: .6, rest: [6, 15], anim: .6 }, cost: 30000, inc: 260, size: 3.4, speed: 1, eats: 0, max: 6, draw: dBoa, box: [-1.15, -.45, 1.15, .5],
    fact: 'It drapes itself over a branch in neat loops and rests its head on top, waiting quietly for dinner.' },
  { id: 'tapir', name: 'Tapir', zone: [.86, .88], walk: 1, cost: 60000, inc: 420, size: 4.2, speed: 2.5, eats: 1, max: 4, draw: dTapir, box: [-.9, -.5, 1.25, .65],
    fact: 'Its short trunk is its nose and upper lip joined together. Baby tapirs are covered in stripes and spots like a watermelon.' },
  { id: 'jaguar', name: 'Jaguar', zone: [.86, .88], walk: 1, cost: 90000, inc: 650, size: 4.4, speed: 4, eats: 0, max: 4, draw: dJaguar, box: [-1.45, -.55, 1.2, .6],
    fact: 'The biggest cat in the Americas. Unlike most cats, it loves to swim.' },
  { id: 'tiger', name: 'Sumatran Tiger', zone: [.86, .88], walk: 1, cost: 150000, inc: 1000, size: 4.6, speed: 3.5, eats: 0, max: 3, draw: dTiger, box: [-1.45, -.55, 1.25, .6],
    fact: 'The smallest tiger in the world, found only in the rainforests of Sumatra in Indonesia. Its stripes are closer together than other tigers\', and very few are left in the wild.' },
  { id: 'harpy', name: 'Harpy Eagle', zone: [.04, .18], cost: 250000, inc: 1600, size: 4.2, speed: 7, eats: 0, max: 4, draw: dHarpy, box: [-1.4, -1.1, 1, .72],
    fact: 'One of the most powerful eagles in the world. Its claws can be as long as a bear\'s.' },
  { id: 'orangutan', name: 'Orangutan', zone: [.2, .46], perch: { anchor: 1.22, move: 'swing', step: 'swing', reach: 30, walk: .3, rest: [4, 12], anim: .4 }, cost: 500000, inc: 3000, size: 4, speed: 2, eats: 1, max: 4, draw: dOrangutan, box: [-.85, -1.45, .8, .8],
    fact: 'Almost every night it builds a brand new leafy nest high in the trees to sleep in.' },
  { id: 'megatherium', name: 'Giant Ground Sloth', zone: [.8, .85], cost: 1500000, inc: 7000, size: 18, max: 1, draw: dMegatherium, box: [-1.55, -.7, 1.5, .82],
    pass: { ground: 1, secs: 60, msg: 'A giant ground sloth is lumbering by!' }, origin: 'A real animal, now extinct',
    fact: 'Megatherium was a real ground sloth as big as an elephant. It lived in South America until more than 10,000 years ago.' },

  { id: 'kinnaree', legend: 1, name: 'Kinnaree', zone: [.2, .45], cost: 1e7, inc: 1e4, size: 4.5, speed: 4, eats: 1, max: 1, draw: dKinnaree, box: [-1.3, -1.1, .8, .75],
    origin: 'Thai legend · the Himmapan Forest',
    fact: 'Half woman and half swan, the Kinnaree lives in the magical Himmapan Forest of Thai legend and is famous for her graceful dancing.' },
  { id: 'curupira', legend: 1, name: 'Curupira', zone: [.86, .88], walk: 1, cost: 4e7, inc: 3e4, size: 3.2, speed: 5, max: 1, draw: dCurupira, box: [-.45, -1, .6, .85],
    origin: 'Brazilian legend',
    fact: 'A guardian of the forest with bright red hair and feet that point backwards, so hunters who follow his footprints get lost.' },
  { id: 'titanoboa', legend: 1, name: 'Titanoboa', cost: 1.5e8, inc: 8e4, size: 7, max: 1, draw: dTitanoboa, box: [-5.5, -.7, 1.35, .6],
    pass: { ground: 1, secs: 50, msg: 'Titanoboa is slithering through the forest!' }, origin: 'A real animal, now extinct',
    fact: 'A real giant snake that lived about 60 million years ago in what is now Colombia. It was longer than a school bus.' },
  { id: 'boitata', legend: 1, name: 'Boitatá', zone: [.5, .72], cost: 5e8, inc: 2e5, size: 4.2, speed: 4, max: 1, draw: dBoitata, box: [-3.9, -.9, 1.3, .7],
    origin: 'Brazilian legend',
    fact: 'A glowing serpent made of fire that protects the forest from anyone who would burn it.' },
  { id: 'mapinguari', legend: 1, name: 'Mapinguari', zone: [.86, .88], walk: 1, cost: 1.5e9, inc: 5e5, size: 6, speed: 2, max: 1, draw: dMapinguari, box: [-.8, -.75, .9, .85],
    origin: 'Amazon legend',
    fact: 'A huge, shaggy giant from Amazon stories. Some people think the stories came from long-ago memories of giant ground sloths.' },
  { id: 'quetzal', legend: 1, name: 'Quetzalcoatl', cost: 5e9, inc: 1.2e6, size: 12, max: 1, draw: dQuetzal, box: [-4.3, -1.3, 1.35, .9],
    pass: { y: .16, secs: 45, msg: 'The Feathered Serpent is flying overhead!' }, origin: 'Aztec and Maya legend',
    fact: 'The Feathered Serpent from ancient Aztec and Maya legends, said to bring wind and knowledge.' },
  { id: 'garuda', legend: 1, name: 'Garuda', cost: 2e10, inc: 3e6, size: 18, max: 1, draw: dGaruda, box: [-1.9, -1.85, 1.05, .8],
    pass: { y: .22, secs: 70, msg: 'Garuda is flying by... feel the wind!', shake: 1 }, origin: 'Thai, Hindu and Buddhist legend',
    fact: 'The mighty king of birds from Hindu and Buddhist legends. In Thailand, Garuda is the emblem of the King.' },
];
const BY = Object.fromEntries(SP.map(s => [s.id, s]));

/* ================= decorations (unit space, base at 0,0 on the ground) ================= */
function ddOrchids(c, t) {
  c.lineCap = 'round';
  ell(c, -.2, -.05, .35, .08, '#3f8f3a', -.2); ell(c, .2, -.05, .35, .08, '#3f8f3a', .2);
  for (let i = 0; i < 4; i++) {
    const x0 = (i - 1.5) * .3, h = .7 + ((i * 37) % 4) / 10, sw = Math.sin(t * .8 + i) * .04;
    c.strokeStyle = '#2f7a2f'; c.lineWidth = .05; c.beginPath(); c.moveTo(x0, 0); c.quadraticCurveTo(x0 + sw, -h * .6, x0 + sw * 2 + .12, -h); c.stroke();
    const fx = x0 + sw * 2 + .12, fy = -h, col = ['#ff7ac6', '#c98bff', '#fff2f8', '#ff9f6b'][i];
    for (let k = 0; k < 5; k++) { const a = k / 5 * TAU + t * .1; ell(c, fx + Math.cos(a) * .08, fy + Math.sin(a) * .08, .08, .05, col, a); }
    ell(c, fx, fy, .04, .04, '#ffd84a');
  }
}
function ddFruitTree(c, t, o) {
  const open = o ? o.open : 0, sh = Math.sin(t * 30) * .04 * open;
  c.fillStyle = '#6b4a2a'; c.fillRect(-.08, -.9, .16, .9);
  ell(c, sh, -1.2, .62, .45, '#2f8a3a'); ell(c, -.3 + sh, -1.05, .35, .3, '#3aa046'); ell(c, .3 + sh, -1.1, .38, .3, '#2a7a32');
  for (const [x, y] of [[-.3, -1.2], [.1, -1.35], [.35, -1.05], [-.05, -1], [.25, -1.3]]) {
    if (open > 0) glow(c, x + sh, y, .2, 'rgba(255,200,230,.9)', 'rgba(255,90,150,.3)');
    ell(c, x + sh, y, .07, .07, '#d8266a'); ell(c, x + sh - .02, y - .02, .02, .02, '#ffc0d8');
  }
}
function ddWaterfall(c, t) {
  c.fillStyle = '#3a3f3a';
  c.beginPath(); c.moveTo(-1, 0); c.lineTo(-.9, -1.8); c.lineTo(-.3, -2); c.lineTo(-.25, 0); c.fill();
  c.beginPath(); c.moveTo(.25, 0); c.lineTo(.3, -2); c.lineTo(.95, -1.7); c.lineTo(1.05, 0); c.fill();
  const g = c.createLinearGradient(0, -2, 0, 0); g.addColorStop(0, 'rgba(210,245,255,.9)'); g.addColorStop(1, 'rgba(150,210,240,.7)');
  c.fillStyle = g; c.fillRect(-.3, -1.95, .6, 1.95);
  c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = .03;
  for (let i = 0; i < 6; i++) { const x = -.25 + i * .1, off = ((t * 1.5 + i * .37) % 1) * 1.8; c.beginPath(); c.moveTo(x, -1.95 + off); c.lineTo(x, -1.7 + off); c.stroke(); }
  for (let i = 0; i < 6; i++) { const a = (t * .8 + i / 6) % 1; ell(c, (i - 2.5) * .15, -.05 - a * .3, .1 + a * .15, .07 + a * .1, `rgba(235,250,255,${.5 * (1 - a)})`); }
  ell(c, -.6, -1.8, .35, .12, '#3f8f3a'); ell(c, .6, -1.75, .35, .12, '#3f8f3a');
}
function ddBridge(c, t) {
  c.fillStyle = '#6b4a2a'; c.fillRect(-1.25, -2.4, .12, 2.4); c.fillRect(1.13, -2.4, .12, 2.4);
  const sag = .25 + Math.sin(t * .8) * .03;
  c.strokeStyle = '#c9a36a'; c.lineWidth = .03;
  for (const y0 of [-2.35, -2]) { c.beginPath(); c.moveTo(-1.2, y0); c.quadraticCurveTo(0, y0 + sag * 2, 1.2, y0); c.stroke(); }
  for (let i = 0; i < 12; i++) {
    const f = (i + .5) / 12, x = -1.2 + f * 2.4, yb = -2 + 4 * sag * f * (1 - f), yt = -2.35 + 4 * sag * f * (1 - f);
    c.beginPath(); c.moveTo(x, yt); c.lineTo(x, yb); c.stroke();
    c.fillStyle = '#8a6238'; c.fillRect(x - .08, yb, .16, .05);
  }
  ell(c, -1.19, -2.4, .12, .05, '#3f8f3a'); ell(c, 1.19, -2.4, .12, .05, '#3f8f3a');
}
function ddTemple(c, t) {
  glow(c, 0, -1.2, 1.6, 'rgba(255,230,150,.25)', 'rgba(200,170,90,.08)');
  const cols = ['#7a7a62', '#858569', '#8f8f72', '#9a9a7a'];
  for (let i = 0; i < 4; i++) {
    const w = 2.2 - i * .45, y = -(i + 1) * .42;
    c.fillStyle = cols[i]; c.fillRect(-w / 2, y, w, .42); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(-w / 2, y + .36, w, .06);
  }
  c.fillStyle = '#6a6a54'; c.beginPath(); c.moveTo(-.2, 0); c.lineTo(-.12, -1.68); c.lineTo(.12, -1.68); c.lineTo(.2, 0); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = .015; for (let i = 1; i < 14; i++) { const y = -i * .12; c.beginPath(); c.moveTo(-.19, y); c.lineTo(.19, y); c.stroke(); }
  c.fillStyle = '#a5a585'; c.fillRect(-.35, -2.1, .7, .42);
  glow(c, 0, -1.85, .3, 'rgba(255,240,160,1)', 'rgba(255,200,80,.4)'); c.fillStyle = '#2a2a1a'; c.fillRect(-.1, -1.98, .2, .3);
  c.strokeStyle = '#3f8f3a'; c.lineWidth = .035;
  for (const [x, y] of [[-.9, -.84], [-.5, -1.26], [.6, -1.26], [.85, -.84]]) { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + .05, y / 2, x - .03, -.1); c.stroke(); }
}
const DECOR = [
  { id: 'orchids', name: 'Wild Orchids', cost: 5000, bonus: .05, xs: [.07, .4, .77], size: 6, draw: ddOrchids, box: [-.8, -1.25, .8, .1],
    desc: 'Many rainforest orchids grow high up on tree branches instead of in the ground.' },
  { id: 'chest', name: 'Fruit Tree', cost: 50000, bonus: 0, xs: [.53], size: 5, draw: ddFruitTree, box: [-.75, -1.7, .75, .1],
    desc: 'Shakes every now and then and drops a shower of berries.' },
  { id: 'waterfall', name: 'Waterfall', cost: 5e5, bonus: .10, xs: [.24], size: 9, draw: ddWaterfall, box: [-1.1, -2.1, 1.1, .1],
    desc: 'Rainforests get so much rain that rivers and waterfalls are everywhere.' },
  { id: 'bridge', name: 'Rope Bridge', cost: 5e6, bonus: .15, xs: [.9], size: 7, draw: ddBridge, box: [-1.35, -2.5, 1.35, .1],
    desc: 'Scientists walk on rope bridges high in the trees to study animals that never come down to the ground.' },
  { id: 'temple', name: 'Lost Temple', cost: 1e8, bonus: .25, xs: [.66], size: 9, draw: ddTemple, box: [-1.2, -2.2, 1.2, .1],
    desc: 'The ancient Maya built great cities in the rainforest. Many were hidden by trees for hundreds of years.' },
];


/* ================= scenery ================= */
// Same seed in both windows, so the ground and plants line up across the screen edge.
function buildScene() {
  const r = mulberry32(20260925), sr = (a, b) => a + r() * (b - a);
  const n = 18 * WORLD_SCREENS;
  seabed = [];
  for (let i = 0; i <= n; i++) seabed.push({ x: WW * i / n, y: H * SEABED + Math.sin(i * 1.1) * u * 1.2 + sr(-1, 1) * u * .8 });
  rocks = [];
  for (let i = 0; i < 12 * WORLD_SCREENS; i++) { const x = sr(0, WW); rocks.push({ x, y: seabedY(x) + u * .6, rx: sr(1.5, 4) * u, ry: sr(.5, 1.2) * u, rot: sr(-.4, .4), col: ['#4a3520', '#5a3f22', '#2f4a22', '#6a4a24'][Math.floor(sr(0, 4))] }); }
  plants = [];
  for (let i = 0; i < 8 * WORLD_SCREENS; i++) plants.push({ kind: 'fern', x: sr(0, WW), h: sr(5, 10) * u, ph: sr(0, 9), n: Math.floor(sr(4, 7)) });
  for (let i = 0; i < 5 * WORLD_SCREENS; i++) plants.push({ kind: 'vine', x: sr(0, WW), len: sr(.25, .6) * H, ph: sr(0, 9) });
  for (let i = 0; i < 6 * WORLD_SCREENS; i++) plants.push({ kind: 'flower', x: sr(0, WW), h: sr(1.5, 3.5) * u, ph: sr(0, 9), col: ['#ff5a8a', '#ffb02e', '#ff7ad9', '#fff27a'][Math.floor(sr(0, 4))] });
  rays = [];
  for (let i = 0; i < 6 * WORLD_SCREENS; i++) rays.push({ x: sr(0, WW), w: sr(3, 9) * u, ph: sr(0, 9) });
  vents = [];
  trees = []; branches = [];
  const nt = 4 * WORLD_SCREENS;
  for (let i = 0; i < nt; i++) {
    const x = WW * (i + .5) / nt + sr(-.3, .3) * WW / nt, tw = u * sr(1.8, 2.6);
    trees.push({ x, tw });
    let side = sr(0, 1) < .5 ? -1 : 1;
    for (let k = 0; k < 6; k++) {
      const y0 = H * (.24 + k * .09 + sr(-.02, .02)), len = u * sr(11, 22), ang = sr(.08, .22);
      const x0 = x + side * tw * .4, x1 = x0 + side * len, y1 = y0 - len * ang;
      branches.push({ x0, y0, x1, y1, tree: i, side, len: Math.hypot(x1 - x0, y1 - y0) });
      side = -side;
    }
  }
  snow = [];
  for (let i = 0; i < 120 * WORLD_SCREENS; i++) snow.push({ x: rand(0, WW), y: rand(0, H * .9), r: rand(.5, 1.4), v: rand(1, 4) });
  bubbles = [];
  for (let i = 0; i < 40 * WORLD_SCREENS; i++) bubbles.push({ x: rand(0, WW), y: H * rand(.7, .88), ph: rand(0, TAU), sp: rand(.5, 1.5) });
  buildAtmosphere();
}
function zoneName(sp) {
  const m = (sp.zone[0] + sp.zone[1]) / 2;
  return m < .2 ? 'Emergent layer · the very top' : m < .5 ? 'Canopy · the leafy roof' : m < .75 ? 'Understory · shady and quiet' : 'Forest floor · dark and damp';
}

/* ================= environment ================= */
// Rain comes and goes on a shared clock, so both screens rain at the same time.
const rainAmt = t => clamp((Math.sin(t * TAU / 600) - .75) * 4, 0, 1);
function drawWater(viewX) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#d4f0c4'); g.addColorStop(.12, '#96d28c'); g.addColorStop(.35, '#529c5c');
  g.addColorStop(.62, '#2b6b3f'); g.addColorStop(.85, '#173f26'); g.addColorStop(1, '#0c2416');
  ctx.fillStyle = g; ctx.fillRect(viewX - u * 5, -u * 5, VW / vs + u * 10, H + u * 10);
  ctx.setLineDash([u, u * 1.5]); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1;
  for (const y of [.2, .5, .75]) { ctx.beginPath(); ctx.moveTo(viewX, H * y); ctx.lineTo(viewX + VW / vs, H * y); ctx.stroke(); }
  ctx.setLineDash([]);
}
function drawSeabed() {
  const sg = ctx.createLinearGradient(0, H * SEABED - u * 3, 0, H);
  sg.addColorStop(0, '#3d2e1d'); sg.addColorStop(1, '#140e08');
  ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(0, H + u * 5); ctx.lineTo(seabed[0].x, seabed[0].y);
  for (let i = 1; i < seabed.length; i++) {
    const a = seabed[i - 1], c = seabed[i];
    ctx.quadraticCurveTo(a.x, a.y, (a.x + c.x) / 2, (a.y + c.y) / 2);
  }
  ctx.lineTo(WW, seabed[seabed.length - 1].y); ctx.lineTo(WW, H + u * 5); ctx.fill();
  for (const r of rocks) ell(ctx, r.x, r.y, r.rx, r.ry, r.col, r.rot);
}
// Warm sunbeams slanting down through gaps in the canopy; they fade while it rains.
function drawRays(t) {
  const dim = 1 - rainAmt(t) * .8;
  ctx.globalCompositeOperation = 'lighter';
  for (const r of rays) {
    const sw = Math.sin(t * .15 + r.ph) * W * .02, a = (.06 + .04 * Math.sin(t * .4 + r.ph)) * dim;
    const g = ctx.createLinearGradient(0, 0, 0, H * .85);
    g.addColorStop(0, `rgba(255,246,205,${a})`); g.addColorStop(1, 'rgba(255,246,205,0)');
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(r.x + sw - r.w / 2, 0); ctx.lineTo(r.x + sw + r.w / 2, 0);
    ctx.lineTo(r.x + sw + r.w * 3, H * .85); ctx.lineTo(r.x + sw + r.w * 1.2, H * .85); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
}
function qpt(p0, p1, p2, f) { return (1 - f) * (1 - f) * p0 + 2 * (1 - f) * f * p1 + f * f * p2; }
function drawPlants(t) {
  for (const p of plants) {
    if (p.kind === 'fern') {
      const by = seabedY(p.x) + u * .3;
      for (let i = 0; i < p.n; i++) {
        const a = -Math.PI / 2 + (i - (p.n - 1) / 2) * .38 + Math.sin(t * .7 + p.ph + i) * .05, L = p.h * (.75 + .25 * Math.cos(i));
        const ex = p.x + Math.cos(a) * L, ey = by + Math.sin(a) * L;
        const cx = p.x + Math.cos(a) * L * .5 + Math.cos(a + 1.57) * L * .18, cy = by + Math.sin(a) * L * .5 + Math.sin(a + 1.57) * L * .18;
        ctx.strokeStyle = '#2f7a34'; ctx.lineWidth = u * .22; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(p.x, by); ctx.quadraticCurveTo(cx, cy, ex, ey); ctx.stroke();
        for (let k = 1; k < 7; k++) {
          const f = k / 7, qx = qpt(p.x, cx, ex, f), qy = qpt(by, cy, ey, f), s = u * (1.1 * (1 - f) + .3);
          ell(ctx, qx, qy, s, s * .32, '#3f9a3f', a + 1.1); ell(ctx, qx, qy, s, s * .32, '#48a846', a - 1.1);
        }
      }
    } else if (p.kind === 'vine') {
      const sw = Math.sin(t * .5 + p.ph) * u * 1.5, x2 = p.x + sw * .5;
      ctx.strokeStyle = '#2f5a24'; ctx.lineWidth = u * .28; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(p.x, -u); ctx.quadraticCurveTo(p.x + sw, p.len * .5, x2, p.len); ctx.stroke();
      for (let k = 1; k <= 9; k++) {
        const f = k / 9, x = qpt(p.x, p.x + sw, x2, f), y = qpt(-u, p.len * .5, p.len, f), side = k % 2 ? 1 : -1;
        ell(ctx, x + side * u * .9, y, u * 1.1, u * .45, k % 3 ? '#3f8a34' : '#4f9a3e', side * .6);
      }
    } else {
      const by = seabedY(p.x) + u * .3, sw = Math.sin(t * .9 + p.ph) * u * .3;
      ctx.strokeStyle = '#2f7a34'; ctx.lineWidth = u * .18;
      ctx.beginPath(); ctx.moveTo(p.x, by); ctx.lineTo(p.x + sw, by - p.h); ctx.stroke();
      for (let k = 0; k < 5; k++) { const a = k / 5 * TAU + p.ph; ell(ctx, p.x + sw + Math.cos(a) * u * .55, by - p.h + Math.sin(a) * u * .55, u * .5, u * .3, p.col, a); }
      ell(ctx, p.x + sw, by - p.h, u * .25, u * .25, '#ffe27a');
    }
  }
}
// The climbing trees in front: trunks from the floor up into the canopy, branches with leaves.
function drawTrees(t, x0, x1) {
  for (const tr of trees) {
    if (tr.x < x0 - W * .3 || tr.x > x1 + W * .3) continue;
    const g = ctx.createLinearGradient(tr.x - tr.tw / 2, 0, tr.x + tr.tw / 2, 0);
    g.addColorStop(0, '#3e2a18'); g.addColorStop(.5, '#6a4a2c'); g.addColorStop(1, '#3a2716');
    ctx.fillStyle = g; ctx.fillRect(tr.x - tr.tw / 2, 0, tr.tw, H * SEABED + u * 2);
    for (let k = 0; k < 5; k++) ell(ctx, tr.x + (k % 2 ? .2 : -.25) * tr.tw, H * (.15 + k * .16), tr.tw * .32, u * 1.2, 'rgba(90,150,70,.5)');
  }
  ctx.lineCap = 'round';
  for (const b of branches) {
    if (Math.max(b.x0, b.x1) < x0 - 30 || Math.min(b.x0, b.x1) > x1 + 30) continue;
    ctx.strokeStyle = '#5a3e26'; ctx.lineWidth = u * 1.1; ctx.beginPath(); ctx.moveTo(b.x0, b.y0); ctx.lineTo(b.x1, b.y1); ctx.stroke();
    ctx.strokeStyle = '#72512f'; ctx.lineWidth = u * .35; ctx.beginPath(); ctx.moveTo(b.x0, b.y0 - u * .25); ctx.lineTo(b.x1, b.y1 - u * .25); ctx.stroke();
    for (let k = 0; k < 5; k++) {
      const f = .5 + k * .12, x = b.x0 + (b.x1 - b.x0) * f, y = b.y0 + (b.y1 - b.y0) * f, sw = Math.sin(t * .8 + k + b.x0) * .1;
      ell(ctx, x, y - u * .9, u * 1.6, u * .6, k % 2 ? '#3f8a34' : '#4f9a3e', -.5 * b.side + sw);
      ell(ctx, x + b.side * u * .4, y + u * .7, u * 1.4, u * .5, '#357a2c', .5 * b.side + sw);
    }
  }
}
function drawLabels() {
  ctx.font = `${Math.max(12, u * 1.5)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(255,255,255,.4)';
  const x = VW / vs - u * 2;
  ctx.fillText('Emergent layer', x, H * .0 + u * 7);
  ctx.fillText('Canopy', x, H * .2 + u * 3);
  ctx.fillText('Understory', x, H * .5 + u * 3);
  ctx.fillText('Forest floor', x, H * .75 + u * 3);
}

/* ================= shared cosmetic updates (both windows run these on their own) ================= */
// snow = pollen drifting in the light, bubbles = fireflies over the forest floor.
function updCosmetics(dt, t) {
  updNear(dt);
  for (const s of snow) { s.y += s.v * dt; s.x += Math.sin(t * .4 + s.v) * 4 * dt; if (s.y > H * .9) { s.y = -2; s.x = rand(0, WW); } }
  for (const f of bubbles) { f.x += Math.cos(t * f.sp + f.ph) * u * 1.2 * dt; f.y += Math.sin(t * f.sp * 1.3 + f.ph) * u * .8 * dt; f.y = clamp(f.y, H * .66, H * .89); }
}

/* ================= drawing one window's slice of the world ================= */
/* ================= atmosphere =================
   Depth comes from parallax: far tree layers slide slower than the forest as the camera pans, the
   big foreground leaves slide faster. A layer with factor f is drawn at world x = layerX + viewX * (1 - f). */
let far = null, mid = null, fore = null, near = [], dotSprite = null;
function makeTrees(r, f, count, hMin, hMax, crown, trunk) {
  const span = WW * f + W * 1.4, trees = [];
  for (let i = 0; i < count; i++) {
    const x = -W * .2 + r() * span, h = (hMin + r() * (hMax - hMin)) * H, cr = (.05 + r() * .07) * W, blobs = [];
    for (let k = 0; k < 5; k++) blobs.push([(r() - .5) * cr * 1.5, (r() - .5) * cr * .6, cr * (.45 + r() * .35)]);
    trees.push({ x, h, cr, blobs, tw: cr * .14 });
  }
  return { f, trees, crown, trunk };
}
function buildAtmosphere() {
  const r = mulberry32(4243);
  far = makeTrees(r, .35, 12 * WORLD_SCREENS, .55, .98, 'rgba(160,205,165,.5)', 'rgba(140,180,145,.45)');
  far.flock = { y: H * .09, n: 14, seed: 11 };
  mid = makeTrees(r, .65, 7 * WORLD_SCREENS, .5, .9, 'rgba(38,98,54,.8)', 'rgba(52,78,44,.85)');
  const leaves = [];
  for (let i = 0; i < 6 * WORLD_SCREENS; i++) {
    const top = r() < .4, s = (.12 + r() * .1) * H;
    leaves.push({ x: r() * (WW * 1.35 + W), y: top ? -u : H + u, rot: (top ? Math.PI / 2 : -Math.PI / 2) + (r() - .5) * 1.3, s, ph: r() * 9 });
  }
  fore = { f: 1.35, leaves };
  near = [];
  for (let i = 0; i < 40 * WORLD_SCREENS; i++) near.push({ x: rand(0, WW * 1.35 + W), y: rand(0, H), r: rand(.4, 1.1) * u, v: rand(1, 3) * u, ph: rand(0, 9) });
  if (!dotSprite) {
    const d = document.createElement('canvas'); d.width = d.height = 32;
    const dg = d.getContext('2d'), gr = dg.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, 'rgba(255,250,215,.55)'); gr.addColorStop(1, 'rgba(255,250,215,0)');
    dg.fillStyle = gr; dg.fillRect(0, 0, 32, 32); dotSprite = d;
  }
}
function drawBigLeaf(lf, t) {
  ctx.save(); ctx.translate(lf.x, lf.y); ctx.rotate(lf.rot + Math.sin(t * .6 + lf.ph) * .04);
  const s = lf.s;
  ctx.fillStyle = 'rgba(8,30,14,.95)'; ctx.beginPath(); ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(s * .6, -s * .55, s * 1.4, 0); ctx.quadraticCurveTo(s * .6, s * .55, 0, 0); ctx.fill();
  ctx.strokeStyle = 'rgba(34,74,38,.8)'; ctx.lineWidth = s * .025;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s * 1.35, 0);
  for (let k = 1; k < 6; k++) { const x = s * k * .22; ctx.moveTo(x, 0); ctx.lineTo(x + s * .15, -s * .2); ctx.moveTo(x, 0); ctx.lineTo(x + s * .15, s * .2); }
  ctx.stroke(); ctx.restore();
}
function drawLayer(L, viewX, t) {
  if (!L) return;
  ctx.save(); ctx.translate(viewX * (1 - L.f), 0);
  const lx0 = viewX * L.f - W * .4, lx1 = viewX * L.f + VW / vs + W * .4;
  if (L.flock) {
    // A far-off flock of birds crossing the bright sky above the trees.
    const fl = L.flock, cx = ((t * u * 3) % (WW * L.f + W * 1.4)) - W * .2, sr = mulberry32(fl.seed);
    ctx.strokeStyle = 'rgba(40,70,50,.45)'; ctx.lineWidth = Math.max(1, u * .2); ctx.lineCap = 'round';
    for (let i = 0; i < fl.n; i++) {
      const x = cx + sr() * u * 22, y = fl.y + sr() * u * 7, fp = Math.sin(t * 6 + i) * u * .5;
      if (x < lx0 || x > lx1) continue;
      ctx.beginPath(); ctx.moveTo(x - u, y - fp); ctx.lineTo(x, y); ctx.lineTo(x + u, y - fp); ctx.stroke();
    }
  }
  if (L.trees) for (const tr of L.trees) {
    if (tr.x + tr.cr * 2 < lx0 || tr.x - tr.cr * 2 > lx1) continue;
    const topY = H - tr.h;
    ctx.fillStyle = L.trunk; ctx.fillRect(tr.x - tr.tw / 2, topY, tr.tw, tr.h + u * 6);
    ctx.fillStyle = L.crown;
    for (const [bx, by, br] of tr.blobs) { ctx.beginPath(); ctx.arc(tr.x + bx, topY + by, br, 0, TAU); ctx.fill(); }
  }
  if (L.leaves) for (const lf of L.leaves) { if (lf.x < lx0 - lf.s * 2 || lf.x > lx1 + lf.s * 2) continue; drawBigLeaf(lf, t); }
  ctx.restore();
}
function drawRain(viewX, t) {
  const a = rainAmt(t); if (a <= 0) return;
  const w = VW / vs;
  ctx.fillStyle = `rgba(50,70,80,${.2 * a})`; ctx.fillRect(viewX, -u * 5, w, H + u * 10);
  ctx.strokeStyle = `rgba(215,232,242,${.4 * a})`; ctx.lineWidth = Math.max(1, u * .1);
  ctx.beginPath();
  const n = Math.floor(170 * a * w / W);
  for (let i = 0; i < n; i++) {
    const hx = ((i * 7919) % 1000) / 1000, hy = ((i * 104729) % 1000) / 1000;
    const x = viewX + ((hx * w + t * u * 6) % w), y = ((hy * H + t * H * 1.3) % (H * 1.1)) - H * .05;
    ctx.moveTo(x, y); ctx.lineTo(x - u * .5, y + u * 3);
  }
  ctx.stroke();
}
// Out-of-focus pollen right in front of the view; it slides faster than the forest when the camera moves.
function drawNear(viewX) {
  const f = 1.35, lx0 = viewX * f - 40, lx1 = viewX * f + VW / vs + 40;
  ctx.save(); ctx.translate(viewX * (1 - f), 0);
  for (const p of near) {
    if (p.x < lx0 || p.x > lx1) continue;
    const s = p.r * 6; ctx.globalAlpha = .3 + .2 * Math.sin(T * .7 + p.ph);
    ctx.drawImage(dotSprite, p.x - s / 2, p.y - s / 2, s, s);
  }
  ctx.restore(); ctx.globalAlpha = 1;
}
function updNear(dt) {
  for (const p of near) { p.y += p.v * dt * .3; p.x += Math.sin(T * .4 + p.ph) * u * .3 * dt; if (p.y > H + 10) { p.y = -10; p.x = rand(0, WW * 1.35 + W); } }
}
// A fringe of dark canopy leaves along the top edge.
function drawSurface(viewX, t) {
  const w = VW / vs, step = u * 6, start = Math.floor(viewX / step) - 1;
  ctx.fillStyle = 'rgba(18,56,28,.9)';
  for (let i = start; i < start + w / step + 3; i++) {
    const x = i * step, h = u * (2.5 + 2 * ((((i * 37) % 7) + 7) % 7) / 7) + Math.sin(t * .6 + i) * u * .3;
    ctx.beginPath(); ctx.ellipse(x, 0, step * .75, h, 0, 0, TAU); ctx.fill();
  }
}
function drawFireflies(t, x0, x1) {
  ctx.globalCompositeOperation = 'lighter';
  for (const f of bubbles) {
    if (f.x < x0 - 9 || f.x > x1 + 9) continue;
    const a = Math.pow(Math.max(0, Math.sin(t * 1.7 + f.ph * 3)), 3);
    if (a < .03) continue;
    ctx.globalAlpha = a; ctx.drawImage(dotSprite, f.x - u * 1.5, f.y - u * 1.5, u * 3, u * 3);
    ell(ctx, f.x, f.y, u * .22, u * .22, '#fff7a0');
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}
// Darkens the top and bottom, and only the outer side edges, so two screens still read as one forest.
function drawVignette() {
  const w = VW / vs, h = VH / vs;
  let g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(4,14,6,.12)'); g.addColorStop(.15, 'rgba(4,14,6,0)'); g.addColorStop(.8, 'rgba(4,10,4,0)'); g.addColorStop(1, 'rgba(3,8,3,.4)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  const ew = w * .14;
  if (slot === 0) { g = ctx.createLinearGradient(0, 0, ew, 0); g.addColorStop(0, 'rgba(4,12,6,.45)'); g.addColorStop(1, 'rgba(4,12,6,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, ew, h); }
  if (slot === span - 1) { g = ctx.createLinearGradient(w, 0, w - ew, 0); g.addColorStop(0, 'rgba(4,12,6,.45)'); g.addColorStop(1, 'rgba(4,12,6,0)'); ctx.fillStyle = g; ctx.fillRect(w - ew, 0, ew, h); }
}

function render(t, viewX, showLabels) {
  let sx = 0, sy = 0;
  if (pass && !pass.tease && pass.sp.pass.shake) {
    const a = u * .35 * passEdge() * Math.pow(Math.max(0, Math.sin(pass.t * .7)), 6);
    sx = Math.sin(t * 41) * a; sy = Math.cos(t * 37) * a;
  }
  const x0 = viewX, x1 = viewX + VW / vs;
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  ctx.fillStyle = '#0c2416'; ctx.fillRect(0, 0, VW / vs, VH / vs);
  ctx.translate(-viewX + sx, sy);
  drawWater(viewX);
  drawLayer(far, viewX, t);
  drawLayer(mid, viewX, t);
  drawRays(t);
  for (const s of snow) { if (s.x < x0 || s.x > x1) continue; ctx.globalAlpha = .35; ell(ctx, s.x, s.y, s.r, s.r, '#fff6c0'); }
  ctx.globalAlpha = 1;
  drawPass(viewX - sx);
  drawTrees(t, x0, x1);
  drawSeabed();
  drawPlants(t);
  drawDecor(t);
  for (const o of creatures) drawCreature(o, x0, x1);
  for (const p of pellets) { ell(ctx, p.x, p.y, u * .5, u * .5, '#c2185b'); ell(ctx, p.x - u * .15, p.y - u * .15, u * .15, u * .12, '#ffc0d8'); }
  drawFireflies(t, x0, x1);
  for (const s of sparks) { ctx.globalAlpha = Math.min(1, s.life); ell(ctx, s.x, s.y, u * .5, u * .5, '#ffd0e0'); }
  ctx.globalAlpha = 1;
  drawRain(viewX, t);
  drawLayer(fore, viewX, t);
  drawNear(viewX);
  drawSurface(viewX, t);
  ctx.font = `bold ${Math.max(14, u * 2)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'center';
  for (const x of texts) { ctx.globalAlpha = Math.min(1, x.life); ctx.fillStyle = '#fff6c8'; ctx.fillText(x.s, x.x, x.y); }
  ctx.globalAlpha = 1;
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  drawVignette();
  if (showLabels) drawLabels();
}


/* ================= world settings used by the shared engine ================= */
const CANOPY = ['toucan', 'macaw', 'sloth', 'monkey', 'orangutan'];
const THEME = {
  key: 'rainforest-v1', start: { morpho: 2 }, rareFrom: 'sloth', feedMaxY: .86,
  pelletAlive: p => p.y < seabedY(p.x) - u * .3,
  text: {
    currency: 'berries', vault: 'Berry basket', bonus: 'berries for the whole forest', tabReal: 'Animals',
    hint: 'Tap to drop berries · Tap an animal to learn about it · Drag to look around',
    keepOne: 'Keep at least 1 animal in the forest', wentHome: ' went home to the wild', releaseBack: 'Release back to the wild',
    teaseToast: 'Something huge is moving through the forest...', teaseCard: 'Something huge lives in the forest...',
    nowLives: ' now lives in our forest! Watch for it passing by',
    welcome: 'Tap anywhere to drop berries for the animals, drag to look around, and open the Shop to meet new animals',
    away: n => 'While the forest was closed, your animals gathered ' + n + ' berries',
  },
  icons: {
    cur: c => {
      c.strokeStyle = '#2f7a34'; c.lineWidth = .05; c.beginPath(); c.moveTo(0, -.26); c.quadraticCurveTo(.1, -.45, .25, -.48); c.stroke();
      ell(c, .2, -.45, .12, .05, '#3f9a3f', -.3);
      for (const [x, y] of [[-.15, .05], [.12, .08], [0, -.14], [-.02, .22], [.2, -.12]]) { ell(c, x, y, .16, .16, '#c2185b'); ell(c, x - .05, y - .05, .05, .04, 'rgba(255,220,235,.9)'); }
    },
    chest: c => { c.translate(0, .42); c.scale(.4, .4); ddFruitTree(c, 0, { open: .6 }); },
    castle: c => { c.translate(0, .4); c.scale(.32, .32); ddTemple(c, 1); },
  },
  achievements: (ic, A) => [
  A('snack', 'Berry Feast', 0, ic.sp('toucan', .9), 'Drop berries for the animals 500 times.', () => [S.feeds, 500]),
  A('curious', 'Curious Explorer', 0, ic.glass, 'Tap 10 different kinds of animals to learn about them.', () => [S.tapped.length, 10]),
  A('puff', 'Color Show', 0, ic.sp('chameleon', .95), 'Make a chameleon change color 100 times.', () => [S.puffs, 100]),
  A('school', 'Butterfly Cloud', 0, ic.sp('morpho', .85), 'Have 12 blue morpho butterflies at once.', () => [own('morpho'), 12]),
  A('shadow', 'Mystery Shadow', 0, ic.q, 'Spot 5 mystery shadows in the forest.', () => [S.teases, 5]),
  A('kind', 'Kind Keeper', 0, ic.heart, 'Release 10 animals back to the wild.', () => [S.releases, 10]),
  A('pearls', 'Berry Picker', 0, ic.cur, 'Gather 10 million berries in total.', () => [S.earned, 1e7]),
  A('chef', 'Jungle Chef', 1, ic.sp('tapir', .95), 'Drop berries for the animals 5,000 times.', () => [S.feeds, 5000]),
  A('biologist', 'Rainforest Biologist', 1, ic.sp('harpy', 1), 'Learn about every real rainforest animal.', () => [REAL.filter(s => S.tapped.includes(s.id)).length, REAL.length]),
  A('deep', 'Canopy Crowd', 1, ic.sp('monkey', .95), 'Fill the canopy: every toucan, macaw, sloth, spider monkey and orangutan.',
    () => [CANOPY.reduce((a, id) => a + own(id), 0), CANOPY.reduce((a, id) => a + BY[id].max, 0)]),
  A('spotter', 'Giant Spotter', 1, ic.sp('megatherium', 1), 'See the giant ground sloth walk by 25 times.', () => [S.seen.megatherium || 0, 25]),
  A('treasure', 'Fruit Harvest', 1, ic.chest, 'Watch the fruit tree drop its berries 100 times.', () => [S.chests, 100]),
  A('designer', 'Jungle Designer', 1, ic.castle, 'Own every decoration.', () => [DECOR.filter(d => state.decor[d.id]).length, DECOR.length]),
  A('night', 'Night Watch', 1, ic.moon, 'Keep the forest open for 8 hours in one go.', () => [Math.floor(sessionT / 60), 480]),
  A('tycoon', 'Berry Tycoon', 1, ic.cur, 'Gather 10 billion berries in total.', () => [S.earned, 1e10]),
  A('emperor', 'Berry Emperor', 2, ic.crown, 'Gather 1 trillion berries in total.', () => [S.earned, 1e12]),
  A('legends', 'Legend Keeper', 2, ic.sp('kinnaree', 1), 'Find every legendary creature.', () => [LEGENDS.filter(has).length, LEGENDS.length]),
  A('complete', 'Complete Collection', 2, ic.star, `Find all ${SP.length} animals and fill the forest with every real animal it can hold.`,
    () => [SP.filter(has).length + REAL.reduce((a, s) => a + own(s.id), 0), SP.length + REAL.reduce((a, s) => a + s.max, 0)]),
  A('quake', 'Wind of Garuda', 2, ic.sp('garuda', 1), 'Feel Garuda fly over 10 times.', () => [S.seen.garuda || 0, 10]),
  A('superfan', 'Giant Superfan', 2, ic.sp('megatherium', 1), 'See the giant ground sloth walk by 100 times.', () => [S.seen.megatherium || 0, 100]),
  A('devoted', 'Devoted Keeper', 2, ic.sp('sloth', .95), 'Visit the forest on 30 different days.', () => [S.days, 30]),
],
};
