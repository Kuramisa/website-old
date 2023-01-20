import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { MessageContext } from "../providers/MessageProvider";

const Logout = () => {
    const { auth, logout } = useContext(AuthContext);
    const { setMessage } = useContext(MessageContext);

    if (auth) {
        logout();
        setMessage({ message: "Logged out successfully", severity: "success" });
    }

    return <Navigate to="/" replace={true} />;
};

export default Logout;