import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import AppRouter from './routes';
import todosRouter from './routes/api/todos.route';
import userRouter from './routes/api/user.route';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/todo', todosRouter);
app.use('/user', userRouter);

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
