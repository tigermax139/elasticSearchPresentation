require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  elasticSearch: {
    endpoint: process.env.ELASTICSEARCH_ENDPOINT,
  }
};