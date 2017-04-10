'use strict';

var pictureTemplate = document.querySelector('#picture-template').content;
var pictureBlock = document.querySelector('.pictures');
var postElement = document.querySelector('.gallery-overlay');
var postElementClose = postElement.querySelector('.gallery-overlay-close');
var upload = document.querySelector('.upload');
var uploadComment = upload.querySelector('.upload-form-description');
var croppingFormClose = upload.querySelector('.upload-form-cancel');
var croppingFormSubmitBtn = upload.querySelector('.upload-form-submit');
var comments = [];
comments.push('Всё отлично!');
comments.push('В целом всё неплохо. Но не всё.');
comments.push('Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.');
comments.push('Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.');
comments.push('Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.');
comments.push('Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!');
var PICTURES_AMOUNT = 25;
var picturesList = createPicturesList(PICTURES_AMOUNT);

function getRandomNumber(minValue, maxValue) {
  return minValue + Math.floor(Math.random() * (maxValue + 1 - minValue));
}

function generatePicture() {
  var pictureLikes = getRandomNumber(15, 200);
  var commentsAmmount = getRandomNumber(1, 2);
  var pictureComments = [''];
  for (var i = 0; i < commentsAmmount; i++) {
    var index = getRandomNumber(0, comments.length - 1);
    pictureComments[i] = comments[index];
    comments.slice(index, 1);
  }
  return {
    url: '#',
    likes: pictureLikes,
    comments: pictureComments
  };
}

function createPicturesList(picturesCount) {
  var pictures = [];
  for (var i = 0; i < picturesCount; i++) {
    var picture = generatePicture();
    picture.url = 'photos/' + (i + 1) + '.jpg';
    pictures[i] = picture;
  }
  return pictures;
}

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

function addPictures() {
  pictureBlock.appendChild(createPicturesNode());
}

function renderPost(elem) {
  postElement.querySelector('.gallery-overlay-image').setAttribute('src', elem.url);
  postElement.querySelector('.likes-count').textContent = elem.likes;
  postElement.querySelector('.comments-count').textContent = elem.comments.length;
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
  renderPost(compareSrc(pictureSrc));
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
  if (evt.keyCode === 27) {
    closePost();
  }
}

function onPostCloseBtnEnterPress(evt) {
  if (evt.keyCode === 13) {
    closePost();
  }
}

function openCroppingForm() {
  upload.querySelector('.upload-overlay').classList.remove('invisible');
  upload.querySelector('.upload-form-cancel').addEventListener('click', function () {
    closeCroppingForm();
    openLoadForm();
  });
  document.addEventListener('keydown', onEscPressCroppingForm);
  croppingFormClose.addEventListener('click', onCroppingFormCloseEnterPress);
  croppingFormSubmitBtn.addEventListener('click', onCroppingFormSubmitBtnClick);
  croppingFormSubmitBtn.addEventListener('keydown', onCroppingFormSubmitBtnEnterPress);
}

function closeCroppingForm() {
  upload.querySelector('.upload-overlay').classList.add('invisible');
  document.removeEventListener('keydown', onEscPressCroppingForm);
  croppingFormClose.removeEventListener('click', onCroppingFormCloseEnterPress);
  croppingFormSubmitBtn.removeEventListener('click', onCroppingFormSubmitBtnClick);
  croppingFormSubmitBtn.removeEventListener('keydown', onCroppingFormSubmitBtnEnterPress);
}

function openLoadForm() {
  upload.querySelector('#upload-select-image').classList.remove('invisible');
}

function closeLoadForm() {
  upload.querySelector('#upload-select-image').classList.add('invisible');
}

function onEscPressCroppingForm(evt) {
  if (evt.keyCode === 27 && document.activeElement !== uploadComment) {
    closeCroppingForm();
    openLoadForm();
  }
}

function onCroppingFormCloseEnterPress(evt) {
  if (evt.keyCode === 13 && document.activeElement === closeCroppingForm) {
    closeCroppingForm();
    openLoadForm();
  }
}

function onCroppingFormSubmitBtnClick(evt) {
  evt.preventDefault();
  closeCroppingForm();
  openLoadForm();
}

function onCroppingFormSubmitBtnEnterPress(evt) {
  evt.preventDefault();
  if (evt.keyCode === 13 && document.activeElement === croppingFormSubmitBtn) {
    closeCroppingForm();
    openLoadForm();
  }
}

addPictures();
closeCroppingForm();
openLoadForm();

pictureBlock.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    openPost(evt.target.getAttribute('src'));
  }
});

pictureBlock.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPost(evt.target.getAttribute('src'));
  }
});

upload.querySelector('#upload-file').onchange = function () {
  openCroppingForm();
  closeLoadForm();
};
