import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import FeedPage from './pages/feedPage';
import GroupsPage from './pages/groupsPage';
import GroupPage from './pages/groupPage';
import SearchPage from './pages/searchPage';
import BookmarksPage from './pages/bookmarksPage';
import ProfilePage from './pages/profilePage';
import RecipePage from './pages/recipePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/"
          element={<FeedPage/>}/>
        <Route path="/feed"
          element={<FeedPage/>}/>
        <Route path="/groups"
          element={<GroupsPage/>}/>
        <Route path="/group/:id"
          element={<GroupPage/>}/>
        <Route path="/recipe/:id"
          element={<RecipePage/>}/>
        <Route path="/group/:id"
          element={<SearchPage/>}/>
        <Route path="/bookmarks"
          element={<BookmarksPage/>}/>
        <Route path="/profile"
          element={<ProfilePage/>}/>
        <Route path="/profile/:id"
          element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
