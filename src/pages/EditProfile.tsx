import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {pages} from "../values/strings";
import axios from "axios";
import {getPath} from "../values/connection";
import CustomSlider from "../components/Slider";
import {avatar} from "../types/types";
import useAuth from "../contexts/AuthContext";

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

export default function () {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {user, updateUser} = useAuth();
    const {editProfile} = pages;
    const [dialogMessage, setDialogMessage] = React.useState("");
    const [email, setEmail] = React.useState(user!.email);
    const [emailError, setEmailError] = React.useState(" ");
    const [avatars, setAvatars] = React.useState<avatar[]>([]);
    const [selectedAvatar, setSelectedAvatar] = React.useState<number>();
    const [oldPassword, setOldPassword] = React.useState("");
    const [oldPasswordError, setOldPasswordError] = React.useState(" ");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordError, setNewPasswordError] = React.useState(" ");
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");
    const [newPasswordConfirmError, setNewPasswordConfirmError] = React.useState(" ");
    const profileIsBasicallyValid = email.trim() !== "";

    React.useEffect(() => {
        axios
            .get<avatar[]>(getPath("avatars"))
            .then(({data}) => {
                setAvatars(data);
                setSelectedAvatar(user?.avatar_detail.id);
            })
            .catch((error) => console.error(error));
    }, [user]);

    const validateChangePasswordFields = () => {
        let isValid = true;
        if (!/(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/.test(newPassword)) {
            setNewPasswordError(editProfile.passwordError);
            isValid = false;
        }
        if (newPassword !== newPasswordConfirm) {
            setNewPasswordConfirmError(editProfile.passwordConfirmError);
            isValid = false;
        }
        return isValid;
    };

    const validateEditProfileFields = () => {
        let isValid = true;
        if (!/^[A-Za-z]+[A-Za-z0-9._]*@[A-Za-z]+[A-Za-z0-9_]*.[A-Za-z]+[A-Za-z0-9.]$/.test(email)) {
            setEmailError(editProfile.emailError);
            isValid = false;
        }
        return isValid;
    };

    const onEditProfileClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!validateEditProfileFields()) {
            return;
        }
        axios
            .patch(getPath("currentUser"), {
                email,
                avatar: selectedAvatar,
            })
            .then((result) => {
                updateUser(result.data);
                setDialogMessage(editProfile.profileEdited);
                setOpen(true);
            })
            .catch((error) => console.error(error));
    };
    const onChangePasswordClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!validateChangePasswordFields()) {
            return;
        }
        axios
            .post(getPath("changePassword"), {
                old_password: oldPassword,
                new_password1: newPassword,
                new_password2: newPasswordConfirm,
            })
            .then(() => {
                setDialogMessage(editProfile.passwordChanged);
                setOpen(true);
            })
            .catch((error) => console.error(error));
    };
    const errorOff = () => {
        setEmailError(" ");
        setOldPasswordError(" ");
        setNewPasswordError(" ");
        setNewPasswordConfirmError(" ");
    };
    const passwordIsBasicallyValid =
        oldPassword.trim() !== "" && newPassword.trim() !== "" && newPasswordConfirm.trim() !== "";
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
                        <Typography color='textPrimary'>{dialogMessage}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color='primary' autoFocus>
                        {editProfile.ok}
                    </Button>
                </DialogActions>
            </Dialog>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    {editProfile.editProfile}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label={editProfile.emailAddress}
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
                        onClick={onEditProfileClicked}
                        disabled={!profileIsBasicallyValid}
                        onBlur={errorOff}
                    >
                        {editProfile.editProfile}
                    </Button>
                </form>
            </div>
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    {editProfile.changePassword}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='oldPassword'
                                label={editProfile.oldPassword}
                                name='oldPassword'
                                autoComplete='oldPassword'
                                type='password'
                                InputLabelProps={{classes: {root: classes.label}}}
                                value={oldPassword}
                                onChange={({target: {value}}) => setOldPassword(value)}
                                error={oldPasswordError !== " "}
                                helperText={oldPasswordError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='newPassword'
                                label={editProfile.newPassword}
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
                                label={editProfile.newPasswordConfirm}
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
                        disabled={!passwordIsBasicallyValid}
                        onClick={onChangePasswordClicked}
                        onBlur={errorOff}
                    >
                        {editProfile.changePassword}
                    </Button>
                </form>
            </div>
        </Container>
    );
}
