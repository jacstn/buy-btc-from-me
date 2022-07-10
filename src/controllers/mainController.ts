import { Request, Response } from 'express';
import { EOrderStatus } from '../misc/order-status';
const models: any = require('./../models')

const mainController = {
    charge: async (req: Request, res: Response) => {
        const order = await models.Orders.findOne({ where: {
            id: req.body.orderId
        }})

        if (!order) {
            return res.status(404).send("order not found")
        }

        const omise = require('omise')({
            secretKey: process.env.OMISE_SKEY
        })

        const omiseResult = omise.charges.create({
            'description': 'Payment for BTC',
            'amount': '100000', 
            'currency': 'usd',
            'capture': false,
            'card': req.body.omiseToken
          })

          console.log(omiseResult)
          res.send(200)
    },
    getOmisePublicKey: (req: Request, res:Response) => {
        try {
            return res.send({
                omisePublicKey: process.env.OMISE_PKEY
            })
        } catch (e) {
            console.log(e)
        }
    },
    createOrder:  async (req: Request, res:Response) => {
        const order = {...req.body, status: EOrderStatus.INIT}
        try {
            const model = await models.Order.create(order);
            return res.send({...model.dataValues, omisePublicKey: process.env.OMISE_PKEY});
        } catch (e) {
            console.error(e)
            return res.send(500)
        }
    }
}

export { mainController }
