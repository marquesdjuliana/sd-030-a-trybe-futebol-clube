import { Router } from 'express';
import UsersController from '../controllers/UserController';
import Validations from '../middleware/Validations';

const userController = new UsersController();

const router = Router();

// router.get('/role', (req, res) => res.status(301).json({ message: 'oi' }));
router.post(
  '/',
  Validations.validateLogin,
  (req, res) => userController.login(req, res),
);

export default router;
