import { Router } from 'https://deno.land/x/oak/mod.ts';

import getSS from './controllers/mss/get.js';
import postSS from './controllers/mss/post.js';
import deleteSS from './controllers/mss/delete.js';
import putSS from './controllers/mss/put.js';
import tickSS from './controllers/mss/tick.js';

const router = new Router();

router.get('/', ({ response }) => {
    response.body = 'Monitor de Sistemas Satelitales API';
});

router
    .get('/mss', getSS)
    .post('/mss', postSS)
    .post('/tick/:id', tickSS)
    .delete('/mss/:id', deleteSS)
    .put('/mss/:id', putSS);

export default router;