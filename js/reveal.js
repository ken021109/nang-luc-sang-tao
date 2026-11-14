/* Gentle scroll reveal — one-way, no layout thrash */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var elements = NLST.$$('[data-reveal]');
  if (!elements.length) return;

  function showAll() {
    elements.forEach(function (element) {
      element.classList.add('is-visible');
    });
  }

  if (!NLST.motionOK() || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -4% 0px',
    threshold: 0.04
  });

  elements.forEach(function (element) {
    observer.observe(element);
  });
})();
