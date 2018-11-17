'use strict';

/* Import WebpackApp */
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-styles/shadow.js';
import '../../color-input.js';
import '../../color-text-input.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';
const template = html`
  <custom-style>
    <style is="custom-style" include="demo-pages-shared-styles">
      input {
        margin-bottom: 4px;
        margin-left: 8px;
      }
      color-input {
        margin-bottom: 4px;
        margin-left: 8px;
      }
      iron-form {
        @apply --shadow-elevation-2dp;
        padding: 20px;
      }
      .output {
        color: #333;
        margin-top: 20px;
        padding: 6px;
        word-wrap: break-word;
        font-family: monospace;
        background: rgba(0, 0, 0, 0.05);
        border-color: #555;
        border-width: thin;
        border-style: dashed;
      }
    </style>
  </custom-style>`;
document.body.appendChild(template.content);
