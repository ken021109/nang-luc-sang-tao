/* Tabs — author tabs and the five operations share one accessible component */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  NLST.$$('[data-tabs]').forEach(function (root) {
    var tabs = NLST.$$('[data-tab]', root);
    var panels = NLST.$$('[data-panel]', root);
    var segmented = root.querySelector('.segmented');
    var indicator = root.querySelector('.segmented__indicator');

    if (!tabs.length || !panels.length) return;

    function positionIndicator() {
      if (!segmented || !indicator) return;

      var active = tabs.filter(function (tab) {
        return tab.classList.contains('is-active');
      })[0];

      if (!active) return;

      var box = segmented.getBoundingClientRect();
      var button = active.getBoundingClientRect();
      var left = button.left - box.left - segmented.clientLeft;

      indicator.style.width = button.width + 'px';
      indicator.style.transform = 'translateX(' + left + 'px)';
      segmented.classList.add('is-ready');
    }

    function activate(id, moveFocus) {
      var target = tabs.filter(function (tab) {
        return tab.getAttribute('data-tab') === id;
      })[0];

      if (!target) return;

      tabs.forEach(function (tab) {
        var selected = tab === target;
        tab.classList.toggle('is-active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && moveFocus) tab.focus();
      });

      panels.forEach(function (panel) {
        var selected = panel.getAttribute('data-panel') === id;
        panel.hidden = !selected;
        panel.classList.toggle('is-active', selected);

        if (selected) {
          panel.classList.remove('is-entering');
          void panel.offsetWidth;
          panel.classList.add('is-entering');
        }
      });

      positionIndicator();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        if (tab.classList.contains('is-active')) return;
        activate(tab.getAttribute('data-tab'), false);
      });

      tab.addEventListener('keydown', function (event) {
        var next = null;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          next = (index + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          next = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          next = 0;
        } else if (event.key === 'End') {
          next = tabs.length - 1;
        }

        if (next === null) return;

        event.preventDefault();
        activate(tabs[next].getAttribute('data-tab'), true);
      });
    });

    window.requestAnimationFrame(positionIndicator);
    window.addEventListener('resize', positionIndicator);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(positionIndicator);
  });
})();
