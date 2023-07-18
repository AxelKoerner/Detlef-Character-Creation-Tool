import {Box, Button, Container, Grid, Paper, TextField, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup";
import {getDatabase, ref, set} from "firebase/database";


const CustomBackground = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleFormSubmit = async (values: any) => {
        const db = getDatabase();
        const backgroundRef = ref(db, `Background/${values.backgroundName}/Abilities/${values.abilityName}`);
        const equipmentFieldRef = ref(
            db,
            `Background/${values.backgroundName}/Equipment/${values.equipmentId}`
        );
        try {
            await set(backgroundRef, values.abilityValue);
            console.log('Ability data saved successfully!');
        } catch (error) {
            console.error('Error saving ability data:', error);
        }

        try {
            await set(equipmentFieldRef, values.equipmentId);
            console.log(`Equipment ${values.equipmentId} saved successfully!`);
        } catch (error) {
            console.error(`Error saving equipment ${values.equipmentId}:`, error);
        }
        navigate("/dashboards");
    }


    return (
        <Container>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{flexDirection: 'column'}}>
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
                    Background Form
                </Typography>
                <Paper
                    elevation={4}
                    sx={{
                        padding: 5,
                        background: colors.primary[400],
                        width: 800
                    }}
                >
                    <Grid container direction={"column"} justifyContent={'center'}>
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
                                        <Grid item xs={3}>
                                            <Typography variant="h5" sx={{mr: 2, mt: 2}} color={colors.grey[100]}
                                                        align={'left'}>
                                                Background Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                type={"text"}
                                                fullWidth={true}
                                                label={"Enter your Background Name"}
                                                placeholder={"Background Name"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.backgroundName}
                                                name={'backgroundName'}
                                                error={!!touched.backgroundName && !!errors.backgroundName}
                                                helperText={touched.backgroundName && errors.backgroundName}>
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography variant="h5" sx={{mr: 2, mt: 2}} color={colors.grey[100]}
                                                        align={'left'}>
                                                Ability Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                type={"text"}
                                                fullWidth={true}
                                                label={"Enter your Ability Name"}
                                                placeholder={"Ability Name"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.abilityName}
                                                name={'abilityName'}
                                                error={!!touched.abilityName && !!errors.abilityName}
                                                helperText={touched.abilityName && errors.abilityName}>
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography variant="h5" sx={{mr: 2, mt: 2}} color={colors.grey[100]}
                                                        align={'left'}>
                                                Ability Values
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                type={"text"}
                                                fullWidth={true}
                                                label={"Enter your Ability Values"}
                                                placeholder={"Ability Values"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.abilityValue}
                                                name={'abilityValue'}
                                                error={!!touched.abilityValue && !!errors.abilityValue}
                                                helperText={touched.abilityValue && errors.abilityValue}>
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <br/>

                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography variant="h5" sx={{mr: 2, mt: 2}} color={colors.grey[100]}
                                                        align={'left'}>
                                                Equipment
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                type={"text"}
                                                fullWidth={true}
                                                label={"Enter the Equipment Name"}
                                                placeholder={"Equipment Name"}
                                                variant={"outlined"}
                                                color={"secondary"}
                                                sx={{mb: 2}}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.equipmentId}
                                                name={'equipmentId'}
                                                error={!!touched.equipmentId && !!errors.equipmentId}
                                                helperText={touched.equipmentId && errors.equipmentId}>
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="column"
                                          justifyContent="center">
                                        <Grid item xs={6} sx={{mt: 6, ml: 15, mr: 15}}>
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
    backgroundName: '',
    abilityName: '',
    abilityValue: '',
    equipmentId: ''

}

const checkoutSchema = yup.object().shape({
    backgroundName: yup.string().required('required'),
    abilityName: yup.string().required('required'),
    abilityValue: yup.string().required('required'),
    equipmentId: yup.string().required('required')
});

export default CustomBackground;