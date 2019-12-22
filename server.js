const
    express = require('express'),
    app = express(),
    config = require('./config.json'),
    mongoose = require('mongoose'),
    PORT = process.env.PORT || 3000;


app.use('/', (req, res) => {
    res.json({
        message: 'Feed backend Api'
    });
});

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