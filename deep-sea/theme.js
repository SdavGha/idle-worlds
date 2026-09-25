"use strict";
/* ================= real animals ================= */
function dClown(c, t) {
  tail(c, '#ff7a1a', t, -.8);
  c.fillStyle = '#ff9a45'; c.beginPath(); c.moveTo(-.45, -.45); c.quadraticCurveTo(-.1, -.95, .35, -.5); c.fill();
  c.save(); c.beginPath(); c.ellipse(0, 0, 1, .58, 0, 0, TAU); c.fillStyle = '#ff7a1a'; c.fill(); c.clip();
  c.fillStyle = '#fff'; c.fillRect(.28, -1, .24, 2); c.fillRect(-.42, -1, .26, 2);
  c.fillStyle = '#1b1b1b'; c.fillRect(.25, -1, .03, 2); c.fillRect(.52, -1, .03, 2); c.fillRect(-.45, -1, .03, 2); c.fillRect(-.16, -1, .03, 2);
  c.restore();
  limb(c, .05, .18, .22, .1, .6 + Math.sin(t * 9) * .4, '#ff9a45');
  eye(c, .64, -.12, .17); blush(c, .6, .2, .1); smile(c, .8, .06, .1);
}
function dAngel(c, t) {
  const Y = '#ffd23f', B = '#2f6fd0', s = Math.sin(t * 3) * .05;
  c.fillStyle = Y;
  c.beginPath(); c.moveTo(-.5, -.45); c.quadraticCurveTo(-.7, -1.35, -1.05, -1.1 + s); c.quadraticCurveTo(-.2, -.9, .35, -.55); c.fill();
  c.beginPath(); c.moveTo(-.5, .45); c.quadraticCurveTo(-.7, 1.35, -1.05, 1.1 - s); c.quadraticCurveTo(-.2, .9, .35, .55); c.fill();
  tail(c, Y, t, -.75, .9);
  c.save(); c.beginPath(); c.ellipse(0, 0, .9, .72, 0, 0, TAU); c.fillStyle = Y; c.fill(); c.clip();
  c.fillStyle = B; c.fillRect(.08, -1, .14, 2); c.fillRect(-.4, -1, .14, 2); c.restore();
  eye(c, .5, -.18, .16); smile(c, .7, .05, .09);
}
function dPuffer(c, t, o) {
  const p = o ? o.puff : 0, r = .7 + .32 * p;
  tail(c, '#d9b56a', t, -r + .05, .7);
  if (p > .05) {
    c.strokeStyle = '#8a6a2a'; c.lineWidth = .05;
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * TAU;
      c.beginPath(); c.moveTo(Math.cos(a) * r * .95, Math.sin(a) * r * .95);
      c.lineTo(Math.cos(a) * (r + .22 * p), Math.sin(a) * (r + .22 * p)); c.stroke();
    }
  }
  ell(c, 0, 0, r, r, '#e8cf85');
  ell(c, .05, r * .35, r * .8, r * .5, '#fff6da');
  for (const [x, y] of [[-.3, -.35], [0, -.55], [-.55, -.05], [.25, -.3], [-.15, -.1]]) ell(c, x * r, y * r, r * .07, r * .07, '#9c7a3a');
  limb(c, -.05, .1, .22, .1, Math.sin(t * 12) * .5 + .4, '#d9b56a');
  eye(c, r * .45, -r * .3, .18 + .04 * p); blush(c, r * .5, r * .12, .09);
  ell(c, r * .92, r * .12, .06, .05 + .04 * p, '#7a4a2a');
}
function dTurtle(c, t) {
  const fl = Math.sin(t * 3) * .5;
  limb(c, .3, -.3, .5, .14, -.9 - fl, '#4d8f58'); limb(c, -.6, -.2, .3, .12, -2.6, '#4d8f58');
  ell(c, 1.05, -.02, .32, .25, '#7cc47f');
  limb(c, .3, .3, .55, .16, .8 + fl, '#6cb877'); limb(c, -.6, .25, .32, .12, 2.5 + fl * .3, '#6cb877');
  ell(c, 0, 0, .95, .6, '#6b4f2a'); ell(c, 0, -.03, .82, .5, '#8f6d3c');
  for (const [x, y] of [[-.4, -.1], [0, -.17], [.4, -.1], [-.2, .2], [.2, .2]]) ell(c, x, y, .16, .13, '#a98450');
  eye(c, 1.15, -.1, .09); smile(c, 1.2, 0, .07, '#2d5a33');
}
function dSword(c, t) {
  const w = Math.sin(t * 10) * .08;
  c.fillStyle = '#c8d3e0'; c.beginPath(); c.moveTo(.85, -.06); c.lineTo(1.95, 0); c.lineTo(.85, .06); c.fill();
  c.fillStyle = '#2a4d7a';
  c.beginPath(); c.moveTo(-1, 0); c.quadraticCurveTo(-1.2, -.3, -1.5, -.65 + w); c.quadraticCurveTo(-1.25, 0, -1.5, .65 + w); c.quadraticCurveTo(-1.2, .3, -1, 0); c.fill();
  c.beginPath(); c.moveTo(-.1, -.25); c.quadraticCurveTo(0, -.8, -.35, -.8); c.quadraticCurveTo(-.3, -.5, -.5, -.25); c.fill();
  const g = c.createLinearGradient(0, -.3, 0, .3); g.addColorStop(0, '#2d5d95'); g.addColorStop(1, '#dfe8f2');
  c.fillStyle = g; c.beginPath(); c.moveTo(.95, 0); c.bezierCurveTo(.7, -.35, -.6, -.35, -1.05, 0); c.bezierCurveTo(-.6, .32, .7, .32, .95, 0); c.fill();
  limb(c, .3, .12, .35, .07, .6 + Math.sin(t * 6) * .2, '#3a6aa0');
  eye(c, .62, -.07, .1);
}
function dJelly(c, t) {
  const p = Math.sin(t * 3);
  c.lineCap = 'round';
  c.strokeStyle = 'rgba(255,180,230,.55)'; c.lineWidth = .05;
  for (let i = 0; i < 5; i++) {
    const x0 = -.5 + i * .25; c.beginPath(); c.moveTo(x0, .2);
    for (let k = 1; k <= 8; k++) c.lineTo(x0 + Math.sin(t * 2 + k * .7 + i) * .12, .2 + k * .2);
    c.stroke();
  }
  c.strokeStyle = 'rgba(255,150,215,.7)'; c.lineWidth = .12;
  for (const x0 of [-.12, .12]) {
    c.beginPath(); c.moveTo(x0, .2);
    for (let k = 1; k <= 5; k++) c.lineTo(x0 + Math.sin(t * 2.4 + k + x0 * 9) * .1, .2 + k * .2);
    c.stroke();
  }
  c.save(); c.scale(1 + p * .08, 1 - p * .08);
  const g = c.createRadialGradient(0, -.3, .1, 0, -.2, .9);
  g.addColorStop(0, 'rgba(255,215,245,.92)'); g.addColorStop(1, 'rgba(240,120,210,.6)');
  c.fillStyle = g; c.beginPath(); c.moveTo(-.8, .25); c.bezierCurveTo(-.85, -.85, .85, -.85, .8, .25);
  for (let i = 7; i >= 0; i--) { const x = -.8 + i * .2; c.quadraticCurveTo(x + .1, .38, x, .25); }
  c.fill();
  ell(c, -.22, -.15, .07, .07, '#3a1030'); ell(c, .22, -.15, .07, .07, '#3a1030');
  blush(c, -.4, -.02, .09); blush(c, .4, -.02, .09); smile(c, 0, -.06, .1, '#8a2a6a');
  c.restore();
}
function dWhaleShark(c, t) {
  const w = Math.sin(t * 4) * .1;
  c.fillStyle = '#34506e';
  c.beginPath(); c.moveTo(-1, 0); c.quadraticCurveTo(-1.2, -.3, -1.55, -.85 + w); c.quadraticCurveTo(-1.3, -.1, -1.4, .5 + w); c.quadraticCurveTo(-1.2, .2, -1, 0); c.fill();
  c.beginPath(); c.moveTo(-.2, -.4); c.lineTo(-.45, -.82); c.lineTo(-.65, -.36); c.fill();
  c.save();
  const g = c.createLinearGradient(0, -.5, 0, .45); g.addColorStop(0, '#3f6286'); g.addColorStop(.6, '#5d7f9f'); g.addColorStop(1, '#c9d7e3');
  c.beginPath(); c.moveTo(1.05, .05); c.bezierCurveTo(1, -.6, -.6, -.6, -1.05, 0); c.bezierCurveTo(-.6, .5, 1, .5, 1.05, .05);
  c.fillStyle = g; c.fill(); c.clip();
  c.fillStyle = 'rgba(240,248,255,.85)';
  for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) {
    const x = -.85 + i * .19 + (j % 2) * .09, y = -.38 + j * .12 + Math.sin(i * 3.1 + j) * .02;
    ell(c, x, y, .035, .035, 'rgba(240,248,255,.85)');
  }
  c.restore();
  c.strokeStyle = '#1c2e44'; c.lineWidth = .04; c.beginPath(); c.moveTo(1.02, .12); c.quadraticCurveTo(.85, .2, .7, .16); c.stroke();
  limb(c, .2, .28, .45, .1, .7 + Math.sin(t * 2) * .2, '#34506e');
  eye(c, .74, -.1, .07); blush(c, .8, .02, .06);
}
function dSquid(c, t) {
  c.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const off = (i - 3.5) * .07;
    c.strokeStyle = i % 2 ? '#b8403a' : '#cf5048'; c.lineWidth = .09 - .004 * i;
    c.beginPath(); c.moveTo(-.4, off);
    for (let k = 1; k <= 6; k++) c.lineTo(-.4 - k * .28, off * (1 + k * .5) + Math.sin(t * 3 + k * .8 + i) * .08 * k / 3);
    c.stroke();
  }
  c.strokeStyle = '#c24740'; c.lineWidth = .045;
  for (const s of [-1, 1]) {
    c.beginPath(); c.moveTo(-.4, s * .05); let ex = 0, ey = 0;
    for (let k = 1; k <= 10; k++) { ex = -.4 - k * .27; ey = s * .12 + Math.sin(t * 2.5 + k * .6 + s) * .1 * k / 4; c.lineTo(ex, ey); }
    c.stroke(); ell(c, ex, ey, .14, .07, '#c24740');
  }
  const f = Math.sin(t * 4) * .05;
  c.fillStyle = '#c94840'; c.beginPath(); c.moveTo(1.1, 0); c.lineTo(1.65, -.38 + f); c.lineTo(1.95, 0); c.lineTo(1.65, .38 - f); c.fill();
  c.fillStyle = '#e0604f'; c.beginPath(); c.moveTo(-.15, -.3); c.quadraticCurveTo(1, -.42, 1.8, 0); c.quadraticCurveTo(1, .42, -.15, .3); c.fill();
  for (const [x, y] of [[.3, -.12], [.7, .08], [1.1, -.05], [.5, .18]]) ell(c, x, y, .05, .04, '#f08a78');
  ell(c, -.3, 0, .32, .27, '#d9564a');
  ell(c, -.28, -.05, .17, .17, '#fff'); ell(c, -.32, -.05, .12, .12, '#1a2a4a'); ell(c, -.27, -.1, .04, .04, '#fff');
}
function dAngler(c, t) {
  const lx = 1.05, ly = -.95 + Math.sin(t * 2) * .05, pulse = .75 + .25 * Math.sin(t * 2.3);
  c.strokeStyle = '#6b5a80'; c.lineWidth = .05;
  c.beginPath(); c.moveTo(.35, -.62); c.quadraticCurveTo(.75, -1.35, lx, ly); c.stroke();
  c.globalAlpha *= pulse; glow(c, lx, ly, .7, 'rgba(220,255,255,1)', 'rgba(90,220,255,.45)'); c.globalAlpha /= pulse;
  ell(c, lx, ly, .08, .08, '#eaffff');
  tail(c, '#4a3c5e', t * .6, -.8);
  c.beginPath(); c.ellipse(0, 0, .95, .78, 0, 0, TAU); c.fillStyle = '#5a4870'; c.fill();
  c.strokeStyle = 'rgba(140,210,255,.35)'; c.lineWidth = .05; c.stroke();
  c.fillStyle = '#1a1024'; c.beginPath(); c.moveTo(.97, -.2); c.lineTo(.35, .15); c.lineTo(.95, .5); c.fill();
  c.fillStyle = '#f4f0ff';
  for (let k = 0; k < 4; k++) {
    const f = .12 + k * .22;
    let x = .97 - .62 * f, y = -.2 + .35 * f;
    c.beginPath(); c.moveTo(x - .05, y); c.lineTo(x + .05, y); c.lineTo(x, y + .14); c.fill();
    x = .95 - .6 * f; y = .5 - .35 * f;
    c.beginPath(); c.moveTo(x - .05, y); c.lineTo(x + .05, y); c.lineTo(x, y - .14); c.fill();
  }
  limb(c, -.2, .15, .25, .12, .7 + Math.sin(t * 5) * .3, '#6d5a88');
  ell(c, .45, -.38, .11, .11, '#cfe0ff'); ell(c, .48, -.38, .06, .06, '#101018');
}
function dVampire(c, t) {
  const f = Math.sin(t * 2.5);
  c.fillStyle = '#2b0a10';
  for (let i = 0; i < 8; i++) { const x = -.75 + i * .214; ell(c, x, .78 + Math.sin(t * 2 + i) * .04, .06, .12, '#2b0a10'); }
  ell(c, 0, .38, .85 + f * .06, .45, '#5a1420');
  c.strokeStyle = 'rgba(255,200,210,.35)'; c.lineWidth = .03;
  for (let i = 0; i < 8; i++) { const x = -.75 + i * .214; c.beginPath(); c.moveTo(x * .5, .1); c.lineTo(x, .75); c.stroke(); }
  for (const s of [-1, 1]) { c.save(); c.translate(s * .4, -.72); c.rotate(s * (.5 + f * .35)); ell(c, s * .2, 0, .26, .13, '#7a2030'); c.restore(); }
  const g = c.createRadialGradient(-.1, -.5, .05, 0, -.3, .7); g.addColorStop(0, '#9a3040'); g.addColorStop(1, '#4a0f1a');
  c.fillStyle = g; c.beginPath(); c.ellipse(0, -.3, .55, .62, 0, 0, TAU); c.fill();
  for (const s of [-1, 1]) {
    glow(c, s * .24, -.18, .3, 'rgba(200,240,255,1)', 'rgba(80,160,255,.4)');
    ell(c, s * .24, -.18, .11, .11, '#dff4ff'); ell(c, s * .24 + .02, -.17, .06, .06, '#0a0f25');
    const a = .6 + .4 * Math.sin(t * 3 + s);
    c.globalAlpha *= a; ell(c, s * .5, -.62, .04, .04, '#9ff'); c.globalAlpha /= a;
  }
}
function dGulper(c, t) {
  const pts = [[0, 0]];
  for (let k = 1; k <= 12; k++) pts.push([-k * .26, Math.sin(t * 4 - k * .6) * .12 * (k / 6)]);
  c.lineCap = 'round'; c.lineJoin = 'round';
  for (const [col, w] of [['rgba(140,200,255,.3)', .2], ['#3a3656', .14]]) {
    c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(0, 0);
    for (const [x, y] of pts) c.lineTo(x, y); c.stroke();
  }
  const [ex, ey] = pts[pts.length - 1];
  glow(c, ex, ey, .35, 'rgba(255,200,230,1)', 'rgba(255,90,170,.5)');
  const op = Math.sin(t * 1.5) * .1;
  c.beginPath(); c.moveTo(-.05, -.14); c.lineTo(1.15, -.55 - op); c.quadraticCurveTo(.95, 0, 1.15, .6 + op); c.lineTo(-.05, .14); c.closePath();
  c.fillStyle = '#3f3a60'; c.fill(); c.strokeStyle = 'rgba(140,200,255,.35)'; c.lineWidth = .04; c.stroke();
  c.fillStyle = '#16132a'; c.beginPath(); c.moveTo(.25, -.08); c.lineTo(1.05, -.45 - op); c.quadraticCurveTo(.88, 0, 1.05, .5 + op); c.lineTo(.25, .08); c.fill();
  ell(c, .12, -.17, .06, .06, '#dfe8ff');
}
function dSeaPig(c, t) {
  const st = Math.sin(t * 4) * .05;
  for (let i = 0; i < 5; i++) ell(c, -.55 + i * .26, .35 + (i % 2 ? st : -st), .08, .14, '#f3a7b8');
  const g = c.createLinearGradient(0, -.4, 0, .4); g.addColorStop(0, '#ffc9d6'); g.addColorStop(1, '#f08aa4');
  c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, .85, .38, 0, 0, TAU); c.fill();
  c.strokeStyle = '#ffb3c6'; c.lineWidth = .07; c.lineCap = 'round';
  for (const [x, h] of [[.25, .45], [.42, .38]]) { c.beginPath(); c.moveTo(x, -.3); c.quadraticCurveTo(x + .05, -.3 - h * .6, x + .12 + Math.sin(t * 2 + x) * .05, -.3 - h); c.stroke(); }
  c.lineWidth = .04;
  for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(.8, .08 + i * .05); c.lineTo(.98, .16 + i * .07 + Math.sin(t * 3 + i) * .03); c.stroke(); }
  blush(c, .55, .05, .08); smile(c, .68, -.02, .07, '#b0506a');
}
function dIsopod(c, t) {
  const st = Math.sin(t * 8);
  c.strokeStyle = '#c9b8c9'; c.lineWidth = .05; c.lineCap = 'round';
  for (let i = 0; i < 7; i++) { const x = -.6 + i * .2, s = (i % 2 ? 1 : -1) * st * .05; c.beginPath(); c.moveTo(x, .2); c.lineTo(x - .05 + s, .42); c.stroke(); }
  c.fillStyle = '#a996ae'; c.beginPath(); c.moveTo(-.78, -.1); c.lineTo(-1.02, -.2); c.lineTo(-1.02, .2); c.lineTo(-.78, .1); c.fill();
  for (let i = 0; i < 8; i++) {
    const x = -.7 + i * .19; ell(c, x, 0, .14, .3, i % 2 ? '#b7a6bd' : '#c8b8cc');
    c.strokeStyle = 'rgba(90,70,100,.4)'; c.lineWidth = .02; c.beginPath(); c.moveTo(x + .13, -.28); c.quadraticCurveTo(x + .16, 0, x + .13, .28); c.stroke();
  }
  ell(c, .75, .02, .2, .22, '#d4c6d6'); ell(c, .8, -.06, .07, .06, '#2a2230'); ell(c, .82, -.08, .02, .02, '#fff');
  c.strokeStyle = '#b7a6bd'; c.lineWidth = .03;
  c.beginPath(); c.moveTo(.9, -.08); c.quadraticCurveTo(1.15, -.3, 1.3, -.2); c.moveTo(.9, 0); c.quadraticCurveTo(1.2, -.1, 1.35, .05); c.stroke();
}
function dDumbo(c, t) {
  const f = Math.sin(t * 4) * .45;
  for (let i = 0; i < 5; i++) ell(c, -.48 + i * .24, .68 + Math.sin(t * 3 + i) * .05, .15, .12, '#f08a7a');
  ell(c, 0, .35, .62, .4, '#f39683');
  for (const s of [-1, 1]) { c.save(); c.translate(s * .5, -.45); c.rotate(s * (.35 + f)); ell(c, s * .22, 0, .32, .17, '#ff9e8a'); c.restore(); }
  const g = c.createRadialGradient(-.15, -.35, .05, 0, -.15, .7);
  g.addColorStop(0, '#ffd2c2'); g.addColorStop(1, '#ff9f88');
  c.fillStyle = g; c.beginPath(); c.arc(0, -.15, .62, 0, TAU); c.fill();
  eye(c, -.22, -.1, .12); eye(c, .22, -.1, .12);
  blush(c, -.38, .1, .09); blush(c, .38, .1, .09); smile(c, 0, .05, .09, '#9a3a3a');
}
function dBloop(c, t) {
  const w = Math.sin(t * 1.2) * .12;
  c.fillStyle = '#10244a'; c.beginPath(); c.moveTo(-1.5, 0);
  c.quadraticCurveTo(-2, -.1, -2.3, -.65 + w); c.quadraticCurveTo(-2.05, 0, -2.3, .65 + w); c.quadraticCurveTo(-2, .1, -1.5, 0); c.fill();
  const g = c.createLinearGradient(0, -.8, 0, .8);
  g.addColorStop(0, '#24467e'); g.addColorStop(1, '#07142b');
  c.fillStyle = g; c.beginPath(); c.moveTo(1.7, 0);
  c.bezierCurveTo(1.6, -.85, -.4, -.9, -1.6, -.12); c.lineTo(-1.6, .12); c.bezierCurveTo(-.4, .9, 1.6, .8, 1.7, 0); c.fill();
  limb(c, .2, .45, .5, .14, .5 + Math.sin(t * 1.5) * .25, '#16305c');
  c.strokeStyle = 'rgba(120,230,255,.35)'; c.lineWidth = .025; c.lineCap = 'round';
  for (const s of [0, 1, 2]) {
    c.beginPath(); c.moveTo(1.5, .2);
    for (let k = 1; k <= 6; k++) c.lineTo(1.5 + k * .12, .2 + k * .1 + Math.sin(t * 2 + k + s) * .05 + s * .05);
    c.stroke();
  }
  for (let i = 0; i < 9; i++) ell(c, 1.2 - i * .3, .05 + Math.sin(i * 1.7) * .08, .045, .045, `rgba(143,240,255,${.5 + .5 * Math.sin(t * 2 + i)})`);
  glow(c, 1.2, -.22, .3, 'rgba(230,255,255,1)', 'rgba(80,200,255,.5)');
  ell(c, 1.2, -.22, .06, .06, '#fff');
  c.strokeStyle = '#050b18'; c.lineWidth = .04; c.beginPath(); c.moveTo(1.66, .1); c.quadraticCurveTo(1.3, .3, 1.0, .25); c.stroke();
}

