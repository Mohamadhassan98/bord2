import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    InputBase,
    Typography,
} from "@material-ui/core";
import {components, motto} from "../values/strings";
import useAuth from "../contexts/AuthContext";
import CloseIcon from "@material-ui/icons/Close";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clipboard from "../assets/clipboard.svg";
import create from "../assets/gameRoomCreated.png";
import theme from "../values/theme";
import whatsapp from "../assets/whatsapp.svg";
import play from "../assets/dice.svg";
import email from "../assets/email.svg";
import join from "../assets/startGame.gif";
import axios from "axios";
import {getPath} from "../values/connection";
import {Link as routerLink, useRouteMatch} from "react-router-dom";
import login from "../assets/goLogin.png";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        left: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
        minHeight: 300,
        minWidth: 300,
    },
}));

export default function ({
    open,
    context,
    onClose,
    slug,
    game,
}: {
    open: boolean;
    onClose: () => void;
    context: "create" | "join";
    slug: string;
    game: string;
}) {
    const {isLoggedIn} = useAuth();
    const classes = useStyles();
    return (
        <Dialog open={open} onClose={onClose} classes={{paper: classes.dialog}}>
            <DialogTitle disableTypography className={classes.root}>
                <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {!isLoggedIn ? <LoginFirst /> : <CreateOrJoinRoom context={context} slug={slug} game={game} />}
            </DialogContent>
        </Dialog>
    );
}

