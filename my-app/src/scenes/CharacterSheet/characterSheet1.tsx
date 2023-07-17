import {Box, Container, Grid, IconButton, Paper, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { ref, set } from "firebase/database";
import database from "../../config/config";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CharacterSheet1 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleFormSubmit = (values: any) => {
        set(ref(database, 'users/' + values.name), {
            name: values.name,
            email: values.email,
            password: values.password
        }).then(() => { });
        navigate("/");
    }



    return (
        <Container>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Paper
                    elevation={4}
                    sx={{
                        padding: 5,
                        background: colors.primary[400],
                        width: 1000
                    }}
                >
                    <Grid container direction={"column"}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleFormSubmit}
                            validationSchema={checkoutSchema}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleBlur,
                                  handleChange,
                                  handleSubmit
                              }) => (
                                <form onSubmit={handleSubmit}>

                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" sx={{mr: 2}} color={colors.grey[100]}>
                                                Dexterity
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton>
                                                <RemoveIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6" sx={{mr: 2}} color={colors.grey[100]}>
                                                {values.dexterity}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton>
                                                <AddIcon/>
                                            </IconButton>
                                        </Grid>
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
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
}

const checkoutSchema = yup.object().shape({

});

export default CharacterSheet1;
