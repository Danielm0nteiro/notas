// script.js
let topics = JSON.parse(localStorage.getItem('topics')) || [];
let currentTopicIndex = null;

function mostrarModal() {
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

function adicionarTopico() {
    const nomeTopico = document.getElementById('novoTopicoNome').value.trim();
    if (nomeTopico) {
        topics.push({ nome: nomeTopico, notas: [] });
        salvarDados();
        carregarTopicos();
        fecharModal();
    }
}

function carregarTopicos() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';
    topics.forEach((topic, index) => {
        const topicItem = document.createElement('div');
        topicItem.className = 'note-container';
        topicItem.innerHTML = `
            <div class="flex justify-between items-center">
                <input type="text" value="${topic.nome}" class="text-xl font-bold bg-transparent border-none outline-none w-full" 
                       onblur="atualizarTopico(${index})" />
                <button onclick="removerTopico(${index})" class="text-red-500 hover:text-red-700">🗑️</button>
            </div>
        `;
        topicItem.onclick = () => abrirNotas(index);
        topicList.appendChild(topicItem);
    });
}

function abrirNotas(index) {
    currentTopicIndex = index;
    document.getElementById('mainContainer').classList.add('hidden');
    document.getElementById('notesContainer').classList.remove('hidden');
    document.getElementById('notesTitle').textContent = topics[index].nome;
    carregarBlocos();
}

function adicionarBloco() {
    if (currentTopicIndex === null) return;
    topics[currentTopicIndex].notas.push({ titulo: 'Novo Bloco', conteudo: '' });
    salvarDados();
    carregarBlocos();
}

function carregarBlocos() {
    const noteBlocks = document.getElementById('noteBlocks');
    noteBlocks.innerHTML = '';
    topics[currentTopicIndex].notas.forEach((nota, i) => {
        const bloco = document.createElement('div');
        bloco.className = 'note-container';
        bloco.innerHTML = `
            <div class="flex justify-between items-center">
                <input type="text" value="${nota.titulo}" class="text-xl font-bold bg-transparent border-none outline-none w-full" 
                       onblur="atualizarTitulo(${i})" />
                <button onclick="removerBloco(${i})" class="text-red-500 hover:text-red-700">🗑️</button>
            </div>
            <div contenteditable="true" class="editor" id="editor${i}" oninput="atualizarBloco(${i})">${nota.conteudo}</div>
        `;
        noteBlocks.appendChild(bloco);
    });
}

function atualizarBloco(index) {
    const conteudo = document.getElementById(`editor${index}`).innerText;
    topics[currentTopicIndex].notas[index].conteudo = conteudo;
    salvarDados();
}

function atualizarTitulo(index) {
    const novoTitulo = document.querySelectorAll('.note-container input')[index].value;
    topics[currentTopicIndex].notas[index].titulo = novoTitulo;
    salvarDados();
}

function atualizarTopico(index) {
    const novoTitulo = document.querySelectorAll('.note-container input')[index].value;
    topics[index].nome = novoTitulo;
    salvarDados();
}

function removerBloco(index) {
    topics[currentTopicIndex].notas.splice(index, 1);
    salvarDados();
    carregarBlocos();
}

function removerTopico(index) {
    topics.splice(index, 1);
    salvarDados();
    carregarTopicos();
    voltar();
}

function salvarDados() {
    localStorage.setItem('topics', JSON.stringify(topics));
}

function voltar() {
    document.getElementById('mainContainer').classList.remove('hidden');
    document.getElementById('notesContainer').classList.add('hidden');
}

carregarTopicos();
