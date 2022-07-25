import { View } from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _renderMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    //page 1 and there are other pages
    if (this._data.page === 1 && this._data.results.length > 1) {
      return `
       <button data-goto=${
         curPage + 1
       } class="btn--inline pagination__btn--next">
            <span>${this._data.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
         
         `;
    }
    //middle page
    if (this._data.page > 1 && this._data.page < numPages) {
      return `
        <button data-goto=${
          curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${this._data.page - 1}</span>
         </button>
         <button data-goto=${
           curPage + 1
         } class="btn--inline pagination__btn--next">
            <span>${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    
        `;
    }
    //last page
    if (this._data.page === numPages) {
      return `
        <button data-goto=${
          curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${this._data.page - 1}</span>
        </button>
        `;
    }

    //page 1 and there are no other pages
    if (this._data.page === 1 && this._data.results.length === 0) {
      return `
        
          `;
    }
  }
}
export default new PaginationView();
