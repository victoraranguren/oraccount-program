# Oraccount

## Intro
Oraccount is an oracle running on the Solana network that updates an account every x seconds with a floating-point number. This repo contains the Solana Program, and this other one contains the [backend](https://github.com/victoraranguren/oraccount-server) that updates the PDA via Cron and offers a REST API to read the account.

## Architecture

The Solana Program manages the PDA via the following instructions:
- `create_oracle_account`: Account creation (PDA)
- `update_oracle_value`: PDA update with a random number

## IMPORTANT
Although the Solana program can be executed directly from the tests.

The component responsible for executing the Solana program periodically is a backend, such as the one developed for this project. Link: [https://github.com/victoraranguren/oraccount-server](https://github.com/victoraranguren/oraccount-server)

## Stack
  - Anchor for Solana Program
  - Typescript for testing 

## Requirements
- [Rust & Anchor CLI](https://solana.com/es/docs/intro/installation)
- [Surfpool](https://docs.surfpool.run/install)
- [Node.js](https://nodejs.org/en/download/current)
- [PNPM (Optional)](https://pnpm.io/es/installation)

## Usage

By default, the project is configured to work on **localnet** using **Surfpool**.

### 1. Setup and Installation

Install TypeScript dependencies and ensure the Anchor environment is ready:

```bash
pnpm install
```
Or npm (avoid using it)
```bash
npm install
```

### 2. Development Cycle with Anchor

To build, deploy, and test the program in your local environment:

- **Build the program:**
  ```bash
  anchor build
  ```

- **Deploy to localnet (Surfpool):**

  Start the local network with Surfpool, which runs on `http://localhost:8899` by default.
  ```bash
  surfpool start
  ```
  Ensure Surfpool is running at `http://localhost:8899`.
  ```bash
  anchor deploy
  ```

- **Run tests:**
  You can run tests directly with Anchor, which will automatically build and deploy if necessary:
  ```bash
  anchor test
  ```

---
