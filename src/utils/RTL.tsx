import React from "react";
import {create} from "jss";
import {jssPreset, StylesProvider} from "@material-ui/core/styles";
import rtl from "jss-rtl";

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

export default function RTL(props: {children: JSX.Element}) {
    return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
