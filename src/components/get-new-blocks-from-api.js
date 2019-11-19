import React, {useEffect, useState} from 'react';

import service$ from '../common/services/http.service';

// Material
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import RefreshIcon from '@material-ui/icons/Refresh';
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";


const useStyles1 = makeStyles(theme => ({
    stringWrap: {
        wordBreak: 'break-all',
    },
    counterText: {
        fontWeight: "bolder",
        fontSize: "2rem",
        color: "#EEEEEE",
        position: "absolute",
        top: "0rem",
        left: "0rem",
        letterSpacing: "-1rem"
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(0),
        right: theme.spacing(2),
        opacity: 0.92
    },
}));


export const GetNewBlocksFromAPI = ({setAddress}) => {
    const classes = useStyles1();
    const [newBlocks, setNewBlocks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNewBlocks = () => {
        setLoading(true);
        service$.getNewBlocksFromAPI().then((response) => {
            if (response.status === 200) {
                const newBlocksArr = [];
                response.data.blocks.forEach((el, index) => {
                    if (index > 4) return null;
                    newBlocksArr.push(el);
                });
                setNewBlocks(newBlocksArr);
                setLoading(false);
            }
        })
    };

    // Fetch new blocks on load
    useEffect(() => {
        getNewBlocks();
    }, []);

    const copyDateToInput = (e) => {
        setAddress(e.currentTarget.id)
    };

    return (<React.Fragment>
        <Box pt={5} style={{position: 'relative'}}>
            <Typography variant={"h6"} color={"textSecondary"} align={"center"}>New blocks stream</Typography>
            {newBlocks.length === 0 ? (<React.Fragment><br/><LinearProgress color={"secondary"}/>
                    <br/></React.Fragment>) :
                <List>
                    {newBlocks.map((el, key) => {
                            return (<ListItem key={key}>
                                <ListItemIcon>
                                    <span className={classes.counterText}>{key + 1}</span>
                                </ListItemIcon>
                                <Button
                                    id={el.hash}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={copyDateToInput}>
                                    <ListItemText
                                        primary={el.time}
                                        className={classes.stringWrap}
                                    />
                                </Button>
                            </ListItem>)
                        }
                    )}
                </List>}
            <Fab aria-label={"refresh"} onClick={getNewBlocks} className={classes.fab} color="primary">
                <RefreshIcon color={"inherit"}/>
            </Fab>
        </Box>
        <LinearProgress color={"primary"} style={{visibility: loading ? "visible" : "hidden"}}/>
    </React.Fragment>)
};