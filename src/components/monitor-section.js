import React from 'react';

// Material
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";


export const MonitorSection = ({selectedBlock}) => {

    return selectedBlock && (<React.Fragment>
        <Paper>
            <Box px={4} py={3}>
                <Typography variant={"h6"} color={"textSecondary"} align={"right"}>Monitor [WIP]</Typography>

                <Chip
                    avatar={<MonetizationOnIcon />}
                    label={selectedBlock}
                    color="primary"
                />
            </Box>
        </Paper>
    </React.Fragment>)
};