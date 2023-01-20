import { useContext } from "react";
import { Buffer } from "buffer";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../providers/AuthProvider";
import { MessageContext } from "../providers/MessageProvider";

import { LoginUser } from "../gql/auth";

const Login = () => {
    const { auth, login } = useContext(AuthContext);
    const { setMessage, clearMessage } = useContext(MessageContext);

    let code = window.location.search.split("=")[1];

    const { data, error } = useQuery(LoginUser, {
        variables: { code: Buffer.from(code).toString("base64") }
    });

    if (auth) return <Navigate to="/" replace={true} />;
    if (error) {
        setMessage({ message: error.message, severity: "error" });
        return <Navigate to="/" replace={true} />;
    }

    if (data) {
        login(data.login);
        clearMessage();
        return <Navigate to="/" replace={true} />;
    }

    return <></>;
};

export default Login;