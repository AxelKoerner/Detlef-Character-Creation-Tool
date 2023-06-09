import React, {useEffect, useState} from "react";
import * as ProSidebar from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LineageIcon from "@mui/icons-material/AccountTree";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import secureLocalStorage from "react-secure-storage";
import Face5Icon from '@mui/icons-material/Face5';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import StockImage from "../../assets/stock_profile_image.jpg";
import {onValue, ref} from "firebase/database";
import {Link} from "react-router-dom";
import database from '../../config/config';

const Item = ({ title, to, icon, selected, setSelected, setUserName, setUserMail }: {title: string; to: string; icon: any; selected: any; setSelected: any; setUserName?: any, setUserMail?: any}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <ProSidebar.MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => {
                setSelected(title);
                if(to === '/') {
                    secureLocalStorage.clear()
                    setUserMail('')
                    setUserName('')
                }
            }}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </ProSidebar.MenuItem>
    );
};

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    let profilePicture = (secureLocalStorage.getItem('picture') !== null) ? secureLocalStorage.getItem('picture') : StockImage;
    const [userName, setUserName] = React.useState(((secureLocalStorage.getItem('name') !== null) ? secureLocalStorage.getItem('name') : '')?.toString());
    const [userMail, setUserMail] = React.useState(((secureLocalStorage.getItem('email') !== null) ? secureLocalStorage.getItem('email') : '')?.toString());

    useEffect(() => {
        const mail = secureLocalStorage.getItem("email");
        const dbData = ref(database, 'users/');
        onValue(dbData, (snapshot) => {
            const data = snapshot.val();
            for(let key in data) {
                let entry = data[key];
                if(entry.email === mail) {
                    setUserMail(entry.email);
                    setUserName(entry.name);
                    return;
                }
            }
        })
    }, []   )

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                }
            }}
        >
            <ProSidebar.ProSidebar collapsed={isCollapsed}>
                <ProSidebar.Menu>
                    {/* LOGO AND MENU ICON */}
                    <ProSidebar.MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    D E T L E F
                                </Typography>
                                <IconButton
                                    data-testid='setCollapsed'
                                    onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </ProSidebar.MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={profilePicture?.toString()}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {userName}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {userMail}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/dashboards"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Profile
                        </Typography>
                        <Item
                            title="Manage Profile"
                            to="/profile"
                            icon={<AccountBoxIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            data-testid='logout'
                            title="Logout"
                            setUserName={setUserName}
                            setUserMail={setUserMail}
                            to="/"
                            icon={<LogoutIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Character Creation
                        </Typography>
                        <Item
                            title="DnD Character Sheet"
                            to="/characterSheet"
                            icon={<Face5Icon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Custom Background"
                            to="/customBackground"
                            icon={<WallpaperIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Custom Lineage"
                            to="/customLineage"
                            icon={< LineageIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    </Box>
                </ProSidebar.Menu>
            </ProSidebar.ProSidebar>
        </Box>
    );
};

export default SideBar;