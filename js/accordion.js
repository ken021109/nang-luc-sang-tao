/* Reading accordion — one station open at a time */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var root = NLST.$('[data-accordion]');
  if (!root) return;

  var items = NLST.$$('[data-station]', root);
  if (!items.length) return;

  var status = NLST.$('[data-accordion-status]');
  var toggles = [];
  var pinFrame = 0;

  function panelOf(item) {
    return item.querySelector('[data-accordion-panel]');
  }

  function toggleOf(item) {
    return item.querySelector('[data-accordion-toggle]');
  }

  function indexOf(item) {
    return items.indexOf(item) + 1;
  }

  function paintStatus() {
    if (!status) return;

    var open = items.filter(function (item) {
      return item.classList.contains('is-open');
    })[0];

    if (!open) {
      status.textContent = 'Đã đóng tất cả — chọn một trạm';
      return;
    }

    var num = String(indexOf(open)).padStart(2, '0');
    status.textContent = 'Đang mở trạm ' + num + ' / ' + String(items.length).padStart(2, '0');
  }

  function setOpen(item, open) {
    var toggle = toggleOf(item);
    var panel = panelOf(item);
    if (!toggle || !panel) return;

    item.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    panel.toggleAttribute('inert', !open);
    panel.setAttribute('aria-hidden', String(!open));
  }

  function closeAll(except) {
    items.forEach(function (item) {
      if (item !== except) setOpen(item, false);
    });
  }

  function cancelPin() {
    if (pinFrame) {
      window.cancelAnimationFrame(pinFrame);
      pinFrame = 0;
    }
  }

  function pinHeader(item, anchorTop) {
    var start = performance.now();

    cancelPin();

    function step(now) {
      pinFrame = 0;

      var drift = item.getBoundingClientRect().top - anchorTop;
      if (Math.abs(drift) > 0.5) {
        window.scrollBy({ top: drift, left: 0, behavior: 'instant' });
      }

      if (now - start < 920) {
        pinFrame = window.requestAnimationFrame(step);
      }
    }

    pinFrame = window.requestAnimationFrame(step);
  }

  function openItem(item, options) {
    if (!item) return;

    var anchorTop = item.getBoundingClientRect().top;

    closeAll(item);
    setOpen(item, true);
    paintStatus();

    if (!options || !options.noPin) pinHeader(item, anchorTop);

    if (options && options.scroll) {
      window.setTimeout(function () {
        item.scrollIntoView({
          behavior: NLST.motionOK() ? 'smooth' : 'auto',
          block: 'start'
        });
      }, 90);
    }
  }

  items.forEach(function (item, index) {
    var toggle = toggleOf(item);
    if (!toggle) return;

    toggles.push(toggle);

    toggle.addEventListener('click', function () {
      if (item.classList.contains('is-open')) {
        setOpen(item, false);
        paintStatus();
      } else {
        openItem(item);
      }
    });

    toggle.addEventListener('keydown', function (event) {
      var next = null;

      if (event.key === 'ArrowDown') {
        next = (index + 1) % items.length;
      } else if (event.key === 'ArrowUp') {
        next = (index - 1 + items.length) % items.length;
      } else if (event.key === 'Home') {
        next = 0;
      } else if (event.key === 'End') {
        next = items.length - 1;
      }

      if (next === null) return;

      event.preventDefault();
      var target = toggleOf(items[next]);
      if (target) target.focus();
    });
  });

  items.forEach(function (item, index) {
    setOpen(item, item.classList.contains('is-open') && index === 0);
  });

  paintStatus();

  function fromHash() {
    var match = /^#tram-(\d+)$/.exec(window.location.hash);
    if (!match) return;

    var item = items[Number(match[1]) - 1];
    if (item) openItem(item, { scroll: true, noPin: true });
  }

  window.addEventListener('wheel', cancelPin, { passive: true });
  window.addEventListener('touchstart', cancelPin, { passive: true });

  fromHash();
  window.addEventListener('hashchange', fromHash);

  root.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    var open = items.filter(function (item) {
      return item.classList.contains('is-open');
    })[0];

    if (!open) return;

    var toggle = toggleOf(open);
    setOpen(open, false);
    paintStatus();

    if (toggle && open.contains(document.activeElement)) toggle.focus();
  });
})();
