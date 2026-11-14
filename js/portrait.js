/* Portrait reveal — hover the content or pin the portrait */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var stage = NLST.$('[data-portrait-stage]');
  if (!stage) return;

  var button = NLST.$('[data-portrait-reveal]', stage);
  var label = NLST.$('[data-portrait-label]', stage);
  var trigger = NLST.$('[data-portrait-trigger]');
  var pinned = false;

  function setPinned(next) {
    pinned = next;
    stage.classList.toggle('is-revealed', pinned);

    if (button) button.setAttribute('aria-pressed', String(pinned));
    if (label) label.textContent = pinned ? 'Bỏ ghim chân dung' : 'Ghim chân dung';
  }

  if (button) {
    button.addEventListener('click', function () {
      setPinned(!pinned);
    });
  }

  if (trigger) {
    trigger.addEventListener('pointerenter', function (event) {
      if (event.pointerType === 'touch') return;
      stage.classList.add('is-peeking');
    });

    trigger.addEventListener('pointerleave', function () {
      stage.classList.remove('is-peeking');
    });
  }

  setPinned(false);
})();
