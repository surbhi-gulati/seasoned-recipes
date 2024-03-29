import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import TrifoldPage from './pages/trifoldPage.tsx';
import LoginPage from './pages/loginPage.tsx';
import RegisterPage from './pages/registerPage.tsx';
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
import groupsReducer from './reducers/groups-reducer';
import postsReducer from './reducers/posts-reducer';
import recipeReducer from './reducers/recipe-reducer';
const store = configureStore(
  {reducer: {
    auth: authReducer, 
    groups: groupsReducer,
    posts: postsReducer, 
    recipes: recipeReducer}});

function App() {
  return (
    <Provider store={store}>
      <CurrentUserContext>
        <BrowserRouter>
          <Routes>
            <Route index path="login"
                element={<LoginPage/>}/>
            <Route path="register"
                element={<RegisterPage/>}/>  
            <Route path="/"
              element={<TrifoldPage/>}>
            <Route path="feed"
              element={<FeedPage/>}/>
            <Route path="groups"
              element={<GroupsPage/>}/>
            <Route path="group/:id"
              element={<GroupPage/>}/>
            <Route path="recipe/:recipe_id"
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
