[![Published on NPM](https://img.shields.io/npm/v/@fooloomanzoo/color-input.svg)](https://www.npmjs.com/package/@fooloomanzoo/color-input)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@fooloomanzoo/color-input)

_[API & Demo](https://fooloomanzoo.github.io/color-input)_

## \<color-input\>

An input for color. It can use the formats `rgb`, `hsl` or `hex`. Additionally you can use `text` for automatically transform a color-string like `red` to its rgb-representation.
If you are looking for a picker for color, please have a look at [color-picker](https://github.com/fooloomanzoo/color-picker).

### Example
```html
  <span>color-input: </span><color-input value="{{color}}" alpha="{{alpha}}" r="{{r}}" g="{{g}}" b="{{b}}" h="{{h}}" s="{{s}}" l="{{l}}" format="{{format}}"></color-input>
  <br>
  <br>
  <span>color-text-input: </span><color-text-input value="{{color}}" alpha="{{alpha}}" format="{{format}}"></color-text-input>
  <p>
    <span>format </span>
    <select id="formats" value="{{format::change}}">
      <option value="auto">auto</option>
      <option value="rgb">rgb</option>
      <option value="hex">hex</option>
      <option value="hsl">hsl</option>
    </select>
    <br>
    <input type="range" min="0" max="1" step="0.01" value="{{alpha::change}}"><span> alpha: [[alpha]] </span>
    <br>
    <input type="range" min="0" max="255" step="1" value="{{r::input}}"><span> red: [[r]] </span>
    <br>
    <input type="range" min="0" max="255" step="1" value="{{g::input}}"><span> green: [[g]] </span>
    <br>
    <input type="range" min="0" max="255" step="1" value="{{b::input}}"><span> blue: [[b]] </span>
    <br>
    <input type="range" min="0" max="359" step="1" value="{{h::input}}"><span> hue: [[h]] </span>
    <br>
    <input type="range" min="0" max="1" step="0.001" value="{{s::input}}"><span> saturation: [[s]] </span>
    <br>
    <input type="range" min="0" max="1" step="0.001" value="{{l::input}}"><span> lightness: [[l]] </span>
    <br>
  </p>
```

### Styling
Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.

### Installation
```
npm i --save @fooloomanzoo/color-input
```

### License
[MIT](https://github.com/fooloomanzoo/color-input/blob/master/LICENSE.txt)
