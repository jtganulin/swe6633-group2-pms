import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = '/', children }) => {
    // If authorized, render child elements
    // If not, navigate to redirectPath
    if (!user.loggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
