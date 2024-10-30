import requests
import json


api_key = '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'
url = 'https://api.openai.com/v1/chat/completions'

headers = {
    'Authorization': f'Bearer {api_key}',  
    'Content-Type': 'application/json'
}


data = {
    "model": "gpt-4",  
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
