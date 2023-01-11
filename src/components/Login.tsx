import { useContext } from "react";
import { Buffer } from "buffer";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../providers/AuthProvider";

import { LoginUser } from "../gql/mutations/auth";

const Login = () => {
    const { auth, login } = useContext(AuthContext);
    
    const [loginUser] = useMutation(LoginUser, {
        update: (_, { data: { login: userData } }) => {
            login(userData);
        }
    });

    if (auth) return <Navigate to="/" replace={true} />;

    const code = window.location.search.split("=")[1];

    if (!code) return <Navigate to="/" replace={true} />;

    loginUser({ variables: { code: Buffer.from(code).toString("base64") } });

    return <Navigate to="/" />;
};

export default Login;