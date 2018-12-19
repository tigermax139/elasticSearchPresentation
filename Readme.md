## Getting Started
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
## EXAMPLES:
### SEARCH
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

#### SEARCH by not match query
Using `*` as mask 
read more: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#_wildcards
```$xslt
{
	"query":{
		"query_string": {
			"default_field": "title",
			"query": "*m*"
		}
	},
	"_source": [ "title" ]
}
```
###### not match query in multiple fields
```$xslt
{
	"query":{
		"query_string": {
			"fields": ["title"],
			"query": "*m*"
		}
	},
	"_source": [ "title" ]
}
```
###### search with condition
```$xslt
{
	"query":{
		"query_string": {
			"fields": ["title"],
			"query": "pasta OR sushi"
		}
	}
}
```
```$xslt
{
	"query":{
		"query_string": {
			"fields": ["title"],
			"query": "Bar AND pasta"
		}
	}
}
```
#### SEARCH by nested fields
links:
- https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
- https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html
- https://github.com/elastic/elasticsearch-net/issues/1688
##### one filed
```$xslt
{
	"query":{
		"bool": {
			"must": [
				{
				"nested": {
					"path": "kitchen",
					"query": {
						"bool": {
							"must": [
								{
									"match": {
										"kitchen.value": "italian"
									}
								}
							]
						}
					}
				}	
				}
			]
		}
	}
}
```
##### more than one fields
_if you use similar field (ex. kitchen.value), you need to duplicate your nested request_
 ```$xslt
{
	"query":{
		"bool": {
			"must": [
				{
				"nested": {
					"path": "kitchen",
					"query": {
						"bool": {
							"must": [
								{
									"match": {
										"kitchen.value": "italian"
									}
								}
							]
						}
					}
				}	
				},
				{
				"nested": {
					"path": "kitchen",
					"query": {
						"bool": {
							"must": [
								{
									"match": {
										"kitchen.value": "mexican"
									}
								}
							]
						}
					}
				}
				}
			]
		}
	}
}
```
_not similar fields_


