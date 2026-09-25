"use strict";
/* ================= Deep sea: cel-shaded drawings =================
   New cartoon versions of every animal, decoration and piece of scenery (see shared/cel.js for the style).
   Used when the page is opened with ?art=cel; the old drawings in theme.js stay the default for now. */
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


/* ---- angelfish ---- */
const ANGEL = { y: tones('#ffd23f'), b: tones('#2f6fd0') };
function dAngelCel(c, t) {
  const s = Math.sin(t * 3) * .05, w = Math.sin(t * 10) * .1;
  const dors = cc => { cc.beginPath(); cc.moveTo(.35, -.55); cc.bezierCurveTo(.1, -1.02, -.6, -1.28, -1.1, -1.15 + s); cc.bezierCurveTo(-.85, -.9, -.62, -.62, -.48, -.45); cc.closePath(); };
  const anal = cc => { cc.beginPath(); cc.moveTo(.35, .55); cc.bezierCurveTo(.1, 1.02, -.6, 1.28, -1.1, 1.15 - s); cc.bezierCurveTo(-.85, .9, -.62, .62, -.48, .45); cc.closePath(); };
  part(c, dors, ANGEL.y, below(-.78, .15), lens(-.2, -.92, .1, -.8, .03)); lines(c, [[-.25, -.62, -.62, -1.02], [.05, -.62, -.3, -.98]], ANGEL.y.line);
  part(c, anal, ANGEL.y, below(.72, .15), null); lines(c, [[-.25, .62, -.62, 1.02], [.05, .62, -.3, .98]], ANGEL.y.line);
  const tail = lens(-.72, 0, -1.2, 0, .3 + w * .5, .3 - w * .5);
  part(c, tail, ANGEL.y, below(.05, .05), null);
  const body = blob([[.9, 0], [.62, -.52], [.12, -.72], [-.52, -.5], [-.78, 0], [-.52, .5], [.12, .72], [.62, .52]]);
  celShade(c, below(.18, .15), (cc, p) => {
    cc.save(); body(cc); cc.clip();
    fillPath(cc, rightOf(-2), p === 'mid' ? ANGEL.y.mid : ANGEL.y.dark);
    for (const x of [.05, -.42]) fillPath(cc, blob([[x, -.9], [x + .16, -.9], [x + .2, 0], [x + .16, .9], [x, .9], [x + .04, 0]], .6), p === 'mid' ? ANGEL.b.mid : ANGEL.b.dark);
    cc.restore();
  }, { mid: 'mid', dark: 'dark' });
  c.save(); body(c); c.clip(); fillPath(c, lens(.2, -.55, .75, -.3, .06), ANGEL.y.light); c.restore();
  strokePath(c, body, ANGEL.y.line, .035);
  celEye(c, .52, -.18, .13); celSmile(c, .72, .06, .08, '#7a5a08');
}

/* ---- pufferfish ---- */
const PUF = { b: tones('#e8cf85'), belly: tones('#fff6da'), spot: '#9c7a3a' };
function dPufferCel(c, t, o) {
  const p = o ? o.puff : 0, r = .7 + .32 * p, w = Math.sin(t * 10) * .1;
  part(c, lens(-r + .1, 0, -r - .45, 0, .28 + w * .4, .28 - w * .4), PUF.b, below(.03, .05));
  if (p > .05) for (let i = 0; i < 18; i++) {
    const a = i / 18 * TAU, x = Math.cos(a), y = Math.sin(a), L = r + .22 * p;
    fillPath(c, cc => { cc.beginPath(); cc.moveTo(x * r * .9 - y * .05, y * r * .9 + x * .05); cc.lineTo(x * L, y * L); cc.lineTo(x * r * .9 + y * .05, y * r * .9 - x * .05); cc.closePath(); }, y > .2 ? PUF.b.line : '#8a6a2a');
  }
  const body = blob([[r, .05], [r * .7, -r * .72], [0, -r], [-r * .72, -r * .7], [-r, 0], [-r * .7, r * .72], [0, r], [r * .72, r * .68]], .4);
  fillPath(c, body, PUF.b.mid);
  c.save(); body(c); c.clip();
  fillPath(c, blob([[r * 1.1, r * .1], [.2, r * .05], [-r * 1.1, r * .2], [-r * .5, r * 1.1], [r * .6, r * 1.1]], .5), PUF.belly.mid);
  fillPath(c, below(r * .55, .1), PUF.belly.dark);
  fillPath(c, lens(-r * .45, -r * .62, r * .15, -r * .78, .06), PUF.b.light);
  for (const [x, y] of [[-.3, -.35], [0, -.55], [-.55, -.05], [.25, -.3], [-.15, -.1]]) ell(c, x * r, y * r, r * .07, r * .06, PUF.spot);
  c.restore();
  strokePath(c, body, PUF.b.line, .035);
  c.save(); c.translate(-.05, .1); c.rotate(Math.sin(t * 12) * .5 + .4); part(c, lens(0, 0, .32, 0, .1), PUF.b, null, null, .025); c.restore();
  celEye(c, r * .45, -r * .3, .17 + .04 * p);
  fillPath(c, blob([[r * .98, r * .05], [r * .88, r * .12], [r * .98, r * .2], [r * 1.04, r * .12]], .5), '#7a4a2a');
}

/* ---- sea turtle ---- */
const TUR = { skin: tones('#72c07a'), shell: tones('#8f6d3c'), rim: tones('#6b4f2a') };
function dTurtleCel(c, t) {
  const fl = Math.sin(t * 3) * .5;
  const flip = (x, y, len, w, a, tt) => { c.save(); c.translate(x, y); c.rotate(a); part(c, lens(0, 0, len, 0, w, w * .6), tt, below(w * .2, .02), null, .025); c.restore(); };
  const farT = { mid: TUR.skin.dark, dark: TUR.skin.line, light: TUR.skin.dark, line: TUR.skin.line };
  flip(.3, -.25, .85, .2, -.9 - fl, farT); flip(-.6, -.18, .5, .14, -2.6, farT);
  // head and neck
  part(c, blob([[.72, -.08], [1.02, -.28], [1.3, -.12], [1.3, .08], [1.02, .15], [.72, .1]], .5), TUR.skin, below(.02, .06), lens(.95, -.2, 1.2, -.18, .04));
  flip(.3, .28, .9, .21, .8 + fl, TUR.skin); flip(-.6, .22, .52, .15, 2.5 + fl * .3, TUR.skin);
  // shell: rim underneath, dome on top, plates
  part(c, blob([[.95, .05], [.6, -.52], [0, -.66], [-.62, -.5], [-.98, .02], [-.6, .28], [0, .34], [.6, .28]], .45), TUR.rim, below(.12, .06), null);
  const dome = blob([[.82, 0], [.5, -.46], [0, -.56], [-.52, -.44], [-.84, 0], [-.5, .16], [0, .2], [.5, .16]], .45);
  part(c, dome, TUR.shell, below(.02, .1), lens(-.4, -.38, .15, -.48, .06));
  for (const [x, y] of [[-.42, -.12], [0, -.24], [.42, -.12], [-.2, .06], [.22, .06]]) strokePath(c, blob([[x + .16, y], [x + .08, y - .12], [x - .08, y - .12], [x - .16, y], [x - .08, y + .1], [x + .08, y + .1]], .2), TUR.shell.line, .022);
  celEye(c, 1.12, -.12, .065); celSmile(c, 1.2, -.02, .06, TUR.skin.line);
}

/* ---- swordfish ---- */
const SWD = { back: tones('#2d5d95'), belly: tones('#dfe8f2'), fin: tones('#2a4d7a'), sword: tones('#c8d3e0') };
function dSwordCel(c, t) {
  const w = Math.sin(t * 10) * .08;
  part(c, cc => { cc.beginPath(); cc.moveTo(.8, -.07); cc.lineTo(1.97, 0); cc.lineTo(.8, .06); cc.closePath(); }, SWD.sword, below(0, 0), null, .02);
  part(c, cc => { cc.beginPath(); cc.moveTo(-.95, 0); cc.bezierCurveTo(-1.15, -.2, -1.35, -.5 + w, -1.52, -.68 + w); cc.bezierCurveTo(-1.35, -.25, -1.32, 0, -1.3, 0); cc.bezierCurveTo(-1.32, 0, -1.35, .25, -1.52, .68 + w); cc.bezierCurveTo(-1.35, .5 + w, -1.15, .2, -.95, 0); cc.closePath(); }, SWD.fin, below(.02, 0));
  part(c, cc => { cc.beginPath(); cc.moveTo(-.05, -.22); cc.bezierCurveTo(-.05, -.6, -.2, -.82, -.38, -.84); cc.bezierCurveTo(-.3, -.6, -.38, -.4, -.52, -.22); cc.closePath(); }, SWD.fin, rightOf(-.2));
  const body = blob([[.95, 0], [.55, -.22], [-.2, -.27], [-.8, -.14], [-1.02, 0], [-.8, .12], [-.2, .24], [.55, .2]], .45);
  fillPath(c, body, SWD.back.mid);
  c.save(); body(c); c.clip();
  fillPath(c, below(.02, .06), SWD.belly.mid); fillPath(c, below(.16, .04), SWD.belly.dark);
  fillPath(c, lens(-.5, -.2, .5, -.18, .03), SWD.back.light);
  c.restore();
  strokePath(c, body, SWD.back.line, .03);
  c.save(); c.translate(.3, .1); c.rotate(.6 + Math.sin(t * 6) * .2); part(c, lens(0, 0, .42, 0, .06), SWD.fin, null, null, .02); c.restore();
  celEye(c, .62, -.06, .085);
}

