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

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValues] = useState({
        email: "",
        password: "",
        showPassword: false
    })

    const handlePasswordVisibility = () => {
        setValues({
            ...value,
            showPassword: !value.showPassword
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
                                            sx={{mb: 2}}>
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
                                            variant={"contained"}
                                            fullWidth
                                            href={"/dashboards"}
                                            sx={{color: colors.grey[100], backgroundColor: colors.blueAccent[600], ":hover": {
                                            bgcolor: colors.greenAccent[400]}
                                            }}>
                                            Sign In
                                        </Button>
                                    </Grid>

                                    <Grid container justifyContent={"flex-start"}>
                                        <Button
                                            variant={"text"}
                                            href={"/createAccount"}
                                            sx={{color: colors.greenAccent[400]}}>
                                            Not yet registered?
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>
                    </Container>
                </Container>
            </Box>
        </Container>
    )
}

export default Login;