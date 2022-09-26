import { Router } from 'express';
import blogs from './blogs.js';
import home from './home.js';

import ROUTES from '../configs/routes.js';

const router = Router();

router.use(ROUTES.HOME.ROOT, home);
router.use(ROUTES.BLOGS.ROOT, blogs);

export default router;
