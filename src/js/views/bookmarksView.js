import { View } from './View';
import previewView from './previewView';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks found, search for another one ! ';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _renderMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
