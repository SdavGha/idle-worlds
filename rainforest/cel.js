"use strict";
/* ================= Rainforest: cel-shaded drawings =================
   New cartoon versions of every animal, decoration and piece of scenery (see shared/cel.js for the style).
   These are the default; opening the page with ?art=old shows the old drawings in theme.js instead.
   Where an animal holds a branch, its hands or feet stay exactly where the old drawing had them. */

/* ---- blue morpho (seen from above, wings beating) ---- */
const MOR = { wing: tones('#2a86ff'), edge: tones('#12204f'), body: tones('#2b2018') };
function dMorphoCel(c, t) {
  const f = .3 + .7 * Math.abs(Math.sin(t * 8));
  c.save(); c.scale(1, f);
  const bez = (a, b, d, e, f, g, h, s) => cc => { cc.beginPath(); cc.moveTo(0, 0); cc.bezierCurveTo(a, s * b, d, s * e, f, s * g); cc.lineTo(h, s * .02); cc.closePath(); };
  for (const s of [-1, 1]) {
    // black wing edge, blue inside; the outer part of each wing sits in shade, a light streak near the body
    const outer = s > 0 ? cc => { cc.beginPath(); cc.rect(-2, .62, 4, 2); } : cc => { cc.beginPath(); cc.rect(-2, -2.62, 4, 2); };
    for (const [o, i, lt] of [[bez(-.2, .95, -1, .85, -.75, .12, 0, s), bez(-.2, .8, -.85, .72, -.62, .12, -.02, s), lens(-.1, s * .12, -.45, s * .5, .05)],
                               [bez(.25, 1.15, 1.15, 1.05, .95, .2, 0, s), bez(.25, .98, 1, .9, .8, .2, .02, s), lens(.12, s * .14, .5, s * .6, .06)]]) {
      fillPath(c, o, MOR.edge.mid);
      part(c, i, MOR.wing, outer, lt, 0);
      strokePath(c, o, MOR.edge.line, .03);
    }
    ell(c, .62, s * .74, .05, .05, '#ffffff'); ell(c, -.5, s * .6, .04, .04, '#ffffff');
  }
  c.restore();
  part(c, blob([[.66, 0], [.55, -.1], [0, -.09], [-.55, -.06], [-.6, 0], [-.55, .06], [0, .09], [.55, .1]], .5), MOR.body, below(.02, 0), null, .02);
  for (const s of [-1, 1]) { tubePart(c, [[.64, s * .04], [.85, s * .16], [1, s * .3]], .03, .02, MOR.body, 0); ell(c, 1, s * .3, .045, .045, MOR.body.mid); }
}

/* ---- frogs: a sitting frog, head up, big folded back leg (feet on the ground or branch at fy) ---- */
function frogCel(c, T, fy, paint, foot, eye) {
  const far = { mid: T.dark, dark: T.line, light: T.dark, line: T.line };
  part(c, lens(-.3, fy, .08, fy, .05), far, null, null, .02);
  tubePart(c, [[.3, .12], [.42, .34], [.4, fy - .05]], .13, .1, far, .015);
  const body = blob([[.8, -.04], [.62, -.32], [.25, -.44], [-.2, -.4], [-.6, -.2], [-.74, .1], [-.52, .36], [0, .42], [.52, .3]], .5);
  fillPath(c, body, T.mid);
  c.save(); body(c); c.clip(); if (paint) paint(); fillPath(c, below(.2, .1), T.dark); fillPath(c, lens(-.4, -.3, .15, -.42, .05), T.light); c.restore();
  strokePath(c, body, T.line, .035);
  // near back leg: long foot on the ground, shin up to a big thigh folded against the body
  part(c, lens(-.66, fy - .06, .08, fy - .02, .07), T, below(fy - .02, 0), null, .025);
  for (const a of [-.25, 0, .25]) fillPath(c, lens(.02, fy - .02, .2, fy - .02 + a * .12, .025), foot);
  part(c, blob([[-.02, .3], [-.16, .04], [-.46, -.04], [-.74, .16], [-.66, .44], [-.3, fy - .06]], .5), T, below(.34, .06), lens(-.55, .06, -.25, .0, .035), .03);
  tubePart(c, [[.4, .14], [.5, .34], [.47, fy - .05]], .15, .11, T, .02);
  for (const a of [-.3, 0, .3]) fillPath(c, lens(.44, fy - .02, .6, fy - .02 + a * .12, .025), foot);
  part(c, ringPath(.5, -.36, .17), T, below(-.3, 0), null, .03);
  eye(.5, -.38);
  strokePath(c, cc => { cc.beginPath(); cc.moveTo(.52, -.1); cc.quadraticCurveTo(.68, -.02, .8, -.08); }, T.line, .03);
}
/* ---- poison dart frog (feet on the ground) ---- */
const DRT = { skin: tones('#2b6cff'), spot: '#0a1a3a' };
function dDartFrogCel(c) {
  frogCel(c, DRT.skin, .56, () => { for (const [x, y, r] of [[-.4, -.12, .13], [-.02, -.3, .1], [.1, .02, .12], [-.2, .22, .09], [.4, -.12, .08]]) fillPath(c, blob([[x + r, y], [x, y - r * .8], [x - r, y], [x, y + r * .8]], .5), DRT.spot); },
    DRT.skin.dark, (x, y) => celEye(c, x + .02, y, .12));
}
/* ---- red-eyed tree frog (feet at y .55 so it sits on a branch) ---- */
const TRF = { skin: tones('#3ccf4e'), side: tones('#2f6bd8'), foot: '#ff8a1c' };
function dTreeFrogCel(c) {
  frogCel(c, TRF.skin, .55, () => {
    fillPath(c, below(.12, .06), TRF.side.mid);
    for (const x of [-.3, -.05, .2]) fillPath(c, cc => { cc.beginPath(); cc.rect(x, .1, .05, .3); }, '#ffe14a');
  }, TRF.foot, (x, y) => { ell(c, x, y, .15, .15, '#e2231a'); ell(c, x + .02, y, .045, .1, '#15131a'); ell(c, x + .07, y - .06, .035, .035, '#ffffff'); });
}

/* ---- toucan (feet at y .66 to perch) ---- */
const TOU = { body: tones('#1c1c24', 6, 14), throat: tones('#fff1b0'), beak: tones('#ff9a1c'), tip: '#d63a1c', eye: '#5ad1ff', red: tones('#e8313a') };
function dToucanCel(c, t) {
  const w = Math.sin(t * 10) * .35;
  c.save(); c.translate(.28, -.14); c.rotate(Math.PI + .3 + Math.sin(t * 10 - .4) * .32); part(c, lens(0, 0, .55, 0, .12, .08), { mid: '#0e0e14', dark: '#0e0e14', light: '#26262e', line: '#000000' }, null, null, .02); c.restore();
  part(c, cc => { cc.beginPath(); cc.moveTo(-.6, .02); cc.lineTo(-1.36, .32); cc.lineTo(-1.3, .5); cc.lineTo(-.55, .3); cc.closePath(); }, TOU.body, below(.3, 0), null, .02);
  const body = blob([[.62, -.35], [.2, -.4], [-.4, -.3], [-.85, .05], [-.4, .45], [.2, .5], [.62, .25]], .5);
  part(c, body, TOU.body, below(.25, .1), lens(-.3, -.32, .2, -.38, .04));
  part(c, lens(-.3, .44, .15, .44, .07), TOU.red, below(.47, 0), null, .015);
  part(c, blob([[.66, -.1], [.55, -.3], [.3, -.28], [.2, 0], [.32, .24], [.58, .22]], .5), TOU.throat, below(.1, .06), null, .02);
  const beak = cc => { cc.beginPath(); cc.moveTo(.58, -.4); cc.quadraticCurveTo(1.45, -.5, 1.7, -.12); cc.quadraticCurveTo(1.25, -.02, .6, -.1); cc.closePath(); };
  part(c, beak, TOU.beak, below(-.2, .05), lens(.8, -.4, 1.3, -.38, .03));
  c.save(); beak(c); c.clip(); fillPath(c, rightOf(1.5), TOU.tip); c.restore();
  strokePath(c, beak, TOU.beak.line, .025);
  lines(c, [[.62, -.25, 1.66, -.14]], TOU.beak.line, .02);
  ell(c, .45, -.28, .11, .11, TOU.eye); celEye(c, .46, -.28, .06);
  c.save(); c.translate(.2, -.05); c.rotate(Math.PI + .1 + w * .9); part(c, lens(0, 0, .6, 0, .14, .1), { mid: '#2c2c36', dark: '#1c1c24', light: '#3a3a46', line: '#08080c' }, below(0, .02), null, .02); c.restore();
  for (const x of [0, .15]) tubePart(c, [[x, .48], [x, .57], [x, .66]], .05, .04, tones('#8a7a5a'), 0);
}

/* ---- chameleon (feet at y .5; colour changes when tapped) ---- */
function dChameleonCel(c, t, o) {
  const h = o && o.hue != null ? o.hue : 110, T = { mid: hsl(h, 60, 45), dark: hsl(h, 64, 33), light: hsl((h + 40) % 360, 72, 64), line: hsl(h, 66, 22) };
  const far = { mid: T.dark, dark: T.line, light: T.dark, line: T.line };
  // tail rolled into a curl: a tapering tube, then a solid curl at the end
  tubePart(c, [[-.5, .08], [-.82, .12], [-1, .3], [-.98, .5]], .16, .1, T, .02);
  part(c, ringPath(-.86, .5, .13), T, below(.52, .04), null, .02);
  fillPath(c, ringPath(-.86, .5, .055), T.dark); strokePath(c, ringPath(-.86, .5, .055), T.line, .015);
  // legs bent at the knee, far ones darker
  for (const x of [-.32, .36]) tubePart(c, [[x, .1], [x + .12, .3], [x + .02, .5]], .09, .07, far, .015);
  const body = cc => { cc.beginPath(); cc.moveTo(-.65, .15); cc.quadraticCurveTo(-.4, -.6, .35, -.35); cc.quadraticCurveTo(.7, -.2, .7, .05); cc.quadraticCurveTo(.2, .35, -.65, .15); cc.closePath(); };
  part(c, body, T, below(.02, .1), lens(-.35, -.28, .2, -.4, .04));
  strokePath(c, cc => { cc.beginPath(); cc.moveTo(-.5, .06); cc.quadraticCurveTo(0, .16, .5, .04); }, T.light, .05);
  part(c, cc => { cc.beginPath(); cc.moveTo(.35, -.35); cc.lineTo(.55, -.62); cc.lineTo(.95, -.05); cc.lineTo(.7, .1); cc.closePath(); }, T, below(-.1, .05), null, .03);
  for (const x of [-.22, .46]) tubePart(c, [[x, .1], [x + .12, .3], [x + .02, .5]], .1, .08, T, .015);
  part(c, ringPath(.66, -.2, .15), T, below(-.16, 0), null, .025); celEye(c, .7 + Math.sin(t * 1.3) * .03, -.2, .06);
  celSmile(c, .82, -.02, .06, T.line);
}

