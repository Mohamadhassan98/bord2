import React from "react";
import {
    AppBar,
    Container,
    Grid,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    useScrollTrigger,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import pic2 from "../assets/boardologo.png";
import "./styles/Header.css";
import UserButton from "./UserButton";
import user from "../assets/user-2.svg";
import logoutIcon from "../assets/logout.svg";
import useAuth from "../contexts/AuthContext";
import {Link} from "react-router-dom";
import {routing} from "../values/routes";
import theme from "../values/theme";
import {components} from "../values/strings";
import SearchBar from "./SearchBar";
import useScrollTo from "../utils/useScrollTo";

export default function ({
    disableMargin,
    footerRef,
}: {
    disableMargin?: boolean;
    footerRef: React.RefObject<HTMLDivElement>;
}) {
    const {isLoggedIn, logout} = useAuth();
    const {header} = components;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const scrolled = useScrollTrigger({
        threshold: 0,
        disableHysteresis: true,
    });

    const scroll = useScrollTo(footerRef, {headerOffset: 86, scrollBehavior: "smooth"});

    return (
        <>
            <AppBar
                color='transparent'
                position='fixed'
                style={{borderBottomLeftRadius: 33, borderBottomRightRadius: 33}}
                elevation={0}
            >
                <Paper
                    style={{
                        width: "100%",
                        height: scrolled ? 86 : 112,
                        display: "inline-flex",
                        alignItems: "center",
                        transition: "height 500ms",
                        boxShadow: "0 3px 20px rgba(141, 141, 141, 0.38)",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 33,
                        borderBottomRightRadius: 33,
                    }}
                >
                    <Container maxWidth={false} style={{width: "100%", marginLeft: 46, marginRight: 46}}>
                        <Grid container wrap='nowrap' alignItems='center' justify='space-between'>
                            {/* whole WebHeader wrapper */}
                            <Grid item style={{display: "inline-flex"}} component={Link} to={routing.home.path}>
                                <img src={pic2} style={{width: 60, height: "100%"}} alt='logo' />
                            </Grid>
                            <Grid item container justify='space-between' wrap='nowrap' style={{marginRight: 63}}>
                                <Grid item>
                                    <Button
                                        variant='text'
                                        component={Link}
                                        to={routing.home.path}
                                        style={{fontSize: 14, fontWeight: 500, textAlign: "center"}}
                                    >
                                        {header.mainPage}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant='text'
                                        style={{fontWeight: 500, fontSize: 14, textAlign: "center"}}
                                        onClick={scroll}
                                    >
                                        {header.aboutUs}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <SearchBar />
                                </Grid>
                            </Grid>
                            {!isLoggedIn ? (
                                <Grid item container wrap='nowrap' style={{width: "auto"}}>
                                    <Grid item>
                                        <Button
                                            variant='outlined'
                                            component={Link}
                                            to={routing.login.path}
                                            style={{
                                                marginRight: 11,
                                                marginLeft: 11,
                                                width: 109,
                                                height: 48,
                                                border: `1px solid ${theme.palette.primary.dark}`,
                                                borderRadius: 24,
                                                fontWeight: 500,
                                                color: theme.palette.primary.dark,
                                                fontSize: 16,
                                            }}
                                        >
                                            {header.login}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            component={Link}
                                            to={routing.signUp.path}
                                            style={{
                                                width: 109,
                                                height: 48,
                                                borderRadius: 24,
                                                fontWeight: 500,
                                                fontSize: 16,
                                            }}
                                        >
                                            {header.signUp}
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid item style={{marginLeft: 30, marginRight: 30}}>
                                    <UserButton
                                        responsive='web'
                                        onClick={(event: React.MouseEvent<HTMLElement>) =>
                                            setAnchorEl(event.currentTarget)
                                        }
                                    />
                                    <Menu
                                        id='simple-menu'
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        PaperProps={{
                                            style: {marginTop: 46, borderRadius: 13},
                                        }}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        MenuListProps={{style: {paddingTop: 0, paddingBottom: 0}}}
                                    >
                                        <MenuItem
                                            component={Link}
                                            to={routing.profile.path}
                                            onClick={() => setAnchorEl(null)}
                                        >
                                            <ListItemIcon style={{minWidth: 0, marginRight: 8}}>
                                                <img src={user} alt='user' />
                                            </ListItemIcon>
                                            <ListItemText primary={header.profile} />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl(null);
                                                logout();
                                            }}
                                        >
                                            <ListItemIcon style={{minWidth: 0, marginRight: 8}}>
                                                <img src={logoutIcon} alt='logout' />
                                            </ListItemIcon>
                                            <ListItemText primary={header.exit} />
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </Paper>
            </AppBar>
            {!disableMargin && <div style={{height: scrolled ? 86 : 112, transition: "height 500ms"}} />}
        </>
    );
}
