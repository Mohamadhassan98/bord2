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
    withSelection?: boolean;
}

export default function CustomSlider({children, visibleSlides, onChange, value, withSelection}: SliderProps) {
    const [index, setIndex] = React.useState(0);
    const [viewPortIndex, setViewPortIndex] = React.useState(0);
    const controlledWithout = value || index;
    const controlledWith = value || index + viewPortIndex;

    const disablePrevWithSelection = controlledWithout === 0;
    const disableNextWithSelection = controlledWithout + viewPortIndex === children.length - 1;
    const disablePrevWithoutSelection = controlledWithout === 0 || children.length <= visibleSlides;
    const disableNextWithoutSelection =
        controlledWithout === children.length - visibleSlides || children.length <= visibleSlides;

    const withoutSelectionOnNextClick = () => {
        if (controlledWithout < children.length - visibleSlides) {
            setIndex((prevState) => prevState + 1);
        }
    };

    const withSelectionOnNextClick = () => {
        if (viewPortIndex === visibleSlides - 1) {
            setIndex((prevState) => prevState + 1);
            return;
        }
        setViewPortIndex((prevState) => prevState + 1);
    };

    const withoutSelectionOnPrevClick = () => {
        if (controlledWithout > 0) {
            setIndex((prevState) => prevState - 1);
        }
    };

    const withSelectionOnPrevClick = () => {
        if (viewPortIndex === 0) {
            setIndex((prevState) => prevState - 1);
            return;
        }
        setViewPortIndex((prevState) => prevState - 1);
    };

    React.useEffect(() => {
        if (withSelection) {
            onChange?.(controlledWith);
        } else {
            onChange?.(controlledWithout);
        }
    }, [controlledWith, controlledWithout, onChange, withSelection]);

    React.useEffect(() => {
        if (!value) {
            return;
        }
        if (value < index + visibleSlides && value >= index) {
            setViewPortIndex(value - index);
        } else if (value < index) {
            setViewPortIndex(0);
            setIndex(value);
        } else {
            setViewPortIndex(visibleSlides - 1);
            setIndex(value - visibleSlides + 1);
        }
    }, [index, value, visibleSlides]);

    return (
        <Carousel
            infinite={false}
            slidesPerPage={visibleSlides}
            value={index}
            onChange={(value) => setIndex(value)}
            rtl
            arrowLeft={
                <RightButton
                    onClick={withSelection ? withSelectionOnPrevClick : withoutSelectionOnPrevClick}
                    disabled={withSelection ? disablePrevWithSelection : disablePrevWithoutSelection}
                />
            }
            arrowRight={
                <LeftButton
                    onClick={withSelection ? withSelectionOnNextClick : withoutSelectionOnNextClick}
                    disabled={withSelection ? disableNextWithSelection : disableNextWithoutSelection}
                />
            }
            dots={false}
            slides={children}
        />
    );
}

const CustomBaseSlider = ({children, onChange, value, visibleSlides}: SliderProps) => {
    const [index, setIndex] = React.useState(0);
    const controlled = value || index;

    const disablePrevWithoutSelection = controlled === 0 || children.length <= visibleSlides;
    const disableNextWithoutSelection =
        controlled === children.length - visibleSlides || children.length <= visibleSlides;

    const withoutSelectionOnNextClick = () => {
        if (controlled < children.length - visibleSlides) {
            setIndex((prevState) => prevState + 1);
        }
    };

    const withoutSelectionOnPrevClick = () => {
        if (controlled > 0) {
            setIndex((prevState) => prevState - 1);
        }
    };

    React.useEffect(() => {
        onChange?.(controlled);
    }, [controlled, onChange]);
    return (
        <Carousel
            infinite={false}
            slidesPerPage={visibleSlides}
            value={index}
            onChange={(value) => setIndex(value)}
            rtl
            arrowLeft={<RightButton onClick={withoutSelectionOnPrevClick} disabled={disablePrevWithoutSelection} />}
            arrowRight={<LeftButton onClick={withoutSelectionOnNextClick} disabled={disableNextWithoutSelection} />}
            dots={false}
            slides={children}
        />
    );
};
