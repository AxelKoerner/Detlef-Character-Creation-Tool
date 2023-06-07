import GridLayout from "react-grid-layout";
import React from "react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Box, Paper, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";

function Dashboards() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const layout = [
        {i: "a", x: 4, y: 0, w: 1, h: 6, minH: 6},
        {i: "b", x: 5, y: 0, w: 1, h: 3, minH: 3},
        {i: "c", x: 6, y: 0, w: 1, h: 3, minH: 3},
        {i: "d", x: 7, y: 0, w: 1, h: 3, minH: 3}
    ];
    const profilePicture = require('../../assets/example_pic.jpg');

    return (
        <>
            <Typography variant={"h1"}>DASHBOARDS</Typography>
            <GridLayout className="layout" cols={12} rowHeight={30} width={1800} layout={layout}>
                <div key="a">
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 5,
                            background: colors.primary[400],
                            width: "inherit",
                            height: "inherit"
                        }}>
                        <Box mb="25px">
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <img
                                    alt={"profile-user"}
                                    width={"100%"}
                                    height={"100%"}
                                    src={profilePicture}
                                    style={{cursor: "pointer", borderRadius: "50%"}}/>

                            </Box>

                            <Box textAlign={"center"}>
                                <Typography variant={"h2"} color={colors.grey[100]} fontWeight={"bold"}
                                            sx={{m: "10px 0 0 0"}}>Test
                                    Name</Typography>
                                <Typography> Test User</Typography>
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
                <div key="d">
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