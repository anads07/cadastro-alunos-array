
let alunos = [];

const alunoForm = document.getElementById('alunoForm');
const jsonContainer = document.getElementById('jsonContainer');
const btnExportar = document.getElementById('btnExportar');

function criarAluno(nome, idade, curso) {
    return {
        nome: nome,
        idade: idade,
        curso: curso
    };
}

function adicionarAluno(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    
    if (!nome || !idade || !curso) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    const novoAluno = criarAluno(nome, idade, curso);
    alunos.push(novoAluno);
    
    atualizarJSON();
    alunoForm.reset();
}

function atualizarJSON() {
    if (alunos.length === 0) {
        jsonContainer.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
        return;
    }
    
    jsonContainer.textContent = JSON.stringify(alunos, null, 2);
}

function exportarParaJSON() {
    if (alunos.length === 0) {
        alert('Nenhum aluno cadastrado para exportar!');
        return;
    }
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(alunos, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "alunos.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

alunoForm.addEventListener('submit', adicionarAluno);
btnExportar.addEventListener('click', exportarParaJSON);

atualizarJSON();