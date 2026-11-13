/* Interactive timeline — hover, focus or tap a year to update one line */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  NLST.$$('[data-timeline]').forEach(function (root) {
    var years = NLST.$$('[data-year]', root);
    var rail = root.querySelector('.timeline__rail');
    var detailYear = root.querySelector('[data-timeline-year]');
    var detailText = root.querySelector('[data-timeline-text]');
    var fill = root.querySelector('[data-timeline-fill]');

    if (!years.length || !rail || !detailYear || !detailText) return;

    function select(button) {
      if (!button) return;

      years.forEach(function (year) {
        var selected = year === button;
        year.classList.toggle('is-active', selected);
        year.setAttribute('aria-pressed', String(selected));
      });

      detailYear.textContent = button.getAttribute('data-year') || '';
      detailText.textContent = button.getAttribute('data-detail') || '';

      var index = years.indexOf(button);
      var progress = years.length > 1 ? index / (years.length - 1) : 0;
      rail.style.setProperty('--progress', progress.toFixed(3));

      if (fill) fill.style.width = (progress * 100).toFixed(2) + '%';
    }

    years.forEach(function (button) {
      button.addEventListener('click', function () {
        select(button);
      });

      button.addEventListener('mouseenter', function () {
        select(button);
      });

      button.addEventListener('focus', function () {
        select(button);
      });
    });

    var initial = years.filter(function (year) {
      return year.classList.contains('is-active');
    })[0] || years[0];

    select(initial);
  });
})();
