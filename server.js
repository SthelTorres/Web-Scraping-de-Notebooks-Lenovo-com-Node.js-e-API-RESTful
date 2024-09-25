const express = require('express');
const { getLenovoLaptops } = require('./scraping');

const app = express();
const port = 3000;

app.get('/notebooks', async (req, res) => {
    const laptops = await getLenovoLaptops();
    res.json(laptops);
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
