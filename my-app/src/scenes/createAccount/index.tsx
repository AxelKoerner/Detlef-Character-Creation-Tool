import {Box, Button, Container, Grid, Paper, TextField, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import any = jasmine.any;

const CreateAccount = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    function submitForm(event: { preventDefault: () => void; } | undefined) {
        console.log(event);
        //TODO speichern in der Datenbank
        return undefined;
    }

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
                    <Grid>
                        <TextField
                            type={"text"}
                            fullWidth={true}
                            label={"Enter your Name"}
                            placeholder={"Max, Mustermann"}
                            variant={"outlined"}
                            color={"secondary"}
                            sx={{mb: 2}}>
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
                            sx={{mb: 2}}>
                        </TextField>
                    </Grid>

                    <Grid>
                        <TextField
                            type={"password"}
                            fullWidth={true}
                            label={"Enter your password"}
                            variant={"outlined"}
                            color={"secondary"}
                            sx={{mb: 2}}>
                        </TextField>
                    </Grid>

                    <Grid>
                        <Button
                            variant={"contained"}
                            fullWidth
                            href={"/dashboards"}
                            onSubmit={submitForm(undefined)} //TODO
                            sx={{color: colors.grey[100], backgroundColor: colors.blueAccent[600], ":hover": {
                                    bgcolor: colors.greenAccent[400]}
                            }}>
                            Submit
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
        </Container>
    );
}

export default CreateAccount;