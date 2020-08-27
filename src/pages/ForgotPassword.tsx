import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {pages} from "../values/strings";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {getPath} from "../values/connection";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    label: {
        color: theme.palette.text.hint,
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const {forgotPassword} = pages;
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(" ");
    const errorOff = () => {
        setEmailError(" ");
    };
    const validate = () => {
        let isValid = true;
        if (!/^[A-Za-z]+[A-Za-z0-9._]*@[A-Za-z]+[A-Za-z0-9_]*.[A-Za-z]+[A-Za-z0-9.]$/.test(email)) {
            setEmailError(forgotPassword.emailError);
            isValid = false;
        }
        return isValid;
    };
    const basicallyValid = email.trim() !== "";
    const [open, setOpen] = React.useState(false);
    const onRecoverPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        axios
            .post(getPath("forgotPassword"), {email})
            .then(() => setOpen(true))
            .catch((error) => console.error(error));
    };
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
                        <Typography color='textPrimary'>{forgotPassword.emailSent}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color='primary' autoFocus>
                        {forgotPassword.ok}
                    </Button>
                </DialogActions>
            </Dialog>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    {forgotPassword.forgotPassword}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant='outlined'
                        autoFocus
                        required
                        fullWidth
                        id='email'
                        label={forgotPassword.emailAddress}
                        name='email'
                        autoComplete='email'
                        InputLabelProps={{classes: {root: classes.label}}}
                        value={email}
                        onChange={({target: {value}}) => setEmail(value)}
                        error={emailError !== " "}
                        helperText={emailError}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={!basicallyValid}
                        onClick={onRecoverPressed}
                        onBlur={errorOff}
                    >
                        {forgotPassword.recover}
                    </Button>
                </form>
            </div>
        </Container>
    );
}
