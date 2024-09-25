const axios = require('axios');
const cheerio = require('cheerio');

async function getLenovoLaptops() {
    try {
        const response = await axios.get('https://webscraper.io/test-sites/e-commerce/static/computers/laptops');
        const html = response.data;
        const $ = cheerio.load(html);
        let laptops = [];

        $('.col-sm-4.col-lg-4.col-md-4').each((index, element) => {
            const title = $(element).find('.title').text().trim();
            const price = parseFloat($(element).find('.price').text().replace('$', ''));
            const description = $(element).find('.description').text().trim();
            const reviews = parseInt($(element).find('.ratings > p').text().trim());
            const rating = $(element).find('.ratings .rating-stars').attr('data-rating');
            
            laptops.push({
                title,
                price,
                description,
                reviews,
                rating
            });
        });

        // Ordenar do mais barato para o mais caro
        laptops.sort((a, b) => a.price - b.price);

        return laptops;
    } catch (error) {
        console.error('Erro ao buscar os notebooks:', error);
        return [];
    }
}

module.exports = { getLenovoLaptops };
