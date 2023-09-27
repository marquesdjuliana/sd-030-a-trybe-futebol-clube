import { RequestHandler, Response } from 'express';

class Validations {
  static validateLogin: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;
    const defaultEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const defaultPassword = typeof password === 'string' && password.length < 6;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    if (defaultPassword || !defaultEmail.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };
}

export default Validations;
