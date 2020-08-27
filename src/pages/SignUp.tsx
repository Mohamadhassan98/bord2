import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {pages} from "../values/strings";
import CustomSlider from "../components/Slider";
import axios from "axios";
import {getPath} from "../values/connection";
import {RouteComponentProps} from "react-router";

type avatar = {name: string; avatar: string; id: number};

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
    selectedAvatar: {
        border: `solid ${theme.palette.primary.main}`,
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

export default function SignUp({history: {push}}: RouteComponentProps) {
    const classes = useStyles();
    const {signUp} = pages;
    const [username, setUsername] = React.useState("");
    const [usernameError, setUsernameError] = React.useState(" ");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(" ");
    const [password, setPassword] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(" ");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [passwordConfirmError, setPasswordConfirmError] = React.useState(" ");
    const [avatars, setAvatars] = React.useState<avatar[]>([]);
    const [selectedAvatar, setSelectedAvatar] = React.useState<number>();
    const validateFields = () => {
        let isValid = true;
        if (!/^[A-Za-z]+[A-Za-z0-9._]*@[A-Za-z]+[A-Za-z0-9_]*.[A-Za-z]+[A-Za-z0-9.]$/.test(email)) {
            setEmailError(signUp.emailError);
            isValid = false;
        }
        if (!/(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/.test(password)) {
            setPasswordError(signUp.passwordError);
            isValid = false;
        }
        if (password !== passwordConfirm) {
            setPasswordConfirmError(signUp.passwordConfirmError);
            isValid = false;
        }
        return isValid;
    };
    const isBasicallyValid =
        email.trim() !== "" && password.trim() !== "" && passwordConfirm.trim() !== "" && username.trim() !== "";
    const onSignUpClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!validateFields()) {
            return;
        }
        axios
            .post(getPath("register"), {
                username,
                password1: password,
                password2: passwordConfirm,
                avatar: selectedAvatar,
                email,
            })
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

    const errorOff = () => {
        setUsernameError(" ");
        setPasswordConfirmError(" ");
        setPasswordError(" ");
        setEmailError(" ");
    };
    React.useEffect(() => {
        axios
            .get<avatar[]>(getPath("avatars"))
            .then(({data}) => {
                setAvatars(data);
                setSelectedAvatar(data[0].id);
            })
            .catch((error) => console.error(error));
    }, []);
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {signUp.signUp}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='username'
                                label={signUp.username}
                                name='username'
                                autoComplete='username'
                                autoFocus
                                InputLabelProps={{classes: {root: classes.label}}}
                                value={username}
                                onChange={({target: {value}}) => setUsername(value)}
                                error={usernameError !== " "}
                                helperText={usernameError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label={signUp.emailAddress}
                                name='email'
                                autoComplete='email'
                                InputLabelProps={{classes: {root: classes.label}}}
                                value={email}
                                onChange={({target: {value}}) => setEmail(value)}
                                error={emailError !== " "}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label={signUp.password}
                                type='password'
                                id='password'
                                InputLabelProps={{classes: {root: classes.label}}}
                                value={password}
                                onChange={({target: {value}}) => setPassword(value)}
                                error={passwordError !== " "}
                                helperText={passwordError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='passwordConfirm'
                                label={signUp.passwordConfirm}
                                type='password'
                                id='passwordConfirm'
                                InputLabelProps={{classes: {root: classes.label}}}
                                value={passwordConfirm}
                                onChange={({target: {value}}) => setPasswordConfirm(value)}
                                error={passwordConfirmError !== " "}
                                helperText={passwordConfirmError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomSlider visibleSlides={5}>
                                {avatars.map(({avatar, id, name}) => (
                                    <div
                                        key={id}
                                        style={{
                                            width: 58,
                                            height: 58,
                                            display: "inline-flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "50%",
                                            borderWidth: 2,
                                            backgroundColor: "white",
                                        }}
                                        className={selectedAvatar === id ? classes.selectedAvatar : undefined}
                                    >
                                        <img
                                            src={avatar}
                                            alt={name}
                                            onClick={() => setSelectedAvatar(id)}
                                            style={{width: 50, height: 50}}
                                        />
                                    </div>
                                ))}
                            </CustomSlider>
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onClick={onSignUpClicked}
                        disabled={!isBasicallyValid}
                        onBlur={errorOff}
                    >
                        {signUp.signUp}
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {signUp.loginInstead}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
