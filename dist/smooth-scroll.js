(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.smoothScroll = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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
     * Animates number values using requestAnimationFrame
     *
     * @param {Object} opts
     * @param {number} opts.start
     * @param {number} opts.end
     * @param {number} opts.duration
     * @param {Function, string} opts.easing an easing function or a name of one of the predefined ones
     * @param {Function} opts.onUpdate a function that is called on every animation frame
     * @param {Function} opts.onComplete a function that is called at the end
     * @returns {boolean}
     */

  };

  function animate(_ref) {
    var start = _ref.start,
        end = _ref.end,
        duration = _ref.duration,
        easing = _ref.easing,
        onUpdate = _ref.onUpdate,
        onComplete = _ref.onComplete;
    if (typeof onUpdate !== 'function') return false;
    var easingFunc = typeof easing !== 'function' ? easings[easing] || easings.easeInOut : easing;
    var initialTime = null;

    var animationFrame = function animationFrame(timestamp) {
      initialTime = initialTime || timestamp;
      var elapsedTime = timestamp - initialTime;
      var animationProgress = Math.min(elapsedTime / duration, 1);
      var currentValue = start + (end - start) * easingFunc(animationProgress);
      onUpdate(currentValue, animationProgress);
      if (elapsedTime <= duration) window.requestAnimationFrame(animationFrame);else if (typeof onComplete === 'function') onComplete(currentValue, animationProgress);
    };

    window.requestAnimationFrame(animationFrame);
    return true;
  }

  /**
   * Gets offset of an element
   *
   * @param {HTMLElement} target
   * @param {Object} context
   * @returns {Object} top and left offset
   */
  function getOffset(target) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
    var scrollPosition = {
      left: context === window ? context.pageXOffset : context.scrollLeft,
      top: context === window ? context.pageYOffset : context.scrollTop
    };
    var targetRect = target.getBoundingClientRect();
    var contextRect = typeof context.getBoundingClientRect === 'function' ? context.getBoundingClientRect() : {
      left: 0,
      top: 0
    };
    return {
      left: Math.abs(contextRect.left - targetRect.left - scrollPosition.left),
      top: Math.abs(contextRect.top - targetRect.top - scrollPosition.top)
    };
  }

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
      el.scrollTo(left, top);
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
   * @param {HTMLElement, number} destination position or a DOM element
   * @param {Object} opts
   * @param {number} opts.duration
   * @param {Function, string} opts.easing function or name of one of predefined easing functions
   * @param {Object} opts.context element to apply scroll to
   * @param {string} opts.orientation scroll orientation ('horizontal' or 'vertical')
   * @param {number} opts.offset scroll offset in px
   * @param {Function} opts.onUpdate function that is called on every change
   * @param {Function} opts.onComplete function that is called on animation end
   */


  function smoothScroll(destination) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _opts$duration = opts.duration,
        duration = _opts$duration === void 0 ? 600 : _opts$duration,
        _opts$easing = opts.easing,
        easing = _opts$easing === void 0 ? 'easeInOut' : _opts$easing,
        _opts$context = opts.context,
        context = _opts$context === void 0 ? window : _opts$context,
        _opts$orientation = opts.orientation,
        orientation = _opts$orientation === void 0 ? 'vertical' : _opts$orientation,
        _opts$offset = opts.offset,
        offset = _opts$offset === void 0 ? 0 : _opts$offset,
        _opts$onUpdate = opts.onUpdate,
        onUpdate = _opts$onUpdate === void 0 ? function () {} : _opts$onUpdate,
        _opts$onComplete = opts.onComplete,
        onComplete = _opts$onComplete === void 0 ? function () {} : _opts$onComplete;
    var startPosition = getScrollPosition(context); // Keep the same data structure for object and number value of `destination`

    var destinationPosition = _typeof(destination) === 'object' ? getOffset(destination, context) : {
      top: destination,
      left: destination
    };
    var isHorizontal = orientation === 'horizontal';

    var applyOrientation = function applyOrientation(_ref2) {
      var top = _ref2.top,
          left = _ref2.left;
      return isHorizontal ? left : top;
    };

    var updateScrollPosition = function updateScrollPosition(value, progress) {
      setScrollPosition(context, {
        top: isHorizontal ? startPosition.top : value,
        left: isHorizontal ? value : startPosition.left
      });
      onUpdate(value, progress);
    };

    animate({
      start: applyOrientation(startPosition),
      end: applyOrientation(destinationPosition) + offset,
      onUpdate: updateScrollPosition,
      onComplete: onComplete,
      duration: duration,
      easing: easing
    });
  }

  return smoothScroll;

}));
