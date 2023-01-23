import { Router } from 'https://deno.land/x/oak/mod.ts';

import getSS from './controllers/mss/get.js';
import postSS from './controllers/mss/post.js';


const router = new Router();

router.get('/', ({ response }) => {
    response.body = 'Monitor de Sistemas Satelitales API';
});

router
    .get('/mss', getSS)
    .post('/mss', postSS)

export default router;