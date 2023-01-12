import Paper from "@mui/material/Paper";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const GuildInfo = ({ auth, guild }: { auth: any; guild: any }) => {
    return <Paper>
        <div className="guild-info">
            <div className="guild-icon">
                <Avatar sx={{ width: 128, height: "auto" }} src={guild.iconURL} />
            </div>
            <div className="guild-header">
                <Typography className="guild-name" variant="h6">{guild.name}</Typography>
                {guild.promoted && (
                    <div className="guild-buttons">
                        {guild.members.includes(auth?.id) ? (
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ cursor: "not-allowed" }}
                            >Already joined</Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => window.open(guild.inviteURL, "_blank")}
                            >Join the server</Button>
                        )}
                    </div>
                )}
                {guild.description && guild.description.length > 0 && (
                    <Typography variant="body1" className="guild-description">{guild.description}</Typography>
                )}
            </div>
        </div>
    </Paper>;
};

export default GuildInfo;