import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { ColorMixin, regexpHex, regexpHsl, regexpRgb, regexpAuto } from '@fooloomanzoo/property-mixins/color-mixin.js';
import { FormElementMixin, resetButtonTemplate } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { ColorBadgePattern } from './color-badge.js';
import '@fooloomanzoo/text-input/text-input.js';

/**
 * Mixin for extending an element to be working with FormElementMixin
 *
 * @mixinFunction
 * @polymer
 */
export const ColorFormMixin = dedupingMixin( superClass => {

  return class extends superClass {

    static get properties() {
      return {
        propertyForValue: {
          type: String,
          value: 'colorString'
        }
      }
    }

    static get observers() {
      return [
        '_computeIsSetFunction(propertyForValue, format)'
      ]
    }

    _computeIsSetFunction(propertyForValue, format) {
      let isSet = this._defaultIsSet;
      this.__updateByColorString = false;
      switch (propertyForValue) {
        case 'colorString':
          let regexp;
          switch (format) {
            case 'hsl':
              regexp = regexpHsl;
              break;
            case 'rgb':
              regexp = regexpRgb;
              break;
            case 'hex':
              regexp = regexpHex;
              break;
            default:
              regexp = regexpAuto;
          }
          isSet = function(value) {
            return this.__updateByColorString || (typeof value === 'string' && value !== '' && !(regexp.exec(value) === null));
          }
          break;
        case 'r': // falls through
        case 'g': // falls through
        case 'b': // falls through
        case 'h': // falls through
        case 's': // falls through
        case 'l': // falls through
        case 'alpha':
          isSet = function(value, required) {
            return this._defaultIsSet(value) && !isNaN(value);
          }
      }
      this._isSet = isSet.bind(this);
    }

    /**
     * reset the color properties
     */
    reset(e) {
      e && e.stopPropagation && e.stopPropagation();
      this.resetColor();
      if (this._isSet(this.default)) {
        this.value = this.default;
      }
    }
  }
});

/**
 * Mixin for color-text-input
 *
 * @mixinFunction
 * @polymer
 */
export const ColorTextInputPattern = dedupingMixin( superClass => {

  return class extends superClass {

    static get styleTemplate() {
      return html`
        ${super.styleTemplate || html``}
        <style>
          #input {
            align-items: center;
          }
          #input .badge {
            border-radius: var(--input-border-radius, var(--color-badge-radius, 0.2em));
            height: var(--color-badge-height, 100%);
            width: var(--color-badge-width, 1.5em);
            box-shadow: var(--color-badge-shadow, none);
            background-color: rgba(255,255,255,0.75);
          }
          text-input {
            margin-left: 0.25em;
          }
        </style>
      `;
    }

    static get inputTemplate() {
      return html`
        ${this.colorBadgeTemplate}
        ${this.textInputTemplate}
        ${resetButtonTemplate}
      `
    }

    static get textInputTemplate() {
      return html`
        <text-input required="[[required]]" value="{{colorString}}" auto-resize title="[[title]]" pattern="[[_computeFormatPattern(format, fixedFormat, alphaMode)]]" placeholder="[[_computeFormatPlaceholder(format, alphaMode, _hexAlphaSupported)]]"></text-input>
      `
    }

    _computeFormatPattern(format, fixedFormat, alphaMode) {
      switch (format) {
        case 'hsl':
          if (fixedFormat) {
            return regexpHsl;
          } // falls through
        case 'rgb':
          if (fixedFormat) {
            return regexpRgb;
          } // falls through
        case 'hex':
          if (fixedFormat && (!alphaMode || this._hexAlphaSupported)) {
            return regexpHex;
          } // falls through
        default:
          return regexpAuto;
      }
    }

    _computeFormatPlaceholder(format, alphaMode, hexAlphaSupported) {
      switch (format) {
        case 'hsl':
          return `hsl${alphaMode ? 'a' : ''}(0, 0%, 0%${alphaMode ? ', 1' : ''})`;
        case 'rgb':
          return `rgb${alphaMode ? 'a' : ''}(0, 0, 0${alphaMode ? ', 1' : ''})`;
        default:
          if (!hexAlphaSupported) {
            return `rgb${alphaMode ? 'a' : ''}(0, 0, 0${alphaMode ? ', 1' : ''})`;
          }
          return `#000000`;
      }
    }
  }
});

/**
* `<color-text-input>` adds a color input to your page using Polymer.
* Click on the badge to generate a random color.
*
*   ```html
*     <color-text-input value="{{color}}"></color-text-input>
*   ```
*
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
* @appliesMixin ColorTextInputPattern
* @appliesMixin ColorBadgePattern
* @appliesMixin ColorFormMixin
* @appliesMixin ColorMixin
* @appliesMixin FormElementMixin
*
* @demo demo/input.html
* @demo demo/form.html in a form
**/
export class ColorTextInput extends ColorTextInputPattern(ColorBadgePattern(ColorFormMixin(ColorMixin(FormElementMixin(PolymerElement))))) {

  static get is() {
    return 'color-text-input';
  }

  static get template() {
    return html`
      ${this.styleTemplate}
      <div id="input">
        ${this.inputTemplate}
      </div>
    `;
  }
}
customElements.define(ColorTextInput.is, ColorTextInput);