/* ---- scarlet macaw (perches at y .48) ---- */
const MAC = { red: tones('#e3262f'), blue: tones('#2a5bd7'), green: tones('#34b24a'), yel: tones('#ffd02e'), face: tones('#fbeee6'), beak: tones('#f0e8dc') };
function dMacawCel(c, t) {
  const w = Math.sin(t * 9) * .5;
  c.save(); c.translate(.06, -.14); c.rotate(.35 + Math.sin(t * 9 - .4) * .45);
  part(c, lens(0, 0, -.85, 0, .16, .1), MAC.blue, null, null, .02); part(c, lens(0, 0, -.45, 0, .14), MAC.green, null, null, .015); c.restore();
  part(c, cc => { cc.beginPath(); cc.moveTo(-.5, .02); cc.lineTo(-1.72, .35); cc.lineTo(-1.66, .5); cc.lineTo(-.45, .28); cc.closePath(); }, MAC.red, below(.3, 0), null, .02);
  part(c, cc => { cc.beginPath(); cc.moveTo(-.6, .1); cc.lineTo(-1.46, .45); cc.lineTo(-1.4, .53); cc.lineTo(-.55, .24); cc.closePath(); }, MAC.blue, null, null, .015);
  const body = blob([[.66, -.2], [.3, -.38], [-.3, -.32], [-.72, .05], [-.3, .42], [.3, .46], [.62, .2]], .5);
  part(c, body, MAC.red, below(.2, .1), lens(-.25, -.3, .25, -.36, .04));
  c.save(); c.translate(-.05, -.05); c.rotate(.15 + w * .9);
  part(c, lens(0, 0, -.9, 0, .2, .12), MAC.blue, below(.02, 0), null, .02);
  part(c, lens(0, 0, -.55, 0, .17), MAC.green, below(.02, 0), null, .018);
  part(c, lens(0, 0, -.3, 0, .13), MAC.yel, below(.02, 0), null, .015);
  c.restore();
  part(c, blob([[.8, -.2], [.62, -.46], [.35, -.42], [.26, -.1], [.45, .06], [.72, .02]], .5), MAC.red, below(-.08, .05), null);
  part(c, blob([[.74, -.2], [.66, -.32], [.5, -.3], [.46, -.14], [.58, -.06], [.7, -.1]], .5), MAC.face, null, null, .015);
  celEye(c, .6, -.22, .055);
  part(c, cc => { cc.beginPath(); cc.moveTo(.72, -.34); cc.quadraticCurveTo(1.05, -.32, .98, .02); cc.quadraticCurveTo(.9, -.08, .76, -.05); cc.closePath(); }, MAC.beak, rightOf(.9), null, .02);
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(.76, -.05); cc.quadraticCurveTo(.88, .02, .8, .08); cc.lineTo(.72, -.02); cc.closePath(); }, '#2a2a2a');
  for (const x of [0, .15]) tubePart(c, [[x, .38], [x, .43], [x, .48]], .05, .04, tones('#6a6a70'), 0);
}

/* ---- three-toed sloth (hands and feet meet the branch at y -.72) ---- */
const SLO = { fur: tones('#9b8264'), face: tones('#efe2c8'), mask: '#4a3624', branch: tones('#6b4a2a') };
function dSlothCel(c, t, o) {
  if (!(o && o.perched)) { tubePart(c, [[-1.1, -.75], [0, -.735], [1.1, -.72]], .14, .14, SLO.branch, .02); fillPath(c, lens(.72, -.82, .92, -.86, .04), '#4f9a3e'); }
  const sw = Math.sin(t * 1.2) * .05;
  for (const [x0, x1] of [[-.45, -.6], [-.2, -.25], [.25, .3], [.5, .6]]) {
    tubePart(c, [[x0, -.1], [(x0 + x1) / 2 + sw * .5, -.42], [x1 + sw, -.7]], .18, .14, SLO.fur, .02);
    lines(c, [[x1 + sw - .04, -.7, x1 + sw - .06, -.78], [x1 + sw + .04, -.7, x1 + sw + .06, -.78]], '#3a2a1a', .025);
  }
  const body = blob([[.62 + sw, 0], [.35 + sw, -.34], [sw, -.38], [-.4 + sw, -.3], [-.62 + sw, 0], [-.4 + sw, .32], [sw, .36], [.4 + sw, .3]], .5);
  part(c, body, SLO.fur, below(.1, .1), lens(-.35 + sw, -.3, .1 + sw, -.36, .04));
  fillPath(c, blob([[.3 + sw, -.1], [.2 + sw, -.14], [.1 + sw, -.08], [.18 + sw, 0]], .5), '#6f8a4a');
  const hx = .55 + sw, hy = .12;
  part(c, blob([[hx + .28, hy], [hx + .18, hy - .24], [hx - .12, hy - .26], [hx - .28, hy], [hx - .12, hy + .24], [hx + .18, hy + .22]], .5), SLO.fur, below(hy + .1, .05), null);
  part(c, blob([[hx + .22, hy + .02], [hx + .12, hy - .16], [hx - .08, hy - .16], [hx - .18, hy + .02], [hx - .06, hy + .18], [hx + .14, hy + .16]], .5), SLO.face, below(hy + .1, .03), null, .015);
  fillPath(c, lens(hx - .16, hy - .02, hx, hy + .02, .035), SLO.mask); fillPath(c, lens(hx + .04, hy + .02, hx + .2, hy - .02, .035), SLO.mask);
  ell(c, hx - .07, hy, .028, .028, '#ffffff'); ell(c, hx + .11, hy, .028, .028, '#ffffff');
  ell(c, hx + .02, hy + .07, .03, .02, '#3a2a1a'); celSmile(c, hx + .02, hy + .06, .06, '#3a2a1a');
}

/* ---- spider monkey (hands at y -1 to hang from a branch) ---- */
const MON = { fur: tones('#43302a', 8, 12), face: tones('#d8b08a') };
function dMonkeyCel(c, t) {
  const sw = Math.sin(t * 3) * .3, F = MON.fur;
  const tail = [[-.35, .1], [-.75, .18], [-1.02, -.1], [-1, -.55], [-.8, -.8]];
  for (let k = 0; k <= 6; k++) { const a = Math.PI + k / 6 * Math.PI * 1.3; tail.push([-.62 + Math.cos(a) * .12, -.74 + Math.sin(a) * .12]); }
  tubePart(c, tail, .08, .04, F, .015);
  tubePart(c, [[-.05, -.1], [-.3, -.5], [-.1 - sw * .5, -.95]], .1, .08, { mid: F.dark, dark: F.line, light: F.dark, line: F.line }, .015);
  for (const [a, b] of [[[-.2, .25], [-.1, .7]], [[.15, .25], [.35, .7]]]) tubePart(c, [a, [(a[0] + b[0]) / 2 - .05, .5], b], .1, .08, F, .015);
  part(c, blob([[.32, 0], [.22, -.28], [0, -.32], [-.24, -.2], [-.32, .1], [-.2, .38], [0, .42], [.22, .34]], .5), F, below(.12, .08), lens(-.2, -.24, .08, -.3, .03));
  tubePart(c, [[.1, -.15], [.4 + sw * .3, -.7], [.3 + sw, -1]], .1, .08, F, .015);
  part(c, blob([[.44, -.38], [.36, -.58], [.14, -.62], [-.06, -.44], [.02, -.2], [.28, -.16]], .5), F, below(-.3, .05), null);
  part(c, blob([[.4, -.34], [.34, -.48], [.18, -.5], [.1, -.36], [.16, -.22], [.32, -.22]], .5), MON.face, below(-.3, .03), null, .015);
  celEye(c, .19, -.38, .035); celEye(c, .31, -.38, .035); celSmile(c, .25, -.3, .05, '#5a3a20');
}

/* ---- emerald tree boa: stretched out while moving, coiled while resting ---- */
const BOA = { skin: tones('#23b453'), belly: '#9fe0a8', mark: '#e9fbe0', branch: tones('#6b4a2a') };
function dBoaCel(c, t, o) {
  if (o && (o.mvKind === 'walk' || o.mvKind === 'climb')) {
    const pts = wave(18, .85, .16, .07, t, 5, .55, 0, 3);
    tubePart(c, pts, .4, .12, BOA.skin, .025);
    for (let k = 1; k < 17; k += 3) { const [x, y] = pts[k], r = .2 - k * .008; lines(c, [[x - .06, y - r * .2, x, y - r * .7], [x, y - r * .7, x + .06, y - r * .2]], BOA.mark, .022); }
    const y0 = pts[0][1];
    part(c, blob([[1.3, y0 + .02], [1.18, y0 - .12], [.95, y0 - .15], [.8, y0], [.95, y0 + .12], [1.18, y0 + .1]], .5), BOA.skin, below(y0 + .03, .04), null);
    celEye(c, 1.06, y0 - .07, .045, '#f5e04a');
    if (Math.sin(t * 3) > .6) lines(c, [[1.3, y0, 1.44, y0 + .02]], '#e0304a', .02);
    return;
  }
  if (!(o && o.perched)) tubePart(c, [[-1.1, .2], [0, .19], [1.1, .18]], .14, .14, BOA.branch, .02);
  for (let i = 0; i < 4; i++) {
    const x = -.55 + i * .32, loop = blob([[x + .2, .12], [x + .16, -.18], [x, -.24], [x - .16, -.18], [x - .2, .12], [x - .14, .4], [x, .46], [x + .14, .4]], .5);
    part(c, loop, BOA.skin, below(.2, .05), lens(x - .12, -.14, x + .02, -.22, .03), .025);
    lines(c, [[x - .1, .05, x, -.05], [x, -.05, x + .1, .05]], BOA.mark, .025);
  }
  const b = Math.sin(t * 1.5) * .03;
  part(c, blob([[.9, -.18 + b], [.78, -.32 + b], [.5, -.36 + b], [.28, -.22 + b], [.5, -.1 + b], [.78, -.08 + b]], .5), BOA.skin, below(-.2 + b, .04), lens(.45, -.32 + b, .7, -.34 + b, .02));
  celEye(c, .64, -.28 + b, .045, '#f5e04a');
  if (Math.sin(t * 2) > .7) lines(c, [[.9, -.18 + b, 1.02, -.16 + b]], '#e0304a', .02);
}

