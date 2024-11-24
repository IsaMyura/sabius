document.addEventListener('DOMContentLoaded', function() {
    // Mensagem inicial de boas-vindas do assistente
    addMessage('Olá! Eu sou o Sabius, seu assistente. Qual a sua dúvida?', 'assistant');
});

const apiKey = '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';
const url = 'https://api.openai.com/v1/chat/completions';
const headers = {
    'Authorization': `Bearer ${apiKey}`, 
    'Content-Type': 'application/json'
};

function enviarMensagem() {
    const userMessage = document.getElementById('userMessage').value;
    if (!userMessage) return;

    // Adiciona a mensagem do usuário ao chat
    addMessage(userMessage, 'user');

    // Limpa a entrada de texto
    document.getElementById('userMessage').value = '';

    // Adiciona a mensagem de "digitando..." do assistente
    const typingMessageElement = document.createElement('div');
    typingMessageElement.classList.add('message', 'assistant-message', 'typing');
    typingMessageElement.textContent = '...';
    document.getElementById('chat').appendChild(typingMessageElement);
    
    // Rola o chat para a última mensagem
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;

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

        // Remove a mensagem de "digitando..."
        typingMessageElement.remove();

        // Adiciona a mensagem do assistente
        addMessage(assistantMessage, 'assistant');
    })
    .catch(error => {
        console.error('Erro ao chamar a API:', error);

        // Remove a mensagem de "digitando..." em caso de erro
        typingMessageElement.remove();

        // Exibe a mensagem de erro
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
