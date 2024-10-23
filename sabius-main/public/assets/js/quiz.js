let perguntas = []; // Array para armazenar as perguntas
let perguntaAtual = 0; // Para controlar a pergunta atual
let acertos = 0; // Para contar os acertos
let acertosPorTema = {};
let respostasUsuario = [];

// Função para carregar perguntas do arquivo JSON
async function carregarPerguntas() {
    try {
        const response = await fetch('/sabius-main/public/assets/json/questoesenem.json'); // Atualize o caminho
        perguntas = await response.json(); // Armazena as perguntas no array
        mostrarPergunta(); // Mostra a primeira pergunta após carregar
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
    }
}

// Função para mostrar a pergunta atual
function mostrarPergunta() {
    if (perguntaAtual < perguntas.length) {
        const pergunta = perguntas[perguntaAtual];
        document.getElementById('pergunta').innerText = pergunta.pergunta;

        // Limpa as alternativas anteriores
        const alternativasContainer = document.getElementById('alternativas');
        alternativasContainer.innerHTML = '';

        pergunta.alternativas.forEach((alternativa, index) => {
            const button = document.createElement('button');
            button.innerText = alternativa;
            button.onclick = () => verificarResposta(index);
            alternativasContainer.appendChild(button);
        });
    } else {
        mostrarResultado(); // Chama a função para mostrar o resultado se não houver mais perguntas
    }
}

// Função para verificar a resposta
function verificarResposta(respostaUsuario) {
    if (respostaUsuario === perguntas[perguntaAtual].resposta_correta) {
        acertos++;
        const tema = perguntas[perguntaAtual].tema;
        
        // Verifica se o tema já existe no objeto de acertosPorTema
        if (!acertosPorTema[tema]) {
            acertosPorTema[tema] = 0; // Se não existe, inicializa com zero
        }
        acertosPorTema[tema]++; // Incrementa a contagem de acertos do tema
    }
    perguntaAtual++;
    mostrarPergunta();
}


// Função para mostrar o resultado

function mostrarResultado() {
    const resultadoContainer = document.getElementById('resultado');
    resultadoContainer.innerHTML = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;

    // Salvar respostas do usuário no localStorage para uso posterior
    localStorage.setItem('respostasUsuario', JSON.stringify(respostasUsuario));
    localStorage.setItem('perguntas', JSON.stringify(perguntas));

    // Redirecionar para a página de ranking
    window.location.href = 'ranking.html';
}




// Chamar a função ao carregar a página
window.onload = async function() {
    await carregarPerguntas(); // Carrega as perguntas
};
