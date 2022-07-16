# Buy BTC From Me

This is demo project to demonstrate how to integrate Bitcoin Core with  Omise Payment Gateway.

_Frontend can be found on https://github.com/jacstn/buy-btc-from-me-frontend_

## Omise Keys
You need to obtain Omise Keys on www.omise.co

## Requirements
 - Mysql database (https://www.mysql.com/downloads)
 - Bitcoin Core (https://bitcoincore.org/en/download)

## Installation
- Rename `.env.example` to `.env` and populate it with required data
- Run `npm install`
- Create Database with `npx sequelize-cli db:create`
- Initialize Database with `npx sequelize-cli db:migrate`
- Run `npm run dev`

### To be done: _tests_