/* ================= legends ================= */
function dMermaid(c, t) {
  const w = Math.sin(t * 4) * .15;
  c.fillStyle = '#1a1216'; c.beginPath(); c.moveTo(.95, -.3); c.quadraticCurveTo(.5, -.5 + w * .5, .05, -.2 + w); c.quadraticCurveTo(.5, -.1, .8, .05); c.fill();
  c.fillStyle = '#f5c542'; c.beginPath(); c.moveTo(-1.05, 0); c.quadraticCurveTo(-1.35, -.2, -1.6, -.5 + w); c.quadraticCurveTo(-1.4, w * .3, -1.6, .5 + w); c.quadraticCurveTo(-1.35, .2, -1.05, 0); c.fill();
  const g = c.createLinearGradient(0, -.25, 0, .25); g.addColorStop(0, '#ffe07a'); g.addColorStop(1, '#d1921a');
  c.fillStyle = g; c.beginPath(); c.moveTo(.4, -.2); c.quadraticCurveTo(-.4, -.25 + w * .3, -1.08, -.05 + w * .6); c.lineTo(-1.08, .07 + w * .6); c.quadraticCurveTo(-.4, .25 + w * .3, .4, .22); c.fill();
  c.strokeStyle = 'rgba(160,100,10,.6)'; c.lineWidth = .025;
  for (let i = 0; i < 6; i++) { const x = .25 - i * .2, y = w * .3 * (i / 5); c.beginPath(); c.arc(x, y - .06, .07, .2, Math.PI - .2); c.stroke(); c.beginPath(); c.arc(x - .1, y + .07, .07, .2, Math.PI - .2); c.stroke(); }
  limb(c, .52, .02, .22, .045, -.25 + Math.sin(t * 3 + 1) * .3, '#d9a64a');
  ell(c, .58, 0, .24, .19, '#f0c060');
  ell(c, .58, -.02, .2, .06, '#e8a317');
  limb(c, .62, .08, .25, .05, .3 + Math.sin(t * 3) * .3, '#f0c060');
  ell(c, .92, -.12, .2, .2, '#f5cc6e');
  c.fillStyle = '#1a1216'; c.beginPath(); c.arc(.9, -.13, .21, .55 * Math.PI, 1.45 * Math.PI); c.fill();
  c.fillStyle = '#e8a317'; c.beginPath(); c.moveTo(.76, -.26); c.lineTo(1.06, -.26); c.lineTo(.93, -.66); c.fill();
  c.fillRect(.75, -.3, .32, .06); ell(c, .91, -.36, .035, .035, '#e0304a');
  eye(c, 1.0, -.14, .055); blush(c, .99, -.04, .05); smile(c, 1.03, -.08, .05, '#8a3a2a');
}
function dKraken(c, t) {
  c.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const a0 = Math.PI * (.05 + i / 7 * .9);
    let x = Math.cos(a0) * .45, y = .2 + Math.sin(a0) * .2, ang = a0;
    const pts = [[x, y]];
    for (let k = 0; k < 10; k++) { ang += Math.sin(t * 1.5 + i + k * .4) * .22 + (i < 4 ? -.06 : .06); x += Math.cos(ang) * .12; y += Math.sin(ang) * .12; pts.push([x, y]); }
    for (let k = 0; k < 10; k++) {
      c.strokeStyle = i % 2 ? '#8e2f5e' : '#a13a6c'; c.lineWidth = .22 * (1 - k / 10) + .03;
      c.beginPath(); c.moveTo(pts[k][0], pts[k][1]); c.lineTo(pts[k + 1][0], pts[k + 1][1]); c.stroke();
      if (k % 2 && k < 8) ell(c, pts[k][0], pts[k][1] + .03, .025, .025, '#f4b6cf');
    }
  }
  const g = c.createRadialGradient(-.2, -.6, .1, 0, -.3, .8); g.addColorStop(0, '#c85a8e'); g.addColorStop(1, '#6e1f47');
  c.fillStyle = g; c.beginPath(); c.ellipse(0, -.3, .7, .75, 0, 0, TAU); c.fill();
  for (const [x, y] of [[-.3, -.7], [.25, -.8], [.4, -.45], [-.45, -.35]]) ell(c, x, y, .07, .05, 'rgba(60,10,40,.4)');
  eye(c, -.28, -.1, .17); eye(c, .28, -.1, .17); smile(c, 0, .08, .1, '#3a0a24');
}
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
  return pts[0][1];
}
function dSerpent(c, t) {
  const y0 = serpentBody(c, t, { n: 22, seg: .2, r: .3, amp: .25, c1: '#2e7d6b', c2: '#338a76', belly: '#9fd9b8', spine: '#6fd3b8' });
  c.fillStyle = '#6fd3b8'; c.beginPath(); c.moveTo(.55, y0 - .15); c.lineTo(.3, y0 - .62); c.lineTo(.78, y0 - .2); c.fill();
  ell(c, .82, y0, .36, .26, '#338a76'); ell(c, 1.06, y0 + .05, .2, .15, '#3a9a84');
  eye(c, .9, y0 - .1, .09); smile(c, 1.08, y0 + .02, .07, '#12392f');
}
function dNaga(c, t) {
  const y0 = serpentBody(c, t, { n: 22, seg: .2, r: .3, amp: .25, c1: '#d99a1a', c2: '#f0bd36', belly: '#fbe7a1', spine: '#d63a3a', sparkle: 1 });
  for (let i = 0; i < 3; i++) {
    const x = .52 + i * .13;
    c.fillStyle = i === 1 ? '#f0bd36' : '#e6453a';
    c.beginPath(); c.moveTo(x, y0 - .18); c.quadraticCurveTo(x - .2, y0 - .75 - (i === 1 ? .2 : 0), x + .12, y0 - .82 - (i === 1 ? .15 : 0));
    c.quadraticCurveTo(x + .05, y0 - .45, x + .15, y0 - .2); c.fill();
  }
  ell(c, .82, y0, .36, .26, '#e8ae2a'); ell(c, 1.06, y0 + .05, .2, .15, '#f0bd36');
  ell(c, .92, y0 - .1, .1, .1, '#fff'); ell(c, .94, y0 - .1, .065, .065, '#1fa35c'); ell(c, .96, y0 - .13, .025, .025, '#fff');
  smile(c, 1.08, y0 + .02, .07, '#7a4a08');
}
function dLeviathan(c, t) {
  const y0 = serpentBody(c, t, { n: 26, seg: .2, r: .38, amp: .3, c1: '#153047', c2: '#1a3a55', belly: '#24506e', spine: '#3fb8e8' });
  c.strokeStyle = '#9fb8c8'; c.lineWidth = .06; c.lineCap = 'round';
  c.beginPath(); c.moveTo(.7, y0 - .25); c.quadraticCurveTo(.4, y0 - .6, .15, y0 - .55); c.stroke();
  c.beginPath(); c.moveTo(.85, y0 - .27); c.quadraticCurveTo(.65, y0 - .75, .4, y0 - .78); c.stroke();
  ell(c, .85, y0, .45, .32, '#1a3a55');
  c.fillStyle = '#0a1826'; c.beginPath(); c.moveTo(1.3, y0 + .05); c.quadraticCurveTo(1, y0 + .25, .7, y0 + .14); c.quadraticCurveTo(1, y0 + .12, 1.3, y0 + .05); c.fill();
  c.fillStyle = '#e8f4ff';
  for (let k = 0; k < 4; k++) { const x = 1.2 - k * .12; c.beginPath(); c.moveTo(x, y0 + .08); c.lineTo(x - .04, y0 + .17); c.lineTo(x - .08, y0 + .1); c.fill(); }
  glow(c, 1, y0 - .1, .3, 'rgba(230,255,255,1)', 'rgba(60,200,255,.5)');
  ell(c, 1, y0 - .1, .05, .05, '#fff');
}
function dMegalodon(c, t) {
  const w = Math.sin(t * 6) * .1;
  c.fillStyle = '#55677a';
  c.beginPath(); c.moveTo(-1.1, 0); c.lineTo(-1.6, -.75 + w); c.quadraticCurveTo(-1.4, 0, -1.5, .55 + w); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-.1, -.38); c.lineTo(-.35, -.9); c.quadraticCurveTo(-.4, -.5, -.65, -.33); c.fill();
  const g = c.createLinearGradient(0, -.5, 0, .5); g.addColorStop(0, '#6b7f93'); g.addColorStop(.55, '#8d9fb0'); g.addColorStop(1, '#e6ecf1');
  c.fillStyle = g; c.beginPath(); c.moveTo(1.6, .05); c.bezierCurveTo(1.2, -.55, -.6, -.5, -1.15, 0); c.bezierCurveTo(-.6, .45, 1.1, .6, 1.6, .05); c.fill();
  c.fillStyle = '#2a1418'; c.beginPath(); c.moveTo(1.5, .12); c.quadraticCurveTo(1.15, .45, .9, .26); c.quadraticCurveTo(1.2, .28, 1.5, .12); c.fill();
  c.fillStyle = '#fff';
  for (let k = 0; k < 5; k++) { const x = 1.42 - k * .1, y = .15 + k * .025; c.beginPath(); c.moveTo(x, y); c.lineTo(x - .05, y); c.lineTo(x - .025, y + .08); c.fill(); }
  c.strokeStyle = '#4a5a6a'; c.lineWidth = .03;
  for (const x of [.6, .5, .4]) { c.beginPath(); c.moveTo(x, -.12); c.quadraticCurveTo(x - .05, .02, x, .16); c.stroke(); }
  limb(c, .3, .25, .5, .12, .6 + Math.sin(t * 3) * .1, '#55677a');
  ell(c, 1.15, -.1, .06, .06, '#111'); ell(c, 1.17, -.12, .02, .02, '#fff');
}
function dAnon(c, t) {
  const w = Math.sin(t * .8) * .08;
  c.fillStyle = '#c8871a';
  c.beginPath(); c.moveTo(-1.2, 0); c.quadraticCurveTo(-1.5, -.3, -1.8, -.8 + w); c.quadraticCurveTo(-1.55, 0, -1.8, .8 + w); c.quadraticCurveTo(-1.5, .3, -1.2, 0); c.fill();
  limb(c, -.2, .55, .35, .12, 1.2 + Math.sin(t) * .15, '#c8871a');
  c.fillStyle = '#3f8f4a'; c.beginPath(); c.moveTo(-.75, -.6); c.quadraticCurveTo(-.35, -1.4, .1, -1.0); c.quadraticCurveTo(.4, -1.3, .75, -.6); c.fill();
  c.fillStyle = '#5a3a1a'; c.fillRect(-.2, -1.25, .05, .2); ell(c, -.175, -1.3, .14, .11, '#4fae5a');
  c.fillStyle = '#f0d27a'; c.beginPath(); c.moveTo(.35, -1.02); c.lineTo(.4, -1.3); c.lineTo(.45, -1.02); c.fill();
  c.save();
  const g = c.createLinearGradient(0, -.72, 0, .72); g.addColorStop(0, '#f2c14e'); g.addColorStop(1, '#a86a12');
  c.beginPath(); c.ellipse(0, 0, 1.35, .72, 0, 0, TAU); c.fillStyle = g; c.fill(); c.clip();
  c.strokeStyle = 'rgba(120,70,10,.45)'; c.lineWidth = .03;
  for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) { c.beginPath(); c.arc(-1.2 + i * .2 + (j % 2) * .1, -.6 + j * .22, .12, .2, Math.PI - .2); c.stroke(); }
  c.restore();
  c.strokeStyle = '#e7b54a'; c.lineWidth = .04; c.lineCap = 'round';
  for (const s of [0, 1]) { c.beginPath(); c.moveTo(1.28, .12); for (let k = 1; k <= 6; k++) c.lineTo(1.28 + k * .1, .12 + k * .06 + Math.sin(t * 1.5 + k + s * 2) * .05 + s * .08); c.stroke(); }
  eye(c, .95, -.2, .13); smile(c, 1.2, 0, .08, '#6a3a08'); blush(c, 1.0, .05, .08);
}

