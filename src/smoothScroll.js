import getOffset from './utils/getOffset'
import {easings} from './utils/easings'


// Default options
const defaults = {
    duration: 600,           // Number
    easing: 'easeInOut',     // String or function
    context: window,         // Object
    orientation: 'vertical', // String
    offset: 0                // Number
}

/**
 * Get current value of an animation
 *
 * @param   {Number}   start    The animation start value
 * @param   {Number}   end      The animation end value
 * @param   {Number}   elapsed  The animation elapsed time
 * @param   {Number}   duration The animation duration
 * @param   {Function} easing   The easing function
 * @return  {Number}            The animation current value
 */
function animate(start, end, elapsed, duration, easing) {
    if (elapsed > duration) {
        return end
    }
    return start + (end - start) * easing(elapsed / duration)
}

/**
 * Animate scrolling
 *
 * @param {Object, Number} destination The number or the element that is the destination of scrolling animation
 * @param {Object}         opts        The array that extends default configuration
 * @param {Function}       callback    The function that is called when animation is done
 */
export default function smoothScroll(destination, opts, callback) {
    const options = { ...defaults, ...opts }

    let start = 0

    // Get offset of the element if the destination is an object
    if (typeof destination === 'object') {
        destination = getOffset(destination, options.context)
    }

    // Get correct animation start position
    if (options.orientation === 'horizontal') {
        destination = destination.left || destination
        start = options.context.pageXOffset || options.context.scrollLeft || 0
    } else {
        destination = destination.top || destination
        start = options.context.pageYOffset || options.context.scrollTop || 0
    }

    // If easing argument is a string get it from easing array
    if (typeof options.easing === 'string') {
        options.easing = easings[options.easing] || easings[defaults.easing] // If there is no easing with given name get default one
    }

    destination += options.offset

    /**
     * Handle scroll animation
     *
     * @param  {Array} args The array with animate parameters
     */
    const animateScroll = (args) => {
        if (options.context != window) {
            if (options.orientation == 'horizontal') {
                options.context.scrollLeft = animate(...args)
            } else {
                options.context.scrollTop = animate(...args)
            }
        } else {
            if (options.orientation == 'horizontal') {
                window.scrollTo(animate(...args), window.pageYOffset)
            } else {
                window.scrollTo(window.pageXOffset, animate(...args))
            }
        }
    }

    const time = Date.now()

    /** Function that is executed on every animation step */
    const animationFrame = () => {
        const elapsed = Date.now() - time

        const animationArguments = [start, destination, elapsed, options.duration, options.easing]

        animateScroll(animationArguments)

        if (elapsed > options.duration) {
            if (typeof callback == 'function') {
                callback()
            }
        } else {
            requestAnimationFrame(animationFrame)
        }
    }
    animationFrame()
}
