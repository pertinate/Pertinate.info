import express from 'express';
import V1 from './controllers/V1';
import cookieParser from 'cookie-parser';
import { ValidateToken, EmailLogin } from './services/Firebase';

const v1 = new V1();
const router = express.Router();

router.use(cookieParser());

router.get('/login', v1.login);

router.use((request, response, next) => {
    if (request.cookies.token !== undefined) {
        ValidateToken(request.cookies.token)
            .then(result => {
                console.log(result);
                return next();
            })
            .catch(error => {
                console.error(error);
                return response.send({ action: 'login' });
            });
    } else {
        console.log('No cookie token');
        return response.send({ action: 'register' });
    }
});

router.get('/test', (request, response) => response.send({ message: 'test' }));

// V1 routes go here
// router.get('/V1/ping', v1.getPing());

// V2 and so forth keep getting tacked on below

export default router;
