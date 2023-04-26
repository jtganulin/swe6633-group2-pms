import React, { useContext, useEffect } from 'react';
import { UserContext } from './providers/UserProvider';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
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
import Projects from './routes/ViewAllProjects';
import CreateProject from './routes/CreateProject';
import ViewProject from './routes/ViewProjectDetails';
import EditProject from './routes/EditProject';
import ManageProjectMembers from './routes/ManageProjectMembers';
import ProtectedRoute from './routes/ProtectedRoute';
import ViewAllProjects from './routes/ViewAllProjects';
import ViewProjectDetails from './routes/ViewProjectDetails';

function App() {
  const { user, updateUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Keep the user logged in if they refresh the page
    axios.get('/api/users/me')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Error getting user session: ', response);
          // They're either not logged in or a user with that cookie doesn't exist
          logout();
          return;
        }

        const { data } = response;
        updateUser({
          loggedIn: true,
          name: data.name,
          email: data.email,
        });
        
        navigate('/projects');
      })
      .catch((error) => {
        console.log("Frontend getMe error" + error);
        // logout(); // Clear any session cookies and navigate to login page
      });
  }, []);


  return (
    <ChakraProvider theme={theme}>
      <Toaster />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/projects" element={<ViewAllProjects />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/:projectId" element={<ViewProjectDetails />} />
            <Route path="/projects/:projectId/edit" element={<EditProject />} />
            <Route path="/projects/:projectId/members" element={<ManageProjectMembers />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
