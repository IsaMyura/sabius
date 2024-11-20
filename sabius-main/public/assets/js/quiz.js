let perguntas = []; // Array para armazenar as perguntas
let perguntaAtual = 0; 
let acertos = 0; // Para contar os acertos
let acertosPorTema = {};
let respostasUsuario = [];

// Função para carregar perguntas do arquivo JS
async function carregarPerguntas() {
    try {
        const response = await fetch('./assets/json/questoesenem.json'); 
        perguntas = await response.json(); // Armazena as perguntas no array
        mostrarPergunta(); 
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
    }
}

// Função para voltar à pergunta anterior
function voltarPergunta() {
    if (perguntaAtual > 0) {
        perguntaAtual--; // Volta uma pergunta
        respostaUsuario = null; // Reseta a resposta do usuário
        mostrarPergunta(); // Exibe a pergunta anterior
    }
}

function mostrarPergunta() {
    if (perguntaAtual < perguntas.length) {
        const pergunta = perguntas[perguntaAtual];
        document.getElementById('pergunta').innerText = pergunta.pergunta;

        // Limpa as alternativas anteriores
        const alternativasContainer = document.getElementById('alternativas');
        alternativasContainer.innerHTML = '';

        pergunta.alternativas.forEach((alternativa, index) => {
            
            const radioHTML = `
                <div class="checkbox-wrapper">
                    <input type="radio" name="pergunta${perguntaAtual}" class="check" id="check${index}" onchange="atualizarResposta(${index})">
                    <label for="check${index}" class="label">
                        <svg width="45" height="45" viewBox="0 0 95 95">
                            <rect x="30" y="20" width="50" height="50" stroke="black" fill="none"></rect>
                            <g transform="translate(0,-952.36222)">
                                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="black" stroke-width="3" fill="none" class="path1"></path>
                            </g>
                        </svg>
                        <span>${alternativa}</span>
                    </label>
                </div>
            `;
            alternativasContainer.innerHTML += radioHTML;
        });

        // Esconde o botão "Próxima Pergunta" 
        document.getElementById('proxima').style.display = 'none';
    } else {
        mostrarResultado(); // Chama a função para mostrar o resultado se não houver mais perguntas
    }
}

// Função para atualizar a resposta do usuário
function atualizarResposta(resposta) {
    const pergunta = perguntas[perguntaAtual];

    // Bloqueia todas as alternativas após a seleção
    const alternativas = document.querySelectorAll(`#alternativas input`);
    alternativas.forEach((input, index) => {
        input.disabled = true;
        const label = input.nextElementSibling;

        // Aplica classe de estilo dependendo da resposta
        if (index === pergunta.resposta_correta) {
            label.classList.add('correto');
        } else if (index === resposta) {
            label.classList.add('errado');
        }
    });

    respostaUsuario = resposta; // Armazena a resposta selecionada

    // Atualiza a contagem de acertos por tema
    if (resposta === pergunta.resposta_correta) {
        acertos++;
        const tema = pergunta.tema;

        if (!acertosPorTema[tema]) {
            acertosPorTema[tema] = 0;
        }
        acertosPorTema[tema]++;
    }

    document.getElementById('proxima').style.display = 'block'; // Mostra o botão "Próxima Pergunta"
}


// Função para ir para a próxima pergunta
function proximaPergunta() {
    // A comparação da resposta do usuário com a resposta correta
    if (respostaUsuario === perguntas[perguntaAtual].resposta_correta) {
        acertos++; // Incrementa os acertos

        // Verifica o tema da pergunta e incrementa a contagem de acertos para o tema
        const tema = perguntas[perguntaAtual].tema;
        if (!acertosPorTema[tema]) {
            acertosPorTema[tema] = 0;
        }
        acertosPorTema[tema]++;
    }

    // Armazena a resposta do usuário
    respostasUsuario.push(respostaUsuario);

    // Incrementa para a próxima pergunta
    perguntaAtual++;

    // Se não houver mais perguntas, mostra o resultado
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta(); // Mostra a próxima pergunta
    } else {
        mostrarResultado(); // Exibe o resultado final
    }
}


// Função para mostrar o resultado
function mostrarResultado() {
    const resultadoContainer = document.getElementById('resultado');
    resultadoContainer.innerHTML = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;

    // Salva dados no localStorage
    localStorage.setItem('respostasUsuario', JSON.stringify(respostasUsuario));
    localStorage.setItem('perguntas', JSON.stringify(perguntas));

    // Redireciona para o ranking
    window.location.href = 'ranking.html';
}

// Chamar a função ao carregar a página
window.onload = async function() {
    await carregarPerguntas(); // Carrega as perguntas
};
