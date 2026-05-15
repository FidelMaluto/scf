import express from 'express';
import cors from 'cors';
import employee from './routes/employees.js';
import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const port = 3030

// Recriando o __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use('/assets', express.static(path.join(__dirname, '../frontend/assets')))
server.use(express.json());
server.use(cors());

// ROTAS
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'))
})

server.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'))
})
server.get('/funcionario', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/funcionario.html'))
})
server.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/cadastro.html'))
})

server.use('/', employee);

server.listen(port, () => {
    console.log(`O servidor está rodando em: http://localhost:${port}`);
});
