import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { ColorMixin } from '@fooloomanzoo/property-mixins/color-mixin.js';
import { getBoundingClientRectByRelative } from '@fooloomanzoo/input-picker-pattern/input-pattern.js';
import { style as inputStyle } from '@fooloomanzoo/input-picker-pattern/input-shared-style.js';
import { style as transpenrencyPatternStyle } from './transparency-pattern-style.js';
/**
 * Mixin for color-badge
 *
 * @mixinFunction
 * @polymer
 */
export const ColorBadgePattern = dedupingMixin( superClass => {
  return class extends superClass {

    static get styleTemplate() {
      return html`
        ${super.styleTemplate || html``}
        ${inputStyle}
        ${transpenrencyPatternStyle}
        <style>
          .badge {
            border-radius: var(--color-badge-radius, 6px);
            height: var(--color-badge-height, 32px);
            width: var(--color-badge-width, 60px);
            box-shadow: var(--color-badge-shadow, 0 1px 4px 1px rgba(0,0,0,.1));
            border-width: var(--input-border-width, thin);
            border-style: solid;
            border-color: var(--input-border-color, rgba(0,0,0,0.2));
            overflow: hidden;
          }
        </style>
      `;
    }

    static get colorBadgeTemplate() {
      return html`
        <div id="colorBadge" class="transparency badge">
          <canvas id="badge" width$="[[_badgeWidth]]" height$="[[_badgeHeight]]"></canvas>
          ${this.colorBadgeSlotTemplate || html``}
        </div>
      `
    }

    static get properties() {
      return {
        /**
         * hide the transparency pattern
         */
        hideTransparencyPattern: {
          type: Boolean,
          reflectToAttribute: true
        },

        /**
         * if true, clicking on the color badge won't generate a random color
         */
        noRandomColorOnClick: {
          type: Boolean,
          value: false,
          observer: '_noRandomColorOnClickChanged'
        },

        _badgeWidth: {
          type: Number
        },

        _badgeHeight: {
          type: Number
        },

        _badgeContext: {
          type: CanvasRenderingContext2D
        }
      }
    }

    static get observers() {
      return [
        '_draw(_badgeContext,colorString,_badgeWidth,_badgeHeight)'
      ]
    }

    ready() {
      super.ready();
      this._computeBadgeContext();
    }

    connectedCallback() {
      super.connectedCallback();
      this._computeBadgeSizeProperties();
    }

    /**
     * render the element
     */
    render() {
      this._draw(this._colorBadge, this.colorString, this._badgeWidth, this._badgeHeight);
    }

    /**
     * resize the element
     */
    resize() {
      this._computeBadgeSizeProperties();
    }

    /**
     * generates a random color
     */
    randomColor(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      }
      super.randomColor();
    }

    /**
     * @typedef {Object} CanvasRenderingContext2D context of a canvas element
     */

    /**
     * fills a canvas context with a color
     * @param  {CanvasRenderingContext2D} context The context of the canvas that should be drawn.
     * @param  {String} colorString The color string to be drawn.
     * @param  {Number} width   The width to draw within the canvas.
     * @param  {Number} height  The height to draw within the canvas
     */
    _draw(context, colorString, width, height) {
      if (context === undefined || width === undefined || height === undefined) {
        return;
      }
      context.clearRect(0, 0, width, height);
      context.fillStyle = colorString || 'rgba(0,0,0,0)';
      context.fillRect(0, 0, width, height);
    }

    /**
     * computes the canvas contexts of the badge element
     */
    _computeBadgeContext() {
      const badge = this.shadowRoot.querySelector('#badge');
      if (badge) {
        this._badgeContext = badge.getContext("2d");
        this._badgeContext.beginPath();
      }
    }

    /**
     * computes the size properties for the badge canvas
     */
    _computeBadgeSizeProperties() {
      // use the container of the badge to define its draw area
      requestAnimationFrame(() => {
        const badgeContainer = this.shadowRoot.querySelector('#colorBadge');
        if (badgeContainer) {
          const box = getBoundingClientRectByRelative(badgeContainer, true);
          if (box.width !== this._badgeWidth || box.height !== this._badgeHeight) {
            this.setProperties({
              _badgeWidth: Math.ceil(box.width) || 100,
              _badgeHeight: Math.ceil(box.height) || 100
            });
          }
        }
      });
    }

    _noRandomColorOnClickChanged(noRandomColorOnClick) {
      if (noRandomColorOnClick) {
        this._removeClickListenerForBadge();
      } else {
        this._addClickListenerForBadge();
      }
    }

    _addClickListenerForBadge() {
      if (this.$.badge) {
        this.$.badge.addEventListener('dblclick', this.randomColor);
        this.$.badge.addEventListener('contextmenu', this.randomColor);
      }
    }

    _removeClickListenerForBadge() {
      if (this.$.badge) {
        this.$.badge.removeEventListener('dblclick', this.randomColor);
        this.$.badge.removeEventListener('contextmenu', this.randomColor);
      }
    }

  }
});

/**
* `<color-badge>` is a badge that displays a color as a rectangle with a specified height and width.
* The transparency of the color will be displayed. It can slot elements and they are automatically centered. Because of using a canvas to draw the color, it needs to be explicitly sized via the width- and height-attribute.
* Click on the badge to generate a random color.
*
*   ```html
*     <color-badge height="24" width="96" value="[[color]]">
*       <span>[[color]]</span>
*     </color-badge>
*   ```
*
* Custom property | Description | Default
* ----------------|-------------|----------
* `--transparency-pattern` | background pattern for the transparency layer | linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)))
* `--transparency-pattern-size` | size transparency pattern | 0.75em
* `--color-badge-radius` | border-radius of the badge | 6px
* `--color-badge-shadow` | box-shadow of the badge | 0 1px 4px 1px rgba(0,0,0,.1)
* `--color-badge-height` | height of the badge | 32px
* `--color-badge-width` | width of the badge | 60px
* `--color-badge-text-overflow` | text-overflow of the slotted content of the badge | ellipsis
* `--color-badge-padding` | padding of the slotted content of the badge | 4px
*
* @customElement
* @polymer
*
* @appliesMixin ColorBadgePattern
* @appliesMixin ColorMixin
* @appliesMixin FormElementMixin
*
* @demo demo/badge.html
**/
export class ColorBadge extends ColorBadgePattern(ColorMixin(PolymerElement)) {

  static get is() {
    return 'color-badge';
  }

  static get template() {
    return html`
      ${this.styleTemplate}
      ${this.colorBadgeTemplate}
    `;
  }

  static get styleTemplate() {
    return html`
      ${super.styleTemplate || html``}
      <style>
        .badge > .slot {
          position: absolute;
          box-sizing: border-box;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          max-width: 100%;
          overflow: hidden;
          pointer-events: none;
          text-overflow: var(--color-badge-text-overflow, ellipsis);
          padding: var(--color-badge-padding, 4px);
        }
      </style>
    `;
  }

  static get colorBadgeSlotTemplate() {
    return html`
      <span class="slot"><slot></slot></span>
    `
  }
}

if (!customElements.get(ColorBadge.is)) {
  customElements.define(ColorBadge.is, ColorBadge);
}