/* ---- jellyfish ---- */
const JEL = { bell: tones('#f59ad6'), arm: tones('#ff9fda'), face: '#5a1a48' };
function dJellyCel(c, t) {
  const p = Math.sin(t * 3);
  for (let i = 0; i < 5; i++) { const x0 = -.5 + i * .25; fillPath(c, tube(Array.from({ length: 9 }, (_, k) => [x0 + Math.sin(t * 2 + k * .7 + i) * .12, .2 + k * .2]), .06, .02), JEL.bell.dark); }
  for (const x0 of [-.12, .12]) tubePart(c, Array.from({ length: 6 }, (_, k) => [x0 + Math.sin(t * 2.4 + k + x0 * 9) * .1, .2 + k * .2]), .16, .06, JEL.arm, .02);
  c.save(); c.scale(1 + p * .08, 1 - p * .08);
  const bell = cc => { cc.beginPath(); cc.moveTo(-.8, .25); cc.bezierCurveTo(-.85, -.85, .85, -.85, .8, .25); for (let i = 7; i >= 0; i--) { const x = -.8 + i * .2; cc.quadraticCurveTo(x + .1, .4, x, .25); } cc.closePath(); };
  part(c, bell, JEL.bell, below(.08, .08), lens(-.5, -.35, -.05, -.62, .07));
  celEye(c, -.22, -.15, .07); celEye(c, .22, -.15, .07);
  fillPath(c, lens(-.48, -.02, -.3, -.02, .04), '#ff7ab0'); fillPath(c, lens(.3, -.02, .48, -.02, .04), '#ff7ab0');
  celSmile(c, 0, -.06, .09, JEL.face);
  c.restore();
}

/* ---- giant squid ---- */
const SQD = { body: tones('#e0604f'), arm: tones('#c94840') };
function dSquidCel(c, t) {
  for (let i = 0; i < 8; i++) { const off = (i - 3.5) * .07; tubePart(c, Array.from({ length: 7 }, (_, k) => [-.35 - k * .28, off * (1 + k * .5) + Math.sin(t * 3 + k * .8 + i) * .08 * k / 3]), .1, .03, i % 2 ? SQD.arm : SQD.body, .015); }
  for (const s of [-1, 1]) {
    const pts = Array.from({ length: 11 }, (_, k) => [-.4 - k * .27, s * .12 + Math.sin(t * 2.5 + k * .6 + s) * .1 * k / 4]);
    tubePart(c, pts, .05, .04, SQD.arm, .012);
    const [ex, ey] = pts[10]; part(c, lens(ex + .1, ey, ex - .18, ey, .07), SQD.arm, below(ey + .01, 0), null, .015);
  }
  const f = Math.sin(t * 4) * .05;
  part(c, cc => { cc.beginPath(); cc.moveTo(1.08, 0); cc.quadraticCurveTo(1.45, -.42 + f, 1.95, 0); cc.quadraticCurveTo(1.45, .42 - f, 1.08, 0); cc.closePath(); }, SQD.arm, below(.02, 0));
  const mantle = blob([[1.82, 0], [1.2, -.3], [.4, -.38], [-.18, -.28], [-.18, .28], [.4, .38], [1.2, .3]], .4);
  part(c, mantle, SQD.body, below(.1, .06), lens(.2, -.28, 1.2, -.22, .05));
  for (const [x, y] of [[.3, -.12], [.7, .06], [1.1, -.05], [.5, .18]]) ell(c, x, y, .05, .035, SQD.body.light);
  part(c, blob([[.02, 0], [-.2, -.26], [-.52, -.2], [-.58, 0], [-.52, .2], [-.2, .26]], .5), SQD.body, below(.08, .04), null);
  celEye(c, -.28, -.05, .17, '#ffffff');
}

/* ---- anglerfish ---- */
const ANG = { body: tones('#5a4870'), jaw: '#1a1024', rim: '#8fd6ff' };
function dAnglerCel(c, t) {
  const lx = 1.05, ly = -.95 + Math.sin(t * 2) * .05, pulse = .5 + .5 * Math.sin(t * 2.3);
  strokePath(c, cc => { cc.beginPath(); cc.moveTo(.35, -.62); cc.quadraticCurveTo(.75, -1.35, lx, ly); }, ANG.body.dark, .05);
  celGlow(c, lx, ly, .22 + pulse * .12, ['#2a6f8f', '#4fc3e8', '#b8f3ff', '#ffffff']);
  part(c, lens(-.78, 0, -1.3, 0, .3 + Math.sin(t * 6) * .06, .3 - Math.sin(t * 6) * .06), ANG.body, below(.02, 0));
  const body = blob([[.95, -.15], [.7, -.62], [0, -.78], [-.7, -.55], [-.92, 0], [-.7, .55], [0, .76], [.7, .6], [.97, .45]], .45);
  part(c, body, ANG.body, below(.2, .15), lens(-.45, -.55, .3, -.7, .07));
  strokePath(c, body, ANG.rim, .02);
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(.98, -.2); cc.quadraticCurveTo(.55, 0, .35, .15); cc.quadraticCurveTo(.6, .35, .96, .5); cc.closePath(); }, ANG.jaw);
  for (let k = 0; k < 4; k++) {
    const f = .12 + k * .22;
    let x = .97 - .62 * f, y = -.2 + .35 * f; fillPath(c, cc => { cc.beginPath(); cc.moveTo(x - .05, y); cc.lineTo(x + .05, y); cc.lineTo(x, y + .14); cc.closePath(); }, '#f4f0ff');
    x = .95 - .6 * f; y = .5 - .35 * f; fillPath(c, cc => { cc.beginPath(); cc.moveTo(x - .05, y); cc.lineTo(x + .05, y); cc.lineTo(x, y - .14); cc.closePath(); }, '#f4f0ff');
  }
  c.save(); c.translate(-.2, .15); c.rotate(.7 + Math.sin(t * 5) * .3); part(c, lens(0, 0, .45, 0, .1), ANG.body, null, null, .02); c.restore();
  celEye(c, .45, -.38, .1, '#cfe0ff');
}

/* ---- sea pig ---- */
const PIG = tones('#f7a8bf');
function dSeaPigCel(c, t) {
  const st = Math.sin(t * 4) * .05;
  for (let i = 0; i < 5; i++) part(c, blob([[-.55 + i * .26 - .07, .28], [-.55 + i * .26 + .07, .28], [-.55 + i * .26 + .06, .48 + (i % 2 ? st : -st)], [-.55 + i * .26 - .06, .48 + (i % 2 ? st : -st)]], .5), PIG, below(.4, 0), null, .02);
  const body = blob([[.88, .05], [.6, -.34], [0, -.4], [-.62, -.3], [-.88, .02], [-.62, .3], [0, .38], [.6, .32]], .45);
  part(c, body, PIG, below(.12, .1), lens(-.4, -.3, .3, -.36, .05));
  for (const [x, h] of [[.25, .45], [.42, .38]]) tubePart(c, [[x, -.32], [x + .04, -.32 - h * .5], [x + .12 + Math.sin(t * 2 + x) * .05, -.32 - h]], .09, .05, PIG, .018);
  for (let i = 0; i < 3; i++) tubePart(c, [[.82, .06 + i * .05], [.98, .14 + i * .07 + Math.sin(t * 3 + i) * .03]], .05, .03, PIG, .012);
  fillPath(c, lens(.5, .05, .64, .05, .03), '#ff7aa0'); celSmile(c, .68, -.02, .06, PIG.line);
}

