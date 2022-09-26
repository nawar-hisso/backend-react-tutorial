import { Router } from 'express';
import { home } from '../controllers/home.js';
import ROUTES from '../configs/routes.js';

const router = Router();

router.get(ROUTES.HOME.ROOT, home);

export default router;
