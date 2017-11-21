# smoothScroll.js
Animate scrolling

## Installation

### Install with bower:
```
bower install smoothscrolljs --save
```

### Install with npm:
```
npm install smoothscrolljs --save
```

### Install with yarn:
```
yarn add smoothscrolljs
```

## Usage
```
import smoothScroll from 'smoothscrolljs'

const destinationElement = document.querysSelector('.element')
// smoothScroll(destination, opts, callback)
smoothScroll(destinationElement)
```

### Paramaters
| Name | Description | Type |
| ---- | ----------- | ---- |
| destination | The number or the element that is the destination of scrolling animation | object, number |
| opts | The array that extends default configuration | object |
| callback | The function that is called when animation is done | function | 

### Options
| Name     | Description       | Type   | Default   |
| -------- | ----------------- | ------ | --------- |
| duration | Time in ms that animation is executed for | number | 600 |
| easing   | The easing function, built-in functions: linear, easeIn, easeOut, easeInOut | function, string | easeInOut |
| context  | Element that is used for scrolling | object | window |
| orientation | Scroll orientation can be horizontal or vertical | string | vertical |
| offset | Offset of scrolling | number | 0 |

## License
smoothScroll.js is licensed under [MIT license](https://opensource.org/licenses/MIT).
