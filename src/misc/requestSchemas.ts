const Joi = require('joi')

const expr = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

const schemas = {
  urlCreation: Joi.object().keys({
    url: Joi.string().regex(expr).required().error((errors: any) => {
      errors.forEach((err: any) => {
        switch (err.code) {
          case "string.pattern.base":
            err.message = "URL is invalid";
            break;
        }
      });
      return errors;
    }),
  })
};
export { schemas };