import React from "react";
import {Avatar, Card, CardContent, Grid, Typography} from "@material-ui/core";

export interface CommentReviewCardProps {
    image: string;
    name: string;
    text: string;
}

export default function ({image, name, text}: CommentReviewCardProps) {
    return (
        <Card style={{width: 300, height: 200, display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
            <CardContent>
                <Grid container direction='column' wrap='nowrap' alignItems='center'>
                    <Grid item>
                        <Avatar src={image} alt='user' style={{width: 50, height: 50}} />
                    </Grid>
                    <Grid item style={{marginTop: 10}}>
                        <Typography style={{fontWeight: "bold", fontSize: 14}} noWrap>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{fontSize: 12}} align='center'>
                            {text}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
