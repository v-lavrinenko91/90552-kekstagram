'use strict';

window.picture = (function (data) {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var PICTURES_AMOUNT = 25;
  var picturesList = data(PICTURES_AMOUNT);

  function renderPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('img').setAttribute('tabindex', '0');
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  }

  function createPicturesNode() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picturesList.length; i++) {
      fragment.appendChild(renderPicture(picturesList[i]));
    }
    return fragment;
  }

  return {
    createPicturesNode: createPicturesNode,
    picturesList: picturesList
  };

})(window.data);
