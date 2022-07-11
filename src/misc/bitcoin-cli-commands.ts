require('dotenv').config()
const bitcoinCli = process.env.BITCOIN_CLI_PATH

const enum EBitcoinCliCommands {
    getAddressInfo = `getaddressinfo`,
    getBalance = 'getbalance',
}

const getBitcoinCliCommand = (command: string) => {
    return `${bitcoinCli} ${command}`
}

export { getBitcoinCliCommand, EBitcoinCliCommands };