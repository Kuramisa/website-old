import { useMutation } from "@apollo/client";
import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../gql/auth";
import { login, logout } from "../reducers/auth";
import { MessageContext } from "./MessageProvider";

const AuthContext = createContext({
    auth: null as any,
    login: (userData: any) => userData,
    logout: () => {
    }
});

const AuthProvider = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();
    const { setMessage } = useContext(MessageContext);

    const [authUser] = useMutation(AuthUser, {
        update: (_, { data: { authUser: authData } }) => {
            dispatch(login(authData));
            setMessage({ message: "Logged in successfully", severity: "success" });
        }
    });

    const loginUser = (token: string) => {
        localStorage.setItem("kuramisaToken", token);
        authUser({ variables: { auth: token } });
    };

    const logoutUser = () => {
        navigate("/");
        dispatch(logout());
    };

    return (
        <AuthContext.Provider
            value={{ auth: user, login: loginUser, logout: logoutUser }}
            {...props}
        />
    );
};

export { AuthContext, AuthProvider };