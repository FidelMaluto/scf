const cadastra = document.getElementById('cad-btn');
const edita = document.getElementById('edita-btn');
const cancela = document.getElementById('cancela-btn');
const formulario = document.getElementById('formulario');
const filtro = document.getElementById("filtro");
const tabela = document.getElementById("tabela");
const linhas = tabela.getElementsByTagName("tr");
// FETCH CREATE
cadastra.addEventListener('click', e => {
    e.preventDefault();

    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const contacto = document.getElementById('contacto').value;
    const email = document.getElementById('email').value;
    const morada = document.getElementById('morada').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const numeroBI = document.getElementById('numeroBI').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const numConta_Ibam = document.getElementById('numConta_Ibam').value;

    const valores = { nomeCompleto, contacto, email, morada, nacionalidade, dataNascimento, numeroBI, altura, peso, numConta_Ibam }

    if (valores.value === "") {
        alert('Preencha todos os campos!');
        return;
    }

    fetch('http://localhost:3030/funcionario', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(valores)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Cadastrado com sucesso.');
            alert('Cadastrado com sucesso.');
        })
        .catch((err) => {
            console.error('Erro ao cadastrar!', err);
        });

    formulario.reset();

});

// FETCH READ
async function list() {
    const resp = await fetch('http://localhost:3030/funcionarios');
    const dados = await resp.json();
    showDatas(dados);
    console.log(dados);
};

window.onload = list;

function showDatas(lista) {
    const table = document.getElementById('datas');
    table.innerHTML = '';

    lista.forEach(employee => {
        table.innerHTML += `
            <tr>
                <td data-label="ID">${employee.id}</td>
                <td data-label="Nome">${employee.nomeCompleto}</td>
                <td data-label="Contacto">${employee.contacto}</td>
                <td data-label="Email">${employee.email}</td>
                <td data-label="Morada">${employee.morada}</td>
                <td data-label="Nacionalidade">${employee.nacionalidade}</td>
                <td data-label="Nascimento">${employee.dataNascimento}</td>
                <td data-label="BI">${employee.numeroBI}</td>
                <td data-label="Altura">${employee.altura}</td>
                <td data-label="Peso">${employee.peso}</td>
                <td data-label="Conta">${employee.numConta_Ibam}</td>
                <td data-label="Opções">
                    <button onclick='editar(${JSON.stringify(employee)})' class='editar'>Editar</button>
                    <button onclick='excluir(${employee.id})' class='excluir'>Excluir</button>
                </td>
            </tr>
        `;
    });
};

// FETCH UPDATE
async function editar(employee) {

    document.getElementById('id').value = employee.id;
    document.getElementById('nomeCompleto').value = employee.nomeCompleto;
    document.getElementById('contacto').value = employee.contacto;
    document.getElementById('email').value = employee.email;
    document.getElementById('morada').value = employee.morada;
    document.getElementById('nacionalidade').value = employee.nacionalidade;
    document.getElementById('dataNascimento').value = employee.dataNascimento;
    document.getElementById('numeroBI').value = employee.numeroBI;
    document.getElementById('altura').value = employee.altura;
    document.getElementById('peso').value = employee.peso;
    document.getElementById('numConta_Ibam').value = employee.numConta_Ibam;

    showEdicao();

};

edita.addEventListener('click', e => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const contacto = document.getElementById('contacto').value;
    const email = document.getElementById('email').value;
    const morada = document.getElementById('morada').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const numeroBI = document.getElementById('numeroBI').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const numConta_Ibam = document.getElementById('numConta_Ibam').value;

    const valores = { nomeCompleto, contacto, email, morada, nacionalidade, dataNascimento, numeroBI, altura, peso, numConta_Ibam };

    try {
        fetch(`http://localhost:3030/funcionario/edita/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        })
            .then(resp => resp.json())
            .then(data => {
                alert('Edição realizada.');
                console.log('Editado: ', data);
            });

        cleaField();

    } catch (err) {
        console.log('Erro ao editar!', err);
    }

});

// FETCH DELETE
async function excluir(id) {
    const confirmExclusao = confirm("Desejas aparar essa informção?");

    if (!confirmExclusao) return;

    try {
        await fetch(`http://localhost:3030/funcionario/apaga/${id}`, {
            method: 'DELETE'
        })
            .then(info => {
                alert('Apagado com sucesso.');
                console.log('Apagado com sucesso.');
            })

    } catch (err) {
        console.error('Erro ao apagar informação!', err);
    }
};

// Função cancela edicao
cancela.addEventListener('click', e => {
    e.preventDefault();

    formulario.reset();
    document.getElementById('cad-btn').style.display = 'inline-block';
    document.getElementById('edita-btn').style.display = 'none';
    document.getElementById('cancela-btn').style.display = 'none';
});

// Função Limpar Campos
function cleaField() {
    formulario.reset();

    document.getElementById('cad-btn').style.display = 'inline-block';
    document.getElementById('edita-btn').style.display = 'none';
    document.getElementById('cancela-btn').style.display = 'none';
}

// Função mostrar Campos
function showEdicao() {
    document.getElementById('cad-btn').style.display = 'none';
    document.getElementById('edita-btn').style.display = 'inline-block';
    document.getElementById('cancela-btn').style.display = 'inline-block';
}

// Função de Filtro
filtro.addEventListener("keyup", function () {
    const filter = filtro.value.toLowerCase();

    for (let i = 0; i < linhas.length; i++) {
        const coluna = linhas[i].getElementsByTagName("td")[1];

        if (coluna) {
            const texto = coluna.textContent.toLowerCase();

            linhas[i].style.display =
                texto.includes(filter) ? "" : "none";
        }
    }
});
