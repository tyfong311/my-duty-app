import { Client } from 'pg';

export const dbClient = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'myDB',
});


