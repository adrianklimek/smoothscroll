/**
 * Gets offset of an element
 *
 * @param {HTMLElement, string} target
 * @param {Object} context
 * @returns {Object} top and left offset
 */
function getOffset(target, context = window) {
  const isWindow = context === window
  const targetEl = typeof target === 'string' ? document.querySelector(target) : target
  const scrollPosition = {
    left: isWindow ? context.pageXOffset : context.scrollLeft,
    top: isWindow ? context.pageYOffset : context.scrollTop,
  }
  const targetRect = targetEl.getBoundingClientRect()
  const contextRect = !isWindow ? context.getBoundingClientRect() : { left: 0, top: 0 }

  return {
    left: Math.abs(contextRect.left - targetRect.left - scrollPosition.left),
    top: Math.abs(contextRect.top - targetRect.top - scrollPosition.top),
  }
}

export default getOffset
