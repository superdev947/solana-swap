import { Button } from '@material-ui/core';
import { get } from 'lodash'
import { useConnection } from '@solana/wallet-adapter-react';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import { useNotify } from '../hooks/notify';
import { actions } from '../raydium/store/liquidity';
import { swap } from '../raydium/utils/swap'
import { getTokenAccounts } from '../raydium/store/wallet';
import { useWallet } from '../serum/context/wallet';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const useStyles = makeStyles({
    swapbutton: {
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
    },
});
type FormState = {
    fromAmount: Number
    toAmount: Number
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SendTransaction = ({ fromAmount, toAmount }: FormState) => {
    const classes = useStyles();
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false)
    const { wallet, connected } = useWallet();
    const notify = useNotify();

    const onClick = useCallback(async () => {
        if (!wallet.publicKey) {
            notify('error', 'Wallet not connected!');
            return;
        }
        if (!fromAmount || !toAmount) {
            notify('error', 'Amount error!');
            return;
        }
        setLoading(true)
        const liquidity = await actions(connection)
        const tokenAccounts = await getTokenAccounts(connection, wallet)
        const poolInfo = Object.values(liquidity).find((e: any) => e.ammId === "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2")
        const fromCoinmintAddress = "11111111111111111111111111111111"
        const toCoinmintAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        swap(
            connection,
            wallet,
            poolInfo,
            fromCoinmintAddress,
            toCoinmintAddress,
            get(tokenAccounts, `${fromCoinmintAddress}.tokenAccountAddress`),
            get(tokenAccounts, `${toCoinmintAddress}.tokenAccountAddress`),
            String(fromAmount),
            String(toAmount)
        ).then((txid) => {
            notify('info', 'Transaction has been sent');
            notify('info', `https://explorer.solana.com/tx/${txid}`);
        }).catch((error) => {
            console.log(`error`, error)
            setLoading(false)
        }).finally(() => {
            setLoading(false)
            console.log(`finally`)
        })
    }, [wallet, notify, connection]);

    return (
        <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            onClick={onClick}
            disabled={!connected || loading}
            className={classes.swapbutton}
        >
            {loading ? <Spin indicator={antIcon} className="add-spinner" /> : "Swap(Raydium)"}
        </Button>
    );
};

export default SendTransaction;
