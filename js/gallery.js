'use strict';

(function (utils, picture, preview) {
  var pictureBlock = document.querySelector('.pictures');
  var postElement = document.querySelector('.gallery-overlay');
  var postElementClose = postElement.querySelector('.gallery-overlay-close');
  var picturesNode = picture.createPicturesNode;
  var picturesList = picture.picturesList;

  function addPictures() {
    pictureBlock.appendChild(picturesNode());
  }

  function compareSrc(src) {
    var foundItem = null;
    for (var i = 0; i < picturesList.length; i++) {
      if (picturesList[i].url === src) {
        foundItem = picturesList[i];
      }
    }
    return foundItem;
  }

  function openPost(pictureSrc) {
    preview(compareSrc(pictureSrc));
    postElement.classList.remove('invisible');
    postElementClose.addEventListener('click', closePost);
    document.addEventListener('keydown', onEscPressPost);
    postElementClose.addEventListener('keydown', onPostCloseBtnEnterPress);
  }

  function closePost() {
    postElement.classList.add('invisible');
    postElementClose.removeEventListener('click', closePost);
    document.removeEventListener('keydown', onEscPressPost);
    postElementClose.removeEventListener('keydown', onPostCloseBtnEnterPress);
  }

  function onEscPressPost(evt) {
    if (utils.isEscPressed(evt)) {
      closePost();
    }
  }

  function onPostCloseBtnEnterPress(evt) {
    if (utils.isEnterPressed(evt)) {
      closePost();
    }
  }

  function addOpenPostClickListener() {
    pictureBlock.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.tagName === 'IMG') {
        openPost(evt.target.getAttribute('src'));
      }
    });
  }

  function addOpenPostKeyDownListener() {
    pictureBlock.addEventListener('keydown', function (evt) {
      if (utils.isEnterPressed(evt)) {
        openPost(evt.target.getAttribute('src'));
      }
    });
  }


  addPictures();
  addOpenPostClickListener();
  addOpenPostKeyDownListener();
})(window.utils, window.picture, window.preview);
