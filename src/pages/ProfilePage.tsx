import React from "react";
import {Avatar, Button, CardContent, Container, Divider, Grid, Typography} from "@material-ui/core";
import GameHistoryCard from "../components/GameHistoryCard";
import useAuth from "../contexts/AuthContext";
import {pages} from "../values/strings";
import {HorizontalHiddenScroll} from "../components/HiddenScroll";
import {Link} from "react-router-dom";
import {routes} from "../values/routes";

export default function () {
    const {user} = useAuth();
    const {avatar_detail, email, username} = user!;
    const {profilePage} = pages;
    return (
        <Container maxWidth='lg'>
            <Grid container direction='column' wrap='nowrap'>
                <Grid item xs={12}>
                    <div style={{padding: 20, width: "100%"}}>
                        <CardContent style={{width: "100%"}}>
                            <Grid container direction='column' wrap='nowrap' alignItems='center'>
                                <Grid item container wrap='nowrap' direction='column' alignItems='center'>
                                    <Grid item style={{width: "min-content"}}>
                                        <Avatar
                                            variant='circle'
                                            src={avatar_detail.avatar}
                                            style={{
                                                width: 256,
                                                height: 256,
                                                border: "solid 5px white",
                                                boxShadow: "2px 0px black",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Divider
                                            style={{
                                                width: 100,
                                                backgroundColor: "#3366CC",
                                                marginBottom: 20,
                                                marginTop: 20,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        direction='column'
                                        wrap='nowrap'
                                        alignItems='center'
                                        style={{width: "min-content"}}
                                    >
                                        <Grid item style={{width: "min-content", marginTop: 20, marginBottom: 10}}>
                                            <Typography
                                                display='inline'
                                                style={{fontSize: 40, textShadow: "1px 1px black", color: "#66CCFF"}}
                                            >
                                                {username}
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{width: "min-content", marginTop: 20, marginBottom: 10}}>
                                            <Typography display='inline' color='textPrimary' style={{fontSize: 20}}>
                                                {email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        component={Link}
                                        to={routes.editProfile}
                                    >
                                        {profilePage.editInfo}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </div>
                </Grid>
                <Grid item container direction='column' wrap='nowrap'>
                    <Grid item>
                        <Typography display='inline' noWrap color='textPrimary'>
                            {profilePage.latestPlayedGame}
                        </Typography>
                    </Grid>
                    <Grid item style={{width: "100%", marginBottom: 20, marginTop: 20}}>
                        <HorizontalHiddenScroll>
                            <Grid item container wrap='nowrap' justify='space-between' style={{width: "100%"}}>
                                {user?.games.map(({date, game_event, game_logo, game_name, is_winner}) => (
                                    <Grid item key={game_event} style={{marginLeft: 16, marginRight: 16}}>
                                        <GameHistoryCard
                                            gameImage={game_logo}
                                            gameName={game_name}
                                            playDate={new Date(date)}
                                            gameResult={is_winner}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </HorizontalHiddenScroll>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
