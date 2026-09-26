import { initCore } from './core';
import { initLayouts } from './layouts';
import { initComponents } from './components';
import { initFeatures } from './features';

export function initNoctia(root: Document | HTMLElement = document) {
  if (!(root instanceof Document || root instanceof HTMLElement)) {
    throw new TypeError('initNoctia: Expected a Document or HTMLElement.');
  }

  initCore();
  initLayouts(root);
  initComponents(root);
  initFeatures();
}

export { initCore, setTheme, getTheme, initTheme } from './core';

export * from './layouts';
export * from './components';

export {
  initFeatures,
  copyText,
  initDataCopy,
  showOverlay,
  hideOverlay,
  showToast,
} from './features';

export {
  abortManager,
  nextFrame,
  nextTwoFrame,
  createId,
  getTransitionTime,
  waitTransition,
} from './utils';
