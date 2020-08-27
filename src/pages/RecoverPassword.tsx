import React from "react";
import {RouteComponentProps} from "react-router";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {pages} from "../values/strings";
import axios from "axios";
import {getPath} from "../values/connection";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import {routes} from "../values/routes";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    label: {
        color: theme.palette.text.hint,
    },
}));

export default function ({
    match: {
        params: {uid, token},
    },
    history: {push},
}: RouteComponentProps<{uid: string; token: string}>) {
    const classes = useStyles();
    const {recoverPassword} = pages;
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordError, setNewPasswordError] = React.useState(" ");
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");
    const [newPasswordConfirmError, setNewPasswordConfirmError] = React.useState(" ");
    const validateFields = () => {
        let isValid = true;
        if (!/(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/.test(newPassword)) {
            setNewPasswordError(recoverPassword.passwordError);
            isValid = false;
        }
        if (newPassword !== newPasswordConfirm) {
            setNewPasswordConfirmError(recoverPassword.passwordConfirmError);
            isValid = false;
        }
        return isValid;
    };
    const [open, setOpen] = React.useState(false);
    const onChangePasswordClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!validateFields()) {
            return;
        }
        axios
            .post(getPath("recoverPassword"), {
                uid,
                token,
                new_password1: newPassword,
                new_password2: newPasswordConfirm,
            })
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    };
    const errorOff = () => {
        setNewPasswordError(" ");
        setNewPasswordConfirmError(" ");
    };
    const basicallyValid = newPassword.trim() !== "" && newPasswordConfirm.trim() !== "";
    return (
        <Container component='main' maxWidth='xs'>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        <Typography color='textPrimary'>{recoverPassword.passwordChanged}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            push(routes.login);
                        }}
                        color='primary'
                        autoFocus
                    >
                        {recoverPassword.ok}
                    </Button>
                </DialogActions>
            </Dialog>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    {recoverPassword.changePassword}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='newPassword'
                                label={recoverPassword.newPassword}
                                name='newPassword'
                                autoComplete='newPassword'
                                autoFocus
                                type='password'
                                InputLabelProps={{classes: {root: classes.label}}}
                                value={newPassword}
                                onChange={({target: {value}}) => setNewPassword(value)}
                                error={newPasswordError !== " "}
                                helperText={newPasswordError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='newPasswordConfirm'
                                label={recoverPassword.newPasswordConfirm}
                                name='newPasswordConfirm'
                                type='password'
                                autoComplete='newPasswordConfirm'
                                InputLabelProps={{classes: {root: classes.label}}}
                                value={newPasswordConfirm}
                                onChange={({target: {value}}) => setNewPasswordConfirm(value)}
                                error={newPasswordConfirmError !== " "}
                                helperText={newPasswordConfirmError}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={!basicallyValid}
                        onClick={onChangePasswordClicked}
                        onBlur={errorOff}
                    >
                        {recoverPassword.changePassword}
                    </Button>
                </form>
            </div>
        </Container>
    );
}
