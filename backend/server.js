import express from 'express';
import cors from 'cors';
import employee from './routes/employees.js';
import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const port = 3030
F
// Recriando o __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname, '../frontend')))
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html', 'index.html'))
})
server.use('/', employee);

server.listen(port, () => {
    console.log(`O servidor está rodando em: http://localhost:${port}`);
});