/* ================= species ================= */
const SP = [
  { id: 'clown', school: 1, name: 'Clownfish', zone: [.08, .3], cost: 10, inc: .3, size: 2.6, speed: 9, eats: 1, max: 12, draw: dClown, box: [-1.4, -.9, 1, .6],
    fact: 'Lives inside sea anemones. A special slimy coat protects it from their stinging tentacles.' },
  { id: 'angel', school: 1, name: 'Angelfish', zone: [.08, .3], cost: 60, inc: 1.2, size: 2.8, speed: 7, eats: 1, max: 10, draw: dAngel, box: [-1.3, -1.35, .9, 1.35],
    fact: 'Its body is thin and flat like paper, so it can slip through narrow gaps in the coral.' },
  { id: 'puffer', onTap: o => { o.puffT = 2.5; }, name: 'Pufferfish', zone: [.1, .32], cost: 250, inc: 4, size: 2.4, speed: 4, eats: 1, max: 10, draw: dPuffer, box: [-1.3, -1, 1, 1],
    fact: 'When it gets scared, it gulps water until it puffs up like a ball. Try tapping it!' },
  { id: 'turtle', surface: 1, name: 'Sea Turtle', zone: [.06, .3], cost: 900, inc: 12, size: 4.6, speed: 5, eats: 1, max: 8, draw: dTurtle, box: [-1, -.9, 1.4, .9],
    fact: 'It has to come up to breathe, but while resting it can hold its breath for hours.' },
  { id: 'sword', name: 'Swordfish', zone: [.1, .42], cost: 2000, inc: 22, size: 4.4, speed: 10, eats: 1, max: 6, draw: dSword, box: [-1.5, -.85, 1.95, .5],
    fact: 'A super-fast swimmer with a special organ that keeps its eyes and brain warm, so it sees clearly in cold water.' },
  { id: 'jelly', pulse: 1, name: 'Jellyfish', zone: [.2, .55], cost: 3000, inc: 35, size: 3, speed: 2.5, eats: 0, max: 10, draw: dJelly, noflip: 1, box: [-.85, -.75, .85, 1.85],
    fact: 'No brain, no heart, and not a single bone.' },
  { id: 'whaleshark', cruise: 1, name: 'Whale Shark', zone: [.08, .28], cost: 6000, inc: 60, size: 9, speed: 2.5, eats: 1, max: 2, draw: dWhaleShark, box: [-1.6, -.9, 1.1, .6],
    fact: 'The biggest fish in the world, but very gentle. It only eats tiny plankton.' },
  { id: 'squid', name: 'Giant Squid', zone: [.42, .72], cost: 10000, inc: 100, size: 4.8, speed: 5, eats: 0, max: 6, draw: dSquid, box: [-3.3, -.45, 1.95, .45],
    fact: 'It has the biggest eyes of any animal, about the size of a dinner plate.' },
  { id: 'angler', lurk: 1, name: 'Anglerfish', zone: [.64, .86], cost: 30000, inc: 260, size: 3.6, speed: 3, eats: 0, max: 8, draw: dAngler, box: [-1.4, -1.35, 1.6, .8],
    fact: 'A little glowing light hangs from its head to lure prey in the pitch-dark deep sea.' },
  { id: 'seapig', name: 'Sea Pig', zone: [.86, .88], walk: 1, cost: 45000, inc: 330, size: 2.8, speed: 1, eats: 0, max: 8, draw: dSeaPig, box: [-.95, -.8, 1.05, .52],
    fact: 'A pink sea cucumber that walks across the deep sea floor on little tube feet, eating tiny bits of food out of the mud.' },
  { id: 'vampire', name: 'Vampire Squid', zone: [.64, .86], cost: 60000, inc: 420, size: 3, speed: 2, eats: 0, max: 6, draw: dVampire, noflip: 1, box: [-1, -1.05, 1, .95],
    fact: 'Scary name, but it doesn\'t drink blood! It eats tiny bits of food that drift down like snow.' },
  { id: 'gulper', name: 'Gulper Eel', zone: [.62, .86], cost: 90000, inc: 650, size: 3.2, speed: 4, eats: 0, max: 8, draw: dGulper, box: [-3.3, -.75, 1.2, .75],
    fact: 'Its huge mouth opens wide like a bag, and the tip of its tail glows.' },
  { id: 'isopod', name: 'Giant Isopod', zone: [.86, .88], walk: 1, cost: 150000, inc: 1000, size: 3.2, speed: 1.6, eats: 0, max: 6, draw: dIsopod, box: [-1.05, -.35, 1.38, .45],
    fact: 'A deep-sea cousin of the little pill bug, but as long as a shoe! It can survive for years without eating.' },
  { id: 'dumbo', name: 'Dumbo Octopus', zone: [.76, .86], cost: 250000, inc: 1600, size: 3.2, speed: 2, eats: 0, max: 8, draw: dDumbo, noflip: 1, box: [-.95, -.85, .95, .85],
    fact: 'Its two fins look like Dumbo the elephant\'s ears. It lives thousands of meters deep.' },
  { id: 'bloop', name: 'The Bloop', zone: [.74, .8], cost: 1000000, inc: 6000, size: 26, max: 1, draw: dBloop, box: [-2.3, -.9, 1.8, .9],
    pass: { y: .77, secs: 45, msg: 'The Bloop is swimming by!' }, origin: 'A mystery sound from the deep',
    fact: 'In 1997 scientists heard a mysterious sound under the sea, so loud that microphones thousands of kilometers apart picked it up. It was most likely an iceberg cracking. But in this tank, the Bloop is the gentle giant of the deep.' },

  { id: 'mermaid', legend: 1, name: 'Suvannamaccha', zone: [.08, .3], cost: 1e7, inc: 1e4, size: 4.5, speed: 5, eats: 1, max: 1, draw: dMermaid, box: [-1.6, -.7, 1.2, .5],
    origin: 'Thai legend · the Ramakien',
    fact: 'A golden mermaid, half human and half fish, from the Ramakien, the Thai version of the Ramayana. She is the daughter of the demon king Thotsakan.' },
  { id: 'kraken', legend: 1, name: 'Kraken', zone: [.66, .82], cost: 4e7, inc: 3e4, size: 10, speed: 1.5, max: 1, draw: dKraken, noflip: 1, box: [-1.5, -1.1, 1.5, 1.5],
    origin: 'Norwegian sailors\' legend',
    fact: 'Sailors said it was so big that people mistook it for an island. Scientists think the stories may have come from real giant squid.' },
  { id: 'megalodon', legend: 1, name: 'Megalodon', cost: 1.5e8, inc: 8e4, size: 16, max: 1, draw: dMegalodon, box: [-1.6, -.9, 1.6, .7],
    pass: { y: .45, secs: 22, msg: 'Look out! A Megalodon is swimming by' }, origin: 'A real animal, now extinct',
    fact: 'A real giant shark that once lived. It went extinct about 3.6 million years ago, and its teeth were bigger than a grown-up\'s hand.' },
  { id: 'serpent', legend: 1, name: 'Sea Serpent', zone: [.36, .6], cost: 5e8, inc: 2e5, size: 4, speed: 4, max: 1, draw: dSerpent, box: [-3.9, -.9, 1.3, .7],
    origin: 'Old sailors\' tales',
    fact: 'Sailors long ago said they saw giant snakes in the sea. Some stories may have come from the oarfish, a long, flat fish that grows several meters long.' },
  { id: 'naga', legend: 1, name: 'Phaya Naga', zone: [.4, .7], cost: 1.5e9, inc: 5e5, size: 4.5, speed: 4, max: 1, draw: dNaga, box: [-3.9, -1.15, 1.3, .7],
    origin: 'Thai and Lao legend',
    fact: 'A giant serpent from legend, said to live in an underwater city beneath the Mekong River.' },
  { id: 'leviathan', legend: 1, name: 'Leviathan', cost: 5e9, inc: 1.2e6, size: 22, max: 1, draw: dLeviathan, box: [-4.9, -1.1, 1.4, .9],
    pass: { y: .74, secs: 55, msg: 'The Leviathan has woken up...' }, origin: 'An ancient legend, thousands of years old',
    fact: 'A giant sea creature from ancient legends, mentioned in the Bible.' },
  { id: 'anon', legend: 1, name: 'Pla Anon', cost: 2e10, inc: 3e6, size: 24, max: 1, draw: dAnon, box: [-1.8, -1.4, 1.95, .9],
    pass: { y: .86, secs: 80, msg: 'Pla Anon is moving... the seabed is shaking', shake: 1 }, origin: 'Thai legend',
    fact: 'A Thai legend says our whole world rests on the back of this giant fish. When it moves, the earth shakes.' },
];
const BY = Object.fromEntries(SP.map(s => [s.id, s]));

