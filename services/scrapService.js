const
    axios = require('axios'),
    cheerio = require('cheerio'),
    feedServie = require('./feedService');

const parseFeedElMundo = async (source) => {
    const html = (await axios(source)).data;
    let $ = cheerio.load(html);
    const title = $('article').find('h1').text();
    const body = $('.ue-l-article__body').text();
    const image = $('.ue-c-article__media--image').find('img')['0'].attribs['src'];
    const publisher = $('.ue-c-article__byline-name').text();
    const user = {
        title,
        body,
        image,
        publisher,
        source
    }

    console.log('User', user);

    return user;
};

const parseFeedElPais = async (source) => {
    const html = (await axios(source)).data;
    let $ = cheerio.load(html);
    const title = $('#articulo-titulares > h1').text();
    const body = $('#cuerpo_noticia > p').text();
    const image = $('#articulo_contenedor').find('img')['0'].attribs['data-src'];
    const publisher = $('.autor-nombre').text();
    return {
        title,
        body,
        image,
        publisher,
        source
    };
};

const parseFeed = async (source) => {
    try {
        if (source) {
            const feedAdded = await feedServie.getFeedBySource(source);
            if (!feedAdded) {
                let feed = null;
                if (source.includes('elpais')) {
                    feed = await parseFeedElPais(source);
                } else if (source.includes('elmundo')) {
                    feed = await parseFeedElMundo(source);
                }
                const result = await feedServie.addFeed(feed);
            }
        }
    } catch (err) {
        console.error('Err', err.message);
    }
}

module.exports = {
    parseFeed
}
