import {Overrides as CoreOverrides} from "@material-ui/core/styles/overrides";
import {RatingClassKey} from "@material-ui/lab/Rating";
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import {createMuiTheme} from "@material-ui/core";
import {PaginationClassKey} from "@material-ui/lab";

interface Overrides extends CoreOverrides {
    MuiRating?: Partial<Record<RatingClassKey, CSSProperties | (() => CSSProperties)>> | undefined;
    MuiPaginationItem?: Partial<Record<PaginationClassKey, CSSProperties | (() => CSSProperties)>> | undefined;
}

const overrides: Overrides = {
    MuiLink: {
        underlineHover: {
            textDecoration: "none !important",
        },
    },
    MuiButton: {
        root: {
            minWidth: "unset",
            boxShadow: "none",
        },
        contained: {
            boxShadow: "none",
        },
    },
    MuiRating: {
        root: {
            flip: false,
            textAlign: "left",
            direction: "ltr",
        },
    },
    MuiPaginationItem: {
        root: {
            minWidth: "unset",
        },
    },
    MuiChip: {
        label: {
            paddingRight: "unset",
            paddingLeft: "unset",
        },
    },
    MuiListItemIcon: {
        root: {
            minWidth: "unset",
        },
    },
};

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            light: "#FE5F6F",
            main: "#FF364A",
            dark: "#E7301C",
        },
        secondary: {
            light: "#f2edff",
            main: "#DBCCFF",
        },
        success: {
            light: "#d0ec8b",
            main: "#ace233",
            dark: "#8bc605",
        },
        text: {
            primary: "#000000",
            secondary: "#FFFFFF",
            disabled: "#8D8D8D",
        },
    },
    direction: "rtl",
    typography: {
        fontFamily: "iranyekan",
        fontWeightMedium: 500,
        fontWeightRegular: "normal",
        fontWeightBold: "bold",
    },
    overrides,
    props: {
        MuiAvatar: {
            variant: "square",
        },
    },
});

export default theme;
