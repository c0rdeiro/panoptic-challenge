# Panoptic Frontend Interview Task

Thank you for the opportunity to complete this interview task. This project is a React application that interacts with the Panoptic subgraph to display pool information and provide detailed views for individual markets.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Locally](#running-locally)

## Features

This application implements the two parts of the interview task:

### Part 1: Simple Subgraph-Powered App

- Fetches the 50 oldest pools from the Ethereum mainnet Panoptic subgraph.
- Renders these pools in a vertical list, displaying:
    - Pool (Token 0/ Token 1)
    - Fee Tier (converted to a human-readable percentage, e.g., `3000` becomes `0.3%`)
    - Current Price (derived from the `tick` value).
- Each pool row is a clickable link that navigates to its dedicated market page (Part 2).

### Part 2: Expanding the App (Market Page)

- Implements a dynamic route `/markets/{poolAddress}` for each individual pool.
- On the market page, the following information is displayed:
    - Token Pair (e.g., `DAI/WETH`)
    - TVL, 24h Volume, 24 Fees for both Panoptic and Uniswap
    - **Positions Available:** This section provides a conceptual layout for how available positions (call/put, different strikes) could be presented. It's a foundational UI component designed to be intuitive for users to understand potential trading opportunities.
    - **UI for Depositing into Collateral Trackers:** By clicking "Deposit Liquidity", users are able to deposit collateral tokens.

## Technologies Used

- **Next.js:** React framework for building server-rendered and static web applications, providing routing and API routes.
- **React:** Frontend library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **Viem:** A type-safe, low-level library for interacting with Ethereum.
- **Wagmi:** React Hooks for Ethereum, built on top of Viem, simplifying blockchain interactions.
- **RainbowKit:** A collection of React components for connecting wallets easily.
- **Apollo Client:** A comprehensive state management library for GraphQL, used for querying the Panoptic subgraph.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/c0rdeiro/panoptic-challenge.git
    cd panoptic-challenge
    ```

2.  **Create a `.env` file:**
    Copy the contents of `env.example` into a new file named `.env` in the root of the project. This file will contain environment variables necessary for the application to run.

    ```bash
    cp env.example .env
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running Locally

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the address displayed in your terminal (usually `http://localhost:3000`).
