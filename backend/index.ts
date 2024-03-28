import app from './src/services/app';
import { dbClient } from './src/db/dbClient';

dbClient.connect().catch((err) => console.error('Connection error', err.stack));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});