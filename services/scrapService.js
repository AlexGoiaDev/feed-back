const
    axios = require('axios'),
    cheerio = require('cheerio'),
    feedServie = require('./feedService');

const parseFeedElMundo = async (source) => {
    const html = (await axios(source, {charset: 'latin-1'})).data;
    let $ = cheerio.load(html);
    const title = $('article').find('h1').text();
    const body = $('.ue-l-article__body').text();
    const image = $('.ue-c-article__media--image').find('img')['0'] ? $('.ue-c-article__media--image').find('img')['0'].attribs['src'] : '';
    const publisher = $('.ue-c-article__byline-name').text();
    const user = {
        title,
        body,
        image,
        publisher,
        source
    }
    return user;
};

const parseFeedElPais = async (source) => {
    const html = (await axios(source)).data;
    let $ = cheerio.load(html);

    /*
     <meta property="og:image" content="https://ep00.epimg.net/politica/imagenes/2019/12/27/actualidad/1577469264_141964_1577469417_rrss_normal.jpg">
    */

    const title = $('#articulo-titulares > h1').text();
    const body = $('#cuerpo_noticia').text() || 'Sin contenido';
    const image = $('meta[property="og:image"]')['0'].attribs.content;

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
                return await feedServie.addFeed(feed);
            }
        }
    } catch (err) {
        console.error('Err', err.message);
    }
}

const getFirstFeeds = async (url) => {
    try {
        const html = (await axios(url)).data;
        let $ = cheerio.load(html);
        for (let i = 0; i < 5; i++) {
            const articleUrl = $($('article')[i]).find('a')['0'].attribs.href;
            parseFeed(articleUrl);
        }
    } catch (err) {
        console.error('Err', err.message);
    }
}

module.exports = {
    parseFeed,
    getFirstFeeds
}
