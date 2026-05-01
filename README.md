![Logo](https://i.imgur.com/YjpDUlB.png)

O Quatenus MyRotogram é uma ferramenta interna da Quatenus Brasil, usada para facilitar a criação dos comandos de configuração das cercas do produto Rotograma. 

## Por que?

Antes era necessário colocar as latitudes e longitudes manualmente no Manage Tool para criar o comando de configuração, para cada área.

![ManageTool](https://i.imgur.com/CwTuh31.png)

Com o MyRotogram, é só baixar as áreas direto da plataforma GTI e gerar o comando para todas as áreas de uma vez só.

![MyRotogram](https://i.imgur.com/tP77sC8.png)
![MyRotogram](https://i.imgur.com/gPlCezq.png)

Dessa maneira conseguimos reduzir a probabilidade de erros na configuração e também o tempo necessário para entregar o produto ao cliente.

## Como usar

A utilização do MyRotogram é bem simples:
1. Acesse a plataforma do cliente no GTI,
2. Vá em Gerir > Importar / Exportar > Exportar > Exportação de áreas de interesse.
3. Selecione a área ou áreas que quer colocar dentro do dispositivo
4. Clique em Exportar (o formato do arquivo deve ser .csv).

Depois de baixar o arquivo (Exportação de pontos de áreas de interesse.csv), acesse o MyRotogram e clique em "Procurar", selecione o arquivo e depois clique em processar.

Caso você não tenha acessa a plataforma GTI, na raiz do projeto tem um arquivo .csv de exemplo.

https://github.com/user-attachments/assets/66c4f7b6-02d9-4d7f-a80a-da223903e92d

## Stack utilizada

React e Bootstrap

## Pré-requisitos

- Node.js (20.19+ ou 22.12+)

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
