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
});


