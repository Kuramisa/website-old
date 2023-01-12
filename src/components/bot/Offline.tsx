import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Logo from "../../assets/images/kuramisa.png";

const Offline = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh"
            }}>
            <img alt="" src={Logo} style={{ width: "64px", height: "auto" }} />
            <Typography variant="h6">Bot is offline</Typography>
            <Typography>Please contact the Developer</Typography>
        </Box>
    );
};

export default Offline;