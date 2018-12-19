const fs = require('fs');
const path = require('path');

const client = require('../elasticSearch');

const { INDEX_NAME, DOCUMENT_NAME } = require('../initData/index');

const data = JSON.parse(fs.readFileSync(path.join(__dirname ,'../initData/data.json'), 'utf-8'));

async function initMigrations() {
  console.log('Migration Start');
  let success = 0;
  let failure = 0;
  for(let i = 0; i < data.length;i++){
    console.time(`${i}`);
    try {
      const body = data[i];
      // create simple suggestions only from name
      const titleChunks = body.title.split(' ');
      body.suggest = Array.from(new Set([
        body.title,
        ...titleChunks,
      ]));
      const created = await client.index({
        index: INDEX_NAME,
        type: DOCUMENT_NAME,
        body,
      });
      console.log(`Migration id ${i}, SUCCESS`, created);
      success++;
    } catch (e) {
      console.error(`Migration id ${i}, FAILURE`, e);
      failure++;
    } finally {
      console.timeEnd(`${i}`);
    }
  }
  console.log('Migration Finished');
  console.log('Total  ', data.length);
  console.log('Success', success);
  console.log('Failure', failure);
}

initMigrations().then(() => process.exit(0), () => process.exit(1));