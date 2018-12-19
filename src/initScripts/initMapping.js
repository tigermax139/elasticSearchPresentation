const client = require('../elasticSearch');

const { INDEX_NAME, DOCUMENT_NAME } = require('../initData/index');

const properties = require('../initData/mapping');

async function initMapping(){
  try {
    console.log(`Start mapping for --> ${INDEX_NAME}`);
    const mapping = await client.indices.putMapping({
      index: INDEX_NAME,
      type: DOCUMENT_NAME,
      body: {
        properties: {
          ...properties,
        },
      }
    });
    console.log(`Finish mapping for --> ${INDEX_NAME}, SUCCESS`, mapping);
  } catch (e) {
    console.log(`Finish mapping for --> ${INDEX_NAME}, FAILURE`, e);
  }
}

initMapping().then(() => process.exit(0), () => process.exit(1));