/* ---- walkers on the forest floor (feet at the bottom of their box) ---- */
// A standing leg that starts hidden under the body: straight sides, a foot with the toe forward,
// shade down the right side and a light stripe down the left, like every other round part.
function legCel(c, x, y0, y1, w, T, lw = .02) {
  const leg = cc => { cc.beginPath(); cc.moveTo(x - w / 2, y0); cc.lineTo(x - w * .44, y1 - w * .3); cc.quadraticCurveTo(x - w * .44, y1, x - w * .1, y1); cc.lineTo(x + w * .45, y1); cc.quadraticCurveTo(x + w * .62, y1, x + w * .5, y1 - w * .3); cc.lineTo(x + w / 2, y0); cc.closePath(); };
  part(c, leg, T, rightOf(x + w * .16), cc => { cc.beginPath(); cc.rect(x - w * .33, y0, w * .12, Math.max(0, y1 - y0 - w * .4)); }, lw);
}
const TAP = { black: tones('#23232b', 6, 14), white: tones('#f2efe9') };
function dTapirCel(c, t) {
  const st = Math.sin(t * 6) * .08, K = TAP.black, farK = { mid: K.dark, dark: K.line, light: K.dark, line: K.line };
  for (const x of [-.35, .35]) legCel(c, x, .05, .62 - st, .2, farK);
  for (const x of [-.55, .55]) legCel(c, x, .05, .62 + st, .22, K);
  const body = blob([[.85, -.05], [.55, -.42], [0, -.46], [-.6, -.38], [-.88, 0], [-.6, .36], [0, .42], [.6, .36]], .5);
  // black front and legs, a white saddle across the back; both get the same shadow line
  const saddle = ringPath(-.25, -.05, .5);
  fillPath(c, body, K.mid);
  c.save(); body(c); c.clip();
  fillPath(c, below(.2, .08), K.dark);
  c.save(); saddle(c); c.clip(); fillPath(c, saddle, TAP.white.mid); fillPath(c, below(.2, .08), TAP.white.dark); fillPath(c, lens(-.55, -.32, -.1, -.42, .04), '#ffffff'); c.restore();
  fillPath(c, lens(.3, -.36, .65, -.28, .035), K.light);
  c.restore();
  strokePath(c, body, K.line, .03);
  part(c, blob([[1.12, -.1], [.95, -.35], [.68, -.36], [.55, -.1], [.7, .1], [1, .06]], .5), K, below(-.05, .05), null);
  part(c, cc => { cc.beginPath(); cc.moveTo(1, -.2); cc.quadraticCurveTo(1.25, -.12, 1.2, .08); cc.lineTo(1.06, .02); cc.closePath(); }, K, null, null, .02);
  part(c, lens(.66, -.28, .76, -.46, .05), K, null, null, .015); fillPath(c, lens(.68, -.3, .74, -.42, .02), TAP.white.mid);
  celEye(c, .88, -.18, .035);
}
const CAT = { jag: tones('#e8a33a'), tig: tones('#e87a1f'), cream: tones('#f6e2b8'), white: tones('#fbeee0'), ink: '#1a1008' };
function bigCatCel(c, t, O, stripes) {
  const st = Math.sin(t * 7) * .1, farO = { mid: O.dark, dark: O.line, light: O.dark, line: O.line };
  tubePart(c, [[-.8, -.05], [-1.15, 0], [-1.38, -.35]], .12, .08, O, .015);
  if (stripes) lines(c, [[-1.05, -.1, -1.02, .06], [-1.22, -.14, -1.16, .0], [-1.33, -.3, -1.26, -.2]], CAT.ink, .035);
  for (const x of [-.35, .4]) legCel(c, x, 0, .56 - st, .18, farO);
  for (const x of [-.55, .6]) legCel(c, x, 0, .56 + st, .2, O);
  const body = blob([[.88, -.1], [.6, -.34], [0, -.36], [-.6, -.32], [-.9, 0], [-.6, .32], [0, .36], [.6, .3]], .5);
  fillPath(c, body, O.mid);
  c.save(); body(c); c.clip();
  fillPath(c, below(.1, .08), O.dark);
  fillPath(c, blob([[.6, .1], [0, .12], [-.6, .12], [-.6, .5], [.6, .5]], .5), stripes ? CAT.white.mid : CAT.cream.mid);
  if (stripes) for (let x = -.75; x < .7; x += .16) strokePath(c, cc => { cc.beginPath(); cc.moveTo(x, -.4); cc.quadraticCurveTo(x + .07, -.12, x - .02, .12); }, CAT.ink, .06);
  else for (const [x, y] of [[-.55, -.12], [-.25, -.18], [.05, -.12], [.3, -.18], [-.4, .06], [-.1, .02], [.2, 0]]) strokePath(c, cc => { cc.beginPath(); cc.arc(x, y, .065, 0, TAU * .8); }, CAT.ink, .035);
  fillPath(c, lens(-.5, -.3, .3, -.34, .04), O.light);
  c.restore();
  strokePath(c, body, O.line, .03);
  const head = blob([[1.15, -.14], [1.02, -.42], [.8, -.48], [.6, -.3], [.62, -.02], [.85, .08], [1.1, .02]], .5);
  for (const x of [.75, .98]) { part(c, ringPath(x, -.44, .08), O, null, null, .02); ell(c, x, -.44, .04, .04, stripes ? CAT.white.mid : CAT.cream.dark); }
  part(c, head, O, below(-.12, .06), lens(.72, -.4, .95, -.44, .03));
  if (stripes) lines(c, [[.82, -.46, .82, -.34], [.88, -.47, .88, -.32], [.94, -.46, .94, -.34]], CAT.ink, .03);
  part(c, blob([[1.14, -.08], [1.06, -.18], [.92, -.16], [.88, -.04], [.98, .04], [1.1, .02]], .5), stripes ? CAT.white : CAT.cream, null, null, .015);
  celEye(c, .84, -.26, .045, '#e8d86a'); celEye(c, 1, -.27, .045, '#e8d86a');
  fillPath(c, lens(1.02, -.16, 1.1, -.16, .02), '#3a1a0a'); celSmile(c, 1.04, -.1, .05, '#3a1a0a');
}
const dJaguarCel = (c, t) => bigCatCel(c, t, CAT.jag, false);
const dTigerCel = (c, t) => bigCatCel(c, t, CAT.tig, true);

/* ---- giant centipede ---- */
const CEN = { body: tones('#a3321f'), leg: tones('#f2c230') };
function dCentipedeCel(c, t) {
  for (let i = 11; i >= 0; i--) {
    const x = .9 - i * .17, y = Math.sin(t * 6 - i * .7) * .04, lp = Math.sin(t * 14 - i * 1.2) * .07;
    for (const s of [-1, 1]) tubePart(c, [[x, y + .05], [x + s * .03 + lp * s, y + .16], [x + s * .05 + lp * s, y + .26]], .04, .03, CEN.leg, 0);
    part(c, blob([[x + .12, y], [x + .06, y - .1], [x - .06, y - .1], [x - .12, y], [x - .06, y + .1], [x + .06, y + .1]], .5), i % 2 ? tones('#8a2a1a') : CEN.body, below(y + .03, .02), lens(x - .07, y - .07, x + .03, y - .09, .015), .015);
  }
  part(c, blob([[1.14, -.02], [1.06, -.11], [.94, -.11], [.88, -.02], [.94, .08], [1.06, .08]], .5), tones('#c2401f'), below(0, .02), null, .015);
  for (const [a, b] of [[-.3, -.25], [-.15, -.08]]) tubePart(c, [[1.08, -.07], [1.25, a], [1.4, b]], .03, .015, tones('#c2401f'), 0);
  for (const b of [-.1, .15]) tubePart(c, [[-.98, 0], [-1.18, b * .5], [-1.3, b]], .03, .015, tones('#c2401f'), 0);
  ell(c, 1.07, -.05, .025, .025, '#15131a');
}

/* ---- harpy eagle (flies high) ---- */
const HAR = { grey: tones('#5a606a'), head: tones('#c9ccd2'), white: tones('#f4f1ea'), dark: tones('#3a3d44'), talon: tones('#e8c23a') };
function dHarpyCel(c, t) {
  const f = Math.sin(t * 5);
  const wing = (dx, dy, a, T) => { c.save(); c.translate(dx, dy); c.rotate(a); part(c, lens(0, 0, -1.3, 0, .24, .14), T, below(.04, 0), null, .02); for (let i = 0; i < 4; i++) part(c, lens(-1.05 + i * .12, .06, -1.3 + i * .12, .18, .04), HAR.dark, null, null, .012); c.restore(); };
  wing(.12, -.12, .6 + Math.sin(t * 5 - .35) * .75, { mid: HAR.grey.dark, dark: HAR.grey.line, light: HAR.grey.dark, line: HAR.grey.line });
  part(c, cc => { cc.beginPath(); cc.moveTo(-.45, .08); cc.lineTo(-1.05, .35); cc.lineTo(-.95, .5); cc.lineTo(-.4, .3); cc.closePath(); }, HAR.dark, below(.3, 0), null, .02);
  const body = blob([[.58, -.1], [.3, -.36], [-.3, -.3], [-.62, .05], [-.3, .38], [.3, .42], [.58, .2]], .5);
  fillPath(c, body, HAR.grey.mid);
  c.save(); body(c); c.clip(); fillPath(c, blob([[.6, -.05], [.1, 0], [-.4, .15], [-.3, .6], [.6, .6]], .5), HAR.white.mid); fillPath(c, below(.3, .05), HAR.white.dark); fillPath(c, lens(.0, -.05, .5, -.1, .06), HAR.dark.mid); c.restore();
  strokePath(c, body, HAR.grey.line, .03);
  wing(0, -.02, .45 + f * .75, HAR.grey);
  for (const [a, b] of [[[.38, -.36], [.18, -.72]], [[.5, -.4], [.42, -.78]]]) part(c, lens(a[0], a[1], b[0], b[1], .05), HAR.dark, null, null, .015);
  part(c, blob([[.8, -.25], [.72, -.46], [.5, -.48], [.32, -.3], [.4, -.08], [.66, -.06]], .5), HAR.head, below(-.2, .05), null);
  part(c, cc => { cc.beginPath(); cc.moveTo(.75, -.32); cc.quadraticCurveTo(.98, -.3, .9, -.08); cc.lineTo(.76, -.16); cc.closePath(); }, tones('#2a2a2a', 4, 14), rightOf(.85), null, .015);
  celEye(c, .62, -.31, .05);
  for (const x of [0, .2]) { tubePart(c, [[x, .36], [x, .48], [x + .01, .6]], .07, .06, HAR.talon, .012); lines(c, [[x, .6, x + .12, .7], [x, .6, x - .1, .7]], '#111111', .03); }
}

