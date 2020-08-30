import React from "react";
import {Chip, Container, Grid, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import AparatVideoPlayer from "../components/AparatVideoPlayer";
import CustomSlider from "../components/Slider";
import catan from "../assets/catanbig.jpg";
import {pages} from "../values/strings";
import theme from "../values/theme";

export default function () {
    const [selectedMedia, setSelectedMedia] = React.useState<number>(0);
    const {gamePage} = pages;
    return (
        <Container style={{paddingTop: 30}}>
            <Grid container direction='column' wrap='nowrap'>
                <Grid item container wrap='nowrap'>
                    <Grid item container direction='column' xs={6} wrap='nowrap' style={{paddingLeft: 20}}>
                        <Grid item>
                            <img src={catan} alt='catan' style={{width: 50, height: 50}} />
                        </Grid>
                        <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
                            <Grid item>
                                <Typography>game name</Typography>
                            </Grid>
                            <Grid item>
                                <Rating value={3} readOnly precision={0.5} size='small' />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography>game desc</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{gamePage.downloadRulebook}</Typography>
                        </Grid>
                        <Grid item container wrap='nowrap' alignItems='center'>
                            <Grid item>
                                <Chip
                                    label={gamePage.minimumPlayers}
                                    style={{backgroundColor: theme.palette.success.light, paddingLeft: 15}}
                                    icon={<ArrowDropDownIcon style={{color: theme.palette.success.dark}} />}
                                />
                            </Grid>
                            <Grid item>
                                <Chip
                                    label={gamePage.maximumPlayers}
                                    style={{backgroundColor: theme.palette.primary.light, paddingLeft: 15}}
                                    icon={<ArrowDropUpIcon style={{color: theme.palette.primary.dark}} />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' xs={6} wrap='nowrap' style={{paddingRight: 20}}>
                        <Grid item style={{width: "100%"}}>
                            <AparatVideoPlayer src='JW4wz' srcType='hash' />
                        </Grid>
                        <Grid item>
                            <CustomSlider
                                visibleSlides={6}
                                value={selectedMedia}
                                onChange={(index) => setSelectedMedia(index)}
                            >
                                <img src={catan} alt='catan' style={{width: 50, height: 50}} />
                                <img src={catan} alt='catan' style={{width: 50, height: 50}} />
                            </CustomSlider>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
