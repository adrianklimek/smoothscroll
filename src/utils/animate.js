/* eslint-disable */
const easings = {
  linear: t => t,
  easeIn: t => t * t * t,
  easeOut: t => (--t) * t * t + 1,
  easeInOut: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
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
function animate({ start, end, duration, easing, onUpdate, onComplete }) {
  if (typeof onUpdate !== 'function') return false

  const easingFunc = typeof easing !== 'function'
    ? easings[easing] || easings.easeInOut
    : easing

  let initialTime = null

  const animationFrame = timestamp => {
    initialTime = initialTime || timestamp
    const elapsedTime = timestamp - initialTime
    const animationProgress = Math.min(elapsedTime / duration, 1)
    const currentValue = start + (end - start) * easingFunc(animationProgress)

    onUpdate(currentValue, animationProgress)

    if (elapsedTime <= duration) window.requestAnimationFrame(animationFrame)
    else if (typeof onComplete === 'function') onComplete(currentValue, animationProgress)
  }
  window.requestAnimationFrame(animationFrame)

  return true
}

export default animate
