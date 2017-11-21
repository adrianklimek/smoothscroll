export const easings = {
    linear: (t) => t,
    easeIn: (t) => t * t * t,
    easeOut: (t) => (--t) * t * t + 1,
    easeInOut: (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * ( 2 * t - 2) + 1,
}
