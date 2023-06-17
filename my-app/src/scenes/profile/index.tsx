import React, {useEffect} from "react";
import {Button, Container, Grid, Paper, TextField, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import secureLocalStorage from "react-secure-storage";
import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {Formik} from "formik";
import * as yup from "yup";

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let profile_image = (secureLocalStorage.getItem('picture') !== 'undefined') ? secureLocalStorage.getItem('picture') : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAb1BMVEXw7+s9PT3w7uw9PTvw7+k9PD/j4eDz8u46OjoxLzD18/Ln5uQ0NDQwMC87Pjvq6OdZWVf8+vmJiYfJyMc3OTaenpzc29kjJCFtbGq4t7XCwL+srKkrKilMS0phYF4bHBjT09B8e3qVlpIlJCYXFhPwZzvuAAADJElEQVRoge2aC7OiIBSABcyDCCm+SzBv7f//jYvm3sembl2l7uzwTc04k/l1AOEczMMYe57Xv59Nb/b9F4gH/BepXxXwq+J9XcSvNDscDofD4XA4HI4fCQC8wMoYjoIyiLA5eGbxzXCWtiQMQ9KmGWZP8wJr9InnFCG0z/OTbgCeE7bs9IUiQgjaob2BKt3JZxSGsqj6aD9Dq0baF0NRoVuqwvowh8OUGJHqYHmcQSnIlBkRUdpVs5pPihHiNbM5wCG7zIhNV2c2u5rV+aw5ry2aoezv4hkIKe2p4aDQvLk62DPLVOxmWxuJVFobY7KlC+a8tWhO6H62tRFNrJrnQ/5fzTVfaG3+Zs8MhVowq8Le/AmdWDCLzuKagZN81kwTe94+H1H7hca2+HgAR/s5MyWx1YdP0JxmzH1SYlHse/AWTorDN7CdfrKETzQ4T+yn3Bgn6jbi5AklDsY4VV8nUapS33SyXTeAKeDYMQk/EkEukiN4mAGz+XyTlfVZGjU+1uIP9dEUs1iea4tpL5jChl9qxvpDL2uKc9FkIPtWwLXiVSEtpUMQaGVSEl41wGCo22Go3YGxpuImN1Q6sLJmQKb4ddJWpCilHM1SlsVe7PvcE+Uqs7BQmoLKjOhh8iS5yHV6yLquyw6ppqH5YDekw/SyfXnFGmXKZWMmfXSEUKFCnvNQjdmoMe/M0U41G6uvmfbfiSdBt+m3Omza15CJ6y7BvyEi2zBqiJBJtO805yTe7uaSLb9t6ll4u9nWBTQhuiveEdVsFXSk7u3kscHVRqsHpOL+eAdEus0gi6sHWvpKFW8RNCum85/FoIsNgsZYLxVT01C9Qcys+/WwGKFTt354s/PMDtgi4rzejOt8tqyYh9brb6xYPzKJvJv16tENgfqOGakAVv4LC7rH7+aeqlttzr5pXr1WLu102jaf6DszlveB8HEmPa3ef4Uyads2SbTW/XJFOTcvzsOv8JDy4XcRc55OzFeSLTZBfVNKxSNRFATmNVCO75EoiszncYxH1ov7qdsfivJPV5u+7ucTNlqiffd/QYfD4XA4HA6Hw+Fw/AB+A6OeLQeMvs2PAAAAAElFTkSuQmCC'
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

    const handleFormSubmit = () => {
        set(ref(database, 'users/' + name), {
            name: name,
            email: email,
            password: password,
            picture: picture
        }).then(() => {});
    }

    let initialValues = {
        name: '',
        email: '',
        password: '',
        picture: ''
    }

    useEffect(() =>{
        const mail = secureLocalStorage.getItem("email");
        const dbData = ref(database, 'users/');
        onValue(dbData, (snapshot) => {
            const data = snapshot.val();
            for(let key in data) {
                let entry = data[key];
                if(entry.email === mail) {
                    setName(entry.name); setEmail(entry.email); setPassword(entry.password); setPicture(entry.picture);
                    return;
                }
            }
        })
    }, [])

    const [name, setName] = React.useState(initialValues.name);
    const [email, setEmail] = React.useState(initialValues.email);
    const [password, setPassword] = React.useState(initialValues.password);
    const [picture, setPicture] = React.useState(initialValues.picture);



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
                    <Grid container item >
                        <Grid item xs={6} >
                            <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={checkoutSchema}>
                                {({
                                      errors,
                                      touched,
                                      handleBlur,
                                      handleSubmit
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Grid>
                                            <TextField
                                                type={"text"}
                                                fullWidth={true}
                                                label={"Name"}
                                                placeholder={"Max, Mustermann"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setName(event.target.value);
                                                }}
                                                value={name}
                                                name={'name'}
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}>
                                            </TextField>
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                type={"email"}
                                                fullWidth={true}
                                                label={"E-Mail"}
                                                placeholder={"max@mustermann.com"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setEmail(event.target.value);
                                                }}
                                                value={email}
                                                name={'email'}
                                                error={!!touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}>
                                            </TextField>
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                type={"password"}
                                                fullWidth={true}
                                                label={"Password"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setPassword(event.target.value);
                                                }}
                                                value={password}
                                                name={'password'}
                                                error={!!touched.password && !!errors.password}
                                                helperText={touched.password && errors.password}>
                                            </TextField>
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                type={"url"}
                                                fullWidth={true}
                                                label={"Picture URL"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setPicture(event.target.value);
                                                }}
                                                value={picture}
                                                name={'picture'}
                                                error={!!touched.picture && !!errors.picture}
                                                helperText={touched.picture && errors.picture}>
                                            </TextField>
                                        </Grid>

                                        <Grid>
                                            <Button
                                                variant={"contained"}
                                                fullWidth
                                                type={'submit'}
                                                sx={{
                                                    color: colors.grey[100],
                                                    backgroundColor: colors.blueAccent[600],
                                                    ":hover": {
                                                        bgcolor: colors.greenAccent[400]
                                                    }
                                                }}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </Grid>
                    <Grid item xs={6}>
                        <img
                            id={"profile_image"}
                            alt="profile-user"
                            width="300px"
                            height="300px"
                            src={profile_image?.toString()}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

const checkoutSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email("invalid email"),
    password: yup.string(),
    picture: yup.string()
});

export default Profile;