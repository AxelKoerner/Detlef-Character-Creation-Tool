import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {useState} from "react";
import {tokens} from "../../theme";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Link, useNavigate} from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import database from '../../config/config';
import { ref, onValue} from "firebase/database";
import  secureLocalStorage  from  "react-secure-storage";

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValues] = useState({
        email: "",
        password: "",
        showPassword: false
    });
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setValues({
            ...value,
            showPassword: !value.showPassword
        })
    }

    const checkLoginCredentials = (values: any, actions: any) => {
        const dbData = ref(database, '/users/');
        onValue(dbData, (snapshot) => {
            const data = snapshot.val();
            for(let key in data) {
                let entry = data[key];
                if(entry.email === values.email && entry.password === values.password) {
                    secureLocalStorage.setItem("email", entry.email);
                    secureLocalStorage.setItem("name", entry.name);
                    secureLocalStorage.setItem("picture", entry.picture);
                    navigate("/dashboards");
                    return;
                }
            }
            actions.setErrors({email: 'Invalid input', password: 'Invalid input'});
        })
    }

    return (
        <Container>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>

                <Container maxWidth={"sm"}>
                    {/* BANNER */}
                    <Typography
                        variant={"h1"}
                        fontWeight={"bold"}
                        sx={{
                            fontSize: 60,
                            color: colors.grey[100],
                            m: "0 0 5px 0",
                            mt: "75px",
                            mb: "15px"
                        }}>
                        Welcome Back !
                    </Typography>
                    <Typography
                        variant={"h5"}
                        sx={{
                            fontSize: 20,
                            color: colors.greenAccent[400],
                            mb: "50px"
                        }}>
                        Please log in to your Account
                    </Typography>

                    {/* INPUT FIELDS */}
                    <Formik initialValues={initialValues} onSubmit={checkLoginCredentials} validationSchema={checkoutSchema}>
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleSubmit
                          }) => (
                            <form onSubmit={handleSubmit}>
                    <Container maxWidth={"lg"}>
                        <Grid
                            container
                            direction={"column"}
                            justifyContent={"center"}
                            sx={{
                                minHeight: '30vh'
                            }}
                        >
                            <Paper
                                elevation={4}
                                sx={{
                                    padding: 5,
                                    background: colors.primary[400]
                                }}>
                                <Grid container direction={"column"}>
                                    <Grid>
                                        <TextField
                                            type={"email"}
                                            fullWidth={true}
                                            label={"Enter your email"}
                                            placeholder={"Email Address"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            sx={{mb: 2}}
                                            onChange={handleChange}
                                            value={values.email}
                                            name={'email'}
                                            error={!!touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}>
                                        </TextField>
                                    </Grid>

                                    <Grid>
                                        <TextField
                                            type={value.showPassword ? "text" : "password"}
                                            fullWidth={true}
                                            label={"Password"}
                                            placeholder={"Password"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            sx={{mb: 2}}
                                            onChange={handleChange}
                                            value={values.password}
                                            name={'password'}
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position={"end"}>
                                                        <IconButton
                                                            aria-label={"toggle password"}
                                                            onClick={handlePasswordVisibility}>
                                                            {value.showPassword ? (
                                                                <VisibilityIcon/>
                                                            ) : (
                                                                <VisibilityOffIcon/>
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}>
                                        </TextField>
                                    </Grid>

                                    <Grid>
                                        <Button
                                            type={'submit'}
                                            variant={"contained"}
                                            fullWidth
                                            sx={{color: colors.grey[100], backgroundColor: colors.blueAccent[600], ":hover": {
                                            bgcolor: colors.greenAccent[400]}
                                            }}>
                                            Sign In
                                        </Button>
                                    </Grid>

                                    <Grid container justifyContent={"flex-start"}>
                                        <Button
                                            component={Link}
                                            variant={"text"}
                                            to={"/createAccount"}
                                            sx={{color: colors.greenAccent[400]}}>
                                            Not yet registered?
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>
                    </Container>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Container>
    )
}

const initialValues = {
    email: '',
    password: ''
}

const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required('required')
});

export default Login;