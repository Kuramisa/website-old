import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Logo from "../../assets/images/kuramisa.png";

const Loading = () => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh"
        }}>
            <img alt="" src={Logo} style={{ width: "64px", height: "auto", position: "absolute" }} />
            <CircularProgress size={90} color="warning" />
        </Box>

    );
};

export default Loading;