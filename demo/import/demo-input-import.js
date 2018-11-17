'use strict';

/* Import WebpackApp */
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '../../color-input.js';
import '../../color-text-input.js';
import '../../color-badge.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';
const template = html`
  <custom-style>
    <style is="custom-style" include="demo-pages-shared-styles">
      result {
        padding: 0.5em;
      }
      input {
        vertical-align: middle;
      }
    </style>
  </custom-style>`;
document.body.appendChild(template.content);
