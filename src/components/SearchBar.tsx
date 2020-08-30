import React from "react";
import {Autocomplete} from "@material-ui/lab";
import {CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {game_summary} from "../types/types";
import SearchIcon from "@material-ui/icons/Search";
import {components} from "../values/strings";
import {getPath} from "../values/connection";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("xs")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.light,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: 400,
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: theme.palette.text.primary,
        marginRight: 30,
        marginTop: -10,
        marginBottom: -10,
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "transparent",
            },
            "&:hover fieldset": {
                borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
                borderColor: "transparent",
            },
        },
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        color: theme.palette.text.primary,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("xs")]: {
            width: 200,
        },
        borderRadius: 5,
        borderColor: "transparent",
    },
    input: {
        "&::placeholder": {
            color: theme.palette.text.primary,
        },
        color: theme.palette.text.primary,
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    offset: theme.mixins.toolbar,
    icons: {
        color: theme.palette.text.disabled,
    },
    logo: {
        color: theme.palette.text.secondary,
        cursor: "pointer",
    },
    button: {
        color: theme.palette.text.secondary,
        cursor: "pointer",
    },
    customBadge: {
        backgroundColor: theme.palette.secondary.dark,
        color: "white",
    },
    innerToolbar: {
        backgroundColor: theme.palette.primary.light,
    },
}));

export default function () {
    const classes = useStyles();
    const [searchOptionsOpen, setSearchOptionsOpen] = React.useState(false);
    const [searchOptions, setSearchOptions] = React.useState<game_summary[]>([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchLoading, setSearchLoading] = React.useState(false);
    const {searchBar} = components;
    React.useEffect(() => {
        setSearchOptions([]);
        if (searchQuery.toString().length >= 3) {
            setSearchLoading(true);
            axios
                .get(getPath("games", searchQuery))
                .then((response) => {
                    setSearchOptions(response.data);
                })
                .finally(() => {
                    setSearchLoading(false);
                });
        }
    }, [searchQuery]);

    return (
        <div className={classes.search}>
            <Autocomplete
                open={searchOptionsOpen}
                onOpen={() => setSearchOptionsOpen(true)}
                onClose={() => setSearchOptionsOpen(false)}
                freeSolo
                id='gameSearch'
                inputValue={searchQuery}
                onInputChange={(event, value) => setSearchQuery(value)}
                options={searchOptions}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => console.log(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={searchBar.placeHolder}
                        margin='none'
                        variant='outlined'
                        classes={{
                            root: classes.inputRoot,
                        }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon className={classes.icons} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <React.Fragment>
                                    {searchLoading ? <CircularProgress color='inherit' size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                            classes: {
                                input: classes.input,
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: "white",
                            },
                        }}
                        fullWidth
                    />
                )}
            />
        </div>
    );
}
