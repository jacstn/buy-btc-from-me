import { Request, Response } from 'express';


const models = require('./../db')
import { Op } from 'sequelize'

const paymentController = {
    payment: async (req: Request, res: Response,) => {

        var omise = require('omise')({
            'secretKey': process.env.OMISE_SKEY,
            'omiseVersion': '2015-09-10'
        });
        const resp = await omise.charges.create({
            'description': '',
            'amount': '100000', // 1,000 Baht
            'currency': 'thb',
            'capture': false,
            'card': req.body.tokenId
        })
        return res.send('ok')
    },
}

export { paymentController }
