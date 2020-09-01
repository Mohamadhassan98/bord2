import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import theme from "../values/theme";
import {useHistory} from "react-router";

export default function ({
    gameLogo,
    gameName,
    gameDesc,
    id,
}: {
    gameLogo: string;
    gameName: string;
    gameDesc: string;
    id: number;
}) {
    const {push} = useHistory();
    return (
        <Card style={{width: 150}}>
            <CardActionArea onClick={() => push(`/game/${id}`)}>
                <CardMedia image={gameLogo} style={{height: 200}} />
                <CardContent>
                    <Typography style={{fontWeight: "bold", fontSize: 18}}>{gameName}</Typography>
                    <Typography
                        style={{fontSize: 12, textAlign: "justify", color: theme.palette.text.disabled, height: 150}}
                    >
                        {gameDesc}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
