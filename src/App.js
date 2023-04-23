import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import TrifoldPage from './pages/trifoldPage.tsx';
import LoginPage from './pages/loginPage.tsx';
import FeedPage from './pages/feedPage.tsx';
import GroupsPage from './pages/groupsPage.tsx';
import GroupPage from './pages/groupPage.tsx';
import SearchPage from './pages/searchPage.tsx';
import BookmarksPage from './pages/bookmarksPage.tsx';
import ProfilePage from './pages/profilePage.tsx';
import RecipePage from './pages/recipePage.tsx';
import NewPostPage from './pages/newPostPage.tsx';
import CurrentUserContext from './components/current-user-context.tsx';
import { configureStore }
  from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import authReducer from './reducers/auth-reducer';
import postsReducer from './reducers/posts-reducer';
import recipeReducer from './reducers/recipe-reducer';
import bookmarksReducer from './reducers/bookmarks-reducer';
import upvotesReducer from './reducers/upvotes-reducer';

const store = configureStore(
  {reducer: {auth: authReducer, posts: postsReducer, recipes: recipeReducer, bookmarks: bookmarksReducer, upvotes: upvotesReducer}});

function App() {
  return (
    <Provider store={store}>
      <CurrentUserContext>
        <BrowserRouter>
          <Routes>
            <Route index path="login"
                element={<LoginPage/>}/>
            <Route path="/"
              element={<TrifoldPage/>}>
            <Route path="feed"
              element={<FeedPage/>}/>
            <Route path="groups"
              element={<GroupsPage/>}/>
            <Route path="group/:id"
              element={<GroupPage/>}/>
            <Route path="recipe/:id"
              element={<RecipePage/>}/>
            <Route path="search"
              element={<SearchPage/>}/>
            <Route path="search/:searchTerm"
              element={<SearchPage/>}/>
            <Route path="bookmarks"
              element={<BookmarksPage/>}/>
            <Route path="profile"
              element={<ProfilePage/>}/>
            <Route path="profile/:id"
              element={<ProfilePage/>}/>
            <Route path="profile/:id"
              element={<ProfilePage/>}/>
            <Route path="newPost/:recipe_id"
              element={<NewPostPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </CurrentUserContext>
    </Provider>
  );
}

export default App;
