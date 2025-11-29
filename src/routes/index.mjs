import { Router } from 'express';
import products from './product.routes.mjs';
import users from './user.routes.mjs';

const router = Router();

router.use(users);
router.use(products);

export default router;
