import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {pages} from "../values/strings";
import CheckBoxIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import axios, {AxiosResponse} from "axios";
import {getPath} from "../values/connection";
import {RouteComponentProps} from "react-router";
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
    checkbox: {
        fill: theme.palette.primary.main,
    },
}));

export default function SignIn({history: {push}}: RouteComponentProps) {
    const classes = useStyles();
    const {login} = pages;
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const isValid = username.trim() !== "" && password.trim() !== "";
    const onLoginPressed = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        axios
            .post<
                any,
                AxiosResponse<{
                    token: string;
                    user: {username: string; avatar: string | null; email: string; id: number};
                }>
            >(getPath("login"), {username, password})
            .then(
                ({
                    data: {
                        token,
                        user: {username, avatar},
                    },
                }) => {
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", username);
                    localStorage.setItem("avatar", avatar || "null");
                    push("/");
                }
            )
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
                        <Typography color='textPrimary'>{login.authError}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color='primary' autoFocus>
                        {login.ok}
                    </Button>
                </DialogActions>
            </Dialog>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {login.signIn}
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label={login.username}
                        name='username'
                        autoFocus
                        InputLabelProps={{classes: {root: classes.label}}}
                        value={username}
                        onChange={({target: {value}}) => setUsername(value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label={login.password}
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        InputLabelProps={{classes: {root: classes.label}}}
                        value={password}
                        onChange={({target: {value}}) => setPassword(value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value='remember'
                                color='primary'
                                icon={<CheckBoxIcon classes={{root: classes.checkbox}} />}
                            />
                        }
                        value={rememberMe}
                        onChange={(_, checked) => setRememberMe(checked)}
                        label={login.keepMeSignedIn}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={!isValid}
                        onClick={onLoginPressed}
                    >
                        {login.signIn}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                {login.forgotPassword}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {login.signUpInstead}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
