const express = require("express");
const cors = require('cors');
const path = require('path');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/music/:songname', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'songs', req.params.songname));
});

app.use('/api', router);
app.use((req, res, next) => {
    res.status(404).json({ error: 'API IS NOT FOUND!' });
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log('server listening on 3000');
})