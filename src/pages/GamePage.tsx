import React from "react";
import {Button, Chip, Container, Grid, Link, Menu, MenuItem, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import AparatVideoPlayer from "../components/AparatVideoPlayer";
import CustomSlider from "../components/Slider";
import {pages} from "../values/strings";
import theme from "../values/theme";
import play from "../assets/play-button.svg";
import {HorizontalHiddenScroll} from "../components/HiddenScroll";
import CommentReviewCard from "../components/CommentReviewCard";
import {useHistory, useRouteMatch} from "react-router";
import axios from "axios";
import {getPath} from "../values/connection";
import {game_full} from "../types/types";
import useAuth from "../contexts/AuthContext";
import StartGameDialog from "../components/StartGameDialog";

export default function () {
    const [selectedMedia, setSelectedMedia] = React.useState(0);
    const [media, setMedia] = React.useState<string[]>([]);
    const [game, setGame] = React.useState<game_full>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    const [context, setContext] = React.useState<"join" | "create">("create");
    const {gamePage} = pages;
    const {replace} = useHistory();
    const {isLoggedIn} = useAuth();
    const {
        params: {id},
    } = useRouteMatch<{id: string}>();
    React.useEffect(() => {
        axios
            .get<game_full>(getPath("game", id))
            .then((result) => {
                setGame(result.data);
                setMedia([result.data.tutorial_video, ...(result.data.images?.map((value) => value.image) || [])]);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    replace("/404");
                }
            });
    }, [id, replace]);

    return (
        <>
            <Container style={{paddingTop: 30}}>
                <Grid container direction='column' wrap='nowrap'>
                    <Grid item container wrap='nowrap'>
                        <Grid item container direction='column' xs={6} wrap='nowrap' style={{paddingLeft: 20}}>
                            <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
                                <Grid item>
                                    <img src={game?.logo} alt='logo' style={{width: 75, height: 75}} />
                                </Grid>
                                <Grid item>
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
                                        disabled={!game?.is_active}
                                        onClick={(event) => {
                                            if (isLoggedIn) {
                                                setAnchorEl(event.currentTarget);
                                            } else {
                                                setOpen(true);
                                            }
                                        }}
                                    >
                                        {game?.is_active ? gamePage.playIt : gamePage.soon}
                                    </Button>
                                    <Menu
                                        id='simple-menu'
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setContext("create");
                                                setOpen(true);
                                            }}
                                        >
                                            {gamePage.createRoom}
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setContext("join");
                                                setOpen(true);
                                            }}
                                        >
                                            {gamePage.joinRoom}
                                        </MenuItem>
                                    </Menu>
                                    <StartGameDialog
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        context={context}
                                        slug={game?.slug || ""}
                                        game={game?.name || ""}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
                                <Grid item>
                                    <Typography style={{fontWeight: "bolder", fontSize: 20}}>{game?.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Rating value={game?.mean_vote || 0} readOnly precision={0.5} size='small' />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography align='justify'>{game?.long_description}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography component={Link} href={game?.tutorial_doc || ""}>
                                    {gamePage.downloadRulebook}
                                </Typography>
                            </Grid>
                            <Grid item container wrap='nowrap' alignItems='center' spacing={1} style={{marginTop: 20}}>
                                <Grid item>
                                    <Chip
                                        label={`${gamePage.minimumPlayers}: ${game?.min_player}`}
                                        style={{
                                            backgroundColor: theme.palette.success.light,
                                            paddingLeft: 15,
                                            color: theme.palette.text.secondary,
                                        }}
                                        icon={
                                            <ArrowDropDownIcon
                                                style={{color: theme.palette.success.dark, marginLeft: 5}}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <Chip
                                        label={`${gamePage.maximumPlayers}: ${game?.max_player}`}
                                        style={{
                                            backgroundColor: theme.palette.primary.light,
                                            paddingLeft: 15,
                                            color: theme.palette.text.secondary,
                                        }}
                                        icon={
                                            <ArrowDropUpIcon
                                                style={{color: theme.palette.primary.dark, marginLeft: 5}}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container direction='column' xs={6} wrap='nowrap' style={{paddingRight: 20}}>
                            <Grid item style={{width: "100%", height: 345}}>
                                {selectedMedia === 0 ? (
                                    <AparatVideoPlayer src={media[0]} srcType='url' />
                                ) : (
                                    <Grid
                                        item
                                        style={{
                                            height: 345,
                                            width: "100%",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img src={media[selectedMedia]} alt='preview' style={{height: "100%"}} />
                                    </Grid>
                                )}
                            </Grid>
                            <Grid item style={{marginTop: 20, marginBottom: 20}}>
                                <CustomSlider
                                    visibleSlides={6}
                                    value={selectedMedia}
                                    onChange={(index) => setSelectedMedia(index)}
                                >
                                    {media.map((value, index) => (
                                        <Grid
                                            item
                                            key={index}
                                            onClick={() => setSelectedMedia(index)}
                                            style={{
                                                backgroundColor: index === 0 ? theme.palette.text.disabled : undefined,
                                                padding: index === 0 ? 15 : 5,
                                                border:
                                                    selectedMedia === index
                                                        ? `2px solid ${theme.palette.primary.main}`
                                                        : undefined,
                                                width: 50,
                                                height: 50,
                                            }}
                                        >
                                            <img
                                                src={index === 0 ? play : value}
                                                alt={value}
                                                style={{width: "100%", height: "100%"}}
                                            />
                                        </Grid>
                                    ))}
                                </CustomSlider>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Grid
                item
                style={{
                    width: "100%",
                    marginTop: 20,
                    paddingTop: 20,
                    backgroundColor: theme.palette.secondary.main,
                }}
            >
                <HorizontalHiddenScroll>
                    <Grid
                        item
                        container
                        wrap='nowrap'
                        justify='flex-start'
                        style={{width: "100%", marginRight: 100, marginLeft: 100}}
                    >
                        {game?.comments?.map(({comment, user_avatar, user_name}, index) => (
                            <Grid item key={index} style={{marginLeft: 16, marginRight: 16}}>
                                <CommentReviewCard name={user_name} text={comment} image={user_avatar} />
                            </Grid>
                        ))}
                    </Grid>
                </HorizontalHiddenScroll>
            </Grid>
        </>
    );
}
