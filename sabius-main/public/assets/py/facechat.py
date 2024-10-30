import tkinter as tk
from tkinter import scrolledtext
import requests
import json

def enviar_pergunta():
    pergunta = entrada.get()  # Pega a pergunta digitada pelo usuário
    data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "Você é um assistente útil."},
            {"role": "user", "content": pergunta}
        ]
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        resposta = response.json()['choices'][0]['message']['content']
        saida.insert(tk.END, f"Usuário: {pergunta}\nAssistente: {resposta}\n\n")
    else:
        saida.insert(tk.END, f"Erro: {response.status_code}\n")

api_key = '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'
url = 'https://api.openai.com/v1/chat/completions'
headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

# Configuração da interface Tkinter
janela = tk.Tk()
janela.title("SABIUS")

# Entrada de texto para o usuário digitar a pergunta
entrada = tk.Entry(janela, width=50)
entrada.pack(padx=10, pady=10)

# Botão para enviar a pergunta
botao = tk.Button(janela, text="Enviar", command=enviar_pergunta)
botao.pack(pady=10)

# Área de texto para exibir a conversa
saida = scrolledtext.ScrolledText(janela, width=60, height=10)
saida.pack(padx=10, pady=10)

# Inicia a interface gráfica
janela.mainloop()
