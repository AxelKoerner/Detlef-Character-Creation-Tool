import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import {Box, IconButton, InputBase, useTheme} from "@mui/material";
import {ColorModeContext, tokens} from "../../theme";
import {useContext} from "react";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const colors = tokens(theme.palette.mode);

    
    return (<Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box sx={{
            display: 'flex',
            boxShadow: 1,
            backgroundColor: colors.primary["400"]
        }}>
            <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>
            <IconButton type={"button"} sx={{p: 1}}>
                <SearchIcon/>
            </IconButton>
        </Box>
        {/* ICONS */}

        <Box display={"flex"}>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <NightsStayIcon/>
                ) : (
                    <LightModeIcon/>
                )}
            </IconButton>
            <IconButton
                href={"/settings"}>
                <SettingsIcon/>
            </IconButton>
            <IconButton href={"/profile"}>
                <AccountBoxIcon/>
            </IconButton>
        </Box>
    </Box>)
};

export default Topbar;