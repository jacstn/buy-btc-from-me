const expect = require('expect');
const request = require('supertest');
import { app } from './../app'
const models = require('../models');

describe('POST /order', () => {
    it('should create order', function (done) {
        request(app).post('/order').send({
            "btcAmount": 0.01,
            "usdAmount": 0.01,
            "address": "fa2323423423423423e423"
        })
            .expect(200)
            .expect(async (res: any) => {
                const savedBtcAddress: string = JSON.parse(res.text).address;

                const model: any = await models.Domain.findOne({ where: { address:savedBtcAddress }, raw: true });

                expect(savedBtcAddress).toBe(model.address);
                done();
            })
            .end((err:any, res:any) => {
                if (err) done(err);
                else done()
            })
    })

})