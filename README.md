# Solana Swap

A decentralized token swap application built on Solana blockchain, featuring integrations with multiple DEX protocols including Orca, Serum, and Raydium.

![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)
![Version](https://img.shields.io/badge/version-0.9.4-green.svg)

## 🌟 Features

- **Multi-DEX Integration**: Swap tokens using Orca, Serum, and Raydium protocols
- **Wallet Support**: Compatible with 12+ Solana wallets including Phantom, Solflare, Slope, Ledger, and more
- **Real-time Quotes**: Get live price quotes before executing swaps
- **Material-UI Design**: Modern, responsive interface with dark theme
- **Type-Safe**: Built with TypeScript for enhanced reliability and developer experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn package manager
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/superdev947/solana-swap.git
cd solana-swap
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn start
# or
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
solana-swap/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── OrcaSendTransaction.tsx    # Orca DEX integration
│   │   ├── SendTransaction.tsx        # Generic swap component
│   │   └── SerumSendTransaction.tsx   # Serum DEX integration
│   ├── pages/
│   │   └── Dapp.tsx    # Main application page
│   ├── hooks/          # Custom React hooks
│   ├── serum/          # Serum protocol utilities
│   │   ├── context/    # React context providers
│   │   ├── models/     # Data models
│   │   ├── utils/      # Utility functions
│   │   └── wallet-adapters/  # Wallet integration
│   ├── raydium/        # Raydium protocol utilities
│   │   ├── store/      # State management
│   │   └── utils/      # Helper functions
│   ├── assets/         # Images and static files
│   └── App.tsx         # Root component
├── craco.config.js     # Create React App Configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 🔧 Build

Create a production build:

```bash
yarn build
# or
npm run build
```

The optimized build will be created in the `build/` directory.

## 🧪 Testing

Run the test suite:

```bash
yarn test
# or
npm test
```

## 📦 Key Dependencies

- **@orca-so/sdk**: Orca DEX SDK for token swaps
- **@project-serum/serum**: Serum DEX protocol integration
- **@solana/web3.js**: Solana JavaScript API
- **@solana/wallet-adapter-react**: Wallet adapter framework
- **@material-ui/core**: UI component library
- **antd**: Additional UI components
- **react**: JavaScript library for building user interfaces

## 🔌 Supported Wallets

- Phantom
- Solflare
- Slope
- Torus
- Ledger
- Sollet
- Bitpie
- Blocto
- Coin98
- MathWallet
- SafePal
- Solong

## 🌐 Network

The application connects to Solana Mainnet by default using the Orca RPC endpoint.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🔗 Resources

- [Solana Documentation](https://docs.solana.com/)
- [Orca SDK](https://www.orca.so/)
- [Serum DEX](https://www.projectserum.com/)
- [Raydium Protocol](https://raydium.io/)
