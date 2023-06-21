import {Box, Button, Container, Grid, Paper, TextField, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import { ref, set } from "firebase/database";
import database from '../../config/config';
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

const CreateAccount = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleFormSubmit = (values: any) => {
        set(ref(database, 'users/' + values.name), {
            name: values.name,
            email: values.email,
            password: values.password
        }).then(() => {});
        navigate("/");
    }

    // @ts-ignore
    return (
        <Container>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Paper
                    elevation={4}
                    sx={{
                        padding: 5,
                        background: colors.primary[400]
                    }}>
                    <Grid container direction={"column"}>

                        <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={checkoutSchema}>
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleBlur,
                                  handleChange,
                                  handleSubmit
                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid>
                                        <TextField
                                            type={"text"}
                                            fullWidth={true}
                                            label={"Enter your Name"}
                                            placeholder={"Max, Mustermann"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            sx={{mb: 2}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            name={'name'}
                                            error={!!touched.name && !!errors.name}
                                            helperText={touched.name && errors.name}>
                                        </TextField>
                                    </Grid>

                                    <Grid>
                                        <TextField
                                            type={"email"}
                                            fullWidth={true}
                                            label={"Enter your Email"}
                                            placeholder={"max@mustermann.com"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            sx={{mb: 2}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            name={'email'}
                                            error={!!touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}>
                                        </TextField>
                                    </Grid>

                                    <Grid>
                                        <TextField
                                            type={"password"}
                                            fullWidth={true}
                                            label={"Enter your password"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            sx={{mb: 2}}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name={'password'}
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}>
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
                </Paper>
            </Box>
        </Container>
    );
}

const initialValues = {
    name: '',
    email: '',
    password: ''
}

const checkoutSchema = yup.object().shape({
    name: yup.string().required('required'),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required('required')
});

export default CreateAccount;