/* ---- orangutan (hand at y -1.2 holds the branch) ---- */
const ORA = { fur: tones('#c9571f'), face: tones('#e7a77a'), vine: tones('#3f7a2f') };
function dOrangutanCel(c, t, o) {
  const sw = Math.sin(t * 2) * .2, F = ORA.fur;
  if (!(o && o.perched)) tubePart(c, [[.45 + sw * .3, -1.45], [.45 + sw * .3, -1.25], [.45 + sw * .3, -1.05]], .05, .05, ORA.vine, .01);
  tubePart(c, [[-.25, -.25], [-.7, .1], [-.6, .55]], .2, .15, { mid: F.dark, dark: F.line, light: F.dark, line: F.line }, .015);
  for (const [a, b] of [[[-.1, .35], [-.2, .7]], [[.2, .35], [.3, .7]]]) tubePart(c, [a, [(a[0] + b[0]) / 2, .52], b], .18, .15, F, .015);
  const body = blob([[.48, .05], [.34, -.34], [0, -.42], [-.34, -.34], [-.48, .05], [-.34, .42], [0, .5], [.34, .42]], .5);
  part(c, body, F, below(.18, .1), lens(-.3, -.3, .1, -.4, .04));
  for (let i = 0; i < 7; i++) { const a = -.3 + i * .35; lines(c, [[Math.cos(a) * .38, Math.sin(a) * .38 + .05, Math.cos(a) * .5, Math.sin(a) * .48 + .08]], F.line, .025); }
  tubePart(c, [[.2, -.3], [.5, -.8], [.45 + sw * .3, -1.2]], .2, .16, F, .015);
  part(c, blob([[.38, -.42], [.3, -.64], [.08, -.7], [-.16, -.56], [-.14, -.28], [.12, -.18], [.32, -.24]], .5), F, below(-.34, .05), null);
  part(c, blob([[.32, -.38], [.26, -.52], [.1, -.54], [-.02, -.42], [.02, -.24], [.2, -.22]], .5), ORA.face, below(-.3, .03), null, .015);
  celEye(c, .08, -.43, .035); celEye(c, .21, -.43, .035); celSmile(c, .15, -.32, .06, '#6a2a0a');
}

/* ---- giant ground sloth (walks the floor, feet at .82) ---- */
const MGT = { fur: tones('#7a5a3c'), claw: tones('#e8dcc0') };
function dMegatheriumCel(c, t) {
  const st = Math.sin(t * 2.5) * .06, F = MGT.fur, farF = { mid: F.dark, dark: F.line, light: F.dark, line: F.line };
  for (const x of [-.4, .45]) legCel(c, x, .1, .72 - st, .26, farF);
  for (const x of [-.7, .75]) legCel(c, x, .1, .72 + st, .28, F);
  part(c, cc => { cc.beginPath(); cc.moveTo(-1, 0); cc.quadraticCurveTo(-1.5, .2, -1.45, .55); cc.quadraticCurveTo(-1.2, .35, -.9, .25); cc.closePath(); }, F, below(.3, 0), null, .02);
  const body = blob([[1.05, -.2], [.7, -.58], [0, -.66], [-.7, -.55], [-1.1, -.05], [-.7, .45], [0, .55], [.7, .45]], .5);
  part(c, body, F, below(.15, .15), lens(-.5, -.55, .3, -.62, .06));
  for (let i = 0; i < 14; i++) { const x = -.9 + i * .13; lines(c, [[x, .3, x - .04, .5]], F.line, .025); }
  for (const dx of [-.05, .03, .11]) tubePart(c, [[.8 + dx, .7 + st], [.84 + dx, .76 + st], [.88 + dx, .8 + st]], .03, .02, MGT.claw, 0);
  part(c, blob([[1.46, -.2], [1.3, -.42], [1, -.46], [.8, -.25], [.92, -.04], [1.25, -.05]], .5), F, below(-.18, .05), null);
  celEye(c, 1.1, -.32, .05); celSmile(c, 1.3, -.15, .06, '#2a1e14');
}

