'use strict';

window.data = (function () {
  var comments = [];
  comments.push('Всё отлично!');
  comments.push('В целом всё неплохо. Но не всё.');
  comments.push('Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.');
  comments.push('Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.');
  comments.push('Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.');
  comments.push('Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!');

  function generatePicture() {
    var pictureLikes = window.utils.getRandomNumber(15, 200);
    var commentsAmmount = window.utils.getRandomNumber(1, 2);
    var pictureComments = [''];
    for (var i = 0; i < commentsAmmount; i++) {
      var index = window.utils.getRandomNumber(0, comments.length - 1);
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

  return createPicturesList;
})();
