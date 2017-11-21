/**
 * Get offset of an element
 *
 * @param   {HTMLelement} element The element that offset will be returned
 * @param   {HTMLelement} context One of the parents of the element (if it isn't declared returns absolute offset)
 * @returns {Array}               The array with top and left offset
 */
export default function getOffset(element, context) {
    let top = 0,
        left = 0

    do {
        top += element.offsetTop  || 0
        left += element.offsetLeft || 0
        element = element.offsetParent
    } while(element && element !== context)

    return {
        top,
        left
    }
}
