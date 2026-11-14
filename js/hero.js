/* Hero video — lazy load, autoplay, pause control, visibility and parallax */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var hero = NLST.$('.hero');
  var video = NLST.$('[data-hero-video]');
  var toggle = NLST.$('[data-hero-toggle]');
  if (!hero || !video) return;

  var label = NLST.$('[data-hero-toggle-label]', toggle);
  var iconUse = toggle ? toggle.querySelector('.icon use') : null;
  var mobileQuery = window.matchMedia('(max-width: 720px)');
  var saveData = navigator.connection && navigator.connection.saveData;
  var reduced = !NLST.motionOK();
  var loaded = false;
  var userPaused = false;
  var autoPaused = false;
  var playing = false;

  function setUi(isPlaying) {
    if (!toggle) return;

    toggle.setAttribute('aria-pressed', String(isPlaying));
    if (label) label.textContent = isPlaying ? 'Tạm dừng video nền' : 'Phát video nền';
    if (iconUse) iconUse.setAttribute('href', isPlaying ? '#i-pause' : '#i-play');
  }

  function source() {
    return mobileQuery.matches ? video.getAttribute('data-src-mobile') : video.getAttribute('data-src');
  }

  function play() {
    if (!video) return;

    if (!loaded) {
      var src = source();
      if (!src) return;
      video.src = src;
      video.load();
      loaded = true;
    }

    var attempt = video.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.then(function () {
        playing = true;
        hero.classList.remove('is-video-paused');
        setUi(true);
      }).catch(function () {
        playing = false;
        hero.classList.add('is-video-paused');
        setUi(false);
      });
    } else {
      playing = true;
      hero.classList.remove('is-video-paused');
      setUi(true);
    }
  }

  function pause() {
    if (!video) return;
    video.pause();
    playing = false;
    hero.classList.add('is-video-paused');
    setUi(false);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (playing) {
        userPaused = true;
        pause();
      } else {
        userPaused = false;
        play();
      }
    });
  }

  var autoAllowed = !reduced && !saveData;

  if (!autoAllowed) {
    hero.classList.add('is-video-paused');
    setUi(false);
  } else {
    var box = hero.getBoundingClientRect();
    if (box.bottom > 0 && box.top < window.innerHeight) {
      play();
    } else {
      hero.classList.add('is-video-paused');
      setUi(false);
    }
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          if (playing) {
            autoPaused = true;
            video.pause();
            playing = false;
          }
        } else if (!userPaused && autoAllowed && !playing) {
          autoPaused = false;
          play();
        }
      });
    }, { threshold: 0.12 });

    observer.observe(hero);
  }

  if (NLST.motionOK()) {
    NLST.onScroll(function () {
      if (window.scrollY > window.innerHeight) return;
      var shift = Math.min(44, window.scrollY * 0.09);
      hero.style.setProperty('--hero-shift', shift.toFixed(1) + 'px');
    });
  }
})();
