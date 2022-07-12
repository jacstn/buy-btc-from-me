require('dotenv').config()
const bitcoinCli = process.env.BITCOIN_CLI_PATH

const enum EBitcoinCliCommands {
    getAddressInfo = `getaddressinfo`,
    getBalance = 'getbalance',
    unlockWallet='walletpassphrase',
    sendToAddress='sendtoaddress',
    getTransaction='gettransaction',
}

const getBitcoinCliCommand = (command: string) => {
    return `${bitcoinCli} ${command}`
}

export { getBitcoinCliCommand, EBitcoinCliCommands };