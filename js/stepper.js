/* Station rail — highlight the station currently in view */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var rail = NLST.$('[data-station-rail]');
  var links = NLST.$$('[data-station-link]');
  var stations = NLST.$$('[data-station]');

  if (!rail || !links.length || !stations.length) return;

  var active = null;
  var mobileQuery = window.matchMedia('(max-width: 720px)');

  function setActive(number) {
    if (number === active) return;
    active = number;

    var activeLink = null;
    links.forEach(function (link) {
      var selected = link.getAttribute('data-station-link') === String(number);
      link.classList.toggle('is-active', selected);
      if (selected) {
        link.setAttribute('aria-current', 'location');
        activeLink = link;
      } else {
        link.removeAttribute('aria-current');
      }
    });

    var progress = stations.length > 1 ? (number - 1) / (stations.length - 1) : 0;
    rail.style.setProperty('--station-progress', progress.toFixed(3));

    if (activeLink && mobileQuery.matches) {
      var left = activeLink.offsetLeft - 16;
      rail.scrollTo({
        left: Math.max(0, left),
        behavior: NLST.motionOK() ? 'smooth' : 'auto'
      });
    }
  }

  function update() {
    var marker = window.innerHeight * 0.38;
    var current = stations[0];

    stations.forEach(function (station) {
      if (station.getBoundingClientRect().top <= marker) current = station;
    });

    var num = Number(current.getAttribute('data-station')) || 1;
    setActive(num);
  }

  NLST.onScroll(update);
  window.addEventListener('load', update);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
  update();
})();
