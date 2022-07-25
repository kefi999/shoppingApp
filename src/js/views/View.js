import icons from 'url:../../img/icons.svg';

export class View {
  _data;
  _clean() {
    this._parentElement.innerHTML = '';
  }
  render(data, render = true) {
    // if (!data || (Array.isArray(data) && data.length === 0)) throw err;
    //place the recipe into the local #data
    this._data = data;

    //generate a html markup with the local variables
    const markup = this._renderMarkup();

    //we did because want to get an array of strings
    if (!render) return markup;
    //clean the previous code (if any)
    this._clean();
    //input our newly generetared cody into the index.html
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;

    //generate a html markup with the local variables
    const newMarkup = this._renderMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //text update like numbers and such
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //button/attribute update
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _showSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage() {
    markup = ``;
  }
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clean();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
