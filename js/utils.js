/* Shared helpers — classic scripts so the site also works from file:// */
(function () {
  'use strict';

  var NLST = window.NLST = window.NLST || {};

  NLST.$ = function (selector, root) {
    return (root || document).querySelector(selector);
  };

  NLST.$$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  NLST.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  NLST.motionOK = function () {
    return !NLST.reducedMotion.matches;
  };

  NLST.canHover = function () {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  };

  NLST.on = function (target, type, handler, options) {
    if (target) target.addEventListener(type, handler, options);
  };

  NLST.onScroll = function (callback) {
    var ticking = false;

    function run() {
      ticking = false;
      callback();
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(run);
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    return run;
  };

  NLST.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  };
})();
