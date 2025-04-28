import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";
import { useConnection } from "@solana/wallet-adapter-react";
import { makeStyles } from "@material-ui/core/styles";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useWallet } from "../serum/context/wallet";
import { useNotify } from "../hooks/notify";
import { getOrca, OrcaPoolConfig, OrcaU64 } from "@orca-so/sdk";
import Decimal from "decimal.js";
import { sendAndConfirmTransaction } from "@solana/web3.js";

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

    const handleSwap = useCallback(async () => {
        if (!fromAmount || !toAmount) {
            notify("error", "Amount error!");
            return;
        }
        try {
            setLoading(true)
            const orca = getOrca(connection);
            let pool = orca.getPool(OrcaPoolConfig.SOL_USDC);
            let token = pool.getTokenA();
            let tradeValue = new Decimal(Number(fromAmount));
            let quote = await pool.getQuote(token, tradeValue, new Decimal(0.1));
            console.log(quote.getMinOutputAmount().toNumber(), tradeValue.toNumber())
            const swapPayload = await pool.swap(
                wallet.publicKey,
                token,
                tradeValue,
                quote.getMinOutputAmount()
            );
            swapPayload.transaction.partialSign(...swapPayload.signers);
            const signedTransaction = await wallet.signTransaction(
                swapPayload.transaction
            );
            const rawTransaction = signedTransaction.serialize();
            let options = {
                skipPreflight: true,
                commitment: "confirmed",
            };
            const txid = await connection.sendRawTransaction(rawTransaction, options);
            notify('info', `https://explorer.solana.com/tx/${txid}`);
            console.log(`txid`, txid)
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [wallet, notify, connection]);

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
            {loading ? <Spin indicator={antIcon} className="add-spinner" /> : "Swap(Orca)"}
        </Button>
    );
};

export default SendTransaction;
