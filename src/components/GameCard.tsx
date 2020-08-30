import React from "react";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import theme from "../values/theme";

export default function ({gameLogo, gameName, gameDesc}: {gameLogo: string; gameName: string; gameDesc: string}) {
    return (
        <Card style={{width: 150}}>
            <CardMedia image={gameLogo} style={{height: 200}} />
            <CardContent>
                <Typography style={{fontWeight: "bold", fontSize: 18}}>{gameName}</Typography>
                <Typography style={{fontSize: 12, textAlign: "justify", color: theme.palette.text.disabled}}>
                    {gameDesc}
                </Typography>
            </CardContent>
        </Card>
    );
}
