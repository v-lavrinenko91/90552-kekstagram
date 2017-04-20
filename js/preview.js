'use strict';

window.preview = (function () {
  var postElement = document.querySelector('.gallery-overlay');

  function renderPost(elem) {
    postElement.querySelector('.gallery-overlay-image').setAttribute('src', elem.url);
    postElement.querySelector('.likes-count').textContent = elem.likes;
    postElement.querySelector('.comments-count').textContent = elem.comments.length;
  }

  return renderPost;
})();
