import { throwIf } from '../internal';

function createElm(cls: string, id: string, text: string) {
  const link = document.createElement('li');
  link.className = `${cls}-added`;

  const anchor = document.createElement('a');
  anchor.href = `#${id}`;
  anchor.textContent = text;

  link.appendChild(anchor);
  return link;
}

export function enhanceNavigation(elm: HTMLElement) {
  throwIf(!(elm instanceof HTMLElement), 'enhanceNavigation: Expected an HTMLElement.');

  const targetClass = elm.dataset.navigation;
  if (!targetClass) return;

  function addLink() {
    removeLink();

    const container = elm.querySelector('ul');
    if (!container) return;

    const target = document.querySelectorAll(`.${targetClass}`);
    target.forEach((t, i) => {
      const id = t.id || `${targetClass}-${i}`;
      t.id = id;

      const newLink = createElm(targetClass!, id, t.textContent);
      container.appendChild(newLink);
    });
  }

  function removeLink() {
    const target = elm.querySelectorAll(`li.${targetClass}-added`);
    target.forEach((t) => t.remove());
  }

  addLink();

  return {
    addLink,
    removeLink,
  };
}

export function initNavigation(root: ParentNode = document) {
  const navigationElms = root.querySelectorAll<HTMLElement>('nav[data-navigation]');

  navigationElms.forEach((elm) => {
    enhanceNavigation(elm);
  });
}
