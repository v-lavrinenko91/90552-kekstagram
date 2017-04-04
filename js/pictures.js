'use strict';

var pictureTemplate = document.querySelector('#picture-template').content;
var pictureBlock = document.querySelector('.pictures');
var comments = ['Всё отлично!'];
comments.push('В целом всё неплохо. Но не всё.');
comments.push('Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.');
comments.push('Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.');
comments.push('Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.');
comments.push('Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!');

function generatePicture() {
  var pictureLikes = 15 + Math.floor(Math.random() * 186);
  var commentsAmmount = 1 + Math.floor(Math.random() * 2);
  var pictureComments = [''];
  for (var i = 0; i < commentsAmmount; i++) {
    var index = Math.floor(Math.random() * comments.length);
    pictureComments[i] = comments[index];
    comments.slice(index, 1);
  }
  return {
    url: '#',
    likes: pictureLikes,
    comments: pictureComments
  };
}

function createPicturesList(listLength) {
  var pictures = [];
  for (var i = 0; i < listLength; i++) {
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

function addPictures() {
  var fragment = document.createDocumentFragment();
  var picturesList = createPicturesList(25);
  for (var i = 0; i < picturesList.length; i++) {
    fragment.appendChild(renderPicture(picturesList[i]));
  }
  pictureBlock.appendChild(fragment);
  return picturesList;
}

function hideCroppingForm() {
  document.querySelector('.upload-overlay').classList.add('invisible');
}

function showPost(picturesList) {
  var postElement = document.querySelector('.gallery-overlay');
  postElement.classList.remove('invisible');
  postElement.querySelector('.gallery-overlay-image').setAttribute('src', picturesList[0].url);
  postElement.querySelector('.likes-count').textContent = picturesList[0].likes;
  postElement.querySelector('.comments-count').textContent = picturesList[0].comments.length;
}

hideCroppingForm();
showPost(addPictures());
