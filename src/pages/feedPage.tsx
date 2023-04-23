import React, {useEffect} from "react";
import PostList from "../components/posts/post-list";
import { getAllPosts, getFollowedPosts } from "../services/post-services";
import {  } from "react-bootstrap";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const FeedPage = () => {
  const [allPosts, setAllPosts] = React.useState([]);
  const [followedPosts, setFollowedPosts] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('allPosts');
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const newAllPosts = await getAllPosts();
      const newFollowedPosts = await getFollowedPosts();
      console.log("newFollowedPosts", newFollowedPosts);
      setAllPosts(() => newAllPosts? newAllPosts : []);
      setFollowedPosts(() => newFollowedPosts? newFollowedPosts : []);
    }
    fetchPosts();
  }, []);
    return (
      <div>
        {/* align the nav center */}
        <Nav className="row justify-content-center" pills>
          <NavItem className="col-6">
            <NavLink className="text-center" href="#allPosts" active={activeTab === 'allPosts'} onClick={() => toggleTab('allPosts')}>
              All Posts
            </NavLink>
          </NavItem>
          <NavItem className="col-6">
            <NavLink className="text-center" href="#followedPosts" active={activeTab === 'followedPosts'} onClick={() => toggleTab('followedPosts')}>
              Followed Posts
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="allPosts">
            <PostList posts={allPosts}></PostList>
          </TabPane>
          <TabPane tabId="followedPosts">
            <PostList posts={followedPosts}></PostList>
          </TabPane>
        </TabContent>
      </div>
    );
};

export default FeedPage;
