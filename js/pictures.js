'use strict';

var pictureTemplate = document.querySelector('#picture-template').content;
var pictureBlock = document.querySelector('.pictures');
var postElement = document.querySelector('.gallery-overlay');
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

function hideCroppingForm() {
  document.querySelector('.upload-overlay').classList.add('invisible');
}

function addPictures() {
  pictureBlock.appendChild(createPicturesNode());
}

function renderPost(elem) {
  postElement.querySelector('.gallery-overlay-image').setAttribute('src', elem.url);
  postElement.querySelector('.likes-count').textContent = elem.likes;
  postElement.querySelector('.comments-count').textContent = elem.comments.length;
}

function showPost() {
  postElement.classList.remove('invisible');
}

hideCroppingForm();
addPictures();
pictureBlock.addEventListener('click', function (evt) {
  evt.preventDefault();
  var src = evt.target.attributes.src;
  console.log(src);
  // showPost();
});
