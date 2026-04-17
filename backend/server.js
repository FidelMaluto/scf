import express from 'express';
import cors from 'cors';
import employee from './routes/employees.js';

const server = express();
const port = 3030

server.use(express.json());
server.use(cors());
server.use('/', employee);

server.listen(port, () => {
    console.log(`O servidor está rodando em: http://localhost:${port}`);
});
