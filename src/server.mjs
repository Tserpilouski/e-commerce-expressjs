import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRoutes.mjs';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(usersRouter);

app.listen(PORT, () => {
    console.log(`Project started on http://localhost:${PORT}/`);
});
