import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import { users } from './utils/constants.mjs';
import passport from 'passport';
import './strategies/local-strategy.mjs';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

mongoose
    .connect('mongodb://root:password1234@localhost:27017')
    .then(() => console.log('Connect to DB id Done!'))
    .catch((error) => console.log('Error:', error));

app.use(express.json());
app.use(cookieParser('secret'));
app.use(
    session({
        secret: 'kiryl secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post('/auth', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

app.post('/auth/logout', (req, res) => {
    if (!req.user) return res.sendStatus(401);

    req.logOut((err) => {
        if (err) return res.sendStatus(400);
        res.sendStatus(200);
    });
});

app.get('/auth/status', (req, res) => {
    console.log(req.user);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Project started on http://localhost:${PORT}/`);
});

// app.get('/', (req, res) => {
//     req.session.visited = true;
//     console.log(req.session);
//     console.log(req.session.id);
//     res.cookie('cart', 'products', { maxAge: 60000 * 60 * 2, signed: true });
//     return res.status(200).send({ msg: 'good connect' });
// });

// app.post('/auth', (req, res) => {
//     const {
//         body: { name, password },
//     } = req;
//     const findUser = users.find((user) => user.name === name);
//     if (!findUser) {
//         return res.status(401).send({ msg: 'BAD CREDENTIALS' });
//     }

//     if (findUser.password !== password) {
//         return res.status(401).send({ msg: 'BAD CREDENTIALS' });
//     }

//     req.session.user = findUser;
//     return res.status(200).send(findUser);
// });

// app.get('/auth/status', (req, res) => {
//     return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({ msg: 'bar Authentication' });
// });
