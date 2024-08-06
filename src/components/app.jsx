import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersList from './UsersList';
import UserDetail from './UserDetails';
import './styles.scss'
import axios from 'axios';



function App ({initialData}) {
  const [ users, setUsers ] = useState(initialData?.users);

  useEffect(() => {
    if (!users) {
      const fetchData = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      };
      fetchData().then();
    }
  }, [users]);

  return (
    <>
      <div>
        App
      </div>
      <h1>SSR App</h1>
      <Routes>
        <Route path="/" element={<UsersList users={users} />} />
        <Route path="/user/:userId" element={<UserDetail initialUserData={initialData?.userData} />} />
      </Routes>
    </>
  )
}

export default App;