import { Router } from 'express';
import ROUTES from '../configs/routes.js';
import { list, read, create, remove } from '../controllers/blogs.js';

const router = Router();

router.get(ROUTES.BLOGS.LIST, list);
router.get(ROUTES.BLOGS.GET, read);
router.post(ROUTES.BLOGS.CREATE, create);
router.delete(ROUTES.BLOGS.DELETE, remove);

export default router;
