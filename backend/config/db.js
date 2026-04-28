import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '########',
    database: 'projects'
});

async function connect() {
    try {
        const connexao = await db.getConnection();
        console.log('Conectado com sucesso.');
        connexao.release();
    } catch (err) {
        console.error('Erro ao conectar!', err);
    }
}

connect();
