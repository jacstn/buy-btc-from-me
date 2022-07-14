import { Request, Response } from 'express';
import { EOrderStatus } from '../misc/order-status';
import { Kraken } from "node-kraken-api";
import { EBitcoinCliCommands, getBitcoinCliCommand } from '../misc/bitcoin-cli-commands';

const util = require('util');
const execCommand = util.promisify(require('child_process').exec);
const { exec } = require('child_process')
const models: any = require('./../models')

const mainController = {
    charge: async (req: Request, res: Response) => {
        const order = await models.Order.findOne({
            where: {
                id: req.body.orderId
            }
        })

        if (!order) {
            return res.status(400).send("order not found")
        }

        const omise = require('omise')({
            secretKey: process.env.OMISE_SKEY
        })
        const paymentObject = {
            'description': 'Payment for BTC',
            'amount': (order.usdAmount * 100).toFixed(0),
            'currency': 'usd',
            'capture': true,
            'card': req.body.omiseToken
        }
        try {
            console.log(paymentObject)
            const omiseResult = await omise.charges.create(paymentObject)

            console.log(omiseResult)
            if (omiseResult.object === 'charge' && omiseResult.status === 'successful') {
                order.status = EOrderStatus.PAYMENT_COMPLEATED
                await order.save()
                const unlockcommand = getBitcoinCliCommand(EBitcoinCliCommands.unlockWallet) + ` "${process.env.WALLET_PASS}" 1`;
                console.log('unlock command', unlockcommand);
                exec(unlockcommand, () => {
                    const sendcommand = getBitcoinCliCommand(EBitcoinCliCommands.sendToAddress) + ` ${order.address} ${order.btcAmount} 1`;
                    console.log('sending command', sendcommand);
                    exec(sendcommand, async (error: any, stdout: any, stderr: any) => {
                        order.status = EOrderStatus.BTC_SENT;
                        order.blockchainTransactionId = stdout;
                        await order.save()
                    })
                })
            }
            res.send(200)
        } catch (e) {
            console.error(e)
            return res.sendStatus(500)
        }
    },

    getOmisePublicKey: (req: Request, res: Response) => {
        try {
            return res.send({
                omisePublicKey: process.env.OMISE_PKEY
            })
        } catch (e) {
            console.log(e)
        }
    },

    listOrders: async (req: Request, res: Response) => {
        try {
            let model = await models.Order.findAll({ raw: true });

            for (let i in model) {
                if (model[i].blockchainTransactionId && model[i].status === EOrderStatus.BTC_SENT) {
                    const command = getBitcoinCliCommand(EBitcoinCliCommands.getTransaction) + ` ${model[i].blockchainTransactionId}`;
                    const { stdout, stderr } = await execCommand(command);
                    const confirmations = JSON.parse(stdout).confirmations;
                    if (confirmations >= 40) {
                        await models.Order.update({ status: EOrderStatus.DONE }, {
                            where: {
                                id: model[i].id
                            }
                        })
                    } else {
                        model[i] = { ...model[i], blockchainConfirmations: confirmations };
                    }
                }
            }
            return res.send(model)
        } catch (e) {
            console.error(e);
            return res.send(400)
        }
    },

    createOrder: async (req: Request, res: Response) => {
        const order = { ...req.body, status: EOrderStatus.INIT }
        try {
            const model = await models.Order.create(order);
            return res.send({ ...model.dataValues, omisePublicKey: process.env.OMISE_PKEY });
        } catch (e) {
            console.error(e)
            return res.send(500)
        }
    },

    getBtcPrice: async (req: Request, res: Response) => {
        try {
            const kraken = new Kraken();
            const ticker: any = await kraken.ticker({ pair: "BTCUSDT" });

            const margin: any = process.env.MARGIN || .3
            const price = (ticker.XBTUSDT.a[0]) * (1 + parseFloat(margin))

            return res.send({ btcPrice: price.toFixed(2) })
        } catch (e) {
            return res.sendStatus(500);
        }
    },

    validateAddress: (req: Request, res: Response) => {
        const command = getBitcoinCliCommand(EBitcoinCliCommands.getAddressInfo) + ` "${req.params.address}"`;

        exec(command, (error: any, stdout: any, stderr: any) => {
            if (stdout) {
                const info = JSON.parse(stdout);
                if (info.pubkey) {
                    return res.send()
                }
            }
            return res.sendStatus(404)
        });
    },

    getAvailableBalance: (req: Request, res: Response) => {
        const command = getBitcoinCliCommand(EBitcoinCliCommands.getBalance);

        exec(command, (error: any, stdout: any, stderr: any) => {
            if (stdout) {
                return res.send({ balance: stdout })
            }
            return res.send({ balance: 0 })
        });
    }
}

export { mainController }
