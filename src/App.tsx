import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { AuthContext } from "./providers/AuthProvider";

import { FetchClientUser } from "./gql/queries/client";

import BotLoading from "./components/bot/Loading";
import BotOffline from "./components/bot/Offline";

import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";

import Login from "./components/Login";
import Logout from "./components/Logout";

const App = () => {
    if (process.env.NODE_ENV !== "development") {
        console.log("%cStop!", "color: red; font-size: 40px; font-weight: bold;");
        console.log(
            "%cDo not enter any scripts or some sort of \"hack\" here, it will most likely compromise your account and steal your information",
            "font-size: 30px; font-weight: bold;"
        );
        console.log(
            "%cThis browser feature is intended for developers only",
            "font-size: 30px; font-weight: bold;"
        );
    }

    const { auth } = useContext(AuthContext);

    const { loading, error, data: { clientUser: bot } = {} } = useQuery(FetchClientUser, { pollInterval: 100000 });

    if (loading) return <BotLoading />;
    if (error) return <BotOffline />;

    return (
        <>
            <Navigation bot={bot} auth={auth} />
            <Sidebar auth={auth} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    );
};

export default App;
