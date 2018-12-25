/**
 * Gets offset of an element
 *
 * @param {HTMLElement} target
 * @param {Object} context
 * @returns {Object} top and left offset
 */
function getOffset(target, context = window) {
  const scrollPosition = {
    left: context.pageXOffset || context.scrollLeft,
    top: context.pageYOffset || context.scrollTop,
  }
  const targetRect = target.getBoundingClientRect()
  const contextRect = typeof context.getBoundingClientRect === 'function'
    ? context.getBoundingClientRect()
    : { left: 0, top: 0 }

  return {
    left: Math.abs(contextRect.left - targetRect.left - scrollPosition.left),
    top: Math.abs(contextRect.top - targetRect.top - scrollPosition.top),
  }
}

export default getOffset
