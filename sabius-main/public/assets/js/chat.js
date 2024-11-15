document.addEventListener('DOMContentLoaded', function() {
    // Mensagem inicial de boas-vindas do assistente
    addMessage('Olá! Eu sou o Sabius, seu assistente. Como posso te ajudar nos estudos0 hoje?', 'assistant');
});

const apiKey = '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';
const url = 'https://api.openai.com/v1/chat/completions';
const headers = {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
};

function enviarMensagem() {
    const userMessage = document.getElementById('userMessage').value;
    if (!userMessage) return;

    // Adiciona a mensagem do usuário ao chat
    addMessage(userMessage, 'user');

    // Limpa a entrada de texto
    document.getElementById('userMessage').value = '';

    // Envia a mensagem para a API do GPT
    const data = {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'Você é um assistente útil.' },
            { role: 'user', content: userMessage }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const assistantMessage = data.choices[0].message.content;
        addMessage(assistantMessage, 'assistant');
    })
    .catch(error => {
        console.error('Erro ao chamar a API:', error);
        addMessage('Erro ao processar a resposta.', 'assistant');
    });
}

function addMessage(message, type) {
    const chat = document.getElementById('chat');

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (type === 'user') {
        messageElement.classList.add('user-message');
    } else if (type === 'assistant') {
        messageElement.classList.add('assistant-message');
    }

    messageElement.textContent = message;
    chat.appendChild(messageElement);

    // Rola o chat para a última mensagem
    chat.scrollTop = chat.scrollHeight;
}