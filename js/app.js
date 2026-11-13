/* Small page-level details */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var year = NLST.$('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
