import React from "react";
import { Container, Grid, Paper, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Typography variant={"h1"}>PROFILE</Typography>
            <Grid
                component={Container}
                maxWidth={"lg"}
            >
                <Paper
                    elevation={4}
                    sx={{
                        padding: 5,
                        background: colors.primary[400],
                    }}>
                    <Grid container direction={"column"} alignItems={"center"}>
                        <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={`../../assets/user.png`}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default Profile;