import React from "react";
import {Button, Container, Divider, Grid, Typography} from "@material-ui/core";
import landing from "../assets/landing.png";
import theme from "../values/theme";
import {pages} from "../values/strings";
import {HorizontalHiddenScroll} from "../components/HiddenScroll";
import GameCard from "../components/GameCard";
import useScrollTo from "../utils/useScrollTo";
import axios from "axios";
import {game_summary} from "../types/types";
import {getPath} from "../values/connection";

export default function () {
    const {home} = pages;
    React.useEffect(() => {
        axios
            .get(getPath("games"))
            .then((result) => setGames(result.data))
            .catch((error) => console.error(error));
    }, []);
    const ref = React.useRef<HTMLDivElement | null>(null);
    const scroll = useScrollTo(ref, {headerOffset: 86, scrollBehavior: "smooth"});
    const [games, setGames] = React.useState<game_summary[]>([]);
    return (
        <Container maxWidth={false} disableGutters>
            <Grid container direction='column' wrap='nowrap'>
                <Grid item container xs={12} wrap='nowrap' style={{paddingTop: 50, paddingRight: 50, paddingLeft: 50}}>
                    <Grid
                        item
                        container
                        direction='column'
                        xs={5}
                        style={{
                            paddingLeft: 50,
                            paddingRight: 50,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Grid item style={{alignSelf: "flex-start"}}>
                            <Typography style={{fontWeight: "bold", fontSize: 28}}>لورم ایپسوم</Typography>
                        </Grid>
                        <Grid item style={{marginTop: 20}}>
                            <Typography align='justify'>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                                است
                            </Typography>
                        </Grid>
                        <Grid item style={{alignSelf: "flex-start", marginTop: 20}}>
                            <Button
                                variant='contained'
                                style={{
                                    backgroundColor: theme.palette.success.main,
                                    borderColor: theme.palette.success.dark,
                                    color: theme.palette.text.secondary,
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                    fontWeight: "bold",
                                    paddingLeft: 25,
                                    paddingRight: 25,
                                }}
                                onClick={scroll}
                            >
                                {home.playIt}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Divider
                            orientation='vertical'
                            style={{width: 6, height: 400, backgroundColor: theme.palette.secondary.light}}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <img src={landing} alt='landing' style={{width: "100%"}} />
                    </Grid>
                </Grid>
                <Grid item style={{paddingTop: 75, marginRight: 50}} ref={ref}>
                    <Typography style={{fontWeight: "bold", fontSize: 28}}>لورم ایپسوم</Typography>
                </Grid>
                <Grid item style={{marginTop: 20, marginBottom: 50, marginRight: 50}}>
                    <Typography>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است
                    </Typography>
                </Grid>
                <Grid item style={{backgroundColor: theme.palette.secondary.light, width: 200, height: 300}} />
                <Grid item style={{transform: "translateY(-250px)", marginRight: 100, marginBottom: -200}}>
                    <HorizontalHiddenScroll>
                        <Grid item container wrap='nowrap' style={{width: "100%"}}>
                            {games.map(({description, id, logo, name}) => (
                                <Grid item key={id} style={{marginLeft: 16, marginRight: 16}}>
                                    <GameCard gameName={name} gameDesc={description} gameLogo={logo} id={id} />
                                </Grid>
                            ))}
                        </Grid>
                    </HorizontalHiddenScroll>
                </Grid>
            </Grid>
        </Container>
    );
}
