import express, { Request, Response } from 'express';
import dutyRoutes from '../routes/dutyRoutes';

const app = express();

app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json());
app.use('/api', dutyRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the RESTful API!');
});

export default app;