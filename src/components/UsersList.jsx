import React from 'react';
import { Link} from "react-router-dom";
import { Helmet } from 'react-helmet';

const UsersList = ({ users }) => {
  return (
    <div>
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <h2>Users</h2>
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;