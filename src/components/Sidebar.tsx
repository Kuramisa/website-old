import "../assets/less/sidebar.less";

import { useRef, useState } from "react";

import BotGuildScroll from "./scroll/BotGuildScroll";
import UserGuildScroll from "./scroll/UserGuildScroll";

const Sidebar = ({ auth }: { auth: any }) => {
    const [userServers] = useState(false);
    const scrollParent = useRef(null);

    return (
        <div className="sidebar-container">
            <div className={auth ? "sidebar-scroll-container-auth" : "sidebar-scroll-container"} ref={scrollParent}>
                {userServers && auth ? (
                    <UserGuildScroll parent={scrollParent} />
                ) : (
                    <BotGuildScroll parent={scrollParent} />
                )}
            </div>
        </div>
    );
};

/**
 * {auth && (userServers ? (
 *                 <Button variant="outlined" sx={{ backgroundColor: "#3c1f41" }} onClick={() => setUserServers(false)}>Your
 *                     Servers</Button>) : (
 *                 <Button variant="outlined" color="success" onClick={() => setUserServers(true)}>Bot&apos;s
 *                     Servers</Button>))}
 */

export default Sidebar;