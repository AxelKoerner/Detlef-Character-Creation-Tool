import React from 'react';
import { ref, set, getDatabase } from 'firebase/database';
import {Box, Button, Container, Grid, Paper, TextField, Typography, useTheme} from "@mui/material";
import {Formik} from "formik";
import {tokens} from "../../theme";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

const LineageForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();


    const handleFormSubmit = async (values: any) => {
        const db = getDatabase();
        try {
            const abilityFieldRef = ref(db, `Lineage/${values.lineageName}/Abilities/${values.abilityName}`);

            await set(abilityFieldRef, values.abilityValue);
            console.log(`Ability ${values.abilityName} saved successfully!`);

            const sizeRef = ref(db, `Lineage/${values.lineageName}/Size`);
            await set(sizeRef, values.size);
            console.log('Size saved successfully!');

            const speedRef = ref(db, `Lineage/${values.lineageName}/Speed`);
            await set(speedRef, values.size);
            console.log('Speed saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
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
                  Lineage Form
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
                                              Lineage Name
                                          </Typography>
                                      </Grid>
                                      <Grid item xs={8}>
                                          <TextField
                                              type={"text"}
                                              fullWidth={true}
                                              label={"Enter your Lineage Name"}
                                              placeholder={"Lineage Name"}
                                              variant={"outlined"}
                                              color={"secondary"}
                                              sx={{mb: 2}}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              value={values.lineageName}
                                              name={'lineageName'}
                                              error={!!touched.lineageName && !!errors.lineageName}
                                              helperText={touched.lineageName && errors.lineageName}>
                                          </TextField>
                                      </Grid>
                                  </Grid>

                                  <Grid container>
                                      <Grid item xs={3}>
                                          <Typography variant="h5" sx={{mr: 2, mt: 2}} color={colors.grey[100]}
                                                      align={'left'}>
                                              Size
                                          </Typography>
                                      </Grid>
                                      <Grid item xs={8}>
                                          <TextField
                                              type={"text"}
                                              fullWidth={true}
                                              label={"Enter your Size"}
                                              placeholder={"Size"}
                                              variant={"outlined"}
                                              color={"secondary"}
                                              sx={{mb: 2}}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              value={values.size}
                                              name={'size'}
                                              error={!!touched.size && !!errors.size}
                                              helperText={touched.size && errors.size}>
                                          </TextField>
                                      </Grid>
                                  </Grid>

                                  <Grid container>
                                      <Grid item xs={3}>
                                          <Typography variant="h5" sx={{mr: 2, mt: 2}} color={colors.grey[100]}
                                                      align={'left'}>
                                              Speed
                                          </Typography>
                                      </Grid>
                                      <Grid item xs={8}>
                                          <TextField
                                              type={"text"}
                                              fullWidth={true}
                                              label={"Enter your Speed"}
                                              placeholder={"Speed"}
                                              variant={"outlined"}
                                              color={"secondary"}
                                              sx={{mb: 2}}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              value={values.speed}
                                              name={'speed'}
                                              error={!!touched.speed && !!errors.speed}
                                              helperText={touched.speed && errors.speed}>
                                          </TextField>
                                      </Grid>
                                  </Grid>

                                  <br/>

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
                                              label={"Enter the Ability Name"}
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
                                              Ability Value
                                          </Typography>
                                      </Grid>
                                      <Grid item xs={8}>
                                          <TextField
                                              type={"text"}
                                              fullWidth={true}
                                              label={"Enter the Ability Value"}
                                              placeholder={"Ability Value"}
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
};

const initialValues = {
    lineageName: '',
    size: '',
    speed: '',
    abilityName: '',
    abilityValue: ''
}

const checkoutSchema = yup.object().shape({
    lineageName: yup.string().required('required'),
    size: yup.number().required('required'),
    speed: yup.number().required('required'),
    abilityName: yup.string().required('required'),
    abilityValue: yup.string().required('required'),
});

export default LineageForm;



