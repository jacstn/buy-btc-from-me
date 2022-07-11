require('dotenv').config()
const bitcoinCli = process.env.BITCOIN_CLI_PATH

export enum EBitcoinCliCommands {
    getAddressInfo=`getaddressinfo`,
    getBalance='getbalance'
}

export function getBitcoinCliCommand(command: string) {
    return `${bitcoinCli} ${command}`
}