/* ================= decorations (unit space, base at 0,0 on the seabed) ================= */
function ddCoral(c, t) {
  const cols = ['#ff6fb5', '#6ff3ff', '#b58cff'];
  c.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const x0 = (i - 2) * .25, h = .6 + ((i * 37) % 5) / 10, sw = Math.sin(t * .8 + i) * .05, col = cols[i % 3];
    c.strokeStyle = col; c.lineWidth = .08;
    c.beginPath(); c.moveTo(x0, 0); c.quadraticCurveTo(x0 + sw, -h * .5, x0 + sw * 2 + (i - 2) * .08, -h); c.stroke();
    const bx = x0 + sw + (i % 2 ? .18 : -.18);
    c.beginPath(); c.moveTo(x0 + sw * .5, -h * .45); c.lineTo(bx, -h * .72); c.stroke();
    const a = .6 + .4 * Math.sin(t * 2 + i);
    c.globalAlpha *= a; glow(c, x0 + sw * 2 + (i - 2) * .08, -h, .18, '#fff', col); glow(c, bx, -h * .72, .13, '#fff', col); c.globalAlpha /= a;
  }
}
function ddChest(c, t, o) {
  const open = o ? o.open : 0;
  ell(c, 0, .02, .7, .08, 'rgba(0,0,0,.35)');
  c.fillStyle = '#7a4a1c'; c.fillRect(-.5, -.45, 1, .45);
  c.fillStyle = '#d9a441'; c.fillRect(-.5, -.3, 1, .06); c.fillRect(-.35, -.45, .07, .45); c.fillRect(.28, -.45, .07, .45);
  if (open > 0) {
    glow(c, 0, -.5, .9 * open, 'rgba(255,245,200,.95)', 'rgba(255,210,90,.4)');
    for (let i = 0; i < 5; i++) ell(c, -.3 + i * .15, -.47, .07, .07, '#f4f8ff');
  }
  c.save(); c.translate(-.5, -.45); c.rotate(-open * 1.1);
  c.fillStyle = '#8a5522'; c.beginPath(); c.moveTo(0, 0); c.lineTo(1, 0); c.quadraticCurveTo(1, -.35, .5, -.35); c.quadraticCurveTo(0, -.35, 0, 0); c.fill();
  c.fillStyle = '#d9a441'; c.fillRect(.15, -.33, .07, .33); c.fillRect(.78, -.33, .07, .33);
  c.restore();
  c.fillStyle = '#ffd35a'; c.fillRect(-.07, -.4, .14, .14);
}
function ddShip(c, t) {
  c.save(); c.rotate(-.12);
  c.strokeStyle = '#3b2a1e'; c.lineWidth = .07; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -.55); c.lineTo(.1, -1.5); c.stroke();
  c.beginPath(); c.moveTo(.55, -.55); c.lineTo(.72, -1.05); c.stroke();
  c.fillStyle = 'rgba(200,190,160,.3)'; c.beginPath(); c.moveTo(.1, -1.42); c.lineTo(.55, -1.25 + Math.sin(t * .7) * .03); c.lineTo(.42, -.82); c.lineTo(.07, -.86); c.fill();
  c.fillStyle = '#34251a'; c.fillRect(-.75, -.8, .5, .27);
  c.fillStyle = '#3b2a1e'; c.beginPath(); c.moveTo(-1.05, -.52); c.lineTo(1.15, -.57); c.lineTo(.82, 0); c.lineTo(-.85, 0); c.closePath(); c.fill();
  c.strokeStyle = '#271b12'; c.lineWidth = .02;
  for (const y of [-.38, -.22, -.08]) { c.beginPath(); c.moveTo(-.95, y); c.lineTo(1.05, y - .03); c.stroke(); }
  for (let i = 0; i < 4; i++) { const x = -.5 + i * .35; ell(c, x, -.33, .06, .06, '#0d1a26'); ell(c, x, -.33, .03, .03, `rgba(140,230,255,${.25 + .25 * Math.sin(t + i)})`); }
  c.strokeStyle = '#2f6b4a'; c.lineWidth = .04;
  for (let i = 0; i < 4; i++) { const x = -.6 + i * .45; c.beginPath(); c.moveTo(x, -.5); c.quadraticCurveTo(x + Math.sin(t + i) * .06, -.3, x + .03, -.12); c.stroke(); }
  c.restore();
}
function ddVent(c, t) {
  for (let k = 0; k < 12; k++) {
    const p = (t * .22 + k / 12) % 1, y = -1.1 - p * 2.2, x = Math.sin(p * 6 + k) * .25 * p, r = .15 + p * .45;
    ell(c, x, y, r, r, `rgba(15,15,22,${.5 * (1 - p)})`);
  }
  glow(c, 0, -1.1, .4, 'rgba(255,190,110,.95)', 'rgba(255,90,30,.35)');
  c.fillStyle = '#2b2a2e'; c.beginPath(); c.moveTo(-.5, 0); c.lineTo(-.18, -1.1); c.lineTo(.18, -1.1); c.lineTo(.5, 0); c.fill();
  for (const [x, y] of [[-.2, -.3], [.15, -.55], [-.05, -.8], [.25, -.2]]) ell(c, x, y, .1, .06, '#38363c');
  for (const x of [-.7, -.6, .65, .75]) { c.strokeStyle = '#e8e2d0'; c.lineWidth = .05; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, -.25); c.stroke(); ell(c, x, -.28, .06, .05, '#e0413a'); }
}
function ddCastle(c, t) {
  glow(c, 0, -1, 1.6, 'rgba(120,255,220,.25)', 'rgba(60,200,180,.1)');
  c.fillStyle = '#1f4a5a'; c.fillRect(-1.25, -.25, 2.5, .25);
  for (const s of [-1, 1]) {
    c.fillStyle = '#2a6272'; c.fillRect(s * 1 - .18, -.9, .36, .65);
    c.fillStyle = '#c9962a'; c.beginPath(); c.moveTo(s * 1 - .24, -.9); c.lineTo(s * 1 + .24, -.9); c.lineTo(s * 1, -1.5); c.fill();
  }
  c.fillStyle = '#2a6272'; c.fillRect(-.7, -.82, 1.4, .57);
  c.fillStyle = '#c9962a';
  c.beginPath(); c.moveTo(-.85, -.8); c.lineTo(.85, -.8); c.lineTo(0, -1.2); c.fill();
  c.beginPath(); c.moveTo(-.6, -1.08); c.lineTo(.6, -1.08); c.lineTo(0, -1.45); c.fill();
  c.fillStyle = '#e0b23a'; c.beginPath(); c.moveTo(-.16, -1.38); c.quadraticCurveTo(-.1, -2, 0, -2.45); c.quadraticCurveTo(.1, -2, .16, -1.38); c.fill();
  glow(c, 0, -.45, .45, 'rgba(160,255,235,.9)', 'rgba(60,200,180,.35)');
  c.fillStyle = '#0d2a33'; c.beginPath(); c.moveTo(-.16, -.25); c.lineTo(-.16, -.52); c.quadraticCurveTo(0, -.72, .16, -.52); c.lineTo(.16, -.25); c.fill();
  for (const x of [-.45, .45, -1, 1]) ell(c, x, -.55, .05, .07, `rgba(160,255,235,${.5 + .4 * Math.sin(t * 1.5 + x * 3)})`);
}
const DECOR = [
  { id: 'coral', name: 'Glowing Coral', cost: 5000, bonus: .05, xs: [.07, .4, .77], size: 6, draw: ddCoral, box: [-.8, -1.25, .8, .1],
    desc: 'Many deep-sea creatures make their own light, because sunlight can\'t reach that deep.' },
  { id: 'chest', name: 'Treasure Chest', cost: 50000, bonus: 0, xs: [.53], size: 5, draw: ddChest, box: [-.75, -1.2, .9, .12],
    desc: 'Pops open every now and then, and pearls come spilling out.' },
  { id: 'ship', name: 'Shipwreck', cost: 5e5, bonus: .10, xs: [.24], size: 11, draw: ddShip, box: [-1.2, -1.6, 1.3, .2],
    desc: 'An old ship that sank to the seabed and became a new home for sea creatures.' },
  { id: 'vent', name: 'Hydrothermal Vent', cost: 5e6, bonus: .15, xs: [.93], size: 7, draw: ddVent, box: [-.9, -3.4, .9, .1],
    desc: 'A hot spring deep under the sea. The water shooting out is hotter than boiling, yet animals still live all around it.' },
  { id: 'castle', name: 'Naga City', cost: 1e8, bonus: .25, xs: [.62], size: 9, draw: ddCastle, box: [-1.4, -2.5, 1.4, .1],
    desc: 'The underwater city of the Phaya Naga from Thai legend.' },
];


