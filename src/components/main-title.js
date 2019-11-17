import React from "react";

// Material
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

export const MainTitle = (props) => {
    return <Paper><Box p={3}>
        <Typography color={"textSecondary"} align={"center"} variant="h2">{props.content}</Typography></Box></Paper>
};