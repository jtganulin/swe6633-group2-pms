import React, { useContext, useEffect } from 'react';
import { UserContext } from './providers/UserProvider';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import RootLayout from './layouts/RootLayout';
import Login from './routes/Login';
import Register from './routes/Register';
import Account from './routes/Account';
import Projects from './routes/Projects';
import CreateProject from './routes/CreateProject';
import ViewProject from './routes/ViewProject';
import EditProject from './routes/EditProject';
import ManageProjectMembers from './routes/ManageProjectMembers';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const { user, updateUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Keep the user logged in if they refresh the page
    // If we have a session cookie, query /api/users/me to get the user's info and update the context
    if (document.cookie.includes('sid')) {
      // Using axios
      axios.get('/api/users/me')
        .then((response) => {
          const { data } = response;
          updateUser({
            loggedIn: true,
            name: data.name,
            email: data.email,
          });
          navigate('/projects');
        })
        .catch((error) => {
          console.log(error);
          // logout(); // Clear any session cookies and navigate to login page
        });
    } else {
      console.log('No session cookie found ', document.cookie);
    }
  }, []);


  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/:projectId" element={<ViewProject />} />
            <Route path="/projects/:projectId/edit" element={<EditProject />} />
            <Route path="/projects/:projectId/members" element={<ManageProjectMembers />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
