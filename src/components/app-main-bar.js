import React from 'react';

import {ScrollTop} from "./scroll-to-top";

// Material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const AppMainBar = () => {
    return (<React.Fragment>
        <AppBar>
            <Toolbar variant={"dense"}>
                <Typography component={"h1"} variant="h6">ReactJS, NodeJS, MySQL</Typography>
            </Toolbar>
        </AppBar>
        <Toolbar id="under-header-space"/>
        <ScrollTop>
            <Fab color="secondary" size="small"
                 aria-label="scroll back to top">
                <KeyboardArrowUpIcon/>
            </Fab></ScrollTop>
    </React.Fragment>)
};