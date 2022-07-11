import { Request, Response } from 'express';
import { EOrderStatus } from '../misc/order-status';
import { Kraken } from "node-kraken-api";
import { EBitcoinCliCommands, getBitcoinCliCommand } from '../misc/bitcoin-cli-commands';

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
            if (omiseResult.object==='charge' && omiseResult.status==='successful') {
                order.status = EOrderStatus.SUCCESS
                await order.save()
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
