import {Link} from "react-router-dom";

function Nav() {
 return (
   <div>
     <Link to="/">Feed</Link> |
     <Link to="/feed">Feed</Link> |
     <Link to="/groups">Groups</Link> |
     <Link to="/search">Search Recipes</Link> |
     <Link to="/bookmarks">Bookmarks</Link> |
     <Link to="/profile">Profile</Link>
   </div>
 );
}

export default Nav;