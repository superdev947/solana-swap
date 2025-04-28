import { createTheme, ThemeProvider } from '@material-ui/core';
import { deepPurple, pink } from '@material-ui/core/colors';
import { WalletProvider } from "./serum/context/wallet";
import 'antd/dist/antd.dark.less';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Dapp } from './pages/Dapp';
import { MarketProvider } from './serum/context/market';
import { AccountsProvider } from './serum/utils/accounts';
import { ConnectionProvider } from './serum/utils/connection';
import { CurrencyPairProvider } from './serum/utils/currencyPair';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: deepPurple[700],
        },
        secondary: {
            main: pink[700],
        },
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <HashRouter basename={"/"}>
                    <ConnectionProvider>
                        <WalletProvider>
                            <AccountsProvider>
                                <MarketProvider>
                                    <CurrencyPairProvider>
                                        <Route exact path="/" component={Dapp} />
                                    </CurrencyPairProvider>
                                </MarketProvider>
                            </AccountsProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </HashRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
