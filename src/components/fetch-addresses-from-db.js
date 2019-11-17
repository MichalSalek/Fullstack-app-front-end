import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

import service$ from '../common/services/http.service';

// Material
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const socket = io('http://localhost:4100', {transports: ['websocket']});

export const FetchAdressesFromDB = () => {
    const [fetchedAddresses, setFetchedAddresses] = useState([]);

    // Fetching addresses onMount
    useEffect(() => {
        service$.getAddresses().then((response) => {
            setFetchedAddresses(response.data.data);
        })
    }, []);

    socket.on('refresh addresses', (addresses) => {
        console.log("Wykonywanie refresh adresses w komponencie fetch");
        setFetchedAddresses(addresses);
    });
    return (<React.Fragment>
        <Paper><Box px={1} py={3}> {fetchedAddresses.length === 0 ? "fetching..." :
            <ul>{fetchedAddresses.map((el, key) => <li key={key}>{el.addresses_paths}</li>)}</ul>} </Box></Paper>
    </React.Fragment>)
};