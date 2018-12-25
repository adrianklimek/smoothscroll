import animate from './utils/animate'
import getOffset from './utils/get-offset'

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
function smoothScroll(destination, opts = {}) {
  const {
    duration = 600,
    easing = 'easeInOut',
    context = window,
    orientation = 'vertical',
    offset = 0,
    onUpdate = () => {},
    onComplete = () => {},
  } = opts

  const startPosition = getScrollPosition(context)

  // Keep the same data structure for object and number value of `destination`
  const destinationPosition = typeof destination === 'object'
    ? getOffset(destination, context)
    : { top: destination, left: destination }

  const isHorizontal = orientation === 'horizontal'
  const applyOrientation = ({ top, left }) => isHorizontal ? left : top

  const updateScrollPosition = (value, progress) => {
    setScrollPosition(context, {
      top: isHorizontal ? startPosition.top : value,
      left: isHorizontal ? value : startPosition.left,
    })
    console.log(onUpdate)
    onUpdate(value, progress)
  }

  animate({
    start: applyOrientation(startPosition),
    end: applyOrientation(destinationPosition) + offset,
    onUpdate: updateScrollPosition,
    onComplete,
    duration,
    easing,
  })
}

export default smoothScroll
