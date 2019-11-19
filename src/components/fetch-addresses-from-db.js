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

const socket = io(env.apiUrl, {transports: ['websocket']});

const useStyles1 = makeStyles(theme => ({
    stringWrap: {
        wordBreak: 'break-all',
    },
    counterText: {
        fontWeight: "bolder",
        fontSize: "5rem",
        color: "#EEEEEE",
        position: "absolute",
        top: "-2rem",
        left: "-0.5rem",
        letterSpacing: "-1rem"
    },
    coinIcon: {
        zIndex: 5
    }
}));

export const FetchAdressesFromDB = () => {
    const classes = useStyles1();
    const [fetchedAddresses, setFetchedAddresses] = useState([]);
    const [pagerCounter, setPagerCounter] = useState(0);
    const [offPrevButton, setOffPrevButton] = useState(true);
    const [offNextButton, setOffNextButton] = useState(false);


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

    const resetButtons = () => {
        setOffNextButton(false);
        setOffPrevButton(false);
    };

    const pagerLogic = (e) => {
        if (e.currentTarget.id === "btn-prev") {
            resetButtons();
            setPagerCounter((prev) => prev - 5);
            if (pagerCounter <= 5) {
                setOffPrevButton(true);
                return null;
            }
        } else {
            resetButtons();
            setPagerCounter((prev) => prev + 5);
            if (pagerCounter >= fetchedAddresses.length - 10) {
                setOffNextButton(true);
                return null;
            }
        }
    };

    return (<React.Fragment>
        <Paper>
            <Box px={1} py={3}> {fetchedAddresses.length === 0 ? "fetching..." :
                <List>
                    {fetchedAddresses.map((el, key) => {
                            if ((key < pagerCounter || key >= 5 + pagerCounter)) return;

                            return (<ListItem key={key}>
                                <ListItemIcon>
                                    <React.Fragment><span className={classes.counterText}>{key + 1}</span>
                                        <MonetizationOnIcon
                                            className={classes.coinIcon}/></React.Fragment>
                                </ListItemIcon>
                                <Button variant="contained" color="primary">
                                    <ListItemText
                                        className={classes.stringWrap}
                                        primary={el.addresses_paths}
                                    />
                                </Button>
                            </ListItem>)
                        }
                    )}
                </List>}
            </Box>
            <ButtonGroup
                fullWidth
                color="primary"
                size="medium"
                aria-label="large outlined secondary button group"
            >
                <Button id={"btn-prev"} disabled={offPrevButton} onClick={(e) => pagerLogic(e)}>Previous 5</Button>
                <Button id={"btn-next"} disabled={offNextButton} onClick={(e) => pagerLogic(e)}>Next 5</Button>
            </ButtonGroup>
        </Paper>
    </React.Fragment>)
};