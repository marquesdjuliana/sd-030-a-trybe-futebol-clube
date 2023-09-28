import { Router } from 'express';
import { RequestWithRole } from '../interfaces/user/IUser';
import UsersController from '../controllers/UserController';
import Validations from '../middleware/Validations';

const userController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => userController.login(req, res),
);

router.get('/role', Validations.validateToken, (req, res) => {
  res.status(200).json({ role: (req as RequestWithRole).role });
});

export default router;