/* ================= legends ================= */
const KIN = { swan: tones('#fff6e6'), wing: tones('#fdf1d6'), gold: tones('#e8a317'), skin: tones('#f3c56a'), hair: tones('#2a1c22'), sash: tones('#d6452f') };
function dKinnareeCel(c, t) {
  const f = Math.sin(t * 4);
  c.save(); c.translate(0, -.05); c.rotate(.95 + Math.sin(t * 4 - .4) * .45); part(c, lens(0, 0, -1.05, 0, .2, .12), { mid: KIN.wing.dark, dark: KIN.wing.line, light: KIN.wing.dark, line: KIN.wing.line }, null, null, .02); part(c, lens(-.7, 0, -1.05, 0, .1), KIN.gold, null, null, .015); c.restore();
  part(c, cc => { cc.beginPath(); cc.moveTo(-.6, .1); cc.lineTo(-1.2, -.1); cc.lineTo(-1.1, .1); cc.lineTo(-1.25, .25); cc.lineTo(-.55, .3); cc.closePath(); }, KIN.swan, below(.2, 0), null, .02);
  part(c, blob([[.45, .1], [.2, -.14], [-.3, -.14], [-.7, .12], [-.3, .45], [.2, .45]], .5), KIN.swan, below(.25, .08), lens(-.35, -.08, .1, -.12, .03));
  for (const x of [-.2, .05]) tubePart(c, [[x, .44], [x - .02, .57], [x - .04, .7]], .05, .04, KIN.gold, .01);
  c.save(); c.translate(-.12, .02); c.rotate(.7 + f * .45); part(c, lens(0, 0, -1.05, 0, .2, .12), KIN.wing, below(.03, 0), null, .02); part(c, lens(-.7, 0, -1.05, 0, .1), KIN.gold, null, null, .015); c.restore();
  part(c, blob([[.62, -.15], [.55, -.38], [.4, -.4], [.3, -.15], [.36, .1], [.55, .1]], .5), KIN.skin, below(-.05, .04), null);
  fillPath(c, lens(.26, -.05, .66, -.05, .05), KIN.sash.mid);
  c.save(); c.translate(.5, -.25); c.rotate(-.9 + f * .2); tubePart(c, [[0, 0], [.15, 0], [.3, 0]], .07, .05, KIN.skin, .015); c.restore();
  part(c, blob([[.74, -.55], [.68, -.7], [.52, -.72], [.4, -.58], [.44, -.4], [.62, -.38]], .5), KIN.skin, below(-.5, .04), null);
  fillPath(c, cc => { cc.beginPath(); cc.arc(.53, -.56, .19, .55 * Math.PI, 1.45 * Math.PI); cc.closePath(); }, KIN.hair.mid);
  part(c, cc => { cc.beginPath(); cc.moveTo(.42, -.68); cc.lineTo(.68, -.68); cc.lineTo(.55, -1.05); cc.closePath(); }, KIN.gold, rightOf(.55), null, .015);
  fillPath(c, cc => { cc.beginPath(); cc.rect(.41, -.72, .28, .06); }, KIN.gold.dark);
  celEye(c, .62, -.56, .045); fillPath(c, lens(.58, -.47, .68, -.47, .02), '#ff9a8a'); celSmile(c, .64, -.5, .04, '#8a3a2a');
}
const CUR = { skin: tones('#c98456'), leaf: tones('#3f9a3a'), hot: tones('#ff5a1f'), warm: tones('#ffb02e') };
function dCurupiraCel(c, t) {
  const st = Math.sin(t * 6) * .08, S = CUR.skin;
  for (const [x, s] of [[-.1, 1], [.15, -1]]) { tubePart(c, [[x, .32], [x, .52], [x, .72 + s * st]], .12, .11, S, .015); part(c, blob([[x + .02, .72 + s * st], [x - .22, .7 + s * st], [x - .24, .8 + s * st], [x + .02, .8 + s * st]], .5), S, null, null, .015); }
  c.save(); c.translate(-.12, -.12); c.rotate(2.3 + Math.sin(t * 3 + 1) * .3); tubePart(c, [[0, 0], [.14, 0], [.28, 0]], .07, .055, { mid: S.dark, dark: S.line, light: S.dark, line: S.line }, .012); c.restore();
  for (let i = 0; i < 5; i++) { const x = -.25 + i * .12; part(c, lens(x + .06, .12, x + .06, .46, .05), CUR.leaf, rightOf(x + .06), null, .012); }
  part(c, blob([[.28, -.05], [.2, -.3], [0, -.36], [-.2, -.3], [-.28, -.05], [-.2, .2], [0, .26], [.2, .2]], .5), S, below(.05, .06), lens(-.18, -.28, .05, -.33, .03));
  c.save(); c.translate(.1, -.1); c.rotate(.6 + Math.sin(t * 3) * .3); tubePart(c, [[0, 0], [.15, 0], [.3, 0]], .07, .055, S, .012); c.restore();
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI * (.15 + i * .14), fl = Math.sin(t * 8 + i) * .05, T2 = i % 2 ? CUR.hot : CUR.warm;
    part(c, cc => { cc.beginPath(); cc.moveTo(.05 + Math.cos(a) * .16, -.5 + Math.sin(a) * .16); cc.quadraticCurveTo(.05 + Math.cos(a) * .48, -.55 + Math.sin(a) * .48 + fl, .05 + Math.cos(a + .25) * .2, -.5 + Math.sin(a + .25) * .2); cc.closePath(); }, T2, null, null, .012);
  }
  part(c, blob([[.28, -.48], [.2, -.68], [.02, -.72], [-.18, -.6], [-.2, -.4], [0, -.26], [.2, -.3]], .5), tones('#d99466'), below(-.42, .04), null);
  celEye(c, .13, -.5, .055); fillPath(c, lens(.12, -.42, .24, -.42, .02), '#ff9a7a'); celSmile(c, .14, -.4, .05, '#5a2a10');
}
function serpentCelRF(c, t, o) {
  const pts = wave(o.n, .55, o.seg, o.amp, t, 2.2, .45);
  if (o.spine) for (let k = 1; k < o.n - 2; k += 2) { const [x, y] = pts[k], r = o.r * (1 - k / o.n * .75); part(c, cc => { cc.beginPath(); cc.moveTo(x - r * .6, y - r * .6); cc.lineTo(x, y - r * 1.75); cc.lineTo(x + r * .6, y - r * .6); cc.closePath(); }, o.spine, rightOf(x), null, .012); }
  tubePart(c, pts, o.r * 2.1, o.r * .5, o.body, .03);
  if (o.belly) { c.save(); tube(pts, o.r * 2.1, o.r * .5)(c); c.clip(); c.translate(0, o.r * .62); fillPath(c, tube(pts, o.r * .9, o.r * .2), o.belly); c.restore(); }
  for (let k = 2; k < o.n - 1; k += 2) { const [x, y] = pts[k], r = o.r * (1 - k / o.n * .75); strokePath(c, cc => { cc.beginPath(); cc.arc(x, y - r * .1, r * .55, Math.PI * 1.15, Math.PI * 1.85); }, o.body.line, .015); }
  return pts;
}
const TIT = { body: tones('#687a40'), belly: '#c9b98a', blotch: '#3f4a22' };
function dTitanoboaCel(c, t) {
  const pts = serpentCelRF(c, t * .6, { n: 30, seg: .2, r: .3, amp: .18, body: TIT.body, belly: TIT.belly });
  for (let k = 3; k < 28; k += 3) fillPath(c, lens(pts[k][0] - .08, pts[k][1] - .1, pts[k][0] + .08, pts[k][1] - .1, .04), TIT.blotch);
  const y0 = pts[0][1];
  part(c, blob([[1.35, y0 + .04], [1.2, y0 - .16], [.9, y0 - .24], [.52, y0 - .08], [.52, y0 + .14], [.9, y0 + .24], [1.2, y0 + .18]], .5), TIT.body, below(y0 + .06, .05), lens(.7, y0 - .18, 1.05, y0 - .16, .03));
  celEye(c, .92, y0 - .12, .075, '#f2e27a'); celSmile(c, 1.1, y0 + .04, .08, TIT.body.line);
}
const BOI = { body: tones('#ff7a1f'), belly: '#fff1a0', spine: tones('#ff4a1a') };
function dBoitataCel(c, t) {
  for (let i = 0; i < 10; i++) { const x = .4 - i * .38, y = Math.sin(t * 2.2 - i * .9) * .2 * Math.min(1, i / 2) - .1, fl = Math.sin(t * 7 + i) * .08; part(c, cc => { cc.beginPath(); cc.moveTo(x - .2, y + .1); cc.quadraticCurveTo(x - .1, y - .35 + fl, x + .02, y - .52 + fl); cc.quadraticCurveTo(x + .1, y - .3, x + .2, y + .1); cc.closePath(); }, i % 2 ? tones('#ffb52e') : tones('#ff6a1a'), rightOf(x), null, 0); }
  const pts = serpentCelRF(c, t, { n: 22, seg: .2, r: .3, amp: .25, body: BOI.body, belly: BOI.belly, spine: BOI.spine });
  const y0 = pts[0][1];
  part(c, blob([[1.25, y0 + .05], [1.12, y0 - .12], [.85, y0 - .26], [.52, y0 - .1], [.52, y0 + .12], [.85, y0 + .22], [1.12, y0 + .18]], .5), BOI.body, below(y0 + .06, .05), lens(.7, y0 - .18, 1, y0 - .16, .03));
  celGlow(c, .9, y0 - .1, .14, ['#1f6fae', '#5fd0ff', '#e6fbff']); ell(c, .9, y0 - .1, .04, .04, '#ffffff');
}
const MAP = { fur: tones('#7a3b22'), eye: tones('#f3efe6') };
function dMapinguariCel(c, t) {
  const st = Math.sin(t * 2) * .05, F = MAP.fur, farF = { mid: F.dark, dark: F.line, light: F.dark, line: F.line };
  legCel(c, -.35, .3, .8 + st, .26, farF);
  legCel(c, .35, .3, .8 - st, .28, F);
  const sw = Math.sin(t * 1.5) * .05;
  tubePart(c, [[-.5, -.05], [-.8, .22], [-.74 - sw, .52]], .22, .17, farF, .015);
  const body = cc => { cc.beginPath(); for (let i = 0; i <= 32; i++) { const a = i / 32 * TAU, r = i % 2 ? .7 : .78; const x = Math.cos(a) * r, y = Math.sin(a) * r * .9; if (i) cc.lineTo(x, y); else cc.moveTo(x, y); } cc.closePath(); };
  part(c, body, F, below(.2, .15), lens(-.5, -.45, 0, -.62, .06));
  tubePart(c, [[.5, -.05], [.8, .22], [.74 + sw, .52]], .24, .18, F, .015);
  for (const a of [-.4, 0, .4]) part(c, lens(.72 + sw, .56, .78 + sw + a * .1, .7, .025), tones('#e8dcc0'), null, null, .012);
  part(c, ringPath(.15, -.2, .3), MAP.eye, below(-.1, .05), null, .025); celEye(c, .2, -.2, .15, '#3b7a2a');
  celSmile(c, .2, .12, .14, '#2a1208');
}
const QTZ = { body: tones('#29b57a'), belly: '#f5e27a', wing: tones('#2fc48a'), gold: tones('#f5c542') };
function dQuetzalCel(c, t) {
  const f = Math.sin(t * 3);
  c.save(); c.translate(.3, -.14); c.rotate(.8 + Math.sin(t * 3 - .4) * .6); part(c, lens(0, 0, -1, 0, .2, .12), { mid: QTZ.wing.dark, dark: QTZ.wing.line, light: QTZ.wing.dark, line: QTZ.wing.line }, null, null, .02); c.restore();
  const pts = serpentCelRF(c, t, { n: 24, seg: .2, r: .32, amp: .3, body: QTZ.body, belly: QTZ.belly });
  for (let k = 4; k < 22; k += 3) fillPath(c, lens(pts[k][0] - .1, pts[k][1] - .12, pts[k][0] + .1, pts[k][1] - .12, .03), '#7df0c0');
  const y0 = pts[0][1];
  c.save(); c.translate(.2, y0 - .1); c.rotate(.55 + f * .6); part(c, lens(0, 0, -1, 0, .2, .12), QTZ.wing, below(.03, 0), null, .02); part(c, lens(-.6, 0, -1, 0, .1), QTZ.gold, null, null, .015); c.restore();
  const cols = ['#ff5d7a', '#ffb02e', '#fff27a', '#7dffb2', '#5ad1ff', '#b28dff'];
  for (let i = 0; i < 6; i++) { const a = Math.PI * (.55 + i * .17); part(c, lens(.8, y0, .8 + Math.cos(a) * .55, y0 + Math.sin(a) * .55, .06), tones(cols[i]), null, null, .012); }
  part(c, blob([[1.25, y0 + .05], [1.12, y0 - .14], [.85, y0 - .25], [.55, y0 - .1], [.55, y0 + .12], [.85, y0 + .22], [1.12, y0 + .18]], .5), QTZ.body, below(y0 + .06, .05), null);
  part(c, lens(1, y0 + .02, 1.3, y0 + .06, .06), QTZ.gold, null, null, .015);
  celEye(c, .9, y0 - .1, .075); celSmile(c, 1.08, y0 + .02, .05, '#12392f');
}
const GAR = { red: tones('#d62a1f'), gold: tones('#ffcf5a'), feather: tones('#ff9a1f'), face: tones('#2f9a4a'), crown: tones('#e8a317') };
function dGarudaCel(c, t) {
  const f = Math.sin(t * 3);
  const wing = (dx, dy, a, far) => {
    c.save(); c.translate(dx, dy); c.rotate(a);
    const shape = cc => { cc.beginPath(); cc.moveTo(0, -.12); cc.quadraticCurveTo(-.9, -.35, -1.7, -.05); for (let i = 0; i < 6; i++) cc.lineTo(-1.6 + i * .26, .12 + (i % 2) * .08); cc.lineTo(0, .12); cc.closePath(); };
    const T = far ? { mid: GAR.red.dark, dark: GAR.red.line, light: GAR.red.dark, line: GAR.red.line } : GAR.red;
    fillPath(c, shape, T.mid);
    c.save(); shape(c); c.clip(); fillPath(c, rightOf(-2), T.mid); fillPath(c, cc => { cc.beginPath(); cc.rect(-2, -1, 1.1, 2); }, far ? GAR.feather.dark : GAR.feather.mid); fillPath(c, cc => { cc.beginPath(); cc.rect(-2, -1, .5, 2); }, far ? GAR.gold.dark : GAR.gold.mid); fillPath(c, below(.05, 0), T.dark); c.restore();
    strokePath(c, shape, T.line, .025);
    c.restore();
  };
  wing(.05, -.2, .75 + Math.sin(t * 3 - .4) * .6, true);
  part(c, cc => { cc.beginPath(); cc.moveTo(-.45, .2); cc.lineTo(-1.1, .55); cc.lineTo(-.9, .6); cc.lineTo(-1, .75); cc.lineTo(-.4, .4); cc.closePath(); }, GAR.feather, below(.5, 0), null, .02);
  part(c, blob([[.5, .05], [.3, -.26], [-.2, -.26], [-.52, .1], [-.2, .46], [.3, .48]], .5), GAR.red, below(.25, .08), null);
  part(c, blob([[.42, .15], [.3, -.02], [0, -.04], [-.2, .15], [0, .36], [.3, .36]], .5), GAR.gold, below(.22, .04), null, .02);
  wing(-.1, -.05, .5 + f * .6, false);
  part(c, blob([[.78, -.35], [.7, -.55], [.5, -.58], [.32, -.4], [.38, -.16], [.62, -.14]], .5), GAR.face, below(-.3, .05), null);
  part(c, cc => { cc.beginPath(); cc.moveTo(.4, -.52); cc.lineTo(.7, -.52); cc.lineTo(.55, -.95); cc.closePath(); }, GAR.crown, rightOf(.55), null, .015);
  fillPath(c, cc => { cc.beginPath(); cc.rect(.38, -.56, .34, .07); }, GAR.crown.dark);
  part(c, cc => { cc.beginPath(); cc.moveTo(.75, -.4); cc.quadraticCurveTo(1, -.35, .92, -.18); cc.lineTo(.74, -.28); cc.closePath(); }, GAR.gold, rightOf(.85), null, .015);
  celEye(c, .65, -.4, .06, '#ffffff');
  for (const x of [0, .2]) tubePart(c, [[x, .45], [x, .58], [x + .01, .72]], .06, .05, GAR.gold, .012);
}

