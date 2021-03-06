import { html } from '@polymer/polymer/lib/utils/html-tag.js';

export const style = html`
  <style>
    :host {
      --computed-transparency-pattern-position: calc(var(--transparency-pattern-size, 0.75em) / 2);
    }
    :host(:not([hide-transparency-pattern])) .transparency:before {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      background-image: var(--transparency-pattern, linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)));
      background-size: var(--transparency-pattern-size, 0.75em) var(--transparency-pattern-size, 0.75em);
      background-position: 0 0, var(--computed-transparency-pattern-position) var(--computed-transparency-pattern-position);
      background-repeat: repeat;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      background-repeat: repeat;
      pointer-events: none;
    }
    .transparency {
      position: relative;
      box-sizing: border-box;
    }
    .transparency > canvas {
      position: absolute;
      left: 0;
      top: 0;
    }
  </style>`;
