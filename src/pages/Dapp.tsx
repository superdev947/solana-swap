import {
    getBitpieWallet,
    getBloctoWallet,
    getCoin98Wallet,
    getLedgerWallet,
    getMathWallet,
    getPhantomWallet,
    getSafePalWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletWallet,
    getSolongWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets';

import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import SendTransaction from '../components/SendTransaction';
import SerumSendTransaction from '../components/SerumSendTransaction';
import OrcaSendTransaction from '../components/OrcaSendTransaction';
import solImage from '../assets/sol.png';
import usdcImage from '../assets/usdc.png';
import { useWallet } from '../serum/context/wallet';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    appBar: {
        background: "#131a35"
    },
    rootgrid: {
        flexDirection: "row",
        justifyContent: "center",
        maxWidth: 420,
        marginTop: 100,
        margin: "auto",
        borderRadius: 5,
        padding: 1,
        background: "linear-gradient(245.22deg, #da2eef 7.97%, #2b6aff 49.17%, #39d0d8 92.1%)"
    },
    root: {
        width: "100%",
        padding: "30px  10px",
        opacity: 0.9,
        background: "#131a35"
    },
    swapbutton: {
        display: "flex",
        justifyContent: "center",
    },
    grid: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 20,
    },
    gridc: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        width: 250,
        marginTop: 10,
        border: 0,
    },
    icon: {
        height: 24,
        width: 24,
    },
});


export const Dapp: FC = () => {
    const classes = useStyles();
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const { connect, disconnect, connected } = useWallet();
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSolflareWallet(),
            getSlopeWallet(),
            getTorusWallet({
                options: {
                    clientId: 'BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ',
                },
            }),
            getLedgerWallet(),
            getSolletWallet({ network }),
            getBitpieWallet(),
            getBloctoWallet({ network }),
            getCoin98Wallet(),
            getMathWallet(),
            getSafePalWallet(),
            getSolongWallet(),
        ],
        [network]
    );

    const { enqueueSnackbar } = useSnackbar();
    const onError = useCallback(
        (error: WalletError) => {
            enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, { variant: 'error' });
            console.error(error);
        },
        [enqueueSnackbar]
    );
    return (
        <ConnectionProvider endpoint={"https://orca.rpcpool.com"}>
            <WalletProvider wallets={wallets} onError={onError}>
                <WalletDialogProvider>
                    <AppBar position="relative" color="secondary" className={classes.appBar}>
                        <Toolbar>
                            <Grid
                                container
                                spacing={1}
                                style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}
                            >
                                <Grid item>
                                    <Typography variant="h6" color="inherit" noWrap>
                                        Solana
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="large"
                                        fullWidth
                                        onClick={connected ? disconnect : connect}
                                        className={classes.swapbutton}
                                    >
                                        {connected ? "Disconnect" : "Connect"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Grid
                        container
                        className={classes.rootgrid}
                    >
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Swap
                                </Typography>
                                <Grid className={classes.grid}>
                                    <TextField
                                        className={classes.input}
                                        id="From-basic"
                                        size="medium"
                                        label="From"
                                        type="number"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={fromAmount}
                                        onChange={(e: any) => setFromAmount(e.target.value)}
                                    />
                                    <Grid className={classes.gridc}>
                                        <Typography style={{ marginRight: 10, fontSize: 14 }}>SOL</Typography>
                                        <CardMedia image={solImage} className={classes.icon} />
                                    </Grid>
                                </Grid>
                                <Grid className={classes.grid}>
                                    <TextField
                                        className={classes.input}
                                        id="To-basic"
                                        size="medium"
                                        type="number"
                                        label="To"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={toAmount}
                                        onChange={(e: any) => setToAmount(e.target.value)}
                                    />
                                    <Grid className={classes.gridc}>
                                        <Typography style={{ marginRight: 10, fontSize: 14 }}>USDC</Typography>
                                        <CardMedia image={usdcImage} className={classes.icon} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <SendTransaction fromAmount={fromAmount} toAmount={toAmount} />
                                <SerumSendTransaction fromAmount={fromAmount} toAmount={toAmount} />
                                <OrcaSendTransaction fromAmount={fromAmount} toAmount={toAmount} />
                            </CardActions>
                        </Card>
                    </Grid>
                </WalletDialogProvider>
            </WalletProvider>
        </ConnectionProvider >
    );
};
