import { View } from './View';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _childElement = document.querySelector('.search__field');

  getQuery() {
    const input = this._childElement.value;
    this._clearInput();
    return input;
  }
  addSearchRender(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
