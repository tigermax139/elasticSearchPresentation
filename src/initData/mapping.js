module.exports = {
  "name" : {
    "type" : "text"
  },
  "suggest": {
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html
    type: 'completion',
    analyzer: 'simple'
  },
  "address": {
// https://www.elastic.co/guide/en/elasticsearch/reference/6.5/geo-point.html#geo-point
    "type": "geo_point"
  },
  "time": {
    "type": "nested",
    "properties": {
// https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html#built-in-date-formats
      "open": {
        "type": "date",
        "format": "hour_minute"
      },
      "close": {
        "type": "date",
        "format": "HH:mm"
      }
    }
  },
  "kitchen": {
// If you need to index arrays of objects instead of single objects, read Nested datatype first.
// https://www.elastic.co/guide/en/elasticsearch/reference/current/object.html
// https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html
    "type": "nested",
    "dynamic": true,
    "properties": {}
  }
};
