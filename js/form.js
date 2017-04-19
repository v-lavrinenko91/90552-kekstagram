'use strict';

(function () {
  var upload = document.querySelector('.upload');
  var uploadOverlay = upload.querySelector('.upload-overlay');
  var resizeControlValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var resizeControlInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');
  var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var commentField = uploadOverlay.querySelector('textarea');
  var uploadComment = upload.querySelector('.upload-form-description');
  var uploadForm = upload.querySelector('#upload-select-image');
  var uploadFile = upload.querySelector('#upload-file');
  var croppingFormClose = upload.querySelector('.upload-form-cancel');
  var croppingFormSubmitBtn = upload.querySelector('.upload-form-submit');
  var currentFilter = 'filter-none';

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
    uploadResizeControl();
    changeFilter();
  }

  function closeCroppingForm() {
    upload.querySelector('.upload-overlay').classList.add('invisible');
    document.removeEventListener('keydown', onEscPressCroppingForm);
    croppingFormClose.removeEventListener('click', onCroppingFormCloseEnterPress);
    croppingFormSubmitBtn.removeEventListener('click', onCroppingFormSubmitBtnClick);
    croppingFormSubmitBtn.removeEventListener('keydown', onCroppingFormSubmitBtnEnterPress);
  }

  function openLoadForm() {
    uploadForm.classList.remove('invisible');
  }

  function closeLoadForm() {
    upload.querySelector('#upload-select-image').classList.add('invisible');
  }

  function onEscPressCroppingForm(evt) {
    if (window.utils.isEscPressed(evt) && document.activeElement !== uploadComment) {
      closeCroppingForm();
      openLoadForm();
    }
  }

  function onCroppingFormCloseEnterPress(evt) {
    if (window.utils.isEnterPressed(evt) && document.activeElement === closeCroppingForm) {
      closeCroppingForm();
      openLoadForm();
    }
  }

  function onCroppingFormSubmitBtnClick(evt) {
    event.preventDefault();
    trySubmitForm();
  }

  function onCroppingFormSubmitBtnEnterPress(evt) {
    if (window.utils.isEnterPressed(evt) && document.activeElement === croppingFormSubmitBtn) {
      evt.preventDefault();
      trySubmitForm();
    }
  }

  function addLoadFormChangeListener() {
    uploadFile.addEventListener('change', function () {
      openCroppingForm();
      closeLoadForm();
    });
  }

  function isCommentSizeValid() {
    var commentSize = commentField.value.length;
    return commentSize >= 30 && commentSize <= 100;
  }

  function setDefaultValues() {
    resizeControlValue.value = '100%';
    filterImagePreview.classList.remove(currentFilter);
  }

  function trySubmitForm() {
    if (isCommentSizeValid()) {
      uploadForm.submit();
      setDefaultValues();
    } else {
      commentField.classList.add('upload-message-error');
    }
  }

  function uploadResizeControl() {
    var str = resizeControlValue.value;
    var value = parseInt(str.substring(0, str.length - 1), 10);
    var step = 25;
    var minValue = 25;
    var maxValue = 100;
    var decValue = function () {
      if (value !== minValue) {
        value = value - step;
      }
      setValue();
    };
    var incValue = function () {
      if (value !== maxValue) {
        value = value + step;
      }
      setValue();
    };

    function setValue() {
      var scaleValue = value / maxValue;
      resizeControlValue.value = value + '%';
      filterImagePreview.setAttribute('style', 'transform: scale(' + scaleValue + ')');
    }

    resizeControlDec.addEventListener('click', decValue);
    resizeControlInc.addEventListener('click', incValue);
  }

  function changeFilter() {
    uploadFilterControls.addEventListener('click', function (evt) {
      var filterClass = evt.target.value;
      filterImagePreview.classList.remove(currentFilter);
      currentFilter = 'filter-' + filterClass;
      filterImagePreview.classList.add(currentFilter);
    });
  }

  closeCroppingForm();
  openLoadForm();
  addLoadFormChangeListener();
})();
