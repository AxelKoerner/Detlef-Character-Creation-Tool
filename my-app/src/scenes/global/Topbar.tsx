import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import {Box, IconButton, useTheme} from "@mui/material";
import {ColorModeContext} from "../../theme";
import {useContext} from "react";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (<Box display="flex" justifyContent="center" p={2}>

        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <NightsStayIcon/>
                ) : (
                    <LightModeIcon/>
                )}
            </IconButton>
        </Box>
    </Box>)
};

export default Topbar;