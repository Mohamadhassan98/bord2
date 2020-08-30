import user from "../assets/user.svg";
import React, {ElementType} from "react";
import {Button, ButtonProps, Grid} from "@material-ui/core";
import arrow from "../assets/drop-down-arrow.svg";

export default function UserButton({
    responsive,
    ...otherProps
}: {responsive: "web" | "mobile"; component?: ElementType} & ButtonProps) {
    return (
        <>
            {responsive === "mobile" ? (
                <Button
                    className='w-42px h-36px rounded-17px bg-primary-lighter inline-flex justify-center items-center'
                    {...otherProps}
                >
                    <img src={user} className='w-24px h-24px' alt='user' />
                </Button>
            ) : (
                <Button {...otherProps} style={{padding: 0}}>
                    <Grid
                        container
                        justify='space-evenly'
                        alignItems='center'
                        style={{width: 79, height: 42, borderRadius: 24, backgroundColor: "rgba(255,54,74,0.15)"}}
                    >
                        <Grid item>
                            <img src={arrow} style={{width: 10, height: 5}} alt='drop down arrow' />
                        </Grid>
                        <Grid item style={{display: "inline-flex"}}>
                            <img src={user} style={{width: 20, height: 20}} alt='user' />
                        </Grid>
                    </Grid>
                </Button>
            )}
        </>
    );
}
