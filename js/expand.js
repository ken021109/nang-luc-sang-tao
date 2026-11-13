/* Disclosure panels — Góc mở rộng, Góc nhìn của Nhóm */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  NLST.$$('[data-expand]').forEach(function (button) {
    var id = button.getAttribute('data-expand');
    var panel = id ? document.getElementById(id) : null;
    if (!panel) return;

    function setOpen(open) {
      button.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
      panel.toggleAttribute('inert', !open);
      panel.setAttribute('aria-hidden', String(!open));
    }

    button.addEventListener('click', function () {
      var isOpen = button.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    setOpen(button.getAttribute('aria-expanded') === 'true');
  });
})();
