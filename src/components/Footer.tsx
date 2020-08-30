import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import theme from "../values/theme";
import logo from "../assets/boardologo.png";
import {appName} from "../values/strings";
import instagram from "../assets/instagram.svg";
import rubika from "../assets/rubika.png";
import gap from "../assets/gap.png";
import aparat from "../assets/aparat.png";

export default function ({scrollRef}: {scrollRef: React.RefObject<HTMLDivElement>}) {
    const iconSize = {width: "100%", height: "100%"};
    const iconWrapper = {
        backgroundColor: "white",
        borderRadius: "50%",
        padding: 10,
        width: 40,
        height: 40,
    };

    const contact = {
        fontSize: 10,
    };

    return (
        <Container
            maxWidth={false}
            style={{
                backgroundColor: theme.palette.primary.main,
                paddingTop: 30,
                paddingBottom: 30,
                paddingRight: 100,
                paddingLeft: 100,
            }}
            ref={scrollRef}
        >
            <Grid container wrap='nowrap'>
                <Grid item container xs={4} direction='column' wrap='nowrap'>
                    <Grid item>
                        <img src={logo} alt='logo' style={{height: 50}} />
                    </Grid>
                    <Grid item>
                        <Typography color='textSecondary' style={{fontWeight: "bolder", fontSize: 18}}>
                            {appName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography color='textSecondary' style={{fontSize: 12, textAlign: "justify"}}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است لورم ایپسوم متن ساختگی با
                            تولید سادگی نامفهوم از صنعت چاپ است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                            چاپ است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6} />
                <Grid item container xs={2} direction='column' wrap='nowrap'>
                    <Grid item container wrap='nowrap' direction='row-reverse' justify='space-around'>
                        {/*  icons  */}
                        <Grid item style={{...iconWrapper}}>
                            <img src={aparat} alt='aparat' style={{...iconSize}} />
                        </Grid>
                        <Grid item style={{...iconWrapper}}>
                            <img src={instagram} alt='instagram' style={{...iconSize}} />
                        </Grid>
                        <Grid item style={{...iconWrapper}}>
                            <img src={rubika} alt='rubika' style={{...iconSize}} />
                        </Grid>
                        <Grid item style={{...iconWrapper}}>
                            <img src={gap} alt='gap' style={{...iconSize}} />
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop: 20, marginBottom: 5}}>
                        <Typography color='textSecondary' style={{fontSize: 12}}>
                            ارتباط با ما:
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 5}}>
                        <Typography color='textSecondary' style={{...contact}}>
                            آدرس: اصفهان - میدان آزادی - خیابان دانشگاه - دانشگاه اصفهان - دانشکده فنی مهندسی
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 5}}>
                        <Typography color='textSecondary' style={{...contact}}>
                            رایانامه: bordo@example.ir
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: 5}}>
                        <Typography color='textSecondary' style={{...contact}}>
                            تلفن: 12345678-031
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
