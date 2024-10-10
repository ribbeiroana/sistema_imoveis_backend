import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import ImobiController from './controllers/ImobiController';
import auth from './middlewares/auth';

const router = Router();

router.post('/creatusers', UserController.createUser);
router.get('/listusers', auth, UserController.findAllUser);
router.post('/session', SessionController.createSession);
router.post('/createimobi', ImobiController.createImobi);


export { router } 