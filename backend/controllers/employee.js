import { db } from '../config/db.js';

// CREATE
export const cadEmployee = async (req, res) => {
    try {
        const {
            nomeCompleto, contacto, email, morada, nacionalidade,
            dataNascimento, numeroBI, altura, peso, numConta_Ibam
        } = req.body;

        const [datas] = await db.query(`INSERT INTO funcionarios(nomeCompleto, contacto, email, morada, nacionalidade,
        dataNascimento, numeroBI, altura, peso, numConta_Ibam) VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [nomeCompleto, contacto, email, morada, nacionalidade,
                dataNascimento, numeroBI, altura, peso, numConta_Ibam]);

        return res.status(201).json({
            id: datas.insertId, nomeCompleto, contacto, email, morada, nacionalidade,
            dataNascimento, numeroBI, altura, peso, numConta_Ibam
        })

    } catch (err) {
        console.log('Erro', err);
        return res.status(500).json({ Error: "Erro ao cadastrar!" })
    }

};

// READ
export const listEmployee = async (req, res) => {
    try {
        const [datas] = await db.query('SELECT * FROM funcionarios');
        console.log(datas);
        return res.status(200).json(datas);
    } catch (err) {
        console.log('Erro ao consultar!', err);
        return res.status(500).json({ Error: "Erro ao consultar!" });
    }
};

// UPDATE
export const atuaEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nomeCompleto, contacto, email, morada, nacionalidade,
            dataNascimento, numeroBI, altura, peso, numConta_Ibam
        } = req.body;

        const datas = await db.query(`UPDATE funcionarios SET nomeCompleto = ?, contacto = ?, email = ?, morada = ?, 
        nacionalidade = ?, dataNascimento = ?, numeroBI = ?, altura = ?, peso = ?, numConta_Ibam = ? WHERE id = ?`,
            [ nomeCompleto, contacto, email, morada, nacionalidade, dataNascimento, numeroBI, altura, peso, numConta_Ibam, id ]);

        console.log(datas);
        return res.status(201).json({
            status: "Editado", id: datas.insertId, nomeCompleto, contacto, email, nacionalidade,
            dataNascimento, numeroBI, altura, peso, numConta_Ibam
        });

    } catch (err) {
        console.log('Erro ao editar funcionário!', err);
        return res.status(500).json({ Error: "Erro ao editar!" });
    }
};

// DELETE
export const apagEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM funcionarios WHERE id = ?', [id]);
        
        console.log('Funcionário apagado com sucesso');
        return res.status(200).json({message: "Apagado com sucesso"});
        
    } catch (err) {
        console.log('Erro ao apagar!', err);
        return res.status(500).json({Error: "Erro ao apagar!"});
    }
};
