import React from "react";
import {Avatar, Card, CardContent, Grid, Typography} from "@material-ui/core";
import cry from "../assets/cry.svg";
import trophy from "../assets/trophy.svg";
import {components, getFullDate} from "../values/strings";

export interface GameHistoryCardProps {
    gameName: string;
    gameResult: boolean;
    playDate: Date;
    gameImage: string;
}

export default function ({gameImage, gameName, gameResult, playDate}: GameHistoryCardProps) {
    const {gameHistoryCard} = components;
    return (
        <Card style={{borderRadius: 15}}>
            <CardContent style={{padding: 0, width: 400, paddingLeft: 20}}>
                <Grid container wrap='nowrap' alignItems='center' justify='space-between'>
                    <Grid item>
                        <Avatar variant='square' src={gameImage} alt={gameName} style={{width: 150, height: 150}} />
                    </Grid>
                    <Grid item container direction='column' wrap='nowrap' style={{width: "min-content"}}>
                        <Grid item style={{width: "min-content"}}>
                            <Typography display='inline' noWrap style={{fontWeight: "bold"}}>
                                {gameName}
                            </Typography>
                        </Grid>
                        <Grid item style={{width: "min-content"}}>
                            <Typography display='inline' noWrap style={{color: "#D2D3D4", fontSize: 12}}>
                                {getFullDate(playDate)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' style={{width: "min-content"}} alignItems='center'>
                        <Grid item style={{width: "min-content"}}>
                            <Avatar
                                variant='square'
                                src={gameResult ? trophy : cry}
                                alt={gameResult ? "winner" : "loser"}
                            />
                        </Grid>
                        <Grid item style={{width: "min-content", marginTop: 5}}>
                            <Typography display='inline' style={{fontSize: 12, fontWeight: "bold"}}>
                                {gameResult ? gameHistoryCard.winner : gameHistoryCard.loser}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
