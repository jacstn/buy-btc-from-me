const expect = require('expect');
const request = require('supertest');
import { app } from './../app'
const models = require('../models');

describe('POST /order', () => {
    it('should create order', function (done) {
        request(app).post('/order').send({
            "btcAmount": 0.01,
            "usdAmount": 0.01,
            "address": "tb1qz4dxjgu603khe0hdu65s8e75rnjud0zqrhlmj8"
        })
            .expect(200)
            .expect(async (res: any) => {
                const savedBtcAddress: string = JSON.parse(res.text).address;

                const model: any = await models.Domain.findOne({ where: { address: savedBtcAddress }, raw: true });

                expect(savedBtcAddress).toBe(model.address);
                done();
            })
            .end((err: any, res: any) => {
                if (err) done(err);
                else done()
            })
    })
    it('should not create order when missing address', function (done) {
        request(app).post('/order').send({
            "btcAmount": 0.01,
            "usdAmount": 0.01,
        })
            .expect(422)
            .end((err: any, res: any) => {
                if (err) done(err);
                else done()
            })
    })
    it('should not create order when missing USD amount', function (done) {
        request(app).post('/order').send({
            "btcAmount": 0.01,
            "address": "tb1qz4dxjgu603khe0hdu65s8e75rnjud0zqrhlmj8"
        })
            .expect(422)
            .end((err: any, res: any) => {
                if (err) done(err);
                else done()
            })
    })
    it('should not create order when missing BTC amount', function (done) {
        request(app).post('/order').send({
            "usdAmount": 1000,
            "address": "tb1qz4dxjgu603khe0hdu65s8e75rnjud0zqrhlmj8"
        })
            .expect(422)
            .end((err: any, res: any) => {
                if (err) done(err);
                else done()
            })
    })
})

describe('GET /validate-address', () => {
    it('should return OK, when address is valid', function (done) {
        const address = 'tb1qz4dxjgu603khe0hdu65s8e75rnjud0zqrhlmj8';
        request(app).get(`/validate-address/${address}`).send()
            .expect(200)
            .end((err: any, res: any) => {
                if (err) done(err);
                else done()
            })
    })
    it('should return 404 on invalid address', function (done) {
        const address = 'tb1qz4dxjgu603khe0';
        request(app).get(`/validate-address/${address}`).send()
            .expect(404)
            .end((err: any, res: any) => {
                if (err) done(err);
                else done()
            })
    })
})

describe('GET /btc-price', () => {

    it('should get current BTC price', function (done) {
        request(app).get('/btc-price').send()
            .expect(200)
            .expect(async (res: any) => {
                const price = JSON.parse(res.text);
                expect().instanceOf(Number);
                done();
            })
            .end((err: any, res: any) => {
                if (err) done(err);
                else done()
            })
    })
})