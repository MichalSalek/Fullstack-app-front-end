import React from 'react';

// Material
import Paper from "@material-ui/core/Paper";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: "flex-end",
    },
    leftSpacing: {
        marginLeft: "0.5rem",
    },
    leftSpacingx2: {
        marginLeft: "2rem",
    }
}));

export const AddAddressToDB = () => {
    const classes = useStyles();
    return (<React.Fragment>
        <Paper><Box px={2} py={3}>
            <Typography variant={"h5"} component={"h3"} align={"center"}>Add new address</Typography>
            <article className={classes.root}>
                <MonetizationOnOutlinedIcon/>
                <TextField className={classes.leftSpacing} id="add-address" label="Add new bitcoin address here"
                           fullWidth/>
                <Button
                    className={classes.leftSpacingx2}
                    inverted
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon/>}
                >
                    Save
                </Button>
            </article>
        </Box></Paper>
    </React.Fragment>)
};