import React from "react";

// Material
import useScrollTrigger from "@material-ui/core/useScrollTrigger/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export const ScrollTop = (props) => {
    const classes = useStyles();

    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {props.children}
            </div>
        </Zoom>
    );
};