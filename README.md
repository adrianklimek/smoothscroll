# Smooth Scroll
A lightweight JavaScript package for smooth scroll animation

## Installation

### Install with npm:
```
npm install smoothscrolljs
```

### Install with yarn:
```
yarn add smoothscrolljs
```

## Usage
```
import smoothScroll from 'smoothscrolljs'

const el = document.querySelector('.scroll-to')

smoothScroll(el)
smoothScroll('.scroll-to')
smoothScroll('.scroll-to', { duration: 1000, offset: -50 })
```

### Parameters
| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| destination | DOM element, selector or a position | HTMLElement, String, Number | - |
| opts | - | Object | - |
| opts.duration | - | Number | 600 |
| opts.easing | function or name of one of predefined easing functions ('linear', 'easeIn', 'easeOut', 'easeInOut') | Function, String | 'easeInOut' |
| opts.context | an element to apply scroll to | HTMLElement | window |
| opts.orientation | scroll orientation ('horizontal', 'vertical') | String | 'vertical' |
| opts.offset | scroll offset in px | Number | 0 |
| opts.onUpdate | a function that is called on every change | Function | - |
| opts.onComplete | a function that is called on animation end | Function | - |


## License
smoothscrolljs is licensed under [MIT license](https://opensource.org/licenses/MIT).