/* ================= decorations (base at 0,0 on the ground) ================= */
const LEAF = tones('#3f9a3f'), STEM = tones('#2f7a2f'), BARK = tones('#6b4a2a'), SOIL = '#24170c';
function ddOrchidsCel(c, t) {
  groundShadow(c, 1.2, SOIL, .1);
  part(c, lens(-.55, -.02, .02, -.1, .08), LEAF, below(-.04, 0), null, .02);
  part(c, lens(.55, -.02, -.02, -.1, .08), LEAF, below(-.04, 0), null, .02);
  const cols = ['#ff7ac6', '#c98bff', '#fbe3f0', '#ff9f6b'];
  for (let i = 0; i < 4; i++) {
    const x0 = (i - 1.5) * .3, h = .7 + ((i * 37) % 4) / 10, sw = Math.sin(t * .8 + i) * .04, fx = x0 + sw * 2 + .12, fy = -h;
    tubePart(c, [[x0, 0], [x0 + sw, -h * .6], [fx, fy]], .05, .04, STEM, .012);
    const P = tones(cols[i]);
    // petals facing down sit in shade, the rest in the mid tone
    for (let k = 0; k < 5; k++) {
      const a = k / 5 * TAU + t * .1, pt = lens(fx, fy, fx + Math.cos(a) * .16, fy + Math.sin(a) * .16, .045);
      fillPath(c, pt, Math.sin(a) > .3 ? P.dark : P.mid); strokePath(c, pt, P.line, .012);
    }
    ell(c, fx, fy, .045, .045, '#ffd84a'); ell(c, fx - .012, fy - .012, .015, .015, '#fff6c0');
  }
}
const CROWN = tones('#2f8a3a'), FRUIT = tones('#d8266a');
function ddFruitTreeCel(c, t, o) {
  const open = o ? o.open : 0, sh = Math.sin(t * 30) * .04 * open;
  groundShadow(c, .9, SOIL, .1);
  tubePart(c, [[0, 0], [-.01, -.45], [0, -.95]], .18, .15, BARK, .025);
  lines(c, [[-.04, -.2, -.03, -.35], [.03, -.55, .04, -.7]], BARK.line, .018);
  // one crown made of three lumps, shaded together as one shape
  const crown = blob([[.66 + sh, -1.12], [.5 + sh, -1.48], [.1 + sh, -1.64], [-.4 + sh, -1.5], [-.66 + sh, -1.1], [-.45 + sh, -.8], [0 + sh, -.84], [.4 + sh, -.82]], .5);
  part(c, crown, CROWN, below(-1.02, .12), lens(-.45 + sh, -1.3, -.05 + sh, -1.52, .08), .03);
  strokePath(c, cc => { cc.beginPath(); cc.arc(-.28 + sh, -1.08, .25, Math.PI * 1.1, Math.PI * 1.7); cc.moveTo(.54 + sh, -1.18); cc.arc(.3 + sh, -1.18, .24, Math.PI * 1.9, Math.PI * 1.35, true); }, CROWN.line, .02);
  for (const [x, y] of [[-.3, -1.2], [.1, -1.35], [.35, -1.05], [-.05, -1], [.25, -1.3]]) {
    if (open > 0) celGlow(c, x + sh, y, .14, ['#ff7ab0', '#ffc0d8']);
    part(c, ringPath(x + sh, y, .07), FRUIT, below(y + .02, .03), null, .015);
    ell(c, x + sh - .025, y - .025, .02, .02, '#ffd0e2');
  }
}
const STONE = tones('#5a615a'), FALL = tones('#9fd8f2');
function ddWaterfallCel(c, t) {
  groundShadow(c, 2.2, SOIL, .12);
  const L = blob([[-.25, 0], [-.28, -1.9], [-.6, -2], [-.92, -1.78], [-.98, -.9], [-1.02, 0]], .5), R = blob([[.25, 0], [.3, -1.95], [.62, -1.85], [.95, -1.65], [1, -.8], [1.05, 0]], .5);
  part(c, L, STONE, rightOf(-.55), lens(-.85, -1.6, -.5, -1.9, .05), .03);
  part(c, R, STONE, rightOf(.68), lens(.36, -1.7, .65, -1.8, .05), .03);
  lines(c, [[-.8, -1.2, -.6, -1.1], [-.7, -.6, -.45, -.55], [.5, -1.3, .75, -1.25], [.6, -.5, .85, -.45]], STONE.line, .02);
  // the falling water: flat blue with a shaded right side and white streaks sliding down
  const fall = cc => { cc.beginPath(); cc.rect(-.3, -1.95, .6, 1.95); };
  fillPath(c, fall, FALL.mid);
  c.save(); fall(c); c.clip();
  fillPath(c, rightOf(.12), FALL.dark);
  for (let i = 0; i < 6; i++) { const x = -.25 + i * .1, off = ((t * 1.5 + i * .37) % 1) * 1.8; lines(c, [[x, -1.95 + off, x, -1.7 + off]], '#ffffff', .03); }
  c.restore();
  strokePath(c, fall, FALL.line, .025);
  // splash: white puffs at the bottom that grow and shrink instead of fading
  for (let i = 0; i < 6; i++) { const a = (t * .8 + i / 6) % 1, r = .1 * Math.sin(a * Math.PI) + .03; part(c, ringPath((i - 2.5) * .12, -.06 - a * .22, r), tones('#eefaff'), below(-.04 - a * .22, 0), null, .012); }
  part(c, lens(-.95, -1.8, -.3, -1.85, .06), LEAF, below(-1.8, 0), null, .02);
  part(c, lens(.3, -1.8, .95, -1.7, .06), LEAF, below(-1.72, 0), null, .02);
}
const ROPE = '#c9a36a', PLANK = tones('#8a6238'), POST = tones('#6b4a2a');
function ddBridgeCel(c, t) {
  for (const x of [-1.19, 1.19]) { c.save(); c.translate(x, 0); groundShadow(c, .45, SOIL, .08); c.restore(); }
  for (const x of [-1.19, 1.19]) tubePart(c, [[x, 0], [x, -1.2], [x, -2.4]], .14, .12, POST, .02);
  const sag = .25 + Math.sin(t * .8) * .03;
  strokePath(c, cc => { cc.beginPath(); for (const y0 of [-2.35, -2]) { cc.moveTo(-1.2, y0); cc.quadraticCurveTo(0, y0 + sag * 2, 1.2, y0); } }, ROPE, .035);
  for (let i = 0; i < 12; i++) {
    const f = (i + .5) / 12, x = -1.2 + f * 2.4, yb = -2 + 4 * sag * f * (1 - f), yt = -2.35 + 4 * sag * f * (1 - f);
    lines(c, [[x, yt, x, yb]], ROPE, .025);
    part(c, cc => { cc.beginPath(); cc.rect(x - .085, yb, .17, .06); }, PLANK, below(yb + .04, 0), null, .012);
  }
  for (const x of [-1.19, 1.19]) part(c, lens(x - .15, -2.42, x + .15, -2.42, .05), LEAF, below(-2.42, 0), null, .015);
}
const TSTONE = [tones('#7a7a62'), tones('#858569'), tones('#8f8f72'), tones('#9a9a7a')];
function ddTempleCel(c, t) {
  groundShadow(c, 2.6, SOIL, .14);
  // four tiers, each with the same parts: lit top edge, front face, shaded right end and bottom lip
  for (let i = 0; i < 4; i++) {
    const w = 2.2 - i * .45, y = -(i + 1) * .42, T3 = TSTONE[i];
    const face = cc => { cc.beginPath(); cc.rect(-w / 2, y, w, .42); };
    part(c, face, T3, cc => { cc.beginPath(); cc.rect(w / 2 - .12, y, .12, .42); cc.rect(-w / 2, y + .34, w, .08); }, cc => { cc.beginPath(); cc.rect(-w / 2, y, w - .12, .06); }, .02);
    lines(c, [[-w / 2 + .3, y + .2, -w / 2 + .5, y + .2], [w / 2 - .5, y + .14, w / 2 - .32, y + .14]], T3.line, .015);
  }
  const ST = tones('#6a6a54');
  part(c, cc => { cc.beginPath(); cc.moveTo(-.2, 0); cc.lineTo(-.12, -1.68); cc.lineTo(.12, -1.68); cc.lineTo(.2, 0); cc.closePath(); }, ST, rightOf(.08), null, .02);
  lines(c, Array.from({ length: 13 }, (_, i) => [-.19 + i * .006, -(i + 1) * .12, .19 - i * .006, -(i + 1) * .12]), ST.line, .015);
  const top = cc => { cc.beginPath(); cc.rect(-.35, -2.1, .7, .42); };
  part(c, top, tones('#a5a585'), cc => { cc.beginPath(); cc.rect(.25, -2.1, .1, .42); }, cc => { cc.beginPath(); cc.rect(-.35, -2.1, .6, .05); }, .02);
  celGlow(c, 0, -1.83, .19 + (.5 + .5 * Math.sin(t * 1.5)) * .03, ['#e8b84a', '#ffe27a']);
  fillPath(c, cc => { cc.beginPath(); cc.moveTo(-.1, -1.68); cc.lineTo(-.1, -1.9); cc.quadraticCurveTo(0, -2.02, .1, -1.9); cc.lineTo(.1, -1.68); cc.closePath(); }, '#2a2a1a');
  for (const [x, y] of [[-.9, -.84], [-.5, -1.26], [.6, -1.26], [.85, -.84]]) {
    strokePath(c, cc => { cc.beginPath(); cc.moveTo(x, y); cc.quadraticCurveTo(x + .05, y / 2, x - .03, -.1); }, '#2f7a2f', .035);
    part(c, lens(x - .02, y * .6, x + .1, y * .6 + .05, .03), LEAF, null, null, .01);
  }
}
const CEL_DECOR = { orchids: ddOrchidsCel, chest: ddFruitTreeCel, waterfall: ddWaterfallCel, bridge: ddBridgeCel, temple: ddTempleCel };

