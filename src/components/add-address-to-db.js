import React, {useState} from 'react';
import io from 'socket.io-client';

import service$ from '../common/services/http.service';
import {SnackbarWrapper} from "./snackbar-wrapper";
import {env} from "../common/environment/environment";

// Material
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {makeStyles} from "@material-ui/core";


const socket = io(env.apiUrl, {transports: ['websocket']});

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: "flex-end",
    },
    leftSpacing: {
        marginLeft: "0.5rem",
    }
}));

export const AddAddressToDB = () => {
    const classes = useStyles();
    const [address, setAddress] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [sendCounter, setSendCounter] = useState(0);
    const [inputError, setInputError] = useState(false);

    const fallDownErrorInfo = () => {
        setTimeout(() => {
            setInputError(false);
        }, 1000);
    };

    const sendAddressToDB = () => {
        if (!address) {
            setInputError(true);
            return fallDownErrorInfo();
        }
        service$.sendAddress(address).then((response) => {
            if (response.status === 200) {
                setSendCounter(sendCounter + 1);
                setAddress("");
                setOpenSnackbar(true);
                socket.on('connect', () => {
                    console.log("Websocket connected.")
                });
                socket.emit('address added');
            }
        })
    };

    const inputChangeHandler = (e) => {
        setInputError(!e.currentTarget.value);
        setAddress(e.currentTarget.value);
        fallDownErrorInfo();
    };

    return (<React.Fragment>
        <Paper><Box px={2} py={3}>
            <Typography variant={"h5"} component={"h3"} align={"center"}>Add new address</Typography>
            <article className={classes.root}>
                <MonetizationOnOutlinedIcon/>
                <TextField className={classes.leftSpacing} id="add-address" label="Add new bitcoin address here"
                           fullWidth
                           onChange={inputChangeHandler}
                           onKeyDown={(e) => e.key === 'Enter' && sendAddressToDB()}
                           value={address}
                           error={inputError}/>
                <Button
                    className={classes.leftSpacing}
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon/>}
                    onClick={sendAddressToDB}
                >
                    Save
                </Button>
            </article>
        </Box></Paper>
        <SnackbarWrapper
            variant="success"
            className={classes.margin}
            message={`The new address (${sendCounter}) added successfully!`}
            isItOpen={openSnackbar}
            setIsItOpen={setOpenSnackbar}
        />
    </React.Fragment>)
};