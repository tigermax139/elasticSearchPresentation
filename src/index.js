const http = require('http');

const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');
const controllers = require('./controllers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/search', controllers.search);

app.use('*', (req, res) => res.send(`use only: POST /search`));

const server = http.createServer(app);
server.listen(config.port, err => {
  err ? console.error(err) : console.log(`Server starting on port ${config.port}`);
});

