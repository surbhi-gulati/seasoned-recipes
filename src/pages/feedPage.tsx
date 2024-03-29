import React, {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import PostList from "../components/posts/post-list";
import { getAllPostsThunk, getFollowedPostsThunk } from "../services/post-thunks";
import { Nav, NavItem, NavLink } from "reactstrap";

const FeedPage = () => {
  const dispatch = useDispatch<any>();
  const {posts} = useSelector((state: any) => state.posts);
  const {currentUser} = useSelector((state: any) => state.auth);
  console.log("posts", posts);
  const [activeTab, setActiveTab] = React.useState('allPosts');
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      if(activeTab === 'allPosts') {
        dispatch(getAllPostsThunk());
      } 
      if(activeTab === 'followedPosts') {
        dispatch(getFollowedPostsThunk());
      }
    }
    fetchPosts();
  }, [activeTab, dispatch]);
    return (
      <div>
        {/* align the nav center */}
        <Nav className="row justify-content-center pb-2" pills>
          {currentUser ?
              <NavItem className="col-6">
                <NavLink className="text-center" active={activeTab === 'allPosts'} onClick={() => toggleTab('allPosts')}>
                  All Posts
                </NavLink>
              </NavItem> :
              <NavItem className="col-12">
                <NavLink className="text-center" active={activeTab === 'allPosts'} onClick={() => toggleTab('allPosts')}>
                  All Posts
                </NavLink>
              </NavItem>}
          {currentUser &&
          <NavItem className="col-6">
            <NavLink className="text-center" active={activeTab === 'followedPosts'} onClick={() => toggleTab('followedPosts')}>
              Followed Posts
            </NavLink>
          </NavItem>}
        </Nav>
        {posts && <PostList posts={posts}/>}
      </div>
    );
};

export default FeedPage;
