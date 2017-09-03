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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.smoothScroll = smoothScroll;

var _getOffset = __webpack_require__(1);

var _getOffset2 = _interopRequireDefault(_getOffset);

var _easings = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Default options
var defaults = {
    duration: 600, // Number
    easing: 'easeInOut', // String or function
    context: window, // Object
    orientation: 'vertical', // String
    offset: 0 // Number


    /**
     * Get current value of an animation
     * 
     * @param   {number}   start    The animation start value
     * @param   {number}   end      The animation end value
     * @param   {number}   elapsed  The animation elapsed time
     * @param   {number}   duration The animation duration
     * @param   {function} easing   The easing function
     * @return  {number}            The animation current value
     */
};function animate(start, end, elapsed, duration, easing) {
    if (elapsed > duration) {
        return end;
    }
    return start + (end - start) * easing(elapsed / duration);
}

/**
 * Animate scrolling 
 * 
 * @param {object, number} destination The number or the element that is the destination of scrolling 
 * @param {object}         opts        The array that extends default configuration 
 * @param {function}       callback    The function that will be called after animation is done
 */
function smoothScroll(destination, opts, callback) {
    var options = _extends({}, defaults, opts); // Extend options with defaults 

    var start = 0; // Actual scroll position that is used as the begin of a animation

    // Get offset of the element if the destination is an object
    if ((typeof destination === 'undefined' ? 'undefined' : _typeof(destination)) === 'object') {
        destination = (0, _getOffset2.default)(destination, options.context);
    }

    // Get correct animation start position 
    if (options.orientation === 'horizontal') {
        destination = destination.left || destination;
        start = options.context.pageXOffset || options.context.scrollLeft || 0;
    } else {
        destination = destination.top || destination;
        start = options.context.pageYOffset || options.context.scrollTop || 0;
    }

    // If easing argument is a string get it from easing array
    if (typeof options.easing === 'string') {
        options.easing = _easings.easings[options.easing] || _easings.easings[defaults.easing]; // If there is no easing with given name get default one
    }

    destination += options.offset; // Add offset to the destination

    /**
     * Handle scroll animation
     * 
     * @param  {object} args The array with animate parameters
     */
    var animateScroll = function animateScroll(args) {
        if (options.context != window) {
            if (options.orientation == 'horizontal') {
                options.context.scrollLeft = animate.apply(undefined, _toConsumableArray(args));
            } else {
                options.context.scrollTop = animate.apply(undefined, _toConsumableArray(args));
            }
        } else {
            if (options.orientation == 'horizontal') {
                window.scrollTo(animate.apply(undefined, _toConsumableArray(args)), window.pageYOffset);
            } else {
                window.scrollTo(window.pageXOffset, animate.apply(undefined, _toConsumableArray(args)));
            }
        }
    };

    var time = Date.now(); // Set initial time

    /** Function that is executed on every animation step */
    var animationFrame = function animationFrame() {
        var elapsed = Date.now() - time;

        var animationArguments = [start, destination, elapsed, options.duration, options.easing];

        animateScroll(animationArguments);

        if (elapsed > options.duration) {
            if (typeof callback == 'function') {
                callback();
            }
        } else {
            requestAnimationFrame(animationFrame);
        }
    };
    animationFrame(); // Initialize animation
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOffset;
/**
 * Get offset of an element
 *
 * @param  {object} element The element that offset will be returned
 * @param  {object} context One of the parents of the element (if it isn't declared returns absolute offset)
 * @return {object}         The array with top and left offset
 */
function getOffset(element, context) {
    var top = 0,
        left = 0;

    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element && element !== context);

    return {
        top: top,
        left: left
    };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Basic easing functions 
var easings = exports.easings = {
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
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
};

/***/ })
/******/ ]);
});