/* ================= cel-shaded art (trial) =================
   A second way to draw some animals and decorations: real outlines made of curves, flat colours only,
   three tones per colour (mid, a dark shape on the shadow side, a small light shape where the light hits),
   light always from the top left, thin darker lines for detail. No gradients and no see-through colours.
   Turned on with ?art=cel in the address; the old drawings stay the default until Job decides. */
const ART_CEL = typeof location !== 'undefined' && new URLSearchParams(location.search).get('art') === 'cel';
// Paint a shape twice: all of it in the normal palette, then only its shadow side (below the curve) in the dark palette.
function celShade(c, shadowPath, paint, pal) {
  paint(c, pal.mid);
  c.save(); shadowPath(c); c.clip(); paint(c, pal.dark); c.restore();
}
function strokePath(c, path, col, w) { c.strokeStyle = col; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; path(c); c.stroke(); }

/* ---- clownfish ---- */
const CLOWN = {
  mid: { body: '#ff7a1a', band: '#ffffff', edge: '#1b1b1b', fin: '#ff8f33' },
  dark: { body: '#d9560a', band: '#d6dce6', edge: '#111111', fin: '#d9640f' },
  light: '#ffb070', line: '#b84a08',
};
function clownBody(c) {
  c.beginPath(); c.moveTo(1, .02);
  c.bezierCurveTo(.95, -.38, .45, -.58, -.1, -.55);
  c.bezierCurveTo(-.55, -.52, -.82, -.3, -.9, -.08);
  c.lineTo(-.9, .1);
  c.bezierCurveTo(-.8, .32, -.45, .52, 0, .52);
  c.bezierCurveTo(.5, .52, .95, .38, 1, .02);
  c.closePath();
}
function clownBand(c, x, w, bend) {
  c.beginPath(); c.moveTo(x - w / 2, -.7);
  c.quadraticCurveTo(x - w / 2 + bend, 0, x - w / 2, .7);
  c.lineTo(x + w / 2, .7);
  c.quadraticCurveTo(x + w / 2 + bend, 0, x + w / 2, -.7);
  c.closePath();
}
function clownShadowSide(c) { c.beginPath(); c.moveTo(-1.5, .12); c.bezierCurveTo(-.4, .3, .5, .28, 1.2, .1); c.lineTo(1.2, 1); c.lineTo(-1.5, 1); c.closePath(); }
function dClownCel(c, t) {
  const w = Math.sin(t * 10) * .12, flap = Math.sin(t * 9) * .35;
  // tail: two rounded lobes with a black rim
  const tailPath = c2 => { c2.beginPath(); c2.moveTo(-.82, 0); c2.bezierCurveTo(-1.05, -.2, -1.2, -.52 + w, -1.4, -.5 + w); c2.bezierCurveTo(-1.33, -.2 + w * .5, -1.3, -.05 + w * .5, -1.2, 0 + w * .5);
    c2.bezierCurveTo(-1.3, .05 + w * .5, -1.33, .2 + w * .5, -1.4, .5 + w); c2.bezierCurveTo(-1.2, .52 + w, -1.05, .2, -.82, 0); c2.closePath(); };
  celShade(c, clownShadowSide, (c2, p) => { c2.fillStyle = p.fin; tailPath(c2); c2.fill(); }, CLOWN);
  strokePath(c, tailPath, '#1b1b1b', .05);
  strokePath(c, c2 => { c2.beginPath(); c2.moveTo(-.95, 0); c2.lineTo(-1.3, -.35 + w); c2.moveTo(-.95, .02); c2.lineTo(-1.3, .35 + w); }, CLOWN.line, .025);
  // dorsal fin: soft leaf shape
  const dorsal = c2 => { c2.beginPath(); c2.moveTo(-.55, -.5); c2.bezierCurveTo(-.4, -.95, .05, -.95, .35, -.5); c2.closePath(); };
  c.fillStyle = CLOWN.mid.fin; dorsal(c); c.fill();
  strokePath(c, dorsal, '#1b1b1b', .05);
  strokePath(c, c2 => { c2.beginPath(); for (const x of [-.35, -.15, .05]) { c2.moveTo(x, -.55); c2.lineTo(x + .05, -.82); } }, CLOWN.line, .022);
  // body with bands, shadow side redrawn darker
  const paintBody = (c2, p) => {
    c2.save(); clownBody(c2); c2.clip();
    c2.fillStyle = p.body; c2.fillRect(-1, -1, 2.2, 2);
    for (const [x, bw] of [[.38, .26], [-.3, .28]]) { c2.fillStyle = p.edge; clownBand(c2, x, bw + .07, .06); c2.fill(); c2.fillStyle = p.band; clownBand(c2, x, bw, .06); c2.fill(); }
    c2.restore();
  };
  celShade(c, clownShadowSide, paintBody, CLOWN);
  // light: a small shape along the top of the head
  c.save(); clownBody(c); c.clip();
  c.fillStyle = CLOWN.light; c.beginPath(); c.moveTo(.55, -.42); c.bezierCurveTo(.72, -.4, .86, -.3, .9, -.18); c.bezierCurveTo(.8, -.26, .7, -.32, .55, -.36); c.closePath(); c.fill();
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-.4, -.49); c.bezierCurveTo(-.3, -.53, -.22, -.53, -.16, -.5); c.lineTo(-.2, -.46); c.bezierCurveTo(-.28, -.48, -.35, -.47, -.4, -.45); c.closePath(); c.fill();
  c.restore();
  strokePath(c, clownBody, CLOWN.line, .045);
  // pectoral fin, flapping, with rays
  c.save(); c.translate(.12, .12); c.rotate(.5 + flap);
  const pec = c2 => { c2.beginPath(); c2.moveTo(0, 0); c2.bezierCurveTo(.1, -.12, .38, -.1, .42, 0); c2.bezierCurveTo(.38, .1, .1, .12, 0, 0); c2.closePath(); };
  c.fillStyle = CLOWN.dark.fin; pec(c); c.fill();
  strokePath(c, pec, '#1b1b1b', .035);
  c.restore();
  // eye and smile
  ell(c, .66, -.14, .13, .13, '#1b1b1b'); ell(c, .7, -.18, .04, .04, '#ffffff');
  strokePath(c, c2 => { c2.beginPath(); c2.moveTo(.86, .1); c2.quadraticCurveTo(.92, .16, .98, .1); }, '#7a2e06', .035);
}

