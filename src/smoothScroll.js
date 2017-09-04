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
 * @param   {number}   start    The animation start value
 * @param   {number}   end      The animation end value
 * @param   {number}   elapsed  The animation elapsed time
 * @param   {number}   duration The animation duration
 * @param   {function} easing   The easing function
 * @return  {number}            The animation current value
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
 * @param {object, number} destination The number or the element that is the destination of scrolling animation
 * @param {object}         opts        The array that extends default configuration 
 * @param {function}       callback    The function that is called when animation is done
 */
export function smoothScroll(destination, opts, callback) {
    const options = {...defaults, ...opts} // Extend options with defaults 
    
    let start = 0 // Actual scroll position that is used as the begin of a animation

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
    
    destination += options.offset // Add offset to the destination

    /**
     * Handle scroll animation
     * 
     * @param  {object} args The array with animate parameters
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

    const time = Date.now() // Set initial time
    
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
    animationFrame() // Initialize animation
}
