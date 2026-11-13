/* 3D flashcards — flip on tap, subtle pointer tilt on desktop */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var cards = NLST.$$('.flashcard');
  if (!cards.length) return;

  var canTilt = NLST.motionOK() && NLST.canHover();

  function clean(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function labelFor(card, flipped) {
    var front = card.querySelector('.flashcard__question');
    var back = card.querySelector('.flashcard__answer');
    var text = clean(flipped ? back.innerText : front.innerText);

    return text + (flipped ? ' Bấm để lật lại.' : ' Bấm để xem câu trả lời.');
  }

  function resetTilt(card) {
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
  }

  cards.forEach(function (card) {
    var front = card.querySelector('.flashcard__face--front');
    var back = card.querySelector('.flashcard__face--back');
    if (!front || !back) return;

    card.setAttribute('aria-label', labelFor(card, false));

    card.addEventListener('click', function () {
      var flipped = !card.classList.contains('is-flipped');

      card.classList.toggle('is-flipped', flipped);
      card.setAttribute('aria-expanded', String(flipped));
      front.setAttribute('aria-hidden', String(flipped));
      back.setAttribute('aria-hidden', String(!flipped));
      card.setAttribute('aria-label', labelFor(card, flipped));
      resetTilt(card);
    });

    if (!canTilt) return;

    var pendingEvent = null;
    var frame = 0;

    card.addEventListener('pointermove', function (event) {
      if (card.classList.contains('is-flipped')) return;

      pendingEvent = event;
      if (frame) return;

      frame = window.requestAnimationFrame(function () {
        frame = 0;
        if (!pendingEvent) return;

        var rect = card.getBoundingClientRect();
        var px = NLST.clamp((pendingEvent.clientX - rect.left) / rect.width, 0, 1) - 0.5;
        var py = NLST.clamp((pendingEvent.clientY - rect.top) / rect.height, 0, 1) - 0.5;

        card.style.setProperty('--ry', (px * 8).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-py * 6).toFixed(2) + 'deg');
      });
    });

    card.addEventListener('pointerleave', function () {
      pendingEvent = null;
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      resetTilt(card);
    });

    card.addEventListener('blur', function () {
      resetTilt(card);
    });
  });
})();
