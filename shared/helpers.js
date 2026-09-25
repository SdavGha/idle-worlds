"use strict";
const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const SEABED = 0.9;

/* ================= drawing helpers (unit space) ================= */
function ell(c, x, y, rx, ry, col, rot = 0) { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, TAU); c.fill(); }
function eye(c, x, y, r) {
  ell(c, x, y, r, r, '#fff');
  ell(c, x + r * .2, y + r * .05, r * .62, r * .62, '#14161f');
  ell(c, x + r * .38, y - r * .25, r * .24, r * .24, '#fff');
}
function smile(c, x, y, r, col = '#5a2a10') {
  c.strokeStyle = col; c.lineWidth = .05; c.lineCap = 'round';
  c.beginPath(); c.arc(x, y, r, .15 * Math.PI, .8 * Math.PI); c.stroke();
}
function blush(c, x, y, r) { ell(c, x, y, r, r * .6, 'rgba(255,120,140,.45)'); }
function tail(c, col, t, x0, sz = 1) {
  const w = Math.sin(t * 10) * .12 * sz;
  c.fillStyle = col; c.beginPath(); c.moveTo(x0 + .15, 0);
  c.quadraticCurveTo(x0 - .25 * sz, -.15, x0 - .55 * sz, -.5 * sz + w);
  c.quadraticCurveTo(x0 - .38 * sz, w * .5, x0 - .55 * sz, .5 * sz + w);
  c.quadraticCurveTo(x0 - .25 * sz, .15, x0 + .15, 0); c.fill();
}
function limb(c, x, y, rx, ry, a, col) {
  c.save(); c.translate(x, y); c.rotate(a); ell(c, rx * .8, 0, rx, ry, col); c.restore();
}
function glow(c, x, y, r, inner, outer) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, inner); g.addColorStop(.3, outer); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
}

