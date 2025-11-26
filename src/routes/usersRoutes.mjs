import { Router } from 'express';
import { query, validationResult, checkSchema, matchedData } from 'express-validator';
import { users } from '../utils/constants.mjs';
import { createUserValSchema } from '../validations/usersValidation.mjs';
import resolveIndexByUserId from '../middlewares/userIdHandler.mjs';

const router = Router();

// GET /users - Get all users or filter users by query parameters
router.get(
    '/users',
    query('filter').isString().notEmpty().isLength({ min: 3, max: 10 }).withMessage('It must be betwen 3 and 10 symbols'),
    (req, res) => {
        const result = validationResult(req);
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
    const findUser = users.find((user) => user.id == req.params.id);

    if (!findUser) return response.sendStatus(404);
    return res.status(200).send(findUser);
});

// POST /users - Create a new user
router.post('/users', checkSchema(createUserValSchema), (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req);

    const newUser = { id: users[users.length - 1].id + 1, ...data };
    users.push(newUser);
    return res.send(201);
});

// PUT /users/:id - Update user instance by id
router.put('/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;

    users[findUserIndex] = { id: findUserIndex, ...body };
    return res.sendStatus(200);
});

// PATCH /users/:id - Update user instance by id
router.patch('/users/:id', resolveIndexByUserId, (req, res) => {
    users[findUserIndex] = { ...users[findUserIndex], ...body };
    return res.sendStatus(200);
});

export default router;