/* ---- vampire squid ---- */
const VAM = { body: tones('#8a2838'), web: tones('#5a1420') };
function dVampireCel(c, t) {
  const f = Math.sin(t * 2.5);
  // eight arms joined by a web, like an umbrella: arm tips reach down, the web dips between them
  const rim = [];
  for (let i = 0; i <= 14; i++) { const f2 = i / 14, x = (f2 - .5) * (1.7 + f * .1), tip = i % 2 === 0; rim.push([x, (tip ? .86 : .62) + Math.sin(t * 2 + i) * .03 - Math.abs(f2 - .5) * .25]); }
  const web = blob([[.55, .05], ...rim.slice().reverse(), [-.55, .05]], .5);
  part(c, web, VAM.web, below(.62, .05), null);
  for (let i = 0; i <= 14; i += 2) { const [x, y] = rim[i]; lines(c, [[x * .35, .15, x, y - .02]], VAM.web.line, .02); ell(c, x, y, .05, .05, '#2b0a10'); }
  for (const s of [-1, 1]) { c.save(); c.translate(s * .4, -.72); c.rotate(s * (.5 + f * .35)); part(c, lens(0, 0, s * .48, 0, .13), VAM.body, below(0, .02), null, .02); c.restore(); }
  const mantle = blob([[.55, -.3], [.4, -.72], [0, -.92], [-.4, -.72], [-.55, -.3], [-.4, .15], [0, .3], [.4, .15]], .45);
  part(c, mantle, VAM.body, below(-.08, .1), lens(-.3, -.68, .05, -.82, .05));
  for (const s of [-1, 1]) {
    celGlow(c, s * .24, -.18, .17, ['#1f4f9e', '#5aa8ff', '#dff4ff']); ell(c, s * .24 + .02, -.17, .06, .06, '#0a0f25'); ell(c, s * .24 + .04, -.19, .02, .02, '#ffffff');
    if (Math.sin(t * 3 + s) > 0) ell(c, s * .5, -.62, .04, .04, '#9ff');
  }
}

/* ---- gulper eel ---- */
const GUL = { body: tones('#3f3a60'), mouth: '#16132a', rim: '#8fd6ff' };
function dGulperCel(c, t) {
  const pts = [[0, 0], ...Array.from({ length: 12 }, (_, k) => [-(k + 1) * .26, Math.sin(t * 4 - (k + 1) * .6) * .12 * ((k + 1) / 6)])];
  tubePart(c, pts, .16, .05, GUL.body, .02);
  const [ex, ey] = pts[pts.length - 1];
  const on = Math.sin(t * 3) > -.3;
  celGlow(c, ex, ey, on ? .14 : .08, ['#8a1f5c', '#ff5aa8', '#ffd0e6']);
  const op = Math.sin(t * 1.5) * .1;
  const jaw = cc => { cc.beginPath(); cc.moveTo(-.05, -.14); cc.quadraticCurveTo(.6, -.4, 1.15, -.55 - op); cc.quadraticCurveTo(.95, 0, 1.15, .6 + op); cc.quadraticCurveTo(.6, .4, -.05, .14); cc.closePath(); };
  part(c, jaw, GUL.body, below(.25, .1), lens(.2, -.2, .9, -.45, .04));
  strokePath(c, jaw, GUL.rim, .018);
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(.25, -.08); cc.quadraticCurveTo(.7, -.3, 1.05, -.45 - op); cc.quadraticCurveTo(.88, 0, 1.05, .5 + op); cc.quadraticCurveTo(.7, .3, .25, .08); cc.closePath(); }, GUL.mouth);
  celEye(c, .12, -.17, .055, '#dfe8ff');
}

/* ---- giant isopod ---- */
const ISO = tones('#c3b2c8');
function dIsopodCel(c, t) {
  const st = Math.sin(t * 8);
  for (let i = 0; i < 7; i++) { const x = -.6 + i * .2, s = (i % 2 ? 1 : -1) * st * .05; tubePart(c, [[x, .18], [x - .02 + s * .5, .3], [x - .05 + s, .42]], .05, .03, tones('#b09fb6'), .012); }
  part(c, cc => { cc.beginPath(); cc.moveTo(-.76, -.12); cc.lineTo(-1.02, -.22); cc.quadraticCurveTo(-1.08, 0, -1.02, .22); cc.lineTo(-.76, .12); cc.closePath(); }, ISO, below(.04, 0));
  for (let i = 7; i >= 0; i--) {
    const x = -.7 + i * .19, seg = blob([[x + .14, 0], [x + .1, -.28], [x - .08, -.3], [x - .12, 0], [x - .08, .28], [x + .1, .28]], .35);
    part(c, seg, i % 2 ? tones('#b7a6bd') : ISO, below(.1, .06), lens(x - .06, -.24, x + .08, -.26, .03), .02);
  }
  part(c, blob([[.95, .02], [.85, -.18], [.66, -.2], [.56, 0], [.66, .22], [.85, .2]], .45), ISO, below(.08, .04), null);
  celEye(c, .8, -.06, .065, '#3a2e44');
  for (const [a, b] of [[-.3, -.2], [-.1, .05]]) tubePart(c, [[.9, -.06], [1.1, a], [1.33, b]], .035, .02, ISO, .01);
}

/* ---- dumbo octopus ---- */
const DUM = { head: tones('#ffb09a'), skirt: tones('#f3907c') };
function dDumboCel(c, t) {
  const f = Math.sin(t * 4) * .45;
  for (let i = 0; i < 5; i++) part(c, blob([[-.48 + i * .24 - .13, .6], [-.48 + i * .24 + .13, .6], [-.48 + i * .24 + .1, .78 + Math.sin(t * 3 + i) * .05], [-.48 + i * .24 - .1, .78 + Math.sin(t * 3 + i) * .05]], .5), DUM.skirt, below(.72, 0), null, .02);
  part(c, blob([[.6, .22], [.55, .55], [.3, .7], [0, .72], [-.3, .7], [-.55, .55], [-.6, .22], [0, .08]], .5), DUM.skirt, below(.5, .08), null);
  for (const s of [-1, 1]) { c.save(); c.translate(s * .5, -.45); c.rotate(s * (.35 + f)); part(c, lens(0, 0, s * .6, 0, .17, .1), DUM.head, below(.02, 0), null, .025); c.restore(); }
  const head = blob([[.62, -.12], [.45, -.6], [0, -.78], [-.45, -.6], [-.62, -.12], [-.4, .3], [0, .42], [.4, .3]], .45);
  part(c, head, DUM.head, below(.12, .12), lens(-.42, -.45, -.05, -.68, .06));
  celEye(c, -.22, -.12, .11); celEye(c, .22, -.12, .11);
  fillPath(c, lens(-.46, .08, -.3, .08, .035), '#ff8f8f'); fillPath(c, lens(.3, .08, .46, .08, .035), '#ff8f8f');
  celSmile(c, 0, .04, .08, DUM.head.line);
}

/* ---- the Bloop ---- */
const BLP = { body: tones('#23457c'), belly: tones('#0e2244'), fin: tones('#16305c') };
function dBloopCel(c, t) {
  const w = Math.sin(t * 1.2) * .12;
  part(c, cc => { cc.beginPath(); cc.moveTo(-1.45, 0); cc.bezierCurveTo(-1.8, -.1, -2.05, -.4 + w, -2.3, -.66 + w); cc.bezierCurveTo(-2.15, -.25 + w, -2.1, 0, -2.08, 0); cc.bezierCurveTo(-2.1, 0, -2.15, .25 + w, -2.3, .66 + w); cc.bezierCurveTo(-2.05, .4 + w, -1.8, .1, -1.45, 0); cc.closePath(); }, BLP.fin, below(.02, 0));
  const body = blob([[1.7, 0], [1.3, -.6], [.2, -.8], [-.9, -.45], [-1.6, -.1], [-1.6, .1], [-.9, .45], [.2, .72], [1.3, .55]], .4);
  fillPath(c, body, BLP.body.mid);
  c.save(); body(c); c.clip();
  fillPath(c, below(.12, .12), BLP.belly.mid); fillPath(c, below(.42, .1), BLP.belly.dark);
  fillPath(c, lens(-.6, -.55, 1, -.62, .06), BLP.body.light);
  c.restore();
  strokePath(c, body, BLP.body.line, .03);
  c.save(); c.translate(.2, .45); c.rotate(.5 + Math.sin(t * 1.5) * .25); part(c, lens(0, 0, .95, 0, .14, .08), BLP.fin, null, null, .02); c.restore();
  for (const s of [0, 1, 2]) tubePart(c, Array.from({ length: 6 }, (_, k) => [1.5 + k * .12, .2 + k * .1 + Math.sin(t * 2 + k + s) * .05 + s * .05]), .03, .015, tones('#3a8fb0'), 0);
  for (let i = 0; i < 9; i++) if (Math.sin(t * 2 + i) > -.2) ell(c, 1.2 - i * .3, .05 + Math.sin(i * 1.7) * .08, .045, .045, '#8ff0ff');
  celGlow(c, 1.2, -.22, .2, ['#1f6fae', '#5fd0ff', '#dffaff']); ell(c, 1.2, -.22, .05, .05, '#ffffff');
  strokePath(c, cc => { cc.beginPath(); cc.moveTo(1.66, .1); cc.quadraticCurveTo(1.3, .3, 1, .25); }, '#050b18', .04);
}

