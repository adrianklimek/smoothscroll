import animate from './utils/animate'
import getOffset from './utils/getOffset'

const getScrollPosition = el => ({
  top: el.pageYOffset || el.scrollTop || 0,
  left: el.pageXOffset || el.scrollLeft || 0,
})

const setScrollPosition = (el, { top, left }) => {
  if (el === window) {
    el.scrollTo(left, top)
  } else {
    /* eslint-disable */
    el.scrollTop = top
    el.scrollLeft = left
    /* eslint-enable */
  }
}

/**
 * Animates scroll
 *
 * @param {HTMLElement, Number} destination position or a DOM element
 * @param {Object} opts
 * @param {Number} opts.duration
 * @param {Function, String} opts.easing function or name of one of predefined easing functions
 * @param {HTMLElement} opts.context element to apply scroll to
 * @param {String} opts.orientation scroll orientation ('horizontal' or 'vertical')
 * @param {Number} opts.offset scroll offset in px
 * @param {Function} callback function that is called on animation end
 */

const smoothScroll = (destination, opts = {}, callback) => {
  const {
    duration = 600,
    easing = 'easeInOut',
    context = window,
    orientation = 'vertical',
    offset = 0,
  } = opts

  const startPosition = getScrollPosition(context)

  // Keep same data structure for object and number value of `destination`
  const destinationPosition = typeof destination === 'object'
    ? getOffset(destination)
    : { top: destination, left: destination }

  const applyOrientation = ({ top, left }) =>
    orientation === 'horizontal' ? left : top

  const updateScrollPosition = (value) => {
    setScrollPosition(context, {
      top: orientation === 'horizontal' ? startPosition.top : value,
      left: orientation === 'horizontal' ? value : startPosition.left,
    })
  }

  const animateScroll = (currentValue, progress) => {
    updateScrollPosition(currentValue)
    if (progress === 1 && typeof callback === 'function') callback(destination)
  }

  animate({
    startValue: applyOrientation(startPosition),
    endValue: applyOrientation(destinationPosition),
    duration,
    easing,
    callback: animateScroll,
  })
}

export default smoothScroll