/* ---- whale shark ---- */
const WSH = {
  mid: { back: '#4f7396', belly: '#dfe8f0', fin: '#446688' },
  dark: { back: '#3a5a7a', belly: '#b8c6d4', fin: '#34506e' },
  light: '#7898b8', line: '#2c4560', spot: '#f2f6fa',
};
function wsBody(c) {
  c.beginPath(); c.moveTo(1.08, .02);
  c.bezierCurveTo(1.06, -.32, .7, -.55, .1, -.56);
  c.bezierCurveTo(-.5, -.56, -.9, -.3, -1.05, -.05);
  c.lineTo(-1.05, .05);
  c.bezierCurveTo(-.85, .28, -.4, .48, .15, .46);
  c.bezierCurveTo(.7, .44, 1.04, .3, 1.08, .02);
  c.closePath();
}
function wsBellyLine(c) { c.beginPath(); c.moveTo(-1.2, .1); c.bezierCurveTo(-.4, .08, .5, .18, 1.2, .08); c.lineTo(1.2, 1); c.lineTo(-1.2, 1); c.closePath(); }
function wsShadowSide(c) { c.beginPath(); c.moveTo(-1.2, .28); c.bezierCurveTo(-.3, .38, .6, .38, 1.2, .22); c.lineTo(1.2, 1); c.lineTo(-1.2, 1); c.closePath(); }
function dWhaleSharkCel(c, t) {
  const w = Math.sin(t * 4) * .1, flap = Math.sin(t * 2) * .2;
  // tail: tall crescent, upper lobe longer
  const tail = c2 => { c2.beginPath(); c2.moveTo(-.98, 0); c2.bezierCurveTo(-1.15, -.2, -1.35, -.6 + w, -1.55, -.88 + w); c2.bezierCurveTo(-1.48, -.45 + w, -1.4, -.15, -1.36, .02);
    c2.bezierCurveTo(-1.4, .18, -1.45, .38 + w, -1.45, .52 + w); c2.bezierCurveTo(-1.28, .35 + w, -1.12, .18, -.98, 0); c2.closePath(); };
  celShade(c, c2 => { c2.beginPath(); c2.moveTo(-2, .02); c2.lineTo(-.9, .02); c2.lineTo(-.9, 1); c2.lineTo(-2, 1); c2.closePath(); }, (c2, p) => { c2.fillStyle = p.fin; tail(c2); c2.fill(); }, WSH);
  strokePath(c, tail, WSH.line, .03);
  // dorsal fin
  const dorsal = c2 => { c2.beginPath(); c2.moveTo(-.1, -.5); c2.bezierCurveTo(-.2, -.7, -.38, -.86, -.48, -.84); c2.bezierCurveTo(-.5, -.7, -.55, -.58, -.66, -.44); c2.closePath(); };
  celShade(c, c2 => { c2.beginPath(); c2.moveTo(-.3, -1); c2.lineTo(0, -1); c2.lineTo(0, 0); c2.lineTo(-.3, 0); c2.closePath(); }, (c2, p) => { c2.fillStyle = p.fin; dorsal(c2); c2.fill(); }, WSH);
  strokePath(c, dorsal, WSH.line, .03);
  // body: blue back, pale belly, each with its own shadow tone
  const paint = (c2, p) => {
    c2.save(); wsBody(c2); c2.clip();
    c2.fillStyle = p.back; c2.fillRect(-1.2, -1, 2.4, 2);
    c2.fillStyle = p.belly; wsBellyLine(c2); c2.fill();
    c2.restore();
  };
  celShade(c, wsShadowSide, paint, WSH);
  c.save(); wsBody(c); c.clip();
  // light along the top of the back
  c.fillStyle = WSH.light; c.beginPath(); c.moveTo(.8, -.36); c.bezierCurveTo(.5, -.52, 0, -.54, -.45, -.46); c.bezierCurveTo(0, -.47, .45, -.45, .8, -.3); c.closePath(); c.fill();
  // ridges and the famous white spots
  strokePath(c, c2 => { c2.beginPath(); c2.moveTo(-.9, -.12); c2.bezierCurveTo(-.3, -.3, .3, -.3, .9, -.12); c2.moveTo(-.9, .0); c2.bezierCurveTo(-.3, -.12, .3, -.12, .95, 0); }, WSH.line, .018);
  for (let i = 0; i < 11; i++) for (let j = 0; j < 3; j++) {
    const x = -.85 + i * .17 + (j % 2) * .08, y = -.4 + j * .14;
    if (y > .08) continue;
    ell(c, x, y, .03, .03, WSH.spot);
  }
  c.restore();
  strokePath(c, wsBody, WSH.line, .035);
  // gill slits, mouth, eye
  strokePath(c, c2 => { c2.beginPath(); for (const x of [.62, .55, .48]) { c2.moveTo(x, -.18); c2.quadraticCurveTo(x - .04, -.04, x, .1); } }, WSH.line, .02);
  strokePath(c, c2 => { c2.beginPath(); c2.moveTo(1.06, .12); c2.quadraticCurveTo(.9, .2, .72, .16); }, '#1c2e44', .035);
  ell(c, .8, -.12, .06, .06, '#1c2e44'); ell(c, .82, -.14, .02, .02, '#ffffff');
  // pectoral fin
  c.save(); c.translate(.2, .25); c.rotate(.65 + flap);
  const pec = c2 => { c2.beginPath(); c2.moveTo(0, 0); c2.bezierCurveTo(.08, -.14, .45, -.12, .6, 0); c2.bezierCurveTo(.4, .08, .12, .1, 0, 0); c2.closePath(); };
  c.fillStyle = WSH.dark.fin; pec(c); c.fill(); strokePath(c, pec, WSH.line, .03);
  c.restore();
}

/* ---- treasure chest (sits on the sand, casts a flat shadow) ---- */
const CHEST = {
  mid: { wood: '#8a5a2b', gold: '#e0a83a' }, dark: { wood: '#6b4220', gold: '#b8832a' },
  light: { wood: '#a8743c', gold: '#f7d27a' }, line: '#4e2f14', sandShadow: '#0e1b29',
};
function ddChestCel(c, t, o) {
  const open = o ? o.open : 0;
  c.fillStyle = CHEST.sandShadow; c.beginPath(); c.moveTo(-.72, .02); c.bezierCurveTo(-.6, .12, .5, .14, .78, .04); c.bezierCurveTo(.5, -.04, -.5, -.05, -.72, .02); c.fill();
  // box: front face in mid wood, right end in dark wood, planks and gold bands
  const front = c2 => { c2.beginPath(); c2.moveTo(-.52, -.45); c2.lineTo(.42, -.45); c2.lineTo(.44, 0); c2.lineTo(-.5, 0); c2.closePath(); };
  const side = c2 => { c2.beginPath(); c2.moveTo(.42, -.45); c2.lineTo(.54, -.47); c2.lineTo(.56, -.04); c2.lineTo(.44, 0); c2.closePath(); };
  c.fillStyle = CHEST.mid.wood; front(c); c.fill();
  c.fillStyle = CHEST.dark.wood; side(c); c.fill();
  c.fillStyle = CHEST.light.wood; c.beginPath(); c.moveTo(-.5, -.43); c.lineTo(.4, -.43); c.lineTo(.4, -.39); c.lineTo(-.5, -.39); c.closePath(); c.fill();
  strokePath(c, c2 => { c2.beginPath(); c2.moveTo(-.5, -.22); c2.lineTo(.43, -.22); }, CHEST.line, .02);
  for (const x of [-.36, .26]) { c.fillStyle = CHEST.mid.gold; c.fillRect(x, -.45, .08, .45); c.fillStyle = CHEST.dark.gold; c.fillRect(x + .05, -.45, .03, .45); }
  strokePath(c, front, CHEST.line, .03); strokePath(c, side, CHEST.line, .03);
  // pearls piled inside when it opens (solid, no glow)
  if (open > 0) {
    for (let i = 0; i < 6; i++) { const x = -.36 + i * .14, y = -.48 - (i % 2) * .06; ell(c, x, y, .075, .075, '#e8eef6'); ell(c, x - .025, y - .025, .025, .025, '#ffffff'); }
    for (let i = 0; i < 5; i++) { const a = -Math.PI * (.2 + i * .15), r = .55 + open * .15; strokePath(c, c2 => { c2.beginPath(); c2.moveTo(Math.cos(a) * .4, -.5 + Math.sin(a) * .4); c2.lineTo(Math.cos(a) * r, -.5 + Math.sin(a) * r); }, '#ffe9a8', .035); }
  }
  // lid: curved top, hinged at the back
  c.save(); c.translate(-.52, -.45); c.rotate(-open * 1.1);
  const lid = c2 => { c2.beginPath(); c2.moveTo(0, 0); c2.lineTo(.94, 0); c2.bezierCurveTo(.96, -.2, .8, -.34, .47, -.34); c2.bezierCurveTo(.14, -.34, -.02, -.2, 0, 0); c2.closePath(); };
  c.fillStyle = CHEST.mid.wood; lid(c); c.fill();
  c.save(); lid(c); c.clip(); c.fillStyle = CHEST.dark.wood; c.fillRect(.6, -.4, .5, .5); c.fillStyle = CHEST.light.wood; c.beginPath(); c.moveTo(.2, -.26); c.bezierCurveTo(.3, -.32, .5, -.33, .62, -.3); c.lineTo(.6, -.26); c.bezierCurveTo(.48, -.29, .32, -.28, .22, -.22); c.closePath(); c.fill(); c.restore();
  c.save(); lid(c); c.clip(); for (const x of [.16, .74]) { c.fillStyle = CHEST.mid.gold; c.fillRect(x, -.4, .08, .4); c.fillStyle = CHEST.dark.gold; c.fillRect(x + .05, -.4, .03, .4); } c.restore();
  strokePath(c, lid, CHEST.line, .03);
  c.restore();
  // lock
  c.fillStyle = CHEST.mid.gold; c.fillRect(-.09, -.42, .16, .16); c.fillStyle = CHEST.dark.gold; c.fillRect(-.09, -.3, .16, .04);
  ell(c, -.01, -.35, .025, .025, CHEST.line);
}
if (ART_CEL) {
  BY.clown.draw = dClownCel;
  BY.whaleshark.draw = dWhaleSharkCel;
  DECOR.find(d => d.id === 'chest').draw = ddChestCel;
}