/* ---- Suvannamaccha, the golden mermaid ---- */
const MER = { tail: tones('#f2bf3c'), skin: tones('#f3c56a'), hair: tones('#2a1c22'), gold: tones('#e8a317') };
function dMermaidCel(c, t) {
  const w = Math.sin(t * 4) * .15;
  part(c, blob([[.95, -.3], [.55, -.48 + w * .5], [.05, -.24 + w], [.5, -.12], [.82, .02]], .5), MER.hair, below(-.1, .05), null, .02);
  part(c, cc => { cc.beginPath(); cc.moveTo(-1.02, 0 + w * .6); cc.bezierCurveTo(-1.3, -.15, -1.45, -.35 + w, -1.62, -.5 + w); cc.bezierCurveTo(-1.5, -.15 + w, -1.45, w * .4, -1.42, w * .4); cc.bezierCurveTo(-1.45, w * .4, -1.5, .15 + w, -1.62, .5 + w); cc.bezierCurveTo(-1.45, .35 + w, -1.3, .15, -1.02, 0 + w * .6); cc.closePath(); }, MER.tail, below(w * .5, 0));
  const tail = tube([[.4, 0], [0, w * .1], [-.4, w * .3], [-.75, w * .5], [-1.05, w * .6]], .42, .1);
  part(c, tail, MER.tail, below(.05, .04), null, .03);
  for (let i = 0; i < 5; i++) { const x = .22 - i * .22, y = w * .3 * (i / 4); strokePath(c, cc => { cc.beginPath(); cc.arc(x, y - .05, .06, .2, Math.PI - .2); }, MER.tail.line, .018); }
  c.save(); c.translate(.52, .02); c.rotate(-.25 + Math.sin(t * 3 + 1) * .3); tubePart(c, [[0, 0], [.1, 0], [.2, 0]], .06, .045, { mid: MER.skin.dark, dark: MER.skin.line, light: MER.skin.dark, line: MER.skin.line }, .015); c.restore();
  part(c, blob([[.8, -.02], [.72, -.18], [.5, -.2], [.36, 0], [.5, .18], [.72, .16]], .45), MER.skin, below(.06, .04), null);
  fillPath(c, lens(.4, -.02, .78, -.02, .045), MER.gold.mid);
  c.save(); c.translate(.62, .08); c.rotate(.3 + Math.sin(t * 3) * .3); tubePart(c, [[0, 0], [.13, 0], [.26, 0]], .065, .05, MER.skin, .015); c.restore();
  part(c, blob([[1.1, -.12], [1.02, -.3], [.9, -.33], [.76, -.2], [.78, 0], [.95, .04]], .45), MER.skin, below(-.06, .04), lens(.86, -.28, 1, -.28, .02));
  fillPath(c, cc => { cc.beginPath(); cc.arc(.9, -.14, .21, .55 * Math.PI, 1.45 * Math.PI); cc.closePath(); }, MER.hair.mid);
  part(c, cc => { cc.beginPath(); cc.moveTo(.76, -.28); cc.lineTo(1.06, -.28); cc.lineTo(.93, -.68); cc.closePath(); }, MER.gold, rightOf(.93), null, .02);
  fillPath(c, cc => { cc.beginPath(); cc.rect(.74, -.32, .34, .06); }, MER.gold.dark); ell(c, .91, -.38, .035, .035, '#e0304a');
  celEye(c, 1, -.15, .05); fillPath(c, lens(.95, -.05, 1.04, -.05, .02), '#ff9a8a'); celSmile(c, 1.03, -.09, .045, '#8a3a2a');
}

/* ---- kraken ---- */
const KRA = { body: tones('#b24a7e'), arm: tones('#9b3b6a'), sucker: '#f4b6cf' };
function dKrakenCel(c, t) {
  for (let i = 0; i < 8; i++) {
    const a0 = Math.PI * (.05 + i / 7 * .9);
    let x = Math.cos(a0) * .45, y = .2 + Math.sin(a0) * .2, ang = a0;
    const pts = [[x, y]];
    for (let k = 0; k < 10; k++) { ang += Math.sin(t * 1.5 + i + k * .4) * .22 + (i < 4 ? -.06 : .06); x += Math.cos(ang) * .12; y += Math.sin(ang) * .12; pts.push([x, y]); }
    tubePart(c, pts, .24, .05, i % 2 ? KRA.arm : KRA.body, .018);
    for (let k = 1; k < 8; k += 2) ell(c, pts[k][0], pts[k][1] + .03, .025, .025, KRA.sucker);
  }
  const head = blob([[.7, -.3], [.5, -.85], [0, -1.05], [-.5, -.85], [-.7, -.3], [-.45, .25], [0, .4], [.45, .25]], .45);
  part(c, head, KRA.body, below(.02, .15), lens(-.45, -.75, -.05, -.95, .07));
  for (const [x, y] of [[-.3, -.7], [.25, -.8], [.4, -.45], [-.45, -.35]]) ell(c, x, y, .07, .05, KRA.body.dark);
  celEye(c, -.28, -.1, .16, '#ffffff'); celEye(c, .28, -.1, .16, '#ffffff'); celSmile(c, 0, .08, .1, KRA.body.line);
}

/* ---- megalodon ---- */
const MEG = { back: tones('#6b7f93'), belly: tones('#e6ecf1'), fin: tones('#55677a') };
function dMegalodonCel(c, t) {
  const w = Math.sin(t * 6) * .1;
  part(c, cc => { cc.beginPath(); cc.moveTo(-1.08, 0); cc.bezierCurveTo(-1.25, -.25, -1.45, -.55 + w, -1.62, -.78 + w); cc.bezierCurveTo(-1.5, -.3 + w, -1.45, 0, -1.42, .02); cc.bezierCurveTo(-1.45, .2, -1.48, .4 + w, -1.52, .55 + w); cc.bezierCurveTo(-1.35, .35 + w, -1.2, .15, -1.08, 0); cc.closePath(); }, MEG.fin, below(.02, 0));
  part(c, cc => { cc.beginPath(); cc.moveTo(-.08, -.4); cc.bezierCurveTo(-.15, -.7, -.3, -.88, -.36, -.92); cc.bezierCurveTo(-.4, -.7, -.5, -.5, -.68, -.34); cc.closePath(); }, MEG.fin, rightOf(-.3));
  const body = blob([[1.62, .05], [1.25, -.38], [.4, -.52], [-.5, -.42], [-1.15, 0], [-.5, .36], [.4, .5], [1.2, .4]], .45);
  fillPath(c, body, MEG.back.mid);
  c.save(); body(c); c.clip();
  fillPath(c, below(.05, .15), MEG.belly.mid); fillPath(c, below(.32, .08), MEG.belly.dark);
  fillPath(c, lens(-.4, -.38, .9, -.42, .05), MEG.back.light);
  c.restore();
  strokePath(c, body, MEG.back.line, .03);
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(1.52, .12); cc.quadraticCurveTo(1.18, .44, .9, .26); cc.quadraticCurveTo(1.2, .28, 1.52, .12); cc.closePath(); }, '#2a1418');
  for (let k = 0; k < 5; k++) { const x = 1.42 - k * .1, y = .15 + k * .025; fillPath(c, cc => { cc.beginPath(); cc.moveTo(x, y); cc.lineTo(x - .05, y); cc.lineTo(x - .025, y + .08); cc.closePath(); }, '#ffffff'); }
  lines(c, [[.6, -.12, .56, .14], [.5, -.12, .46, .14], [.4, -.12, .36, .14]], MEG.back.line, .025);
  c.save(); c.translate(.3, .25); c.rotate(.6 + Math.sin(t * 3) * .1); part(c, lens(0, 0, .6, 0, .12, .05), MEG.fin, null, null, .02); c.restore();
  celEye(c, 1.15, -.1, .065);
}

