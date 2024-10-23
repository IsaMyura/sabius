// ranking.js

function calcularRanking(perguntas, respostasUsuario) {
    const ranking = {};
    perguntas.forEach((pergunta, index) => {
        const tema = pergunta.tema;
        ranking[tema] = ranking[tema] || { acertos: 0, erros: 0 };
        if (pergunta.resposta_correta === (respostasUsuario[index] || -1)) {
            ranking[tema].acertos++;
        } else {
            ranking[tema].erros++;
        }
    });
    return ranking;
}

function mostrarRanking(ranking) {
    const resultadoContainer = document.getElementById('resultado');
    const tabela = document.createElement('table');
    tabela.innerHTML = `<tr><th>Tema</th><th>Acertos</th><th>Erros</th></tr>`;

    let maiorDificuldade = { tema: '', erros: 0 };

    Object.keys(ranking).forEach(tema => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${tema}</td><td>${ranking[tema].acertos}</td><td>${ranking[tema].erros}</td>`;
        tabela.appendChild(tr);
        
        // Verifica se este tema tem mais erros
        if (ranking[tema].erros > maiorDificuldade.erros) {
            maiorDificuldade = { tema: tema, erros: ranking[tema].erros };
        }
    });

    resultadoContainer.appendChild(tabela);

    // Adiciona o texto sobre a maior dificuldade
    const mensagem = document.createElement('p');
    mensagem.innerHTML = `Sua maior dificuldade é em ${maiorDificuldade.tema}. Estude mais sobre!`;
    resultadoContainer.appendChild(mensagem);
}


