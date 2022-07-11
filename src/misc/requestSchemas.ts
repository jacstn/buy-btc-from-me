const Joi = require('joi')

const expr = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

const schemas = {
  newOrder: Joi.object().keys({
    btcAmount: Joi.number().required(),
    usdAmount: Joi.number().required(),
    address: Joi.string().max(50).required(),
  }),
  newCharge: Joi.object().keys({
    omiseToken: Joi.string().required(),
    orderId: Joi.number().required(),
  })
};
export { schemas };