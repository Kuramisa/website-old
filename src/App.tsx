import "/node_modules/primeflex/primeflex.css";
import "./assets/less/app.less";

import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Grid from "@mui/material/Grid";

import { AuthContext } from "./providers/AuthProvider";
import { MessageContext } from "./providers/MessageProvider";

import { FetchClientUser } from "./gql/queries/client";

import UnderDevelopment from "./components/bot/UnderDevelopment";
import BotLoading from "./components/bot/Loading";
import BotOffline from "./components/bot/Offline";

import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";

import Login from "./components/Login";
import Logout from "./components/Logout";

import Guild from "./pages/Guild";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const { REACT_APP_UNDER_DEV } = process.env;

const App = () => {
    const { auth } = useContext(AuthContext);
    const { message, clearMessage } = useContext(MessageContext);

    const {
        loading,
        error: botError,
        data: { clientUser: bot } = {}
    } = useQuery(FetchClientUser, { pollInterval: 100000 });

    if (REACT_APP_UNDER_DEV === "true") return <UnderDevelopment />;

    if (loading) return <BotLoading />;
    if (botError) return <BotOffline />;

    const handleClose = (event: any, reason?: string) => {
        if (reason === "clickaway") return;
        clearMessage();
    };
    
    return (
        <>
            <Snackbar
                open={!!message}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={message?.severity}
                    sx={{ width: "100%" }}
                >
                    {message?.message}
                </Alert>
            </Snackbar>
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
