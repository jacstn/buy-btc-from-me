import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'joi'


const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: { error: ValidationError } = schema.validate(req.body);

    if (!error) return next();

    const message = error.details.map(i => i.message).join(',');

    res.status(422).json({ error: message });
  }
}
export { validate };