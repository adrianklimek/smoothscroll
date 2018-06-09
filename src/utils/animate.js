/* eslint-disable */
const easings = {
  linear: t => t,
  easeIn: t => t * t * t,
  easeOut: t => (--t) * t * t + 1,
  easeInOut: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
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
const animate = ({
  startValue,
  endValue,
  duration,
  easing,
  callback,
}) => {
  if (typeof callback !== 'function') return false

  const easingFunc = typeof easing !== 'function'
    ? easings[easing] || easings.easeInOut
    : easing

  const animationFrame = (initialTime) => {
    const elapsedTime = Date.now() - initialTime
    const isFinal = elapsedTime > duration
    const animationProgress = isFinal ? 1 : elapsedTime / duration
    const currentValue = isFinal
      ? endValue
      : startValue + ((endValue - startValue) * easingFunc(animationProgress))

    // A final `animationProgress` is 1 so it can be used to trigger complete callback
    callback(currentValue, animationProgress)
    if (elapsedTime <= duration) requestAnimationFrame(animationFrame.bind(null, initialTime))
  }
  animationFrame(Date.now())

  return true
}

export default animate
