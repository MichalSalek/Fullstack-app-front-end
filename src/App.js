import React, { useState } from 'react';

import {AppMainBar} from "./components/app-main-bar";
import {MainTitle} from "./components/main-title";
import {AddAddressToDB} from "./components/add-address-to-db";
import {FetchAdressesFromDB} from "./components/fetch-addresses-from-db";
import {MonitorSection} from "./components/monitor-section";

// Material
import CssBaseline from "@material-ui/core/CssBaseline";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const App = () => {
    const [selectedBlock, setSelectedBlock] = useState("");

    return (
        <main className="App">
            <CssBaseline/>
            <AppMainBar/>
            <Container>
                <MainTitle content={"Wallet app"}/>
                <Box mt={5}>
                <Grid container spacing={6} m={6} alignItems="stretch">
                    <Grid item xs={12} lg={6}>
                        <AddAddressToDB />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FetchAdressesFromDB selectBlock={setSelectedBlock}/>
                    </Grid>
                    <Grid item xs={12}>
                        <MonitorSection selectedBlock={selectedBlock}/>
                    </Grid>
                </Grid>
                </Box>
            </Container>
        </main>
    );
}

export default App;
