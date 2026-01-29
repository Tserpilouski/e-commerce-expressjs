import { Router } from 'express';
import { validationResult } from 'express-validator';
import { users } from '../utils/constants.mjs';
import resolveIndexByUserId from '../middlewares/userIdHandler.mjs';
import { User } from '../mongoose/schemas/user.mjs';

const router = Router();

// GET /users - Get all users or filter users by query parameters
router.get(
    '/users',
    // query('filter').isString().notEmpty().isLength({ min: 3, max: 10 }).withMessage('It must be betwen 3 and 10 symbols'),
    (req, res) => {
        // sesion
        console.log(req.session.id);
        req.sessionStore.get(req.session.id, (err, sessionData) => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(sessionData);
        });

        //endpoint
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        const { filter, value } = req.query;

        if (filter && value) {
            return res.send(users.filter((user) => user[filter].includes(value)));
        }

        return res.status(200).send(users);
    }
);

// GET /users/:id - Get a single user by ID
router.get('/users/:id', (req, res) => {
    const parsedId = Number(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(404).send({ msg: 'Bad id for request' });
    }
    const findUser = users.find((user) => user.id === req.params.id);

    if (!findUser) return res.sendStatus(404);
    return res.status(200).send(findUser);
});

// POST /users - Create a new user
router.post('/users', async (req, res) => {
    const { body } = req;
    const newUser = new User(body);
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (err) {
        console.log(err);
        return res.status(400);
    }
});

// PUT /users/:id - Update user instance by id
router.put('/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    users[findUserIndex] = { id: findUserIndex, ...body };
    return res.sendStatus(200);
});

// PATCH /users/:id - Update user instance by id
router.patch('/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    users[findUserIndex] = { ...users[findUserIndex], ...body };
    return res.sendStatus(200);
});

export default router;
