import "../assets/less/sidebar.less";

import { useRef, useState } from "react";

import Button from "@mui/material/Button";

import BotGuildScroll from "./scroll/BotGuildScroll";
import UserGuildScroll from "./scroll/UserGuildScroll";

const Sidebar = ({ auth }: { auth: any }) => {
    const [userServers, setUserServers] = useState(false);
    const scrollParent = useRef(null);

    return (
        <div className="sidebar-container">
            {auth && (userServers ? (
                <Button variant="outlined" sx={{ backgroundColor: "#3c1f41" }} onClick={() => setUserServers(false)}>Your
                    Servers</Button>) : (
                <Button variant="outlined" color="success" onClick={() => setUserServers(true)}>Bot&apos;s
                    Servers</Button>))}
            <div className="sidebar-scroll-container" ref={scrollParent}>
                {userServers && auth ? (
                    <UserGuildScroll parent={scrollParent} />
                ) : (
                    <BotGuildScroll parent={scrollParent} />
                )}
            </div>
        </div>
    );
};

export default Sidebar;