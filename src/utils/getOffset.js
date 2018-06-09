/**
 * Gets offset of an element
 *
 * @param {HTMLelement} element
 * @returns {Object} top and left offset
 */
const getOffset = (element) => {
  const offset = ({ top, left }, { offsetTop = 0, offsetLeft = 0, offsetParent }) => {
    const output = { top: top + offsetTop, left: left + offsetLeft }
    return offsetParent ? offset({ ...output }, offsetParent) : output
  }

  return offset({ top: 0, left: 0 }, element)
}

export default getOffset
