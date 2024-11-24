document.addEventListener("DOMContentLoaded", () => {
    const respostasUsuario = JSON.parse(localStorage.getItem("respostasUsuario")) || [];
    const perguntas = JSON.parse(localStorage.getItem("perguntas")) || [];
  
    const temas = {}; // Para armazenar acertos por tema
    let acertos = 0;  // Para contar os acertos gerais
    let erros = 0;    // Para contar os erros gerais
    let maxErros = 0;  // Para armazenar o máximo de erros por tema
    let temaMaisErros = "";  // Para armazenar o tema com mais erros
  
    // Contabiliza acertos e erros por tema
    perguntas.forEach((pergunta, index) => {
        const tema = pergunta.tema || "Outros"; // Tema da pergunta
        const correta = pergunta.resposta_correta;  // Resposta correta
        const respostaUsuario = respostasUsuario[index];  // Resposta do usuário
  
        if (!temas[tema]) {
            temas[tema] = { acertos: 0, erros: 0 }; // Inicializa o tema no objeto
        }
  
        // Verifica se a resposta do usuário está correta
        if (respostaUsuario === correta) {
            acertos++;
            temas[tema].acertos++; // Incrementa os acertos para o tema
        } else {
            erros++;
            temas[tema].erros++; // Incrementa os erros para o tema
        }
  
        // Atualiza o tema com mais erros
        if (temas[tema].erros > maxErros) {
            maxErros = temas[tema].erros;
            temaMaisErros = tema;
        }
    });
  
    // Exibe gráfico de pizza com Chart.js
    const ctx = document.getElementById("grafico-pizza").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Acertos", "Erros"],
            datasets: [
                {
                    data: [acertos, erros],
                    backgroundColor: ["#4CAF50", "#F44336"], // Verde para acertos, vermelho para erros
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
            },
        },
    });
  
    // Exibe detalhes dos acertos/erros
    const detalhesDiv = document.getElementById("detalhes-acertos-erros");
    let detalhesHTML = `<p>Você acertou ${acertos} e errou ${erros} perguntas.</p>`;
  
    let detalhesPorTema = [];
  
    // Loop pelos temas para mostrar detalhes de acertos e erros
    Object.keys(temas).forEach((tema) => {
        const { acertos: acertosTema, erros: errosTema } = temas[tema];
        detalhesPorTema.push({ tema, acertos: acertosTema, erros: errosTema });
    });
  
    // Ordena os temas para mostrar o tema com mais erros por último
    detalhesPorTema.sort((a, b) => b.erros - a.erros);
  
    // Exibe acertos e erros dos temas
    detalhesPorTema.forEach((item) => {
        detalhesHTML += `<p><b>${item.tema}:</b> ${item.acertos} acertos, ${item.erros} erros</p>`;
    });
  
    // Exibe o tema com mais erros como recomendação final
    detalhesHTML += `<p>📚 Estudar mais: <b>${temaMaisErros}</b></p>`;
  
    detalhesDiv.innerHTML = detalhesHTML;


 // Manipulação do botão "Revisar Perguntas"
 const revisarBtn = document.getElementById("revisarPerguntas");
 const revisaoDiv = document.getElementById("revisao");
 const perguntaRevisaoDiv = document.getElementById("perguntaRevisao");
 const alternativasRevisaoDiv = document.getElementById("alternativasRevisao");
 const explicacaoRevisaoDiv = document.getElementById("explicacaoRevisao");
 const proximaPerguntaBtn = document.getElementById("proximaPergunta");
 const voltarRankingBtn = document.getElementById("voltarRanking");

 let perguntaAtual = 0; // Para armazenar o índice da pergunta atual

 revisarBtn.addEventListener("click", () => {
     // Exibe a área de revisão
     revisaoDiv.style.display = "block";
     // Esconde a área de resultados
     document.querySelector(".main").style.display = "none";

     // Exibe a primeira pergunta
     exibirPergunta(perguntaAtual);
 });

 // Exibe a pergunta com alternativas e explicação
 function exibirPergunta(index) {
     const pergunta = perguntas[index];
     const respostaUsuario = respostasUsuario[index];
     const correta = pergunta.resposta_correta;
     const explicacao = pergunta.explicacao || "Sem explicação disponível";
     const alternativas = pergunta.alternativas;

     perguntaRevisaoDiv.innerHTML = `<p><b>${pergunta.pergunta}</b></p>`;
     alternativasRevisaoDiv.innerHTML = `
         <p><b>Alternativa escolhida:</b> ${alternativas[respostaUsuario]}</p>
         <p><b>Alternativa correta:</b> ${alternativas[correta]}</p>
     `;
     explicacaoRevisaoDiv.innerHTML = `<p><b>Explicação:</b> ${explicacao}</p>`;
 }

 // Evento do botão "Mostrar próxima pergunta"
 proximaPerguntaBtn.addEventListener("click", () => {
     perguntaAtual++;
     if (perguntaAtual < perguntas.length) {
         exibirPergunta(perguntaAtual); // Exibe a próxima pergunta
     } else {
         alert("Você chegou ao fim das perguntas.");
     }
 });

 // Evento do botão "Voltar ao Ranking"
 voltarRankingBtn.addEventListener("click", () => {
     // Volta para a área de resultados
     revisaoDiv.style.display = "none";
     document.querySelector(".main").style.display = "block";
 });
});