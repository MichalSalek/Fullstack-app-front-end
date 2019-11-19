import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import service$ from '../common/services/http.service';
import {env} from "../common/environment/environment";

// Material
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";

const socket = io(env.apiUrl, {transports: ['websocket']});

const useStyles1 = makeStyles(theme => ({
    stringWrap: {
        wordBreak: 'break-all',
    },

}));

export const MonitorSection = ({selectedBlock}) => {
    const classes = useStyles1();
    const [fetchedAddresses, setFetchedAddresses] = useState([]);

    // WebSocket real-time fetch
    socket.on('refresh addresses', (addresses) => {
        setFetchedAddresses(addresses);
    });

    if (!selectedBlock) return null;
    return (<React.Fragment>
        <Paper>
            <Box px={4} py={3}>
                <Typography variant={"h5"} component={"h3"} color={"textPrimary"} align={"right"}>Monitor</Typography>
                Selected block: {selectedBlock}
            </Box>

        </Paper>
    </React.Fragment>)
};