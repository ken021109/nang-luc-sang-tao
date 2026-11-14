/* Pointer glow on cards — keeps the warm light tied to the cursor */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST || !NLST.canHover() || !NLST.motionOK()) return;

  var cards = NLST.$$('[data-glow]');
  if (!cards.length) return;

  cards.forEach(function (card) {
    var frame = 0;
    var last = null;

    card.addEventListener('pointermove', function (event) {
      last = event;
      if (frame) return;

      frame = window.requestAnimationFrame(function () {
        frame = 0;
        if (!last) return;

        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (last.clientX - rect.left).toFixed(0) + 'px');
        card.style.setProperty('--my', (last.clientY - rect.top).toFixed(0) + 'px');
      });
    });

    card.addEventListener('pointerleave', function () {
      last = null;
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });
})();
