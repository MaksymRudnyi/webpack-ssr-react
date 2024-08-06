import React, {useEffect, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from "axios";
import { Helmet} from "react-helmet-async";

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

const UserDetail = ({ userData }) => {
  const { userId } = useParams();
  const [finalUserData, setFinalUserData] = useState(userData);

  React.useEffect(() => {
    if (!userData?.user?.id) {
      const fetchData = async () => {
        const [posts, albums, user] = await Promise.all([
          fetchPosts(userId),
          fetchAlbums(userId),
          fetchUser(userId)
        ]);
        setFinalUserData({ posts, albums, user });
      };
      fetchData().then();
    }
  }, [userData, userId]);

  return (
    <>
      <Helmet>
        <title>User Detail {finalUserData?.user?.name}</title>

      </Helmet>

      <div>
        User details,
        <p>
          <Link to="/">Back to users list</Link>
        </p>
        <pre>
          {JSON.stringify(finalUserData, null, 2)}
        </pre>
      </div>
    </>
  )
}

export default UserDetail;