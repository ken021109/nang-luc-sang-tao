/* Cursor glare — a warm light that trails the pointer on fine-pointer devices */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var glow = NLST.$('[data-cursor-glow]');
  if (!glow || !NLST.canHover() || !NLST.motionOK()) return;

  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 2;
  var x = targetX;
  var y = targetY;
  var frame = 0;
  var active = false;

  function render() {
    frame = 0;
    x += (targetX - x) * 0.16;
    y += (targetY - y) * 0.16;

    glow.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';

    if (Math.abs(targetX - x) > 0.4 || Math.abs(targetY - y) > 0.4) {
      frame = window.requestAnimationFrame(render);
    }
  }

  function request() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  document.addEventListener('pointermove', function (event) {
    if (event.pointerType && event.pointerType !== 'mouse') return;

    targetX = event.clientX;
    targetY = event.clientY;

    if (!active) {
      active = true;
      x = targetX;
      y = targetY;
      glow.classList.add('is-active');
      glow.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    }

    request();
  }, { passive: true });

  document.addEventListener('pointerdown', function () {
    glow.classList.add('is-pressed');
  }, { passive: true });

  document.addEventListener('pointerup', function () {
    glow.classList.remove('is-pressed');
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    active = false;
    glow.classList.remove('is-active');
  });

  window.addEventListener('blur', function () {
    glow.classList.remove('is-active');
    glow.classList.remove('is-pressed');
  });
})();
