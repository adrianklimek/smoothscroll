(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _animate = __webpack_require__(1);

var _animate2 = _interopRequireDefault(_animate);

var _getOffset = __webpack_require__(2);

var _getOffset2 = _interopRequireDefault(_getOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getScrollPosition = function getScrollPosition(el) {
  return {
    top: el.pageYOffset || el.scrollTop || 0,
    left: el.pageXOffset || el.scrollLeft || 0
  };
};

var setScrollPosition = function setScrollPosition(el, _ref) {
  var top = _ref.top,
      left = _ref.left;

  if (el === window) {
    el.scrollTo(top, left);
  } else {
    /* eslint-disable */
    el.scrollTop = top;
    el.scrollLeft = left;
    /* eslint-enable */
  }
};

/**
 * Animates scroll
 *
 * @param {HTMLElement, Number} destination position or a DOM element
 * @param {Object} opts
 * @param {Number} opts.duration
 * @param {Function, String} opts.easing function or name of one of predefined easing function
 * @param {HTMLElement} opts.context element to apply scroll to
 * @param {String} opts.orientation scroll orientation ('horizontal' or 'vertical')
 * @param {Number} opts.offset scroll offset in px
 * @param {Function} callback function that is called on animation end
 */

var smoothScroll = function smoothScroll(destination, opts, callback) {
  var _opts$duration = opts.duration,
      duration = _opts$duration === undefined ? 600 : _opts$duration,
      _opts$easing = opts.easing,
      easing = _opts$easing === undefined ? 'easeInOut' : _opts$easing,
      _opts$context = opts.context,
      context = _opts$context === undefined ? window : _opts$context,
      _opts$orientation = opts.orientation,
      orientation = _opts$orientation === undefined ? 'vertical' : _opts$orientation,
      _opts$offset = opts.offset,
      offset = _opts$offset === undefined ? 0 : _opts$offset;


  var startPosition = getScrollPosition(context);

  // Keep same data structure for object and number value of `destination`
  var destinationPosition = (typeof destination === 'undefined' ? 'undefined' : _typeof(destination)) === 'object' ? (0, _getOffset2.default)(destination) : { top: destination, left: destination };

  var endPosition = orientation === 'horizontal' ? destinationPosition.left + offset : destinationPosition.top + offset;

  var updateScrollPosition = function updateScrollPosition(value) {
    setScrollPosition(context, {
      top: orientation === 'horizontal' ? destinationPosition.top : value,
      left: orientation === 'horizontal' ? value : destinationPosition.left
    });
  };

  var animateScroll = function animateScroll(currentValue, progress) {
    updateScrollPosition(currentValue);
    if (progress === 1) callback(destination);
  };

  (0, _animate2.default)({
    startValue: startPosition,
    endValue: endPosition,
    duration: duration,
    easing: easing,
    callback: animateScroll
  });
};

exports.default = smoothScroll;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable */
var easings = {
  linear: function linear(t) {
    return t;
  },
  easeIn: function easeIn(t) {
    return t * t * t;
  },
  easeOut: function easeOut(t) {
    return --t * t * t + 1;
  },
  easeInOut: function easeInOut(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  /* eslint-enable */

  /**
  * Animates number values
  *
  * @param {Object} opts
  * @param {Number} opts.startValue
  * @param {Number} opts.endValue
  * @param {Number} opts.duration
  * @param {Function, String} opts.easing an easing function or a name of one of the predefined ones
  * @param {Function} opts.callback a function that is called on every animation frame
  * @returns {Boolean}
  */
};var animate = function animate(_ref) {
  var startValue = _ref.startValue,
      endValue = _ref.endValue,
      duration = _ref.duration,
      easing = _ref.easing,
      callback = _ref.callback;

  if (typeof callback !== 'function') return false;

  var easingFunc = typeof easing !== 'function' ? easings[easing] || easings.easeInOut : easing;

  var animationFrame = function animationFrame(initialTime) {
    var elapsedTime = Date.now() - initialTime;
    var isFinal = elapsedTime > duration;
    var animationProgress = isFinal ? 1 : elapsedTime / duration;
    var currentValue = isFinal ? endValue : startValue + (endValue - startValue) * easingFunc(animationProgress);

    // A final `animationProgress` is 1 so it can be used to trigger complete callback
    callback(currentValue, animationProgress);
    if (elapsedTime <= duration) requestAnimationFrame(animationFrame.bind(null, initialTime));
  };
  animationFrame(Date.now());

  return true;
};

exports.default = animate;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Gets offset of an element
 *
 * @param {HTMLelement} element
 * @returns {Object} top and left offset
 */
var getOffset = function getOffset(element) {
  var offset = function offset(_ref, _ref2) {
    var top = _ref.top,
        left = _ref.left;
    var _ref2$offsetTop = _ref2.offsetTop,
        offsetTop = _ref2$offsetTop === undefined ? 0 : _ref2$offsetTop,
        _ref2$offsetLeft = _ref2.offsetLeft,
        offsetLeft = _ref2$offsetLeft === undefined ? 0 : _ref2$offsetLeft,
        offsetParent = _ref2.offsetParent;

    var output = { top: top + offsetTop, left: left + offsetLeft };
    return offsetParent ? offset(_extends({}, output), offsetParent) : output;
  };

  return offset({ top: 0, left: 0 }, element);
};

exports.default = getOffset;

/***/ })
/******/ ])["default"];
});