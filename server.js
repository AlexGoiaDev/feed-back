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

scrapService.parseFeed('https://elpais.com/elpais/2019/12/22/actualidad/1577008616_859116.html');
scrapService.parseFeed('https://www.elmundo.es/espana/2019/12/22/5dff4b1ffdddff0a4e8b45d0.html');