/* ================= scenery ================= */
// Same seed in both windows, so the ground and plants line up across the screen edge.
function buildScene() {
  const r = mulberry32(20260924), sr = (a, b) => a + r() * (b - a);
  const n = 18 * WORLD_SCREENS;
  seabed = [];
  for (let i = 0; i <= n; i++) seabed.push({ x: WW * i / n, y: H * SEABED + Math.sin(i * 1.3) * u * 1.6 + sr(-1, 1) * u * 1.2 });
  rocks = [];
  for (let i = 0; i < 7 * WORLD_SCREENS; i++) { const x = sr(0, WW); rocks.push({ x, y: seabedY(x) + u, rx: sr(3, 7) * u, ry: sr(1.5, 3) * u }); }
  plants = [];
  for (let i = 0; i < 4 * WORLD_SCREENS; i++) {
    const x = sr(.02, .98) * WW, tubes = [];
    for (let k = 0; k < 5; k++) tubes.push({ dx: sr(-2.5, 2.5) * u, h: sr(3, 7) * u, ph: sr(0, 9) });
    plants.push({ kind: 'worm', x, tubes });
  }
  for (let i = 0; i < 6 * WORLD_SCREENS; i++) plants.push({ kind: 'pen', x: sr(.01, .99) * WW, h: sr(4, 9) * u, ph: sr(0, 9) });
  rays = [];
  for (let i = 0; i < 6 * WORLD_SCREENS; i++) rays.push({ x: sr(0, WW), w: sr(3, 8) * u, ph: sr(0, 9) });
  vents = [.12, .5, .83].map(f => WW * f);
  snow = [];
  for (let i = 0; i < 140 * WORLD_SCREENS; i++) snow.push({ x: rand(0, WW), y: rand(0, H), r: rand(.6, 1.8), v: rand(3, 10) });
  bubbles = [];
  buildAtmosphere();
}
function zoneName(sp) {
  const m = (sp.zone[0] + sp.zone[1]) / 2;
  return m < .33 ? 'Sunlight zone · 0–200 meters' : m < .62 ? 'Twilight zone · 200–1,000 meters' : 'Midnight zone · deeper than 1,000 meters';
}

