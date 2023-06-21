import GridLayout from "react-grid-layout";
import React, {useEffect} from "react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Box, Paper, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import secureLocalStorage from "react-secure-storage";
import StockImage from "../../assets/stock_profile_image.jpg";
import database from '../../config/config';
import { onValue, ref} from "firebase/database";

function Dashboards() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const layout = [
        {i: "profile", x: 0, y: 0, w: 3, h: 12, minW: 3, minH: 12},
        {i: "b", x: 3, y: 0, w: 2, h: 8, minW: 2, minH: 8},
        {i: "c", x: 6, y: 0, w: 2, h: 8, minW: 2, minH: 8}
    ];
    let profilePicture = (secureLocalStorage.getItem('picture') !== null) ? secureLocalStorage.getItem('picture') : StockImage

    const [userName, setUserName] = React.useState("");
    const [userMail, setUserMail] = React.useState("");

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
        <>
            <Typography variant={"h1"}>DASHBOARDS</Typography>
            <GridLayout className="layout" cols={12} rowHeight={30} width={1750} layout={layout}>
                <div key="profile">
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 5,
                            background: colors.primary[400],
                            width: "inherit",
                            height: "inherit"
                        }}
                    >
                        <Box
                            mb="25px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: "100%" }}
                        >
                            <Box
                                style={{
                                    flex: "1 1 100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    maxWidth: "100%",
                                    maxHeight: "100%"
                                }}
                            >
                                <img
                                    alt="profile-user"
                                    src={profilePicture?.toString()}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </Box>
                            <Box
                                textAlign="center"
                                sx={{ flex: "0 0 auto", width: "100%", px: 2, mt: 3 }}
                            >
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{
                                        m: "10px 0 0 0",
                                        overflowWrap: "break-word",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {userName}
                                </Typography>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    sx={{
                                        overflowWrap: "break-word",
                                        wordBreak: "break-word",
                                        mt: 1,
                                    }}
                                >
                                    {userMail}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </div>
                <div key="b">
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 5,
                            background: colors.primary[400],
                            width: "inherit",
                            height: "inherit"
                        }}>
                    </Paper>
                </div>
                <div key="c">
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 5,
                            background: colors.primary[400],
                            width: "inherit",
                            height: "inherit"
                        }}>
                    </Paper>
                </div>
            </GridLayout></>
)

}

export default Dashboards;