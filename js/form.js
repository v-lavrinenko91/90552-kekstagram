'use strict';

(function () {
  var upload = document.querySelector('.upload');
  var uploadOverlay = upload.querySelector('.upload-overlay');
  var resizeControlValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var resizeControlInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');
  var filterLineBlock = uploadFilterControls.querySelector('.upload-filter-level');
  var filterLine = uploadFilterControls.querySelector('.upload-filter-level-line');
  var filterPin = uploadFilterControls.querySelector('.upload-filter-level-pin');
  var filterValueLine = uploadFilterControls.querySelector('.upload-filter-level-val');
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
    filterLineBlock.classList.add('invisible');
    uploadResizeControl();
    changeFilter();
    moveFilterPin();
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
      var targetClass = evt.target.getAttribute('class');
      if (targetClass !== 'upload-filter-level' && targetClass !== 'upload-filter-level-line' && targetClass !== 'upload-filter-level-pin' && targetClass !== 'upload-filter-level-val') {
        filterImagePreview.classList.remove(currentFilter);
        currentFilter = 'filter-' + filterClass;
        if (currentFilter !== 'filter-none') {
          filterLineBlock.classList.remove('invisible');
        } else {
          filterLineBlock.classList.add('invisible');
          filterImagePreview.style.filter = 'none';
        }
        if (currentFilter !== 'filter-none') {
          setDefaultFilterValues();
        }
        filterImagePreview.classList.add(currentFilter);
      }
    });
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
      right: box.right
    };

  }

  function moveFilterPin() {
    filterPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startX = evt.clientX;
      var minX = getCoords(filterLine).left;
      var maxX = getCoords(filterLine).right;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shiftX = startX - moveEvt.clientX;
        startX = moveEvt.clientX;
        if (startX >= minX && startX <= maxX) {
          filterPin.style.left = (filterPin.offsetLeft - shiftX) + 'px';
          setFilterValue(minX, maxX, startX);
        }
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  function setFilterValue(min, max, position) {
    if (position >= min && position <= max) {
      var value = ((position - min) / (max - min)).toFixed(2);
      filterValueLine.style.width = value * 100 + '%';
      setFilterParametr(value);
    }
  }

  function setFilterParametr(paramValue) {
    if (currentFilter === 'filter-chrome') {
      filterImagePreview.style.filter = 'grayscale(' + paramValue + ')';
    } else if (currentFilter === 'filter-sepia') {
      filterImagePreview.style.filter = 'sepia(' + paramValue + ')';
    } else if (currentFilter === 'filter-marvin') {
      filterImagePreview.style.filter = 'invert(' + paramValue * 100 + '%)';
    } else if (currentFilter === 'filter-phobos') {
      filterImagePreview.style.filter = 'blur(' + paramValue * 3 + 'px)';
    } else if (currentFilter === 'filter-heat') {
      filterImagePreview.style.filter = 'brightness(' + paramValue * 3 + ')';
    }
  }

  function setDefaultFilterValues() {
    var defaultValue = 0.2;
    filterPin.style.left = defaultValue * 100 + '%';
    filterValueLine.style.width = defaultValue * 100 + '%';
    setFilterParametr(defaultValue);
  }

  closeCroppingForm();
  openLoadForm();
  addLoadFormChangeListener();
})();