/* ================= environment ================= */
function drawWater(viewX) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#3aa7d8'); g.addColorStop(.18, '#1a78b0'); g.addColorStop(.36, '#0c4a78');
  g.addColorStop(.62, '#062038'); g.addColorStop(1, '#01060d');
  ctx.fillStyle = g; ctx.fillRect(viewX - u * 5, -u * 5, VW / vs + u * 10, H + u * 10);
  ctx.setLineDash([u, u * 1.5]); ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 1;
  for (const y of [.33, .62]) { ctx.beginPath(); ctx.moveTo(viewX, H * y); ctx.lineTo(viewX + VW / vs, H * y); ctx.stroke(); }
  ctx.setLineDash([]);
}
function drawSeabed() {
  const sg = ctx.createLinearGradient(0, H * SEABED - u * 3, 0, H);
  sg.addColorStop(0, '#172a3c'); sg.addColorStop(1, '#050a12');
  ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(0, H + u * 5); ctx.lineTo(seabed[0].x, seabed[0].y);
  for (let i = 1; i < seabed.length; i++) {
    const a = seabed[i - 1], c = seabed[i];
    ctx.quadraticCurveTo(a.x, a.y, (a.x + c.x) / 2, (a.y + c.y) / 2);
  }
  ctx.lineTo(WW, seabed[seabed.length - 1].y); ctx.lineTo(WW, H + u * 5); ctx.fill();
  for (const r of rocks) ell(ctx, r.x, r.y, r.rx, r.ry, '#0f1e2d');
}
function drawRays(t) {
  ctx.globalCompositeOperation = 'lighter';
  for (const r of rays) {
    const sw = Math.sin(t * .2 + r.ph) * W * .03, a = .07 + .04 * Math.sin(t * .5 + r.ph);
    const g = ctx.createLinearGradient(0, 0, 0, H * .55);
    g.addColorStop(0, `rgba(180,230,255,${a})`); g.addColorStop(1, 'rgba(180,230,255,0)');
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(r.x + sw - r.w / 2, 0); ctx.lineTo(r.x + sw + r.w / 2, 0);
    ctx.lineTo(r.x + sw * 2 + r.w * 1.6, H * .55); ctx.lineTo(r.x + sw * 2 - r.w * .6, H * .55); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
}
function drawPlants(t) {
  for (const p of plants) {
    if (p.kind === 'worm') {
      for (const tb of p.tubes) {
        const bx = p.x + tb.dx, by = seabedY(bx) + u * .5, sw = Math.sin(t * .8 + tb.ph) * u * .8;
        const tx = bx + sw, ty = by - tb.h;
        ctx.strokeStyle = '#cfc7b4'; ctx.lineWidth = u * .5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx, by - tb.h * .5, tx, ty); ctx.stroke();
        for (let j = 0; j < 5; j++) {
          const a = -Math.PI / 2 + (j - 2) * .35 + Math.sin(t * 1.5 + tb.ph) * .15;
          ell(ctx, tx + Math.cos(a) * u * .8, ty + Math.sin(a) * u * .8, u * .9, u * .25, '#e0413a', a);
        }
      }
    } else {
      const by = seabedY(p.x) + u * .5, sw = Math.sin(t * .6 + p.ph) * u;
      ctx.strokeStyle = 'rgba(120,230,255,.35)'; ctx.lineWidth = u * .25;
      ctx.beginPath(); ctx.moveTo(p.x, by); ctx.quadraticCurveTo(p.x, by - p.h * .6, p.x + sw, by - p.h); ctx.stroke();
      for (let k = 1; k <= 5; k++) {
        const f = k / 5.5;
        ctx.globalAlpha = .4 + .6 * Math.max(0, Math.sin(t * 2 - k * .8 + p.ph));
        ell(ctx, p.x + sw * f * f, by - p.h * f, u * .45, u * .45, '#8ff0ff');
      }
      ctx.globalAlpha = 1;
    }
  }
}
function drawLabels() {
  ctx.font = `${Math.max(12, u * 1.5)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(255,255,255,.3)';
  const x = VW / vs - u * 2;
  ctx.fillText('Sunlight zone · 0–200 m', x, H * .33 - u);
  ctx.fillText('Twilight zone · 200–1,000 m', x, H * .62 - u);
  ctx.fillText('Midnight zone · deeper than 1,000 m', x, H * .62 + u * 3);
}

/* ================= shared cosmetic updates (both windows run these on their own) ================= */
let bubbleT = 0;
function updCosmetics(dt, t) {
  updNear(dt);
  bubbleT -= dt;
  if (bubbleT <= 0) { bubbleT = rand(.08, .25); const vx = vents[Math.floor(Math.random() * vents.length)]; bubbles.push({ x: vx + rand(-1, 1) * u, y: seabedY(vx), r: rand(.3, 1) * u, ph: rand(0, 9) }); }
  for (const b of bubbles) { b.y -= u * (6 + b.r / u * 6) * dt; b.x += Math.sin(t * 3 + b.ph) * u * .6 * dt; }
  bubbles = bubbles.filter(b => b.y > -10);
  for (const s of snow) { s.y += s.v * dt; s.x += Math.sin(t * .5 + s.v) * 3 * dt; if (s.y > H) { s.y = -2; s.x = rand(0, WW); } }
}

/* ================= drawing one window's slice of the world ================= */
/* ================= atmosphere =================
   Depth comes from parallax: far rock layers slide slower than the tank as the camera pans, the
   foreground slides faster. A layer with factor f is drawn at world x = layerX + viewX * (1 - f). */
let far = null, mid = null, fore = null, near = [], causticTile = null, causticPat = null, dotSprite = null;
function makeRidge(r, f, count, hMin, hMax, wMin, wMax, top, bottom) {
  const span = WW * f + W * 1.4, peaks = [];
  for (let i = 0; i < count; i++) {
    const x = -W * .2 + r() * span, w = (wMin + r() * (wMax - wMin)) * W, h = (hMin + r() * (hMax - hMin)) * H;
    const pts = [];
    for (let k = 0; k <= 8; k++) {
      const fx = k / 8, bump = Math.sin(fx * Math.PI);
      pts.push([x - w / 2 + fx * w, H - h * Math.pow(bump, .7) * (.75 + r() * .35)]);
    }
    peaks.push(pts);
  }
  return { f, peaks, top, bottom };
}
function buildAtmosphere() {
  const r = mulberry32(4242);
  far = makeRidge(r, .35, 5 * WORLD_SCREENS, .25, .62, .12, .3, 'rgba(40,110,160,.28)', 'rgba(4,22,40,.92)');
  far.school = { y: H * .22, n: 36, seed: 9 };
  mid = makeRidge(r, .65, 4 * WORLD_SCREENS, .14, .34, .1, .22, 'rgba(14,52,86,.55)', 'rgba(2,10,20,.97)');
  fore = makeRidge(r, 1.35, 2 * WORLD_SCREENS, .06, .14, .12, .22, 'rgba(1,5,10,.9)', 'rgba(0,2,5,1)');
  near = [];
  for (let i = 0; i < 45 * WORLD_SCREENS; i++) near.push({ x: rand(0, WW * 1.35 + W), y: rand(0, H), r: rand(.4, 1.1) * u, v: rand(2, 6) * u, ph: rand(0, 9) });
  if (!causticTile) {
    const s = 256, c = document.createElement('canvas'); c.width = c.height = s;
    const g = c.getContext('2d'), cr = mulberry32(7);
    g.filter = 'blur(1.2px)'; g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 1.8;
    for (let i = 0; i < 46; i++) {
      const x = cr() * s, y = cr() * s, rad = 10 + cr() * 28, sq = .5 + cr() * .5, rot = cr() * 3;
      for (const ox of [-s, 0, s]) for (const oy of [-s, 0, s]) { g.beginPath(); g.ellipse(x + ox, y + oy, rad, rad * sq, rot, 0, TAU); g.stroke(); }
    }
    causticTile = c;
    const d = document.createElement('canvas'); d.width = d.height = 32;
    const dg = d.getContext('2d'), gr = dg.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, 'rgba(220,245,255,.55)'); gr.addColorStop(1, 'rgba(220,245,255,0)');
    dg.fillStyle = gr; dg.fillRect(0, 0, 32, 32); dotSprite = d;
  }
  causticPat = null;
}
function drawLayer(L, viewX, t) {
  if (!L) return;
  ctx.save(); ctx.translate(viewX * (1 - L.f), 0);
  const lx0 = viewX * L.f - W * .4, lx1 = viewX * L.f + VW / vs + W * .4;
  if (L.school) {
    // A far-off school of little fish drifting across the sunlit water, grey-blue from the distance.
    const sc = L.school, cx = ((t * u * 2.2) % (WW * L.f + W * 1.4)) - W * .2, sr = mulberry32(sc.seed);
    ctx.fillStyle = 'rgba(30,80,120,.55)';
    for (let i = 0; i < sc.n; i++) {
      const a = sr() * TAU, d = sr() * u * 9, ph = sr() * 9;
      const x = cx + Math.cos(a + t * .15) * d * 1.8, y = sc.y + Math.sin(a + t * .15) * d * .6 + Math.sin(t + ph) * u * .3;
      if (x < lx0 || x > lx1) continue;
      ctx.beginPath(); ctx.moveTo(x + u * .7, y); ctx.lineTo(x - u * .4, y - u * .28); ctx.lineTo(x - u * .4, y + u * .28); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - u * .35, y); ctx.lineTo(x - u * .75, y - u * .22); ctx.lineTo(x - u * .75, y + u * .22); ctx.fill();
    }
  }
  const g = ctx.createLinearGradient(0, H * .35, 0, H);
  g.addColorStop(0, L.top); g.addColorStop(1, L.bottom);
  ctx.fillStyle = g;
  for (const pts of L.peaks) {
    if (pts[8][0] < lx0 || pts[0][0] > lx1) continue;
    ctx.beginPath(); ctx.moveTo(pts[0][0], H + u * 6);
    for (const [x, y] of pts) ctx.lineTo(x, y);
    ctx.lineTo(pts[8][0], H + u * 6); ctx.fill();
  }
  ctx.restore();
}
// Rippling light net on the sunlit water, two layers drifting against each other.
function drawCaustics(viewX, t) {
  if (!causticPat) causticPat = ctx.createPattern(causticTile, 'repeat');
  const w = VW / vs, band = H * .065;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const [sc, dx, dy] of [[26, .7, .25], [34, -.5, .4]]) {
    const k = sc * u / 256;
    causticPat.setTransform(new DOMMatrix([k, 0, 0, k, t * u * dx, t * u * dy]));
    ctx.fillStyle = causticPat;
    for (let i = 0; i < 6; i++) { ctx.globalAlpha = .055 * (1 - i / 6); ctx.fillRect(viewX, i * band, w, band); }
  }
  ctx.restore();
}
// Out-of-focus specks right in front of the glass; they slide faster than the tank when the camera moves.
function drawNear(viewX) {
  const f = 1.35, lx0 = viewX * f - 40, lx1 = viewX * f + VW / vs + 40;
  ctx.save(); ctx.translate(viewX * (1 - f), 0);
  for (const p of near) {
    if (p.x < lx0 || p.x > lx1) continue;
    const s = p.r * 6; ctx.globalAlpha = .35 + .25 * Math.sin(T * .7 + p.ph);
    ctx.drawImage(dotSprite, p.x - s / 2, p.y - s / 2, s, s);
  }
  ctx.restore(); ctx.globalAlpha = 1;
}
function updNear(dt) {
  for (const p of near) { p.y += p.v * dt * .3; p.x += Math.sin(T * .4 + p.ph) * u * .2 * dt; if (p.y > H + 10) { p.y = -10; p.x = rand(0, WW * 1.35 + W); } }
}
function drawSurface(viewX, t) {
  const w = VW / vs, g = ctx.createLinearGradient(0, 0, 0, u * 4);
  g.addColorStop(0, 'rgba(225,248,255,.35)'); g.addColorStop(1, 'rgba(225,248,255,0)');
  ctx.fillStyle = g; ctx.fillRect(viewX, 0, w, u * 4);
  ctx.strokeStyle = 'rgba(235,252,255,.28)'; ctx.lineWidth = Math.max(1, u * .15);
  ctx.beginPath();
  for (let x = viewX - 20; x <= viewX + w + 20; x += 18) {
    const y = u * 1.4 + Math.sin(x * .012 + t * 1.3) * u * .5 + Math.sin(x * .031 - t * .9) * u * .25;
    if (x === viewX - 20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}
// Darkens the top and bottom, and only the outer side edges, so two screens still read as one tank.
function drawVignette() {
  const w = VW / vs, h = VH / vs;
  let g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(0,6,14,.18)'); g.addColorStop(.15, 'rgba(0,6,14,0)'); g.addColorStop(.8, 'rgba(0,4,10,0)'); g.addColorStop(1, 'rgba(0,3,8,.4)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  const ew = w * .14;
  if (slot === 0) { g = ctx.createLinearGradient(0, 0, ew, 0); g.addColorStop(0, 'rgba(0,5,12,.45)'); g.addColorStop(1, 'rgba(0,5,12,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, ew, h); }
  if (slot === span - 1) { g = ctx.createLinearGradient(w, 0, w - ew, 0); g.addColorStop(0, 'rgba(0,5,12,.45)'); g.addColorStop(1, 'rgba(0,5,12,0)'); ctx.fillStyle = g; ctx.fillRect(w - ew, 0, ew, h); }
}

function render(t, viewX, showLabels) {
  let sx = 0, sy = 0;
  if (pass && !pass.tease && pass.sp.pass.shake) {
    const a = u * .35 * passEdge() * Math.pow(Math.max(0, Math.sin(pass.t * .7)), 6);
    sx = Math.sin(t * 41) * a; sy = Math.cos(t * 37) * a;
  }
  const x0 = viewX, x1 = viewX + VW / vs;
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  ctx.fillStyle = '#01060d'; ctx.fillRect(0, 0, VW / vs, VH / vs);
  ctx.translate(-viewX + sx, sy);
  drawWater(viewX);
  drawLayer(far, viewX, t);
  drawLayer(mid, viewX, t);
  drawRays(t);
  drawCaustics(viewX, t);
  for (const s of snow) { if (s.x < x0 || s.x > x1) continue; ctx.globalAlpha = .12 + .4 * (s.y / H); ell(ctx, s.x, s.y, s.r, s.r, '#dff'); }
  ctx.globalAlpha = 1;
  drawPass(viewX - sx);
  drawSeabed();
  drawPlants(t);
  drawDecor(t);
  for (const o of creatures) drawCreature(o, x0, x1);
  for (const p of pellets) ell(ctx, p.x, p.y, u * .45, u * .45, '#c8894a');
  ctx.strokeStyle = 'rgba(220,245,255,.6)'; ctx.lineWidth = 1.2;
  for (const b of bubbles) { if (b.x < x0 - 9 || b.x > x1 + 9) continue; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.stroke(); }
  for (const s of sparks) { ctx.globalAlpha = Math.min(1, s.life); ell(ctx, s.x, s.y, u * .5, u * .5, '#f6fbff'); }
  ctx.globalAlpha = 1;
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
const THEME = {
  key: 'deepsea-aquarium-v1', start: { clown: 2 }, rareFrom: 'whaleshark', feedMaxY: .6,
  pelletAlive: p => p.y < H * .62,
  text: {
    currency: 'pearls', vault: 'Pearl vault', bonus: 'pearls for the whole tank', tabReal: 'Sea Life',
    hint: 'Tap the water to feed · Tap an animal to learn about it · Drag to look around',
    keepOne: 'Keep at least 1 animal in the tank', wentHome: ' swam home to the sea', releaseBack: 'Release back to the sea',
    teaseToast: 'Something very big... is swimming in the sea', teaseCard: 'Something very big lives in the sea...',
    nowLives: ' now lives in our sea! Watch for it swimming by',
    welcome: 'Tap the water to feed the fish, drag to look around, and open the Shop to buy new animals',
    away: n => 'While the tank was closed, your animals collected ' + n + ' pearls',
  },
  icons: {
    cur: (c, t, lo) => {
      const g = c.createRadialGradient(-.12, -.14, .02, 0, 0, .4); g.addColorStop(0, '#fff'); g.addColorStop(.5, '#eaf4ff'); g.addColorStop(1, '#9fb8d6');
      c.fillStyle = g; c.beginPath(); c.arc(0, 0, .38, 0, TAU); c.fill(); ell(c, -.13, -.15, .09, .06, 'rgba(255,255,255,.9)');
    },
    chest: c => { c.translate(0, .22); c.scale(.55, .55); ddChest(c, 0, { open: .6 }); },
    castle: c => { c.translate(0, .42); c.scale(.3, .3); ddCastle(c, 1); },
  },
  achievements: (ic, A) => [
  A('snack', 'Snack Time', 0, (c, t) => { ic.sp('clown', .6, .08, -.1)(c); }, 'Feed the fish 500 times.', () => [S.feeds, 500]),
  A('curious', 'Curious Explorer', 0, ic.glass, 'Tap 10 different kinds of animals to learn about them.', () => [S.tapped.length, 10]),
  A('puff', 'Puff Puff', 0, ic.sp('puffer', .9), 'Make a pufferfish puff up 100 times.', () => [S.puffs, 100]),
  A('school', 'Full School', 0, ic.sp('clown', .95), 'Have 12 clownfish in the tank at once.', () => [own('clown'), 12]),
  A('shadow', 'Mystery Shadow', 0, ic.q, 'Spot 5 mystery shadows in the deep.', () => [S.teases, 5]),
  A('kind', 'Kind Keeper', 0, ic.heart, 'Release 10 animals back to the sea.', () => [S.releases, 10]),
  A('pearls', 'Pearl Collector', 0, ic.cur, 'Collect 10 million pearls in total.', () => [S.earned, 1e7]),
  A('chef', 'Master Chef', 1, ic.sp('whaleshark', .95), 'Feed the fish 5,000 times.', () => [S.feeds, 5000]),
  A('biologist', 'Marine Biologist', 1, ic.sp('squid', 1), 'Learn about every real sea animal.', () => [REAL.filter(s => S.tapped.includes(s.id)).length, REAL.length]),
  A('deep', 'Into the Deep', 1, ic.sp('angler', .95), 'Fill the midnight zone: every anglerfish, vampire squid, gulper eel and dumbo octopus.',
    () => [['angler', 'vampire', 'gulper', 'dumbo'].reduce((a, id) => a + own(id), 0), ['angler', 'vampire', 'gulper', 'dumbo'].reduce((a, id) => a + BY[id].max, 0)]),
  A('spotter', 'Bloop Spotter', 1, ic.sp('bloop', 1), 'See The Bloop swim by 25 times.', () => [S.seen.bloop || 0, 25]),
  A('treasure', 'Treasure Hunter', 1, ic.chest, 'Watch the treasure chest open 100 times.', () => [S.chests, 100]),
  A('designer', 'Interior Designer', 1, ic.castle, 'Own every decoration.', () => [DECOR.filter(d => state.decor[d.id]).length, DECOR.length]),
  A('night', 'Night Watch', 1, ic.moon, 'Keep the tank open for 8 hours in one go.', () => [Math.floor(sessionT / 60), 480]),
  A('tycoon', 'Pearl Tycoon', 1, ic.cur, 'Collect 10 billion pearls in total.', () => [S.earned, 1e10]),
  A('emperor', 'Pearl Emperor', 2, ic.crown, 'Collect 1 trillion pearls in total.', () => [S.earned, 1e12]),
  A('legends', 'Legend Keeper', 2, ic.sp('naga', 1), 'Find every legendary creature.', () => [LEGENDS.filter(has).length, LEGENDS.length]),
  A('complete', 'Complete Collection', 2, ic.star, 'Find all 20 animals and fill the tank with every real animal it can hold.',
    () => [SP.filter(has).length + REAL.reduce((a, s) => a + own(s.id), 0), SP.length + REAL.reduce((a, s) => a + s.max, 0)]),
  A('quake', 'Earthquake!', 2, ic.sp('anon', 1), 'Feel Pla Anon move 10 times.', () => [S.seen.anon || 0, 10]),
  A('superfan', 'Bloop Superfan', 2, ic.sp('bloop', 1), 'See The Bloop swim by 100 times.', () => [S.seen.bloop || 0, 100]),
  A('devoted', 'Devoted Keeper', 2, ic.sp('turtle', .95), 'Visit the tank on 30 different days.', () => [S.days, 30]),
],
};
