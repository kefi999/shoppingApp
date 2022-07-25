import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import pagination from './views/pagination';
import addRecipeView from './views/addRecipeView';
if (module.hot) {
  module.hot.accept;
}
const controlRecipe = async function () {
  try {
    //loading the recipe id from the url bar
    const id = window.location.hash.slice(1);
    //guard clause against invalid ids
    if (!id) return;
    //loading the spinner
    recipeView._showSpinner();
    //updating results view
    resultsView.update(model.getSearchResults());
    //rendering bookmarks
    bookmarksView.update(model.state.bookmarks);
    //load the recipe here with async
    await model.loadRecipe(id);
    //destructure the variable here for easier use.
    recipeView.render(model.state.recipe);

    //rendering
  } catch (err) {
    recipeView.renderError(
      `We could not find tha recipe please try another one ! `
    );
  }
};

const controlSearchResults = async function () {
  try {
    resultsView._showSpinner();
    query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResults());

    pagination.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResults(goToPage));

  pagination.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    recipeView._showSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addSearchRender(controlSearchResults);
  pagination.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// window.addEventListener('hashchange', showRecipe);
//calling the function as soon there is a hashchange in the url bar
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// "start": parcel index.html,
// "build": parcel build index.html