/* ---- serpents: sea serpent, phaya naga, leviathan ---- */
function serpentCel(c, t, o) {
  const pts = wave(o.n, .55, o.seg, o.amp, t, 2.2, .45);
  if (o.spine) for (let k = 1; k < o.n - 2; k += 2) {
    const [x, y] = pts[k], r = o.r * (1 - k / o.n * .75);
    part(c, cc => { cc.beginPath(); cc.moveTo(x - r * .6, y - r * .6); cc.lineTo(x, y - r * 1.75); cc.lineTo(x + r * .6, y - r * .6); cc.closePath(); }, o.spine, rightOf(x), null, .015);
  }
  tubePart(c, pts, o.r * 2.1, o.r * .5, o.body, .03);
  if (o.belly) { c.save(); tube(pts, o.r * 2.1, o.r * .5)(c); c.clip(); c.translate(0, o.r * .62); fillPath(c, tube(pts, o.r * .9, o.r * .2), o.belly); c.restore(); }
  for (let k = 2; k < o.n - 1; k += 2) { const [x, y] = pts[k], r = o.r * (1 - k / o.n * .75); strokePath(c, cc => { cc.beginPath(); cc.arc(x, y - r * .1, r * .55, Math.PI * 1.15, Math.PI * 1.85); }, o.body.line, .015); }
  if (o.sparkle) for (let k = 2; k < o.n; k += 3) if (Math.sin(t * 3 + k) > .3) ell(c, pts[k][0], pts[k][1] - .05, .03, .03, '#fff6d0');
  return pts[0][1];
}
const SRP = { body: tones('#34907a'), belly: '#a6dcc0', fin: tones('#6fd3b8') };
function dSerpentCel(c, t) {
  const y0 = serpentCel(c, t, { n: 22, seg: .2, r: .3, amp: .25, body: SRP.body, belly: SRP.belly, spine: SRP.fin });
  part(c, lens(.55, y0 - .15, .3, y0 - .62, .08), SRP.fin, rightOf(.45), null, .02);
  part(c, blob([[1.25, y0 + .05], [1.12, y0 - .12], [.85, y0 - .26], [.52, y0 - .1], [.52, y0 + .12], [.85, y0 + .22], [1.12, y0 + .18]], .45), SRP.body, below(y0 + .06, .05), lens(.7, y0 - .18, 1, y0 - .16, .03));
  celEye(c, .9, y0 - .1, .08); celSmile(c, 1.08, y0 + .02, .06, SRP.body.line);
}
const NAG = { body: tones('#e8ae2a'), belly: '#fbe7a1', crest: tones('#e6453a'), spine: tones('#d63a3a') };
function dNagaCel(c, t) {
  const y0 = serpentCel(c, t, { n: 22, seg: .2, r: .3, amp: .25, body: NAG.body, belly: NAG.belly, spine: NAG.spine, sparkle: 1 });
  for (let i = 0; i < 3; i++) {
    const x = .52 + i * .13, tall = i === 1 ? .2 : 0;
    part(c, cc => { cc.beginPath(); cc.moveTo(x, y0 - .18); cc.quadraticCurveTo(x - .2, y0 - .75 - tall, x + .12, y0 - .82 - tall); cc.quadraticCurveTo(x + .05, y0 - .45, x + .15, y0 - .2); cc.closePath(); }, i === 1 ? NAG.body : NAG.crest, rightOf(x + .05), null, .018);
  }
  part(c, blob([[1.25, y0 + .05], [1.12, y0 - .12], [.85, y0 - .26], [.52, y0 - .1], [.52, y0 + .12], [.85, y0 + .22], [1.12, y0 + .18]], .45), NAG.body, below(y0 + .06, .05), lens(.7, y0 - .18, 1, y0 - .16, .03));
  celEye(c, .92, y0 - .1, .09, '#1fa35c'); celSmile(c, 1.08, y0 + .02, .06, NAG.body.line);
}
const LEV = { body: tones('#1c3c58'), belly: '#2a5878', spine: tones('#3fb8e8'), horn: tones('#9fb8c8') };
function dLeviathanCel(c, t) {
  const y0 = serpentCel(c, t, { n: 26, seg: .2, r: .38, amp: .3, body: LEV.body, belly: LEV.belly, spine: LEV.spine });
  for (const [x0, a, b] of [[.7, .15, -.55], [.85, .4, -.78]]) tubePart(c, [[x0, y0 - .25], [(x0 + a) / 2, y0 - .5], [a, y0 + b]], .07, .03, LEV.horn, .012);
  part(c, blob([[1.35, y0 + .02], [1.2, y0 - .2], [.85, y0 - .34], [.45, y0 - .12], [.45, y0 + .14], [.85, y0 + .3], [1.2, y0 + .2]], .45), LEV.body, below(y0 + .08, .06), lens(.65, y0 - .25, 1.05, y0 - .22, .03));
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(1.33, y0 + .05); cc.quadraticCurveTo(1, y0 + .25, .7, y0 + .14); cc.quadraticCurveTo(1, y0 + .12, 1.33, y0 + .05); cc.closePath(); }, '#0a1826');
  for (let k = 0; k < 4; k++) { const x = 1.2 - k * .12; fillPath(c, cc => { cc.beginPath(); cc.moveTo(x, y0 + .08); cc.lineTo(x - .04, y0 + .17); cc.lineTo(x - .08, y0 + .1); cc.closePath(); }, '#e8f4ff'); }
  celGlow(c, 1, y0 - .1, .17, ['#1f6fae', '#5fd0ff', '#e6fbff']); ell(c, 1, y0 - .1, .045, .045, '#ffffff');
}

/* ---- Pla Anon, the fish that carries the world ---- */
const ANO = { body: tones('#f0bd48'), fin: tones('#d89426'), hill: tones('#4f9a54'), tree: tones('#3f8f4a') };
function dAnonCel(c, t) {
  const w = Math.sin(t * .8) * .08;
  part(c, cc => { cc.beginPath(); cc.moveTo(-1.18, 0); cc.bezierCurveTo(-1.45, -.3, -1.6, -.6 + w, -1.8, -.8 + w); cc.bezierCurveTo(-1.65, -.3 + w, -1.6, 0, -1.58, 0); cc.bezierCurveTo(-1.6, 0, -1.65, .3 + w, -1.8, .8 + w); cc.bezierCurveTo(-1.6, .6 + w, -1.45, .3, -1.18, 0); cc.closePath(); }, ANO.fin, below(.02, 0));
  c.save(); c.translate(-.2, .55); c.rotate(1.2 + Math.sin(t) * .15); part(c, lens(0, 0, .45, 0, .12), ANO.fin, null, null, .02); c.restore();
  // the world on its back: a green hill with a tree and a little golden stupa
  part(c, cc => { cc.beginPath(); cc.moveTo(-.78, -.55); cc.quadraticCurveTo(-.35, -1.42, .1, -1); cc.quadraticCurveTo(.4, -1.32, .78, -.55); cc.closePath(); }, ANO.hill, below(-.72, .1), lens(-.45, -1, -.1, -1.1, .05));
  part(c, cc => { cc.beginPath(); cc.rect(-.2, -1.26, .05, .2); }, tones('#6a4424'), null, null, .01);
  part(c, blob([[-.02, -1.28], [-.1, -1.42], [-.25, -1.42], [-.32, -1.28], [-.25, -1.18], [-.1, -1.18]], .45), ANO.tree, below(-1.26, .03), null, .015);
  part(c, cc => { cc.beginPath(); cc.moveTo(.33, -1.02); cc.lineTo(.4, -1.32); cc.lineTo(.47, -1.02); cc.closePath(); }, tones('#f0d27a'), rightOf(.4), null, .012);
  const body = blob([[1.35, .05], [1.05, -.55], [.2, -.74], [-.7, -.6], [-1.3, -.05], [-.7, .6], [.2, .74], [1.05, .55]], .45);
  fillPath(c, body, ANO.body.mid);
  c.save(); body(c); c.clip();
  fillPath(c, below(.25, .15), ANO.body.dark);
  for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) strokePath(c, cc => { cc.beginPath(); cc.arc(-1.2 + i * .2 + (j % 2) * .1, -.6 + j * .22, .12, .2, Math.PI - .2); }, ANO.body.line, .02);
  fillPath(c, lens(-.6, -.55, .5, -.66, .06), ANO.body.light);
  c.restore();
  strokePath(c, body, ANO.body.line, .03);
  for (const s of [0, 1]) tubePart(c, Array.from({ length: 7 }, (_, k) => [1.28 + k * .1, .12 + k * .06 + Math.sin(t * 1.5 + k + s * 2) * .05 + s * .08]), .045, .02, tones('#e7b54a'), .01);
  celEye(c, .95, -.2, .13, '#ffffff'); celSmile(c, 1.2, 0, .08, '#6a3a08'); fillPath(c, lens(.95, .05, 1.1, .05, .03), '#ff9a6a');
}

