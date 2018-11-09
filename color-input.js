import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '../../@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { ColorMixin } from '@fooloomanzoo/property-mixins/color-mixin.js';
import { FormElementMixin } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { ColorTextInputPattern, ColorFormMixin } from './color-text-input.js';
import { ColorBadgePattern } from './color-badge.js';
import '@fooloomanzoo/input-picker-pattern/input-shared-style.js';
import '@fooloomanzoo/input-picker-pattern/input-pattern.js';
import '@fooloomanzoo/number-input/number-input.js';
import '@fooloomanzoo/number-input/integer-input.js';
import '@fooloomanzoo/text-input/text-input.js';
/**
 * Mixin for color-input
 *
 * @mixinFunction
 * @polymer
 */
export const ColorInputPattern = dedupingMixin( superClass => {
  return class extends superClass {

    static get styleTemplate() {
      return htmlLiteral`
        ${super.styleTemplate || htmlLiteral``}
        label {
          margin-left: 0.4em;
        }
        number-input,
        integer-input {
          margin-left: 0.2em;
        }
      `;
    }

    static get inputTemplate() {
      return html`
        ${this.colorBadgeTemplate}
        <template is="dom-if" if="[[_equalsNot(format, 'rgb', 'hsl')]]" restamp>
          ${this.textInputTemplate}
        </template>
        <template is="dom-if" if="[[_equals(format, 'rgb')]]" restamp>
          <label>r:</label>
          <integer-input required="[[required]]" title="red" auto-resize placeholder="0" value-as-number="{{r}}" min="0" max="255"></integer-input>
          <label>g:</label>
          <integer-input required="[[required]]" title="green" auto-resize placeholder="0" value-as-number="{{g}}" min="0" max="255"></integer-input>
          <label>b:</label>
          <integer-input required="[[required]]" title="blue" auto-resize placeholder="0" value-as-number="{{b}}" min="0" max="255"></integer-input>
        </template>
        <template is="dom-if" if="[[_equals(format, 'hsl')]]" restamp>
          <label>h:</label>
          <number-input required="[[required]]" title="hue" auto-resize placeholder="0" min="0" max="359" step="[[_hslStep]]" value-as-number="{{h}}"></number-input>
          <label>s:</label>
          <number-input required="[[required]]" title="saturation" auto-resize placeholder="100\u202F%" number-style="percent" saturate min="0" max="1" step="[[_hslPercentStep]]" start-at="1" value-as-number="{{s}}"></number-input>
          <label>l:</label>
          <number-input required="[[required]]" title="lightness" auto-resize placeholder="100\u202F%" number-style="percent" saturate min="0" max="1" step="[[_hslPercentStep]]" start-at="0.5" value-as-number="{{l}}"></number-input>
        </template>
        <template is="dom-if" if="[[_equalsNot(format, 'hex', 'auto')]]" restamp>
          <label hidden$="[[withoutAlpha]]">a:</label>
          <number-input hidden$="[[withoutAlpha]]" required="[[required]]" title="alpha" value-as-number="{{alpha}}" min="0" max="1" saturate no-clamp auto-resize placeholder="1" start-at="1" step="0.01"></number-input>
        </template>
        ${this.resetButtonTemplate}
      `
    }

    static get properties() {
      return {
        _hslStep: {
          type: Number,
          computed: '_computeHslStep(hslPrecision)'
        },

        _hslPercentStep: {
          type: Number,
          computed: '_computeHslPercentStep(hslPrecision)'
        }
      }
    }

    _equals(a, b) {
      return a === b;
    }

    _equalsNot(a, b, c) {
      return a !== b && a !== c;
    }

    _computeHexPatternString(_validateHex) {
      return _validateHex.toString().slice(1,-1);
    }

    _computeHslStep(hslPrecision) {
      return Math.pow(10, -hslPrecision);
    }

    _computeHslPercentStep(hslPrecision) {
      return Math.pow(10, -(hslPrecision + 2));
    }
  }
});

/**
* `<color-input>` adds a color input to your page using Polymer. Depending on the `format` several inputs will be shown for the according color-properties.
* Click on the badge to generate a random color.
*
*   ```html
*     <color-input value="{{color}}"></color-input>
*   ```
*
* The following custom properties and mixins are also available for styling:
*
* Custom property | Description | Default
* ----------------|-------------|----------
* `--transparency-pattern` | background pattern for the transparency layer | linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)))
* `--transparency-pattern-size` | size transparency pattern | 0.75em
* `--color-badge-radius` | border-radius of the badge | 0.15em
* `--color-badge-shadow` | box-shadow of the badge | none
* `--color-badge-height` | height of the badge | 100%
* `--color-badge-width` | width of the badge | 1.5em
*
* Have a look at [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
*
* @customElement
* @polymer
*
* @appliesMixin ColorInputPattern
* @appliesMixin ColorTextInputPattern
* @appliesMixin ColorBadgePattern
* @appliesMixin ColorFormMixin
* @appliesMixin ColorMixin
* @appliesMixin FormElementMixin
*
* @demo demo/input.html
* @demo demo/form.html in a form
**/
export class ColorInput extends ColorInputPattern(ColorTextInputPattern(ColorBadgePattern(ColorFormMixin(ColorMixin(FormElementMixin(PolymerElement)))))) {

  static get is() {
    return 'color-input';
  }

  static get template() {
    return html`
      <style include="${this.styleToInclude}">
        ${this.styleTemplate}
      </style>
      <div id="input">
        ${this.inputTemplate}
      </div>
    `;
  }
}
customElements.define(ColorInput.is, ColorInput);
