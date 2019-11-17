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

const socket = io(env.apiUrl, {transports: ['websocket']});

export const FetchAdressesFromDB = () => {
    const [fetchedAddresses, setFetchedAddresses] = useState([]);

    // Fetching addresses onMount
    useEffect(() => {
        service$.getAddresses().then((response) => {
            setFetchedAddresses(response.data.data);
        })
    }, []);

    // WebSocket real-time fetch
    socket.on('refresh addresses', (addresses) => {
        setFetchedAddresses(addresses);
    });

    return (<React.Fragment>
        <Paper>
            <Box px={1} py={3}> {fetchedAddresses.length === 0 ? "fetching..." :
                <List>
                    {fetchedAddresses.map((el, key) =>
                        (<ListItem key={key}>
                            <ListItemIcon>
                                <MonetizationOnIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={`${el.addresses_paths}`}
                            />
                        </ListItem>)
                    )}
                </List>}
            </Box>
        </Paper>
    </React.Fragment>)
};