/* ================= decorations ================= */
const SAND_SHADOW = '#0c1826';
function ddCoralCel(c, t) {
  groundShadow(c, 1.6, SAND_SHADOW, .1);
  const cols = [tones('#ff6fb5'), tones('#6fe3f2'), tones('#b58cff')];
  for (let i = 0; i < 5; i++) {
    const x0 = (i - 2) * .25, h = .6 + ((i * 37) % 5) / 10, sw = Math.sin(t * .8 + i) * .05, tt = cols[i % 3];
    const tip = [x0 + sw * 2 + (i - 2) * .08, -h], mid = [x0 + sw, -h * .5];
    tubePart(c, [[x0, 0], mid, tip], .12, .06, tt, .02);
    const bx = x0 + sw + (i % 2 ? .18 : -.18);
    tubePart(c, [[x0 + sw * .5, -h * .45], [bx, -h * .72]], .08, .05, tt, .018);
    const on = Math.sin(t * 2 + i) > -.4;
    for (const [x, y] of [tip, [bx, -h * .72]]) celGlow(c, x, y, on ? .09 : .06, [tt.dark, tt.light, '#ffffff']);
  }
}
// Treasure chest drawn as a box with depth: front face, right side face and top, and a lid that has the same
// front face, side face and curved top, so the lid is exactly as wide and as deep as the box it closes.
const CHS = { wood: tones('#8a5a2b'), gold: tones('#e0a83a') };
function ddChestCel(c, t, o) {
  const open = o ? o.open : 0, D = .14, DY = -.07; // depth of the box towards the back-right
  groundShadow(c, 1.4, SAND_SHADOW, .1);
  // box
  const front = cc => { cc.beginPath(); cc.rect(-.52, -.44, .94, .44); };
  const side = cc => { cc.beginPath(); cc.moveTo(.42, -.44); cc.lineTo(.42 + D, -.44 + DY); cc.lineTo(.42 + D, DY); cc.lineTo(.42, 0); cc.closePath(); };
  fillPath(c, front, CHS.wood.mid); fillPath(c, side, CHS.wood.dark);
  c.save(); front(c); c.clip(); fillPath(c, cc => { cc.beginPath(); cc.rect(-.52, -.44, .94, .06); }, CHS.wood.light); lines(c, [[-.52, -.22, .42, -.22]], CHS.wood.line, .02); c.restore();
  for (const x of [-.38, .24]) { fillPath(c, cc => { cc.beginPath(); cc.rect(x, -.44, .09, .44); }, CHS.gold.mid); fillPath(c, cc => { cc.beginPath(); cc.rect(x + .06, -.44, .03, .44); }, CHS.gold.dark); }
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(.42, -.3); cc.lineTo(.42 + D, -.3 + DY); cc.lineTo(.42 + D, -.24 + DY); cc.lineTo(.42, -.24); cc.closePath(); }, CHS.gold.dark);
  strokePath(c, front, CHS.wood.line, .03); strokePath(c, side, CHS.wood.line, .03);
  // inside of the box and the pearls, seen when the lid is up
  if (open > .05) {
    fillPath(c, cc => { cc.beginPath(); cc.moveTo(-.52, -.44); cc.lineTo(.42, -.44); cc.lineTo(.42 + D, -.44 + DY); cc.lineTo(-.52 + D, -.44 + DY); cc.closePath(); }, '#3a2210');
    for (let i = 0; i < 6; i++) { const x = -.34 + i * .14, y = -.5 - (i % 2) * .06; ell(c, x, y, .075, .075, '#e8eef6'); ell(c, x - .025, y - .025, .025, .025, '#ffffff'); }
    for (let i = 0; i < 5; i++) { const a = -Math.PI * (.2 + i * .15), r = .55 + open * .15; lines(c, [[Math.cos(a) * .4, -.5 + Math.sin(a) * .4, Math.cos(a) * r, -.5 + Math.sin(a) * r]], '#ffe9a8', .035); }
  }
  // lid: hinged along the back edge; same width (front) and same depth (side) as the box
  c.save(); c.translate(-.52 + D, -.44 + DY); c.rotate(-open * 1.1); c.translate(-D, -DY);
  const lidFront = cc => { cc.beginPath(); cc.moveTo(0, 0); cc.lineTo(.94, 0); cc.bezierCurveTo(.96, -.2, .8, -.32, .47, -.32); cc.bezierCurveTo(.14, -.32, -.02, -.2, 0, 0); cc.closePath(); };
  const lidSide = cc => { cc.beginPath(); cc.moveTo(.94, 0); cc.lineTo(.94 + D, DY); cc.bezierCurveTo(.96 + D, -.2 + DY, .8 + D, -.32 + DY, .47 + D, -.32 + DY); cc.lineTo(.47, -.32); cc.bezierCurveTo(.8, -.32, .96, -.2, .94, 0); cc.closePath(); };
  fillPath(c, lidSide, CHS.wood.dark);
  fillPath(c, lidFront, CHS.wood.mid);
  c.save(); lidFront(c); c.clip();
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(.18, -.24); cc.bezierCurveTo(.3, -.3, .5, -.31, .64, -.28); cc.lineTo(.62, -.24); cc.bezierCurveTo(.48, -.27, .32, -.26, .2, -.2); cc.closePath(); }, CHS.wood.light);
  for (const x of [.14, .76]) { fillPath(c, cc => { cc.beginPath(); cc.rect(x, -.4, .09, .4); }, CHS.gold.mid); fillPath(c, cc => { cc.beginPath(); cc.rect(x + .06, -.4, .03, .4); }, CHS.gold.dark); }
  c.restore();
  strokePath(c, lidSide, CHS.wood.line, .03); strokePath(c, lidFront, CHS.wood.line, .03);
  c.restore();
  // lock on the front of the box
  fillPath(c, cc => { cc.beginPath(); cc.rect(-.12, -.42, .16, .16); }, CHS.gold.mid); fillPath(c, cc => { cc.beginPath(); cc.rect(-.12, -.3, .16, .04); }, CHS.gold.dark);
  ell(c, -.04, -.35, .025, .025, CHS.wood.line);
}
// Shipwreck, seen from the side (no depth on any part, so everything matches).
const SHP = { hull: tones('#5a3f2a'), deck: tones('#4a3322'), sail: tones('#cfc3a0'), weed: tones('#3f8a52') };
function ddShipCel(c, t) {
  groundShadow(c, 2.4, SAND_SHADOW, .12);
  c.save(); c.rotate(-.12);
  tubePart(c, [[0, -.5], [.05, -1], [.1, -1.5]], .09, .07, SHP.deck, .015);
  tubePart(c, [[.55, -.52], [.64, -.8], [.72, -1.05]], .08, .06, SHP.deck, .015);
  part(c, cc => { cc.beginPath(); cc.moveTo(.1, -1.42); cc.lineTo(.55, -1.25 + Math.sin(t * .7) * .03); cc.lineTo(.48, -1.05); cc.lineTo(.4, -.98); cc.lineTo(.42, -.86); cc.lineTo(.08, -.86); cc.closePath(); }, SHP.sail, below(-1.05, .05), null, .02);
  part(c, cc => { cc.beginPath(); cc.rect(-.78, -.8, .52, .3); }, SHP.deck, below(-.62, 0), cc => { cc.beginPath(); cc.rect(-.78, -.8, .52, .05); });
  const hull = cc => { cc.beginPath(); cc.moveTo(-1.05, -.52); cc.lineTo(1.15, -.57); cc.quadraticCurveTo(1.02, -.2, .82, 0); cc.lineTo(-.85, 0); cc.quadraticCurveTo(-1.02, -.25, -1.05, -.52); cc.closePath(); };
  part(c, hull, SHP.hull, below(-.2, .04), cc => { cc.beginPath(); cc.rect(-1.1, -.58, 2.3, .06); });
  lines(c, [[-.95, -.38, 1.05, -.41], [-.9, -.22, .98, -.25], [-.86, -.08, .9, -.1]], SHP.hull.line, .018);
  for (let i = 0; i < 4; i++) { const x = -.5 + i * .35; ell(c, x, -.33, .065, .065, SHP.hull.line); ell(c, x, -.33, .04, .04, Math.sin(t + i) > 0 ? '#7fd8f0' : '#3f8fb0'); }
  for (let i = 0; i < 4; i++) { const x = -.6 + i * .45, sw = Math.sin(t + i) * .06; tubePart(c, [[x, -.5], [x + sw, -.32], [x + .03, -.12]], .06, .03, SHP.weed, .012); }
  c.restore();
}
// Hydrothermal vent: a rock chimney with a glowing top and puffs of dark water (solid puffs that shrink as they rise).
const VNT = { rock: tones('#3a383e'), worm: tones('#e8e2d0') };
function ddVentCel(c, t) {
  groundShadow(c, 1.3, SAND_SHADOW, .1);
  for (let k = 11; k >= 0; k--) {
    const p = (t * .22 + k / 12) % 1, y = -1.1 - p * 2.2, x = Math.sin(p * 6 + k) * .25 * p, r = (.14 + p * .4) * (1 - p * .55);
    part(c, blob([[x + r, y], [x + r * .5, y - r * .8], [x - r * .5, y - r * .85], [x - r, y], [x - r * .5, y + r * .8], [x + r * .5, y + r * .8]], .5), tones(p < .5 ? '#2a2830' : '#23222a'), below(y + r * .2, r * .1), null, 0);
  }
  celGlow(c, 0, -1.12, .22, ['#b8421a', '#ff8a2a', '#ffd27a']);
  const rock = cc => { cc.beginPath(); cc.moveTo(-.52, 0); cc.quadraticCurveTo(-.3, -.5, -.2, -1.1); cc.lineTo(.2, -1.1); cc.quadraticCurveTo(.3, -.5, .52, 0); cc.closePath(); };
  part(c, rock, VNT.rock, rightOf(.05), lens(-.25, -.95, -.14, -.4, .03));
  for (const [x, y] of [[-.2, -.3], [.15, -.55], [-.05, -.8], [.25, -.2]]) fillPath(c, lens(x - .1, y, x + .1, y, .05), VNT.rock.dark);
  for (const x of [-.7, -.6, .65, .75]) { tubePart(c, [[x, 0], [x, -.12], [x, -.24]], .06, .05, VNT.worm, .01); fillPath(c, lens(x - .07, -.27, x + .07, -.27, .05), '#e0413a'); }
}
// Naga city palace, seen straight from the front (flat on purpose, so no part shows depth).
const CAS = { wall: tones('#2f6c7c'), roof: tones('#d09c30'), spire: tones('#e8b83c'), base: tones('#24505e') };
function ddCastleCel(c, t) {
  groundShadow(c, 2.8, SAND_SHADOW, .12);
  part(c, cc => { cc.beginPath(); cc.rect(-1.25, -.25, 2.5, .25); }, CAS.base, below(-.1, 0), cc => { cc.beginPath(); cc.rect(-1.25, -.25, 2.5, .05); });
  for (const s of [-1, 1]) {
    part(c, cc => { cc.beginPath(); cc.rect(s * 1 - .18, -.9, .36, .65); }, CAS.wall, rightOf(s * 1 + .05), null);
    part(c, cc => { cc.beginPath(); cc.moveTo(s * 1 - .24, -.9); cc.lineTo(s * 1 + .24, -.9); cc.lineTo(s * 1, -1.5); cc.closePath(); }, CAS.roof, rightOf(s * 1), null, .02);
  }
  part(c, cc => { cc.beginPath(); cc.rect(-.7, -.82, 1.4, .57); }, CAS.wall, rightOf(.35), cc => { cc.beginPath(); cc.rect(-.7, -.82, .5, .05); });
  part(c, cc => { cc.beginPath(); cc.moveTo(-.85, -.8); cc.lineTo(.85, -.8); cc.lineTo(0, -1.2); cc.closePath(); }, CAS.roof, rightOf(0), null, .02);
  part(c, cc => { cc.beginPath(); cc.moveTo(-.6, -1.08); cc.lineTo(.6, -1.08); cc.lineTo(0, -1.45); cc.closePath(); }, CAS.roof, rightOf(0), null, .02);
  part(c, cc => { cc.beginPath(); cc.moveTo(-.16, -1.38); cc.quadraticCurveTo(-.1, -2, 0, -2.45); cc.quadraticCurveTo(.1, -2, .16, -1.38); cc.closePath(); }, CAS.spire, rightOf(0), null, .02);
  celGlow(c, 0, -.45, .3, ['#1f7a74', '#4fd6c0', '#a8ffe8']);
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(-.16, -.25); cc.lineTo(-.16, -.52); cc.quadraticCurveTo(0, -.72, .16, -.52); cc.lineTo(.16, -.25); cc.closePath(); }, '#0d2a33');
  for (const x of [-.45, .45, -1, 1]) { const on = Math.sin(t * 1.5 + x * 3) > -.3; fillPath(c, blob([[x, -.63], [x + .05, -.55], [x, -.47], [x - .05, -.55]], .5), on ? '#a8ffe8' : '#4fd6c0'); }
}
const CEL_DECOR = { coral: ddCoralCel, chest: ddChestCel, ship: ddShipCel, vent: ddVentCel, castle: ddCastleCel };

