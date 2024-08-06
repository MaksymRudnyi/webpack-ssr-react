import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import UsersList from "./UsersList";
import UserDetail from "./UserDetail";


function App ({ users, userData}) {
  return (
    <Routes>
      <Route path="/" element={<UsersList users={users} />} />
      <Route path="/user/:userId" element={<UserDetail userData={userData} />} />
    </Routes>
  )
}

export default App;