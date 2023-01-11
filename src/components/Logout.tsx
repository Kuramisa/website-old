import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";

const Logout = () => {
    const { auth, logout } = useContext(AuthContext);

    if (auth) logout();

    return <Navigate to="/" replace={true} />;
};

export default Logout;