import React from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import { Helmet} from "react-helmet";

const fetchPosts = async (userId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return response.data;
};

const fetchAlbums = async (userId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
  return response.data;
};

const fetchUser = async (userId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return response.data;
};

const UserDetails = ({ initialUserData }) => {
  const [userData, setUserData] = React.useState(initialUserData);
  let { userId } = useParams();

  React.useEffect(() => {
    if (!userData) {
      const fetchData = async () => {
        const [posts, albums, user] = await Promise.all([
          fetchPosts(userId),
          fetchAlbums(userId),
          fetchUser(userId)
        ]);
        setUserData({ posts, albums, user });
      };
      fetchData().then();
    }
  });

  return (
    <div>
      <Helmet>
        <title>{`User Details ${userData.user.name}`}</title>
      </Helmet>
      user details
      <p>Go <Link to={'/'}>Home</Link></p>
      {JSON.stringify(userData, null, 2)}
    </div>
  )
}

export default UserDetails;