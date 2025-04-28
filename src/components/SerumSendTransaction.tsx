import React, { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';
import { useConnection } from '@solana/wallet-adapter-react';
import { makeStyles } from '@material-ui/core/styles';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { usePoolForBasket, swap } from '../serum/utils/pools';
import { useCurrencyPairState } from '../serum/utils/currencyPair';
import { useWallet } from '../serum/context/wallet';
import { useNotify } from '../hooks/notify';

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
    const [loading, setLoading] = useState(false)
    const { connection } = useConnection();
    const { wallet, connected } = useWallet();
    const notify = useNotify();
    const { A, B } = useCurrencyPairState();
    const pool = usePoolForBasket([A?.mintAddress, B?.mintAddress]);

    console.log(`A`, A.account, pool?.legacy)

    const handleSwap = useCallback(async () => {
        if (!fromAmount || !toAmount) {
            notify('error', 'Amount error!');
            return;
        }
        try {
            setLoading(true)
            const components = [
                {
                    account: A.account,
                    mintAddress: A.mintAddress,
                    amount: Number(fromAmount) * Math.pow(10, 9),
                },
                {
                    mintAddress: B.mintAddress,
                    amount: Number(toAmount) * Math.pow(10, 6),
                },
            ];
            await swap(connection, wallet, components, 0.25, pool);
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [A.account, A.mintAddress, B.mintAddress, wallet, notify, connection]);

    return (
        <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            disabled={!connected || loading}
            onClick={handleSwap}
            className={classes.swapbutton}
        >
            {loading ? <Spin indicator={antIcon} className="add-spinner" /> : "Swap(Serum)"}
        </Button>
    );
};

export default SendTransaction;
