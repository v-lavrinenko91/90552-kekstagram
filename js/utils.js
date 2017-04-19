'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  return {
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    },

    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },

    getRandomNumber: function (minValue, maxValue) {
      return minValue + Math.floor(Math.random() * (maxValue + 1 - minValue));
    }
  };
})();
