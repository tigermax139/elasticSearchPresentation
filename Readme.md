0. Install and run ElasticServer to your machine.
The most simple guide here 
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

1. Pull repo
2. Install all packages `npm i`
2. Create `.env` file in root of directory
3. Put elasticSearch endpoint ex. :
```
ELASTICSEARCH_ENDPOINT=<your endpoint>
```
if you used link from step 1, your endpoint look like this
` http://127.0.0.1:9200/ `

4. Initialize all test index, mappings and data `npm run init:all` 
5. Run server `npm run start`
6. Go to Postman or other request manager ( I prefer Isomnia )
7. Send request to `POST http://localhost/search`
Expected response
```
{
  "took": 2,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 5,
    "max_score": 1,
    "hits": [
        // a lot of data
    ]
  }
}
```
8. Now you can send ANY search request in body;
EXAMPLES: 
##### SEARCH by title
Using field `_source` return only defined attributes
```$xslt
{
	"query":{
		"match": {
			"title": "mafia"
		}
	},
	"_source": [ "title" ]
}
```
Expected Response:
```$xslt
{
  "took": 0,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 0.2876821,
    "hits": [
      {
        "_index": "test",
        "_type": "document",
        "_id": "Hl_0xmcBjXUbPubS2sPs",
        "_score": 0.2876821,
        "_source": {
          "title": "Mafia"
        }
      }
    ]
  }
}
```


