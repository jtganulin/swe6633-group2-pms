import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// We can use this context to pass the user object to any component that needs it
export const UserContext = createContext({});

// This is the provider that will wrap the entire app, giving User Context access to necessary components
const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const getInitialState = () => ({
        id: "",
        loggedIn: false,
        name: "",
        email: "",
        projects: []
    });

    const [user, setUser] = useState(getInitialState());

    // Logs out the user clientside; need to eventually call the serverside logout function
    const logout = async (e) => {
        const stateReset = Object.keys(user).reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
        setUser({ ...stateReset, ...getInitialState() });
        await axios.post("/api/users/logout");
        navigate("/login");
    }

    const updateUser = (userInfo) => {
        setUser((prev) => ({ ...prev, ...userInfo }));
    };

    return (
        // The value prop is what will be available to any component that consumes this context
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
