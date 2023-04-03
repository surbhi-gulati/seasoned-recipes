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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<TrifoldPage/>}>
          <Route path="feed"
            element={<FeedPage/>}/>
          <Route index path="login"
            element={<LoginPage/>}/>
          <Route path="groups"
            element={<GroupsPage/>}/>
          <Route path="group/:id"
            element={<GroupPage/>}/>
          <Route path="recipe/:id"
            element={<RecipePage/>}/>
          <Route path="search"
            element={<SearchPage/>}/>
          <Route path="bookmarks"
            element={<BookmarksPage/>}/>
          <Route path="profile"
            element={<ProfilePage/>}/>
          <Route path="profile/:id"
            element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
