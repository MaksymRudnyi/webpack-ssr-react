import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  const [ finalUsers, setFinalUsers ] = useState(users);

  console.log('users: ', users);
  useEffect(() => {
    if (!users?.length) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setFinalUsers(data))
    }
  }, [users]);

  return (
    <div>
      Users lists
      <ul>
        {finalUsers?.map(user => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users;