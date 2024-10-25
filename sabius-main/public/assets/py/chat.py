import requests
import json

# Substitua 'sua_chave_de_api_aqui' pela sua chave de API real
api_key = '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'
url = 'https://api.openai.com/v1/chat/completions'

headers = {
    'Authorization': f'Bearer {api_key}',  # Corrigido para usar a variável api_key corretamente
    'Content-Type': 'application/json'
}

# O corpo da solicitação com um prompt de exemplo
data = {
    "model": "gpt-4",  # Use este modelo se não tiver acesso ao gpt-4
    "messages": [
        {"role": "system", "content": "Você é um assistente útil."},
        {"role": "user", "content": "Quem descobriu o Brasil"}
    ]
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    response_data = response.json()
    print(response_data['choices'][0]['message']['content'])
else:
    print(f"Erro: {response.status_code} - {response.text}")
