function criarInterfaceAPI() {
    const container = document.createElement('div');
    container.classList.add('container');

    const titulo = document.createElement('h1');
    titulo.textContent = 'Assistente API';
    container.appendChild(titulo);

    const textareaEntrada = document.createElement('textarea');
    textareaEntrada.id = 'entrada';
    textareaEntrada.placeholder = 'Digite sua pergunta aqui...';
    container.appendChild(textareaEntrada);

    const botao = document.createElement('button');
    botao.textContent = 'Enviar Pergunta';
    botao.onclick = enviarPergunta;
    container.appendChild(botao);

    const tituloResposta = document.createElement('h2');
    tituloResposta.textContent = 'Resposta:';
    container.appendChild(tituloResposta);

    const textareaSaida = document.createElement('textarea');
    textareaSaida.id = 'saida';
    textareaSaida.readOnly = true;
    container.appendChild(textareaSaida);

    document.body.appendChild(container);
}

// Função para enviar a pergunta para a API
async function enviarPergunta(pergunta = null) {
    const perguntaFinal = pergunta || document.getElementById('entrada').value; // Usa a pergunta padrão se fornecida
    const apiKey = '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';  
    const url = 'https://api.openai.com/v1/chat/completions';

    // Mostra "Digitando..." no campo de saída enquanto a resposta não chega
    const saida = document.getElementById('saida');
    saida.value = 'Sabius está a reunir todos seus conhecimentos...';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { "role": "system", "content": "Você é um assistente útil." },
                { "role": "user", "content": pergunta }
            ]
        })
    });

    if (response.ok) {
        const data = await response.json();
        const resposta = data.choices[0].message.content;

        // Adicione sua frase padrão aqui
    const frasePadrao = "\n\nA sabedoria de Sabius poderia te ajudar em algo a mais?";

        // Simula a digitação da resposta
        let index = 0;
        saida.value = ''; // Limpa a área de saída
        const typingInterval = setInterval(() => {
            if (index < resposta.length) {
                saida.value += resposta.charAt(index); // Adiciona um caractere por vez
                index++;
            } else {
                clearInterval(typingInterval); // Para a simulação quando a resposta estiver completa
                 // Adiciona a frase padrão ao final
            saida.value += frasePadrao; 
            }
        }, 30); // Tempo entre cada caractere (50ms neste caso)
    } else {
        saida.value = `Erro: ${response.status}`; // Mostra erro em caso de falha
    }
}

// Função para carregar a mensagem padrão e enviá-la automaticamente
function enviarMensagemPadrao(mensagemPadrao) {
    enviarPergunta(mensagemPadrao);
}