/* ================= scenery ================= */
// The air in flat bands from pale sunny green at the top to dark green at the floor, with gently wavy borders.
const SKY = ['#d4f0c4', '#b2e0a2', '#8fcb86', '#6fb471', '#529c5c', '#3f8550', '#2f6e43', '#225634', '#173f26', '#0c2416'];
const SKY_EDGES = [.06, .13, .22, .32, .43, .54, .65, .76, .87];
function skyEdge(i, x) { return H * SKY_EDGES[i] + Math.sin(x * .004 + i * 1.7) * u * .9 + Math.sin(x * .011 + i) * u * .4; }
function skyBand(i, x0, x1) {
  return cc => {
    cc.beginPath();
    const top = i === 0 ? () => -u * 6 : x => skyEdge(i - 1, x), bot = i === SKY.length - 1 ? () => H + u * 6 : x => skyEdge(i, x);
    cc.moveTo(x0, top(x0)); for (let x = x0; x <= x1 + 40; x += 40) cc.lineTo(x, top(x));
    for (let x = x1 + 40; x >= x0; x -= 40) cc.lineTo(x, bot(x));
    cc.closePath();
  };
}
function drawSkyCel(viewX) {
  const x0 = viewX - u * 6, x1 = viewX + VW / vs + u * 6;
  for (let i = 0; i < SKY.length; i++) fillPath(ctx, skyBand(i, x0, x1), SKY[i]);
}
// Sunbeams: the one place the flat-colour rule is broken, on Job's call. See-through, fading out smoothly
// towards the forest floor; the whole beam dims while it rains.
function drawRaysCelRF(t) {
  const a = .18 * (1 - rainAmt(t) * .8), g = ctx.createLinearGradient(0, 0, 0, H * .85);
  g.addColorStop(0, `rgba(255,246,205,${a})`); g.addColorStop(1, 'rgba(255,246,205,0)');
  ctx.fillStyle = g; ctx.beginPath();
  for (const r of rays) {
    const sw = Math.sin(t * .15 + r.ph) * W * .02;
    ctx.moveTo(r.x + sw - r.w / 2, 0); ctx.lineTo(r.x + sw + r.w / 2, 0);
    ctx.lineTo(r.x + sw + r.w * 3, H * .85); ctx.lineTo(r.x + sw + r.w * 1.2, H * .85); ctx.closePath();
  }
  ctx.fill();
}
const EARTH = tones('#3d2e1d');
function drawGroundCel() {
  const edge = cc => { for (let i = 1; i < seabed.length; i++) { const a = seabed[i - 1], b = seabed[i]; cc.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2); } };
  const ground = cc => { cc.beginPath(); cc.moveTo(0, H + u * 5); cc.lineTo(seabed[0].x, seabed[0].y); edge(cc); cc.lineTo(WW, seabed[seabed.length - 1].y); cc.lineTo(WW, H + u * 5); cc.closePath(); };
  fillPath(ctx, ground, EARTH.mid);
  ctx.save(); ground(ctx); ctx.clip();
  fillPath(ctx, cc => { cc.beginPath(); cc.moveTo(0, H * SEABED + u * 3.5); for (let x = 0; x <= WW; x += 60) cc.lineTo(x, H * SEABED + u * 3.5 + Math.sin(x * .01) * u * .6); cc.lineTo(WW, H + u * 6); cc.lineTo(0, H + u * 6); cc.closePath(); }, EARTH.dark);
  ctx.restore();
  // a mossy rim along the top of the ground
  strokePath(ctx, cc => { cc.beginPath(); cc.moveTo(seabed[0].x, seabed[0].y); edge(cc); }, '#4f7a2a', u * .7);
  for (const r of rocks) {
    const T3 = tones(r.col);
    ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.rot);
    const rk = blob([[r.rx, 0], [r.rx * .6, -r.ry * .9], [-r.rx * .5, -r.ry], [-r.rx, -r.ry * .1], [-r.rx * .6, r.ry * .7], [r.rx * .6, r.ry * .7]], .5);
    part(ctx, rk, T3, below(0, r.ry * .4, -r.rx * 2, r.rx * 2), lens(-r.rx * .6, -r.ry * .7, -r.rx * .05, -r.ry * .9, r.ry * .12), 0);
    ctx.restore();
  }
}
const FERN = tones('#3f9a3f'), VINE = tones('#3f8a34'), LOWLEAF = tones('#357a2c');
function drawPlantsCelRF(t) {
  const [v0, v1] = celView, m = u * 14;
  for (const p of plants) {
    if (p.x < v0 - m || p.x > v1 + m) continue;
    if (p.kind === 'fern') {
      const by = seabedY(p.x) + u * .3, lit = [], shade = [], stems = [];
      for (let i = 0; i < p.n; i++) {
        const a = -Math.PI / 2 + (i - (p.n - 1) / 2) * .38 + Math.sin(t * .7 + p.ph + i) * .05, L = p.h * (.75 + .25 * Math.cos(i));
        const ex = p.x + Math.cos(a) * L, ey = by + Math.sin(a) * L;
        const cx = p.x + Math.cos(a) * L * .5 + Math.cos(a + 1.57) * L * .18, cy = by + Math.sin(a) * L * .5 + Math.sin(a + 1.57) * L * .18;
        stems.push([cx, cy, ex, ey]);
        for (let k = 1; k < 7; k++) {
          const f = k / 7, qx = qpt(p.x, cx, ex, f), qy = qpt(by, cy, ey, f), s = u * (1.1 * (1 - f) + .3);
          // each pair of leaflets: the one on the lit side light, the other in shade
          lit.push([qx, qy, qx + Math.cos(a - 1.1) * s * 1.6, qy + Math.sin(a - 1.1) * s * 1.6, s * .22]);
          shade.push([qx, qy, qx + Math.cos(a + 1.1) * s * 1.6, qy + Math.sin(a + 1.1) * s * 1.6, s * .22]);
        }
      }
      fillPath(ctx, cc => { cc.beginPath(); for (const l of lit) lensTo(cc, ...l); }, FERN.light);
      fillPath(ctx, cc => { cc.beginPath(); for (const l of shade) lensTo(cc, ...l); }, FERN.dark);
      strokePath(ctx, cc => { cc.beginPath(); for (const [cx, cy, ex, ey] of stems) { cc.moveTo(p.x, by); cc.quadraticCurveTo(cx, cy, ex, ey); } }, FERN.line, u * .22);
    } else if (p.kind === 'vine') {
      const sw = Math.sin(t * .5 + p.ph) * u * 1.5, x2 = p.x + sw * .5, leaves = [];
      strokePath(ctx, cc => { cc.beginPath(); cc.moveTo(p.x, -u); cc.quadraticCurveTo(p.x + sw, p.len * .5, x2, p.len); }, '#2f5a24', u * .28);
      for (let k = 1; k <= 9; k++) {
        const f = k / 9, x = qpt(p.x, p.x + sw, x2, f), y = qpt(-u, p.len * .5, p.len, f), side = k % 2 ? 1 : -1;
        leaves.push([x, y, x + side * u * 2, y + u * .9, u * .4]);
      }
      leafBatch(ctx, leaves, VINE, u * .08);
    } else {
      const by = seabedY(p.x) + u * .3, sw = Math.sin(t * .9 + p.ph) * u * .3, fx = p.x + sw, fy = by - p.h, P = tones(p.col), up = [], down = [];
      strokePath(ctx, cc => { cc.beginPath(); cc.moveTo(p.x, by); cc.lineTo(fx, fy); }, '#2f7a34', u * .18);
      for (let k = 0; k < 5; k++) { const a = k / 5 * TAU + p.ph; (Math.sin(a) > .2 ? down : up).push([fx, fy, fx + Math.cos(a) * u * 1.05, fy + Math.sin(a) * u * 1.05, u * .3]); }
      fillPath(ctx, cc => { cc.beginPath(); for (const l of up) lensTo(cc, ...l); }, P.mid);
      fillPath(ctx, cc => { cc.beginPath(); for (const l of down) lensTo(cc, ...l); }, P.dark);
      strokePath(ctx, cc => { cc.beginPath(); for (const l of up.concat(down)) lensTo(cc, ...l); }, P.line, u * .06);
      ell(ctx, fx, fy, u * .25, u * .25, '#ffe27a');
    }
  }
}
// Climbing trees: flat trunk with a dark right side and a light stripe on the left; branches as lit tubes.
const TRUNK = tones('#5a3e26'), BRLEAF = [tones('#3f8a34'), tones('#4f9a3e')], MOSS = '#4f8a3a';
function drawTreesCel(t, x0, x1) {
  const bot = H * SEABED + u * 2;
  for (const tr of trees) {
    if (tr.x < x0 - W * .3 || tr.x > x1 + W * .3) continue;
    const l = tr.x - tr.tw / 2;
    fillPath(ctx, cc => { cc.beginPath(); cc.rect(l, 0, tr.tw, bot); }, TRUNK.mid);
    fillPath(ctx, cc => { cc.beginPath(); cc.rect(l + tr.tw * .66, 0, tr.tw * .34, bot); }, TRUNK.dark);
    fillPath(ctx, cc => { cc.beginPath(); cc.rect(l + tr.tw * .14, 0, tr.tw * .12, bot); }, TRUNK.light);
    strokePath(ctx, cc => { cc.beginPath(); cc.moveTo(l, 0); cc.lineTo(l, bot); cc.moveTo(l + tr.tw, 0); cc.lineTo(l + tr.tw, bot); }, TRUNK.line, u * .18);
    for (let k = 0; k < 5; k++) { const mx = tr.x + (k % 2 ? .2 : -.25) * tr.tw, my = H * (.15 + k * .16); fillPath(ctx, lens(mx - tr.tw * .32, my, mx + tr.tw * .32, my, u * .5, u * .7), MOSS); }
  }
  for (const b of branches) {
    if (Math.max(b.x0, b.x1) < x0 - 30 || Math.min(b.x0, b.x1) > x1 + 30) continue;
    tubePart(ctx, [[b.x0, b.y0], [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2], [b.x1, b.y1]], u * 1.1, u * .7, TRUNK, u * .15);
    const up = [[], []], low = [];
    for (let k = 0; k < 5; k++) {
      const f = .5 + k * .12, x = b.x0 + (b.x1 - b.x0) * f, y = b.y0 + (b.y1 - b.y0) * f, sw = Math.sin(t * .8 + k + b.x0) * .1;
      const a1 = -.5 * b.side + sw, a2 = .5 * b.side + sw, uy = y - u * .9, lx = x + b.side * u * .4, ly = y + u * .7;
      up[k % 2].push([x - Math.cos(a1) * u * 1.6, uy - Math.sin(a1) * u * 1.6, x + Math.cos(a1) * u * 1.6, uy + Math.sin(a1) * u * 1.6, u * .55]);
      low.push([lx - Math.cos(a2) * u * 1.4, ly - Math.sin(a2) * u * 1.4, lx + Math.cos(a2) * u * 1.4, ly + Math.sin(a2) * u * 1.4, u * .45]);
    }
    leafBatch(ctx, low, LOWLEAF, u * .1); leafBatch(ctx, up[0], BRLEAF[0], u * .1); leafBatch(ctx, up[1], BRLEAF[1], u * .1);
  }
}
function drawLabelsCelRF() {
  ctx.font = `${Math.max(12, u * 1.5)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'right';
  const x = VW / vs - u * 2;
  ctx.fillStyle = '#3d7a45'; ctx.fillText('Emergent layer', x, u * 7); ctx.fillText('Canopy', x, H * .2 + u * 3);
  ctx.fillStyle = '#b8e0ae'; ctx.fillText('Understory', x, H * .5 + u * 3); ctx.fillText('Forest floor', x, H * .75 + u * 3);
}
// Far trees pale like the air around them, nearer trees darker; big dark leaves in front.
const FAR_TREE = { crown: tones('#a3cf9c'), trunk: '#93b890' }, MID_TREE = { crown: tones('#2f6e43'), trunk: '#3a5234' }, BIG_LEAF = { mid: '#0b2412', vein: '#1f4a26' };
function drawLayerCelRF(L, viewX, t) {
  if (!L) return;
  ctx.save(); ctx.translate(viewX * (1 - L.f), 0);
  const lx0 = viewX * L.f - W * .4, lx1 = viewX * L.f + VW / vs + W * .4;
  if (L.flock) {
    const fl = L.flock, cx = ((t * u * 3) % (WW * L.f + W * 1.4)) - W * .2, sr = mulberry32(fl.seed);
    ctx.strokeStyle = '#5d8a66'; ctx.lineWidth = Math.max(1, u * .2); ctx.lineCap = 'round';
    for (let i = 0; i < fl.n; i++) {
      const x = cx + sr() * u * 22, y = fl.y + sr() * u * 7, fp = Math.sin(t * 6 + i) * u * .5;
      if (x < lx0 || x > lx1) continue;
      ctx.beginPath(); ctx.moveTo(x - u, y - fp); ctx.quadraticCurveTo(x - u * .4, y - u * .3, x, y); ctx.quadraticCurveTo(x + u * .4, y - u * .3, x + u, y - fp); ctx.stroke();
    }
  }
  if (L.trees) {
    const P = L === far ? FAR_TREE : MID_TREE;
    for (const tr of L.trees) {
      if (tr.x + tr.cr * 2 < lx0 || tr.x - tr.cr * 2 > lx1) continue;
      const topY = H - tr.h;
      fillPath(ctx, cc => { cc.beginPath(); cc.rect(tr.x - tr.tw / 2, topY, tr.tw, tr.h + u * 6); }, P.trunk);
      // no clipping: the crown in the dark tone, then the same lumps a little smaller and higher in the mid tone
      // each lump filled on its own: simple round shapes are much faster to paint than one overlapping outline
      const crown = (dy, k, col) => { for (const [bx, by, br] of tr.blobs) ell(ctx, tr.x + bx, topY + by - dy, br * k, br * k, col); };
      // far trees stay one flat colour, like shapes seen through haze
      if (L === far) { crown(0, 1, P.crown.mid); continue; }
      crown(0, 1, P.crown.dark);
      crown(tr.cr * .12, .9, P.crown.mid);
      if (L === mid) fillPath(ctx, ringPath(tr.x - tr.cr * .35, topY - tr.cr * .25, tr.cr * .22), P.crown.light);
    }
  }
  if (L.leaves) for (const lf of L.leaves) {
    if (lf.x < lx0 - lf.s * 2 || lf.x > lx1 + lf.s * 2) continue;
    ctx.save(); ctx.translate(lf.x, lf.y); ctx.rotate(lf.rot + Math.sin(t * .6 + lf.ph) * .04);
    const s = lf.s;
    fillPath(ctx, cc => { cc.beginPath(); cc.moveTo(0, 0); cc.quadraticCurveTo(s * .6, -s * .55, s * 1.4, 0); cc.quadraticCurveTo(s * .6, s * .55, 0, 0); cc.closePath(); }, BIG_LEAF.mid);
    ctx.strokeStyle = BIG_LEAF.vein; ctx.lineWidth = s * .025; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s * 1.35, 0);
    for (let k = 1; k < 6; k++) { const x = s * k * .22; ctx.moveTo(x, 0); ctx.lineTo(x + s * .15, -s * .2); ctx.moveTo(x, 0); ctx.lineTo(x + s * .15, s * .2); }
    ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}
// Rain: solid pale streaks, more of them the harder it rains (no grey veil over the forest).
function drawRainCel(viewX, t) {
  const a = rainAmt(t); if (a <= 0) return;
  const w = VW / vs, n = Math.floor(170 * a * w / W);
  ctx.strokeStyle = '#cfe3ee'; ctx.lineWidth = Math.max(1, u * .1); ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const hx = ((i * 7919) % 1000) / 1000, hy = ((i * 104729) % 1000) / 1000;
    const x = viewX + ((hx * w + t * u * 6) % w), y = ((hy * H + t * H * 1.3) % (H * 1.1)) - H * .05;
    ctx.moveTo(x, y); ctx.lineTo(x - u * .5, y + u * 3);
  }
  ctx.stroke();
}
// Fireflies blink as solid rings that grow and shrink.
function drawFirefliesCel(t, x0, x1) {
  for (const f of bubbles) {
    if (f.x < x0 - 9 || f.x > x1 + 9) continue;
    const a = Math.pow(Math.max(0, Math.sin(t * 1.7 + f.ph * 3)), 3);
    if (a < .15) continue;
    celGlow(ctx, f.x, f.y, u * (.3 + a * .6), a > .6 ? ['#8a9a2a', '#e8f07a', '#fffbd0'] : ['#8a9a2a', '#e8f07a']);
  }
}
function drawSurfaceCelRF(viewX, t) {
  const w = VW / vs, step = u * 6, start = Math.floor(viewX / step) - 1;
  fillPath(ctx, cc => { cc.beginPath(); for (let i = start; i < start + w / step + 3; i++) { const x = i * step, h = u * (2.5 + 2 * ((((i * 37) % 7) + 7) % 7) / 7) + Math.sin(t * .6 + i) * u * .3; cc.moveTo(x + step * .75, 0); cc.ellipse(x, 0, step * .75, h, 0, 0, TAU); } }, '#12381c');
}
function renderCelRF(t, viewX, showLabels) {
  let sx = 0, sy = 0;
  if (pass && !pass.tease && pass.sp.pass.shake) {
    const a = u * .35 * passEdge() * Math.pow(Math.max(0, Math.sin(pass.t * .7)), 6);
    sx = Math.sin(t * 41) * a; sy = Math.cos(t * 37) * a;
  }
  const x0 = viewX, x1 = viewX + VW / vs;
  celView = [x0, x1];
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  ctx.fillStyle = SKY[SKY.length - 1]; ctx.fillRect(0, 0, VW / vs, VH / vs);
  ctx.translate(-viewX + sx, sy);
  drawWater(viewX);
  drawLayer(far, viewX, t);
  drawLayer(mid, viewX, t);
  drawRays(t);
  for (const s of snow) { if (s.x < x0 || s.x > x1) continue; ell(ctx, s.x, s.y, s.r * .7, s.r * .7, '#f3eab0'); }
  drawPass(viewX - sx);
  drawTreesCel(t, x0, x1);
  drawSeabed();
  drawPlants(t);
  drawDecor(t);
  for (const o of creatures) drawCreature(o, x0, x1);
  for (const p of pellets) { ell(ctx, p.x, p.y, u * .5, u * .5, '#c2185b'); ell(ctx, p.x - u * .15, p.y - u * .15, u * .15, u * .12, '#ffc0d8'); }
  drawFirefliesCel(t, x0, x1);
  for (const s of sparks) { const r = u * .5 * Math.min(1, s.life); ell(ctx, s.x, s.y, r, r, '#ffd0e0'); }
  drawRainCel(viewX, t);
  drawLayer(fore, viewX, t);
  drawSurface(viewX, t);
  ctx.font = `bold ${Math.max(14, u * 2)}px "Fredoka","Segoe UI",sans-serif`; ctx.textAlign = 'center';
  for (const x of texts) { ctx.globalAlpha = Math.min(1, x.life); ctx.fillStyle = '#fff6c8'; ctx.fillText(x.s, x.x, x.y); }
  ctx.globalAlpha = 1;
  ctx.setTransform(DPR * vs, 0, 0, DPR * vs, 0, 0);
  if (showLabels) drawLabels();
}
function berryIconCel(c) {
  strokePath(c, cc => { cc.beginPath(); cc.moveTo(0, -.26); cc.quadraticCurveTo(.1, -.45, .25, -.48); }, '#2f7a34', .05);
  part(c, lens(.1, -.44, .34, -.48, .05), LEAF, null, null, .015);
  for (const [x, y] of [[-.15, .05], [.12, .08], [0, -.14], [-.02, .22], [.2, -.12]]) { part(c, ringPath(x, y, .16), FRUIT, below(y + .05, .05), null, .025); ell(c, x - .05, y - .05, .045, .035, '#ffd0e2'); }
}

/* ================= switch the world over to the new drawings ================= */
const CEL_ART = {
  morpho: dMorphoCel, dartfrog: dDartFrogCel, treefrog: dTreeFrogCel, toucan: dToucanCel, chameleon: dChameleonCel, centipede: dCentipedeCel,
  macaw: dMacawCel, sloth: dSlothCel, monkey: dMonkeyCel, boa: dBoaCel, tapir: dTapirCel, jaguar: dJaguarCel, tiger: dTigerCel, harpy: dHarpyCel,
  orangutan: dOrangutanCel, megatherium: dMegatheriumCel, kinnaree: dKinnareeCel, curupira: dCurupiraCel, titanoboa: dTitanoboaCel,
  boitata: dBoitataCel, mapinguari: dMapinguariCel, quetzal: dQuetzalCel, garuda: dGarudaCel,
};
if (ART_CEL) {
  for (const [id, d] of Object.entries(CEL_ART)) BY[id].draw = d;
  for (const d of DECOR) if (CEL_DECOR[d.id]) d.draw = CEL_DECOR[d.id];
  drawWater = drawSkyCel; drawRays = drawRaysCelRF; drawSeabed = drawGroundCel; drawPlants = drawPlantsCelRF;
  drawLabels = drawLabelsCelRF; drawLayer = drawLayerCelRF; drawSurface = drawSurfaceCelRF; render = renderCelRF;
  THEME.icons.cur = berryIconCel; THEME.shadowColor = '#0c2416';
  THEME.icons.chest = c => { c.translate(0, .42); c.scale(.4, .4); ddFruitTreeCel(c, 0, { open: .6 }); };
  THEME.icons.castle = c => { c.translate(0, .4); c.scale(.32, .32); ddTempleCel(c, 1); };
}
