const path = require('path');
const elasticSearch = require('elasticsearch');

const config = require('./config');

const client = new elasticSearch.Client({
  host: config.elasticSearch.endpoint,
  log: {
    type: 'file',
    level: 'trace',
    path: path.join(__dirname, './logs/elasticsearch.log'),
  }
});

module.exports = client;