
// LikertGrid: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './likert-grid.core.js';
import {
  LikertGrid,
  LikertGridItem
} from './likert-grid.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    LikertGrid,
    LikertGridItem
  ], opts);
}
