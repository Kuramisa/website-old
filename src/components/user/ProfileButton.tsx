import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const ProfileButton = ({ auth }: { auth: any }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const icon = <img alt="" width={48} style={{ borderRadius: "50%" }} src={auth.avatarURL} />;

    const actions = [
        {
            icon: <Person2RoundedIcon />,
            name: "Profile",
            url: "@me"
        },
        { icon: <LogoutRoundedIcon />, name: "Logout", url: "logout" }
    ];

    const handleLink = (link: string) => {
        navigate(link);
    };

    return <>
        <Backdrop open={open} />
        <SpeedDial
            ariaLabel="Profile"
            icon={icon}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="left"
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => handleLink(action.url)}
                />
            ))}
        </SpeedDial>
    </>;
};

export default ProfileButton;