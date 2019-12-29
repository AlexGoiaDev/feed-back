const
    express = require('express'),
    app = express(),
    config = require('./config.json'),
    mongoose = require('mongoose'),
    PORT = process.env.PORT || 3000,
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    /* CONTROLLERS */
    feedController = require('./controllers/feedController'),
    scrapService = require('./services/scrapService');

/* Config */
app.use(cors({ origin: '*' }));
app.use(compression());
app.use(bodyParser.json({ limit: '10mb', extended: true }));

/* End points */
app.use(feedController);

/* Conexión con la base de datos */
mongoose.connect(`mongodb+srv://${config.username}:${config.password}@${config.host}/${config.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    () => {
        console.log(`¡Conectado a la base de datos!`);
    },
    err => {
        console.error(`Error al conectar con la base de datos: ${err}`);
    }
).catch((err) => {
    console.error(`ERROR: ${err}`);
});

/* Server listening */
app.listen(PORT, () => {
    console.log('Api started');
});
 
const scrapArticles = () => {
    console.log('Scrapping articles');
    scrapService.getFirstFeeds('https://elpais.com/');
    scrapService.getFirstFeeds('https://www.elmundo.es/');
}

scrapArticles();

setInterval(() => {
    scrapArticles();
}, 60000)