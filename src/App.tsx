import "/node_modules/primeflex/primeflex.css";
import "./assets/less/app.less";

import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Grid from "@mui/material/Grid";

import { AuthContext } from "./providers/AuthProvider";

import { FetchClientUser } from "./gql/queries/client";

import BotLoading from "./components/bot/Loading";
import BotOffline from "./components/bot/Offline";

import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";

import Login from "./components/Login";
import Logout from "./components/Logout";

import Guild from "./pages/Guild";

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
            <div className="container">
                <Sidebar auth={auth} />
                <Grid>
                    <Routes>
                        <Route path="/login" element={<Login />} caseSensitive />
                        <Route path="/logout" element={<Logout />} caseSensitive />
                        <Route path="/guild">
                            <Route path=":guildId" element={<Guild auth={auth} bot={bot} />} caseSensitive />
                        </Route>
                    </Routes>
                </Grid>
            </div>
        </>
    );
};

export default App;
