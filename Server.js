const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let produtos = [
    { id: 1, nome: "Camiseta", preco: 20.00 },
    { id: 2, nome: "Tênis", preco: 150.00 },
    { id: 3, nome: "Boné", preco: 35.00 }
];

let carrinho = [];

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/carrinho/adicionar', (req, res) => {
    const { id } = req.body;
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        carrinho.push(produto);
        res.json({ message: "Produto adicionado!", carrinho });
    } else {
        res.status(404).json({ message: "Produto não encontrado" });
    }
});

app.get('/carrinho', (req, res) => {
    res.json(carrinho);
});

app.post('/carrinho/limpar', (req, res) => {
    carrinho = [];
    res.json({ message: "Carrinho esvaziado!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...");
});
