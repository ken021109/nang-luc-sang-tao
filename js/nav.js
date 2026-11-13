/* Floating pill navigation: active section, scroll progress, material state */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var header = NLST.$('[data-header]');
  var navLinksBox = NLST.$('[data-nav-links]');
  var progress = NLST.$('[data-scroll-progress]');
  var sections = NLST.$$('[data-section]');
  if (!header || !navLinksBox || !sections.length) return;

  var links = NLST.$$('[data-nav]', navLinksBox);
  var activeId = null;
  var mobileQuery = window.matchMedia('(max-width: 900px)');

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;

    var activeLink = null;
    links.forEach(function (link) {
      var isActive = link.getAttribute('data-nav') === id;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
        activeLink = link;
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (activeLink && mobileQuery.matches) {
      var left = activeLink.offsetLeft - (navLinksBox.clientWidth - activeLink.offsetWidth) / 2;
      navLinksBox.scrollTo({
        left: Math.max(0, left),
        behavior: NLST.motionOK() ? 'smooth' : 'auto'
      });
    }
  }

  function currentSection() {
    var marker = window.scrollY + window.innerHeight * 0.32;
    var current = sections[0];

    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) current = section;
    });

    var docHeight = document.documentElement.scrollHeight;
    if (window.innerHeight + window.scrollY >= docHeight - 8) {
      current = sections[sections.length - 1];
    }

    return current;
  }

  function update() {
    var section = currentSection();
    if (section && section.id) setActive(section.id);

    header.classList.toggle('is-scrolled', window.scrollY > 10);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? NLST.clamp(window.scrollY / max, 0, 1) : 0;
      progress.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    }
  }

  NLST.onScroll(update);
  window.addEventListener('load', update);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
  update();
})();
