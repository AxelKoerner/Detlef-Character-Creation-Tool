import React, { useEffect } from "react";
import { Container, Grid, Paper, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import secureLocalStorage from "react-secure-storage";
import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref} from "firebase/database";

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let profile_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAb1BMVEXw7+s9PT3w7uw9PTvw7+k9PD/j4eDz8u46OjoxLzD18/Ln5uQ0NDQwMC87Pjvq6OdZWVf8+vmJiYfJyMc3OTaenpzc29kjJCFtbGq4t7XCwL+srKkrKilMS0phYF4bHBjT09B8e3qVlpIlJCYXFhPwZzvuAAADJElEQVRoge2aC7OiIBSABcyDCCm+SzBv7f//jYvm3sembl2l7uzwTc04k/l1AOEczMMYe57Xv59Nb/b9F4gH/BepXxXwq+J9XcSvNDscDofD4XA4HI4fCQC8wMoYjoIyiLA5eGbxzXCWtiQMQ9KmGWZP8wJr9InnFCG0z/OTbgCeE7bs9IUiQgjaob2BKt3JZxSGsqj6aD9Dq0baF0NRoVuqwvowh8OUGJHqYHmcQSnIlBkRUdpVs5pPihHiNbM5wCG7zIhNV2c2u5rV+aw5ry2aoezv4hkIKe2p4aDQvLk62DPLVOxmWxuJVFobY7KlC+a8tWhO6H62tRFNrJrnQ/5fzTVfaG3+Zs8MhVowq8Le/AmdWDCLzuKagZN81kwTe94+H1H7hca2+HgAR/s5MyWx1YdP0JxmzH1SYlHse/AWTorDN7CdfrKETzQ4T+yn3Bgn6jbi5AklDsY4VV8nUapS33SyXTeAKeDYMQk/EkEukiN4mAGz+XyTlfVZGjU+1uIP9dEUs1iea4tpL5jChl9qxvpDL2uKc9FkIPtWwLXiVSEtpUMQaGVSEl41wGCo22Go3YGxpuImN1Q6sLJmQKb4ddJWpCilHM1SlsVe7PvcE+Uqs7BQmoLKjOhh8iS5yHV6yLquyw6ppqH5YDekw/SyfXnFGmXKZWMmfXSEUKFCnvNQjdmoMe/M0U41G6uvmfbfiSdBt+m3Omza15CJ6y7BvyEi2zBqiJBJtO805yTe7uaSLb9t6ll4u9nWBTQhuiveEdVsFXSk7u3kscHVRqsHpOL+eAdEus0gi6sHWvpKFW8RNCum85/FoIsNgsZYLxVT01C9Qcys+/WwGKFTt354s/PMDtgi4rzejOt8tqyYh9brb6xYPzKJvJv16tENgfqOGakAVv4LC7rH7+aeqlttzr5pXr1WLu102jaf6DszlveB8HEmPa3ef4Uyads2SbTW/XJFOTcvzsOv8JDy4XcRc55OzFeSLTZBfVNKxSNRFATmNVCO75EoiszncYxH1ov7qdsfivJPV5u+7ucTNlqiffd/QYfD4XA4HA6Hw+Fw/AB+A6OeLQeMvs2PAAAAAElFTkSuQmCC'
    const firebaseConfig = {
        apiKey: "AIzaSyDjAlBgT7ybr2GZrNgq3zFZoKu1jn7stHg",
        authDomain: "cctool-c001b.firebaseapp.com",
        databaseURL: "https://cctool-c001b-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "cctool-c001b",
        storageBucket: "cctool-c001b.appspot.com",
        messagingSenderId: "736945444931",
        appId: "1:736945444931:web:07a06f34302f63b8929cf6"

    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    let userData = null;

    useEffect(() =>{
        const mail = secureLocalStorage.getItem("email");
        const dbData = ref(database, 'users/');
        onValue(dbData, (snapshot) => {
            const data = snapshot.val();
            for(let key in data) {
                let entry = data[key];
                if(entry.email === mail) {
                    userData = {email: entry.email, name: entry.name, password: entry.password, picture: entry.picture};
                    if(entry.picture !== undefined) {profile_image = entry.picture}
                    return;
                }
            }
        })
    })

    return (
        <>
            <Typography variant={"h1"} sx={{mb: 10}}>PROFILE</Typography>
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
                    <Grid container direction={"row"} alignItems={"baseline"} justifyContent="space-around">

                        <Grid item>
                        <img
                            id={"profile_image"}
                            alt="profile-user"
                            width="300px"
                            height="300px"
                            src={profile_image}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <img
                            id={"profile_image"}
                            alt="profile-user"
                            width="300px"
                            height="300px"
                            src={profile_image}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default Profile;