# EOS Memo Game

A decentralized guessing game built on the EOS blockchain where players can submit guesses to win half of the contract balance. Built with React, TypeScript, and Wharfkit.

## Features

- Connect with Anchor Wallet
- View current contract balance and game statistics
- Submit guesses through EOS transactions
- Real-time updates of game state
- Responsive design with Tailwind CSS
- Track participation history

## Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- An EOS wallet (Anchor Wallet recommended)
- Some EOS tokens for playing (Jungle Testnet)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/HokenTech/MemoGame.git
cd eos-memo-game
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/         # React components
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   ├── constants.ts       # Application constants
│   ├── main.tsx          # Application entry point
│   └── types.ts          # TypeScript type definitions
├── public/               # Static assets
├── index.html           # HTML entry point
└── vite.config.ts       # Vite configuration
```

## Technical Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Blockchain Integration**: Wharfkit
- **Wallet Support**: Anchor Wallet
- **Network**: EOS Jungle Testnet

## Smart Contract Interaction

The game interacts with an EOS smart contract through the following actions:

- **Transfer**: Sends EOS tokens with a memo containing the guess
- Current fee per guess: 1.0000 EOS
- Winners receive 50% of the contract balance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

[Add your license here]

## Contact

[[Smart Contract](https://foxly.link/videogame_EOS)]