const CreateOrJoinRoom = ({context, slug, game}: {context: "create" | "join"; slug: string; game: string}) => {
    const {startGameDialog} = components;
    const [roomName, setRoomName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {user} = useAuth();
    const {
        params: {id},
    } = useRouteMatch<{id: string}>();
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if (context === "create") {
            axios.post(getPath("createServer", slug), {}).then((result) => {
                setPassword(result.data.password);
                setRoomName(result.data.room_name);
            });
        }
    }, [context, slug]);
    const iconSize = {width: 24, height: 24};
    const roomNameRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);
    const copyToClipboard = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
        ref.current?.select();
        document.execCommand("copy");
    };
    const body = `
سلام.
بوردو یک سایت سرگرمی برای انجام بازی های رومیزی است. ${user?.username} شما را به بازی ${game} دعوت کرده است.
با استفاده از اطلاعات زیر به بازی بپیوندید:
لینک: ${roomName}
رمز عبور: ${password}
www.boardo.ir
${motto}
`;
    const subject = "درخواست پیوستن به بازی";
    return (
        <Grid container direction='column' wrap='nowrap' alignItems='center' style={{paddingBottom: 20}}>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{startGameDialog.alert}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {startGameDialog.sharedWithFriends}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                        color='primary'
                    >
                        {startGameDialog.letMeSee}
                    </Button>
                    <Button color='primary' component={routerLink} to={`/game/${id}/play`}>
                        {startGameDialog.letsGo}
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid item>
                <img src={context === "create" ? create : join} alt='create/join room' style={{height: 200}} />
            </Grid>
            <Grid item style={{marginTop: 15}}>
                <Typography style={{fontWeight: "bold", fontSize: 22}}>{startGameDialog[context].title}</Typography>
            </Grid>
            <Grid item>
                <Typography noWrap>{startGameDialog[context].content}</Typography>
            </Grid>
            <Grid item container wrap='nowrap' style={{marginTop: 20}}>
                <Grid
                    item
                    style={{
                        backgroundColor: theme.palette.secondary.main,
                        width: 100,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                    }}
                >
                    <Typography noWrap color='textSecondary'>
                        {startGameDialog.link}
                    </Typography>
                </Grid>
                <InputBase
                    id='link'
                    fullWidth
                    style={{
                        border: `1px solid ${theme.palette.secondary.main}`,
                        backgroundColor: theme.palette.secondary.light,
                        borderTopLeftRadius: context === "join" ? 5 : undefined,
                        borderBottomLeftRadius: context === "join" ? 5 : undefined,
                    }}
                    value={roomName}
                    onChange={({target: {value}}) => {
                        if (context === "join") {
                            setRoomName(value);
                        }
                    }}
                    inputRef={roomNameRef}
                />
                {context === "create" && (
                    <Button
                        style={{
                            backgroundColor: theme.palette.secondary.main,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                            width: 50,
                        }}
                        onClick={() => copyToClipboard(roomNameRef)}
                    >
                        <img src={clipboard} alt='clipboard' style={{...iconSize}} />
                    </Button>
                )}
            </Grid>
            <Grid item container wrap='nowrap' style={{marginTop: 10}}>
                <Grid
                    item
                    style={{
                        backgroundColor: theme.palette.secondary.main,
                        width: 100,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                    }}
                >
                    <Typography noWrap color='textSecondary'>
                        {startGameDialog.password}
                    </Typography>
                </Grid>
                <InputBase
                    id='password'
                    fullWidth
                    style={{
                        border: `1px solid ${theme.palette.secondary.main}`,
                        backgroundColor: theme.palette.secondary.light,
                        borderTopLeftRadius: context === "join" ? 5 : undefined,
                        borderBottomLeftRadius: context === "join" ? 5 : undefined,
                    }}
                    value={password}
                    onChange={({target: {value}}) => {
                        if (context === "join") {
                            setPassword(value);
                        }
                    }}
                    inputRef={passwordRef}
                />
                {context === "create" && (
                    <Button
                        style={{
                            backgroundColor: theme.palette.secondary.main,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                        onClick={() => copyToClipboard(passwordRef)}
                    >
                        <img src={clipboard} alt='clipboard' style={{...iconSize}} />
                    </Button>
                )}
            </Grid>
            <Grid
                item
                container={context === "create"}
                wrap={context === "create" ? "nowrap" : undefined}
                spacing={context === "create" ? 2 : undefined}
                style={{marginTop: 20, width: context === "join" ? "100%" : undefined}}
            >
                {context === "create" ? (
                    <>
                        <Grid item xs={4}>
                            <Button
                                variant='contained'
                                style={{
                                    backgroundColor: theme.palette.success.dark,
                                    color: theme.palette.text.secondary,
                                    display: "inline-flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                }}
                                endIcon={<img src={play} alt='play' style={{...iconSize}} />}
                                fullWidth
                            >
                                {startGameDialog.startGame}
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant='contained'
                                style={{
                                    backgroundColor: "#dd4d40",
                                    color: theme.palette.text.secondary,
                                    display: "inline-flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                }}
                                endIcon={<img src={email} alt='email' style={{...iconSize}} />}
                                fullWidth
                                href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                                target='_self'
                                rel='noopener'
                            >
                                {startGameDialog.share}
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant='contained'
                                style={{
                                    backgroundColor: "#1a8478",
                                    color: theme.palette.text.secondary,
                                    display: "inline-flex",
                                    justifyContent: "space-around",
                                }}
                                endIcon={<img src={whatsapp} alt='whatsapp' style={{...iconSize}} />}
                                fullWidth
                                href={`whatsapp://send?text=${encodeURIComponent(`${subject}\n${body}`)}`}
                                target='_blank'
                                rel='noopener'
                            >
                                {startGameDialog.share}
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <Button
                        variant='contained'
                        style={{backgroundColor: theme.palette.success.dark, color: theme.palette.text.secondary}}
                        fullWidth
                        component={routerLink}
                        to={`/game/${id}/play`}
                    >
                        {startGameDialog.startGame}
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

const LoginFirst = () => {
    const {startGameDialog} = components;
    return (
        <Grid container direction='column' wrap='nowrap' style={{paddingBottom: 20}}>
            <Grid item>
                <img src={login} alt='login first' style={{height: 200}} />
            </Grid>
            <Grid item style={{marginTop: 15}}>
                <Typography style={{fontWeight: "bold", fontSize: 22}}>{startGameDialog.login}</Typography>
            </Grid>
            <Grid item>
                <Typography noWrap>{startGameDialog.loginFirst}</Typography>
            </Grid>
        </Grid>
    );
};
