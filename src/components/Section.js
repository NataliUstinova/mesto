export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  setItems({ items }) {
    this._renderedItems = items;
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}