/* ================= scenery ================= */
// Water in flat bands from sunny blue to the deep dark, with gently wavy borders.
const WATER = ['#3fa9da', '#2c8dc5', '#1d72a8', '#145889', '#0d406a', '#082b4c', '#051b33', '#020e1d'];
const WATER_EDGES = [.08, .18, .3, .43, .56, .7, .83];
function waterEdge(i, x) { return H * WATER_EDGES[i] + Math.sin(x * .004 + i * 1.7) * u * .9 + Math.sin(x * .011 + i) * u * .4; }
function bandPath(i, x0, x1) {
  return cc => {
    cc.beginPath();
    const top = i === 0 ? () => -u * 6 : x => waterEdge(i - 1, x), bot = i === WATER.length - 1 ? () => H + u * 6 : x => waterEdge(i, x);
    cc.moveTo(x0, top(x0)); for (let x = x0; x <= x1 + 40; x += 40) cc.lineTo(x, top(x));
    for (let x = x1 + 40; x >= x0; x -= 40) cc.lineTo(x, bot(x));
    cc.closePath();
  };
}
function drawWaterCel(viewX) {
  const x0 = viewX - u * 6, x1 = viewX + VW / vs + u * 6;
  for (let i = 0; i < WATER.length; i++) fillPath(ctx, bandPath(i, x0, x1), WATER[i]);
}
// Sunbeams: the same bands, one shade lighter, where the beams fall.
function drawRaysCel(t) {
  // Job's call: the sunbeams are see-through, one flat pale colour laid over what is behind them
  ctx.globalAlpha = .07; ctx.fillStyle = '#d8f2ff'; ctx.beginPath();
  for (const r of rays) {
    const sw = Math.sin(t * .2 + r.ph) * W * .03;
    ctx.moveTo(r.x + sw - r.w / 2, 0); ctx.lineTo(r.x + sw + r.w / 2, 0);
    ctx.lineTo(r.x + sw * 2 + r.w * 1.6, H * .55); ctx.lineTo(r.x + sw * 2 - r.w * .6, H * .55); ctx.closePath();
  }
  ctx.fill(); ctx.globalAlpha = 1;
}
const SEA_FLOOR = tones('#1a2e42'), ROCK = tones('#16283b');
function drawSeabedCel() {
  const ground = cc => { cc.beginPath(); cc.moveTo(0, H + u * 5); cc.lineTo(seabed[0].x, seabed[0].y); for (let i = 1; i < seabed.length; i++) { const a = seabed[i - 1], b = seabed[i]; cc.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2); } cc.lineTo(WW, seabed[seabed.length - 1].y); cc.lineTo(WW, H + u * 5); cc.closePath(); };
  fillPath(ctx, ground, SEA_FLOOR.mid);
  ctx.save(); ground(ctx); ctx.clip();
  fillPath(ctx, cc => { cc.beginPath(); cc.moveTo(0, H * SEABED + u * 3.5); for (let x = 0; x <= WW; x += 60) cc.lineTo(x, H * SEABED + u * 3.5 + Math.sin(x * .01) * u * .6); cc.lineTo(WW, H + u * 6); cc.lineTo(0, H + u * 6); cc.closePath(); }, SEA_FLOOR.dark);
  ctx.restore();
  // a light rim along the top of the sand
  strokePath(ctx, cc => { cc.beginPath(); cc.moveTo(seabed[0].x, seabed[0].y); for (let i = 1; i < seabed.length; i++) { const a = seabed[i - 1], b = seabed[i]; cc.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2); } }, SEA_FLOOR.light, u * .5);
  for (const r of rocks) {
    const rk = blob([[r.x + r.rx, r.y], [r.x + r.rx * .6, r.y - r.ry * .9], [r.x - r.rx * .5, r.y - r.ry], [r.x - r.rx, r.y - r.ry * .1], [r.x - r.rx * .6, r.y + r.ry * .7], [r.x + r.rx * .6, r.y + r.ry * .7]], .5);
    part(ctx, rk, ROCK, below(r.y, r.ry * .4), lens(r.x - r.rx * .6, r.y - r.ry * .7, r.x - r.rx * .05, r.y - r.ry * .9, r.ry * .12), 0);
  }
}
const WORM = tones('#d8d0bc'), PLUME = tones('#e0413a'), PEN = tones('#4fa8bf');
function drawPlantsCel(t) {
  const [v0, v1] = celView, m = u * 12;
  for (const p of plants) {
    if (p.x < v0 - m || p.x > v1 + m) continue;
    if (p.kind === 'worm') {
      for (const tb of p.tubes) {
        const bx = p.x + tb.dx, by = seabedY(bx) + u * .5, sw = Math.sin(t * .8 + tb.ph) * u * .8, tx = bx + sw, ty = by - tb.h;
        tubePart(ctx, [[bx, by], [bx + sw * .3, by - tb.h * .5], [tx, ty]], u * .6, u * .45, WORM, u * .1);
        // the fan of feathery arms in one go: left ones lit, right ones in shade
        const lit = [], shade = [];
        for (let j = 0; j < 5; j++) {
          const a = -Math.PI / 2 + (j - 2) * .35 + Math.sin(t * 1.5 + tb.ph) * .15;
          (j < 2 ? lit : shade).push([tx, ty, tx + Math.cos(a) * u * 1.9, ty + Math.sin(a) * u * 1.9, u * .25]);
        }
        fillPath(ctx, cc => { cc.beginPath(); for (const l of lit) lensTo(cc, ...l); }, PLUME.mid);
        fillPath(ctx, cc => { cc.beginPath(); for (const l of shade) lensTo(cc, ...l); }, PLUME.dark);
        strokePath(ctx, cc => { cc.beginPath(); for (const l of lit.concat(shade)) lensTo(cc, ...l); }, PLUME.line, u * .08);
      }
    } else {
      const by = seabedY(p.x) + u * .5, sw = Math.sin(t * .6 + p.ph) * u;
      tubePart(ctx, [[p.x, by], [p.x, by - p.h * .6], [p.x + sw, by - p.h]], u * .35, u * .2, PEN, u * .08);
      for (let k = 1; k <= 5; k++) {
        const f = k / 5.5, on = Math.sin(t * 2 - k * .8 + p.ph) > 0;
        celGlow(ctx, p.x + sw * f * f, by - p.h * f, u * (on ? .6 : .4), on ? ['#2f8fa8', '#8ff0ff', '#e8fdff'] : ['#2f8fa8', '#5fc7dc']);
      }
    }
  }
}
function drawLabelsCel() {
  ctx.font = `${Math.max(12, u * 1.5)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'right'; ctx.fillStyle = '#9cc3dc';
  const x = VW / vs - u * 2;
  ctx.fillText('Sunlight zone · 0–200 m', x, H * .33 - u);
  ctx.fillText('Twilight zone · 200–1,000 m', x, H * .62 - u);
  ctx.fillText('Midnight zone · deeper than 1,000 m', x, H * .62 + u * 3);
}
// Rock ridges far away and nearer, in flat colours; the far ones pale like water in between.
const RIDGE = { far: tones('#1a5a86'), mid: tones('#0e3b5e'), fore: tones('#040b14', 3, 6) };
function drawLayerCel(L, viewX, t) {
  if (!L) return;
  ctx.save(); ctx.translate(viewX * (1 - L.f), 0);
  const lx0 = viewX * L.f - W * .4, lx1 = viewX * L.f + VW / vs + W * .4, tt = L === far ? RIDGE.far : L === mid ? RIDGE.mid : RIDGE.fore;
  if (L.school) {
    const sc = L.school, cx = ((t * u * 2.2) % (WW * L.f + W * 1.4)) - W * .2, sr = mulberry32(sc.seed);
    ctx.fillStyle = '#23679a';
    for (let i = 0; i < sc.n; i++) {
      const a = sr() * TAU, d = sr() * u * 9, ph = sr() * 9;
      const x = cx + Math.cos(a + t * .15) * d * 1.8, y = sc.y + Math.sin(a + t * .15) * d * .6 + Math.sin(t + ph) * u * .3;
      if (x < lx0 || x > lx1) continue;
      ctx.beginPath(); ctx.moveTo(x + u * .7, y); ctx.lineTo(x - u * .4, y - u * .28); ctx.lineTo(x - u * .4, y + u * .28); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - u * .35, y); ctx.lineTo(x - u * .75, y - u * .22); ctx.lineTo(x - u * .75, y + u * .22); ctx.fill();
    }
  }
  for (const pts of L.peaks) {
    if (pts[8][0] < lx0 || pts[0][0] > lx1) continue;
    const ridge = cc => { cc.beginPath(); cc.moveTo(pts[0][0], H + u * 6); for (const [x, y] of pts) cc.lineTo(x, y); cc.lineTo(pts[8][0], H + u * 6); cc.closePath(); };
    const peakX = pts[4][0];
    part(ctx, ridge, tt, rightOf(peakX), null, 0);
  }
  ctx.restore();
}
function drawSurfaceCel(viewX, t) {
  const w = VW / vs, wav = x => u * 1.6 + Math.sin(x * .012 + t * 1.3) * u * .5 + Math.sin(x * .031 - t * .9) * u * .25;
  fillPath(ctx, cc => { cc.beginPath(); cc.moveTo(viewX - 20, -u * 5); for (let x = viewX - 20; x <= viewX + w + 20; x += 18) cc.lineTo(x, wav(x)); cc.lineTo(viewX + w + 20, -u * 5); cc.closePath(); }, '#7fcbec');
  strokePath(ctx, cc => { cc.beginPath(); for (let x = viewX - 20; x <= viewX + w + 20; x += 18) { const y = wav(x) + u * .6; if (x === viewX - 20) cc.moveTo(x, y); else cc.lineTo(x, y); } }, '#bfe8f8', Math.max(1, u * .2));
}
function renderCel(t, viewX, showLabels) {
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
  drawLayer(far, viewX, t);
  drawLayer(mid, viewX, t);
  drawRays(t);
  for (const s of snow) { if (s.x < x0 || s.x > x1) continue; ell(ctx, s.x, s.y, s.r * .8, s.r * .8, s.y < H * .45 ? '#bfe3f2' : '#5f86a3'); }
  drawPass(viewX - sx);
  drawSeabed();
  drawPlants(t);
  drawDecor(t);
  for (const o of creatures) drawCreature(o, x0, x1);
  for (const p of pellets) { ell(ctx, p.x, p.y, u * .45, u * .45, '#c8894a'); ell(ctx, p.x - u * .12, p.y - u * .12, u * .14, u * .14, '#e8b27a'); }
  ctx.strokeStyle = '#bfe3f5'; ctx.lineWidth = Math.max(1, u * .12);
  for (const b of bubbles) { if (b.x < x0 - 9 || b.x > x1 + 9) continue; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.stroke(); ell(ctx, b.x - b.r * .35, b.y - b.r * .35, b.r * .25, b.r * .25, '#ffffff'); }
  for (const s of sparks) { const r = u * .5 * Math.min(1, s.life); ell(ctx, s.x, s.y, r, r, '#f6fbff'); }
  drawLayer(fore, viewX, t);
  drawSurface(viewX, t);
  ctx.font = `bold ${Math.max(14, u * 2)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'center';
  for (const x of texts) { ctx.globalAlpha = Math.min(1, x.life); ctx.fillStyle = '#fff6c8'; ctx.fillText(x.s, x.x, x.y); }
  ctx.globalAlpha = 1;
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  if (showLabels) drawLabels();
}

/* ---- sticker icon for pearls ---- */
function pearlIconCel(c) { part(c, ringPath(0, 0, .38), tones('#e3ebf5'), below(.08, .12), lens(-.26, -.18, -.06, -.3, .05), .03); }

/* ================= switch the world over to the new drawings ================= */
const CEL_ART = { clown: dClownCel, angel: dAngelCel, puffer: dPufferCel, turtle: dTurtleCel, sword: dSwordCel, jelly: dJellyCel, whaleshark: dWhaleSharkCel, squid: dSquidCel,
  angler: dAnglerCel, seapig: dSeaPigCel, vampire: dVampireCel, gulper: dGulperCel, isopod: dIsopodCel, dumbo: dDumboCel, bloop: dBloopCel,
  mermaid: dMermaidCel, kraken: dKrakenCel, megalodon: dMegalodonCel, serpent: dSerpentCel, naga: dNagaCel, leviathan: dLeviathanCel, anon: dAnonCel };
if (ART_CEL) {
  for (const [id, d] of Object.entries(CEL_ART)) BY[id].draw = d;
  for (const d of DECOR) if (CEL_DECOR[d.id]) d.draw = CEL_DECOR[d.id];
  drawWater = drawWaterCel; drawRays = drawRaysCel; drawSeabed = drawSeabedCel; drawPlants = drawPlantsCel;
  drawLabels = drawLabelsCel; drawLayer = drawLayerCel; drawSurface = drawSurfaceCel; render = renderCel;
  THEME.icons.cur = pearlIconCel; THEME.shadowColor = '#06182a';
  THEME.icons.chest = c => { c.translate(0, .22); c.scale(.55, .55); ddChestCel(c, 0, { open: .6 }); };
  THEME.icons.castle = c => { c.translate(0, .42); c.scale(.3, .3); ddCastleCel(c, 1); };
}
