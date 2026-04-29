![Logo](https://i.imgur.com/YjpDUlB.png)

O Quatenus MyRotogram é uma ferramenta interna da Quatenus Brasil, usada para facilitar a configuração de cercas do produto Rotograma.

## Por que?

Antes era necessário colocar as latitudes e longitudes manualmente no Manage Tool para criar o comando de configuração, para cada área.

![ManageTool](https://i.imgur.com/CwTuh31.png)

Com o MyRotogram, é só baixar as áreas direto da plataforma GTI e gerar o comando para todas as áreas de uma vez só.

![MyRotogram](https://i.imgur.com/tP77sC8.png)
![MyRotogram](https://i.imgur.com/gPlCezq.png)

Dessa maneira conseguimos reduzir a probabilidade de erros na configuração e também o tempo necessário para entregar o produto ao cliente.

## Stack utilizada

React e Bootstrap

## Pré-requisitos

- Node.js 20.19+, 22.12+
- npm
- Conta ativa no Quatenus GTI

## Instalação e execução

Clone o repositório:

```bash
git clone https://github.com/Quatenus-Brasil/quatenus-myrotogram.git
cd quatenus-myrotogram
```

Depois:

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).
