const client = require('../elasticSearch');

const { INDEX_NAME } = require('../initData/index');

async function initIndex() {
  try {
    const exist = await client.indices.exists({
      index: INDEX_NAME
    });
    if (exist) {
      console.log(`Index --> ${INDEX_NAME}, already exist`);
      await client.indices.delete({
        index: INDEX_NAME
      });
      console.log(`Index --> ${INDEX_NAME}, was deleted`);
    }
    const create = await client.indices.create({
      index: INDEX_NAME,
      body: {}
    });
    console.log(`Create index --> ${INDEX_NAME}, SUCCESS`, create);
  } catch (e) {
    console.log(`Create index --> ${INDEX_NAME}, FAILURE`, e);
  }
}

initIndex().then(() => process.exit(0), () => process.exit(1));