import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import NewCharIcon from '@mui/icons-material/PlusOne'
import {Box, Button, IconButton, InputBase, Paper, Popover, useTheme} from "@mui/material";
import {ColorModeContext, tokens} from "../../theme";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import StockImage from "../../assets/stock_profile_image.jpg";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const colors = tokens(theme.palette.mode);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const navigate = useNavigate();
    const profilePicture = (secureLocalStorage.getItem('picture') !==  null) ? secureLocalStorage.getItem('picture') : StockImage
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        secureLocalStorage.clear();
        navigate("/")
    }

    const navigateToProfile = () => {
        navigate("/profile");
    }


    return (<Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box sx={{
            display: 'flex',
            boxShadow: 1,
            backgroundColor: colors.primary["400"],
            borderRadius: "3px"
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
            <IconButton aria-describedby={id} onClick={handleClick}>
                <AccountBoxIcon/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Paper elevation={4}
                       style={{ justifyContent: "center", flexDirection: 'column'}}

                       sx={{
                           padding: 2,
                           background: colors.primary[400]
                       }}>
                    <Box sx={{ justifyContent: 'flex-end', mb: 1, ml: 3}}>
                        <img
                        id={"profile_image"}
                        alt="profile-user"
                        width="100px"
                        height="100px"
                        src={profilePicture?.toString()}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                    </Box>
                    <Button
                        variant={"contained"}
                        fullWidth
                        onClick={navigateToProfile}
                        sx={{color: colors.grey[100], backgroundColor: colors.blueAccent[600],mb: 1, ":hover": {
                                bgcolor: colors.greenAccent[400]}
                        }}> Profile </Button>
                    <Button
                        variant={"contained"}
                        fullWidth
                        onClick={logout}
                        sx={{color: colors.grey[100], backgroundColor: colors.redAccent[600], ":hover": {
                                bgcolor: colors.redAccent[700]}
                        }}> Logout </Button>
                </Paper>
            </Popover>
        </Box>
    </Box>)
};

export default Topbar;