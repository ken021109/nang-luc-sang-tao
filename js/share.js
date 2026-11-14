/* Share — copy the public URL with a graceful fallback */
(function () {
  'use strict';

  var NLST = window.NLST;
  if (!NLST) return;

  var buttons = NLST.$$('[data-share-copy]');
  if (!buttons.length) return;

  var status = NLST.$('[data-share-status]');
  var link = NLST.$('#share-url');

  function legacyCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '-1000px';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();

    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(field);
    return copied;
  }

  function write(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        if (!legacyCopy(text)) throw new Error('clipboard unavailable');
      });
    }

    if (legacyCopy(text)) return Promise.resolve();
    return Promise.reject(new Error('clipboard unavailable'));
  }

  function selectLink() {
    if (!link) return;

    link.focus();
    var range = document.createRange();
    range.selectNodeContents(link);
    var selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);
  }

  buttons.forEach(function (button) {
    var value = button.getAttribute('data-share-copy');
    if (!value) return;

    var label = button.querySelector('[data-share-label]');
    var icon = button.querySelector('.icon use');
    var original = label ? label.textContent : '';
    var timer = 0;

    function reset() {
      button.classList.remove('is-copied');
      if (label) label.textContent = original;
      if (icon) icon.setAttribute('href', '#i-copy');
    }

    button.addEventListener('click', function () {
      write(value).then(function () {
        button.classList.add('is-copied');
        if (label) label.textContent = 'Đã sao chép';
        if (icon) icon.setAttribute('href', '#i-check');
        if (status) status.textContent = 'Đã sao chép đường link của trang.';

        window.clearTimeout(timer);
        timer = window.setTimeout(reset, 2600);
      }).catch(function () {
        if (label) label.textContent = 'Chọn liên kết';
        if (status) status.textContent = 'Không sao chép tự động được. Liên kết đã được chọn để bạn sao chép.';
        selectLink();

        window.clearTimeout(timer);
        timer = window.setTimeout(reset, 3600);
      });
    });
  });
})();
