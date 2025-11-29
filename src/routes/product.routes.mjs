import { Router } from 'express';

const router = Router();

router.get('/products', (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    res.send('List of products');
});

export default router;
