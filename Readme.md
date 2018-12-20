## Getting Started
0. Install and run ElasticServer on your machine.
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
```json
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
#### SEARCH by title
Using field `_source` return only defined attributes
```json
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
```json
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
```json
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
```json
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
```json
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
```
{
	"query":{
		"bool": {
			"must": [
				{
					"nested": {
						"path": "time",
						"query": {
							"bool": {
								"must": [
									{
										"match": {
											"time.open": "10:00"
										}
									},
									{
										"match": {
											"time.close": "6:00"
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
```
#### Range Search
More here
https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
```json
{
	"query":{
		"bool": {
			"must": [
				{
					"nested": {
						"path": "time",
						"query": {
							"bool": {
								"must": [
									{
										"range": {
											"time.open": {
												"lte": "now",
												"format": "HH:mm"
											}
										}
									},
									{
										"range": {
											"time.close": {
												"lte": "now+1h",
												"format": "HH:mm"
											}
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
As you can see we used some specific queries as `now` and `now+1h`.
ElasticSearch understand this syntax very well.
### Geolocation search
More info here
https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-queries.html

Search cafe near me
```json
{
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_distance" : {
                    "distance" : "0.2km",
                    "address" : {
                        "lat" : 49.234231,
                        "lon" : 28.4577084
                    }
                }
            }
        }
    }
}
```
Search cafe in my district

Service for Draw on Google Map
https://www.gmapgis.com/
```json
{
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_polygon" : {
                    "address" : {
                        "points" : [
                            {"lat" : 49.23448, "lon" : 28.43263},
                            {"lat" : 49.22557, "lon" : 28.43388},
                            {"lat" : 49.22652, "lon" : 28.44777},
                            {"lat" : 49.23349, "lon" : 28.44698},
                            {"lat" : 49.23453, "lon" : 28.43865},
                            {"lat" : 49.23448, "lon" : 28.43263}
                        ]
                    }
                }
            }
        }
    }
}
```





