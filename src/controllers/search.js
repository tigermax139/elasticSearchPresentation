const status = require('http-status');

const client = require('../elasticSearch');

const { INDEX_NAME, DOCUMENT_NAME } =  require('../initData/index');

const search = async (req, res) => {
  try {
    const result = await client.search({
      index: INDEX_NAME,
      type: DOCUMENT_NAME,
      body: req.body,
    });
    res.status(status.OK).json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(status.BAD_REQUEST);
  }
};

module.exports = search;