[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/color-input)
[![API](https://img.shields.io/badge/API-available-green.svg)](https://www.webcomponents.org/element/fooloomanzoo/color-input/elements/color-input)
[![Demo](https://img.shields.io/badge/demo-available-red.svg)](https://www.webcomponents.org/element/fooloomanzoo/color-input/demo/demo/index.html)

_[API](https://fooloomanzoo.github.io/color-input/components/color-input/#/elements/color-input)_ and
_[Demo](https://fooloomanzoo.github.io/color-input/components/color-input/#/elements/color-input/demos/demo/index.html)_

## \<color-input\>

An input for color. It can use the formats `rgb`, `hsl` or `hex`. Additionally you can use `text` for automatically transform a color-string like `red` to its rgb-representation.

<!--If you are looking for a picker for color, please have a look at [color-picker](https://github.com/fooloomanzoo/color-picker).-->

### Example

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="color-text-input.html">
    <link rel="import" href="color-input.html">

    <dom-bind>
      <template is="dom-bind">
        <custom-style>
          <style is="custom-style">
            html {
              font-family: 'Roboto', 'Noto', 'Source Sans Pro', sans-serif;
            }
          </style>
        </custom-style>

        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->
```html
<color-input format="hsl"></color-input><br><br>
<color-input format="rgb"></color-input><br><br>
<color-text-input format="rgb" color-string="teal"></color-text-input><br><br>
<color-text-input format="text" color-string="teal"></color-text-input>
```

### Styling
Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.

### Installation
```
bower install --save fooloomanzoo/color-input
```

### License
[MIT](https://github.com/fooloomanzoo/color-input/blob/master/LICENSE.txt)
