import React from "react";
import {IconButton, IconButtonProps} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import Carousel from "@brainhubeu/react-carousel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: 35,
        height: 35,
        padding: 0,
        color: ({disabled}: {disabled?: boolean}) => (disabled ? undefined : "white"),
        backgroundColor: ({disabled}: {disabled?: boolean}) =>
            disabled ? theme.palette.action.disabledBackground : theme.palette.primary.main,
    },
}));

function RightButton({className, ...rest}: IconButtonProps) {
    const classes = useStyles(rest);
    return (
        <IconButton className={`${classes.icon} ${className}`} {...rest}>
            <ChevronLeft />
        </IconButton>
    );
}

function LeftButton({className, ...rest}: IconButtonProps) {
    const classes = useStyles(rest);
    return (
        <IconButton className={`${classes.icon} ${className}`} {...rest}>
            <ChevronRight />
        </IconButton>
    );
}

interface SliderProps {
    children: React.ReactElement[];
    visibleSlides: number;
    onChange?: (index: number) => void;
    value?: number;
}

export default function CustomSlider({children, visibleSlides, onChange, value}: SliderProps) {
    const [index, setIndex] = React.useState(0);
    const controlled = value || index;
    React.useEffect(() => {
        onChange?.(controlled);
    }, [controlled, onChange]);
    return (
        <Carousel
            infinite={false}
            slidesPerPage={visibleSlides}
            value={controlled}
            onChange={(value) => setIndex(value)}
            rtl
            arrowLeft={
                <RightButton
                    onClick={() => {
                        if (controlled > 0) {
                            setIndex((prevState) => prevState - 1);
                        }
                    }}
                    disabled={controlled === 0 || children.length <= visibleSlides}
                />
            }
            arrowRight={
                <LeftButton
                    onClick={() => {
                        if (controlled < children.length - visibleSlides) {
                            setIndex((prevState) => prevState + 1);
                        }
                    }}
                    disabled={controlled === children.length - visibleSlides || children.length <= visibleSlides}
                />
            }
            dots={false}
            slides={children}
        />
    );
}
