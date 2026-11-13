/* Video dialog — native <dialog>, play on open, pause when closed */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var dialog = NLST.$('#video-dialog');
  var player = NLST.$('[data-video-player]');
  var openers = NLST.$$('[data-video-open]');
  var closers = NLST.$$('[data-video-close]');

  if (!dialog || !player || !openers.length) return;

  function lockPage() {
    document.documentElement.classList.add('is-locked');
    document.body.classList.add('is-locked');
  }

  function unlockPage() {
    document.documentElement.classList.remove('is-locked');
    document.body.classList.remove('is-locked');
  }

  function openDialog(event) {
    if (event) event.preventDefault();
    if (dialog.open) return;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }

    lockPage();

    var playAttempt = player.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () {
        /* Autoplay can be blocked; native controls remain available. */
      });
    }
  }

  function closeDialog() {
    if (dialog.open && typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      unlockPage();
    }
  }

  openers.forEach(function (opener) {
    opener.addEventListener('click', openDialog);
  });

  closers.forEach(function (closer) {
    closer.addEventListener('click', closeDialog);
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener('close', function () {
    try {
      player.pause();
      player.currentTime = 0;
    } catch (error) {
      /* Metadata may not be ready yet. */
    }
    unlockPage();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && dialog.open) {
      /* Native dialog also handles this; this is a fallback. */
      closeDialog();
    }
  });
})();
