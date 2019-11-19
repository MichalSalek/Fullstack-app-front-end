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
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

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

export const FetchAdressesFromDB = ({selectBlock}) => {
    const classes = useStyles1();
    const [fetchedAddresses, setFetchedAddresses] = useState([]);
    const [pagerCounter, setPagerCounter] = useState(0);
    const [offPrevButton, setOffPrevButton] = useState(true);
    const [offNextButton, setOffNextButton] = useState(true);
    const recordsPerPage = 3;

    // Fetching addresses onMount
    useEffect(() => {
        service$.getAddresses().then((response) => {
            setFetchedAddresses(response.data.data.reverse());
        })
    }, []);

    // WebSocket real-time fetch
    socket.on('refresh addresses', (addresses) => {
        setFetchedAddresses(addresses);
    });

    const resetButtons = (boolean) => {
        setOffNextButton(boolean);
        setOffPrevButton(boolean);
    };

    useEffect(() => {
        if (fetchedAddresses.length > recordsPerPage) { setOffNextButton(false);}
    }, [fetchedAddresses]);

    const pagerLogic = (e) => {
        if (e.currentTarget.id === "btn-prev") {
            resetButtons(false);
            setPagerCounter((prev) => prev - recordsPerPage);
            if (pagerCounter <= recordsPerPage) {
                setOffPrevButton(true);
                return null;
            }
        } else {
            resetButtons(false);
            setPagerCounter((prev) => prev + recordsPerPage);
            if (pagerCounter >= fetchedAddresses.length - recordsPerPage * 2) {
                setOffNextButton(true);
                return null;
            }
        }
    };

    const sendSelectedBlock = (e) => {
        const indexOfBlockOnList = e.currentTarget.id;
        const blockAddress = e.currentTarget.childNodes[0].innerText;
        selectBlock(`[ ${indexOfBlockOnList} ] - ${blockAddress}`);
    };

    return (<React.Fragment>
        <Paper id={"fetch-list-container"}>
            <Box px={1} py={3}> {fetchedAddresses.length === 0 ? (<React.Fragment><br/><LinearProgress/>
                    <LinearProgress color="secondary"/><br/></React.Fragment>) :
                <React.Fragment>
                <Typography variant={"h6"} color={"textSecondary"} align={"center"}>Addresses to monitor</Typography>
                <List>
                    {fetchedAddresses.map((el, key) => {
                            if ((key < pagerCounter || key >= recordsPerPage + pagerCounter)) return null;

                            return (<ListItem key={key}>
                                <ListItemIcon>
                                    <React.Fragment><span className={classes.counterText}>{key + 1}</span>
                                        <MonetizationOnIcon
                                            className={classes.coinIcon}/></React.Fragment>
                                </ListItemIcon>
                                <Button fullWidth variant="outlined" onClick={sendSelectedBlock} id={key + 1}
                                        color="primary">
                                    <ListItemText
                                        className={classes.stringWrap}
                                        primary={el.addresses_paths}
                                    />
                                </Button>
                            </ListItem>)
                        }
                    )}
                </List></React.Fragment>}
            </Box>
            <ButtonGroup
                fullWidth
                color="primary"
                size="medium"
                variant="text"
                aria-label="large outlined secondary button group"
            >
                <Button id={"btn-prev"} disabled={offPrevButton} onClick={(e) => pagerLogic(e)}>Previous 5</Button>
                <Button id={"btn-next"} disabled={offNextButton} onClick={(e) => pagerLogic(e)}>Next 5</Button>
            </ButtonGroup>
        </Paper>
    </React.Fragment>)
};