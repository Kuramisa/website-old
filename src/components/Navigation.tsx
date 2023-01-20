import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ButtonGroup } from "@mui/material";
import ProfileButton from "./user/ProfileButton";

const authUrl = process.env.NODE_ENV === "production"
    ? "https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=https%3A%2F%2Fkuramisa.com%2Flogin&response_type=code&scope=guilds%20identify"
    : "https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=guilds%20identify";

const inviteUrl = "https://discord.com/oauth2/authorize?client_id=969414951292788766&permissions=1634569944311&scope=bot";

const Navigation = ({ bot, auth }: { bot: any; auth: any; }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{
            padding: "10px 20px",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <img src={bot.avatarURL} alt="" width={48} />
                <Typography variant="subtitle1"
                            sx={{
                                mt: 1,
                                ml: 0.5,
                                cursor: "pointer",
                                fontWeight: 700
                            }}
                            onClick={() => navigate("/")}
                >
                    {bot.username}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                {auth ? (
                    <ProfileButton auth={auth} />
                ) : (
                    <ButtonGroup variant="contained">
                        <Button color="warning" onClick={() => window.open(inviteUrl, "_blank")}>Invite</Button>
                        <Button color="success" onClick={() => window.open(authUrl, "_self")}>Login</Button>
                    </ButtonGroup>
                )}
            </Stack>
        </AppBar>
    );
};

export default Navigation;