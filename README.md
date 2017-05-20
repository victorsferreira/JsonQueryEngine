# JSONQueryEngine
JSONQueryEngine uses the basis of `jsonpath` and `paginator` to crawl sweetly into an object.

The search criteria must be a valid JSONPath (XPath for JSON) query.

## Example
Given the input

```json
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      }, {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }, {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }, {
         "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
```

```javascript
var JSONQueryEngine = require('json-query-engine');
var jqe = JSONQueryEngine();
jqe.file('./example.json');
jqe.execute('$.store.book[*]').execute('$..author',2,2).file('./base.json');
```

## Outputs

```javascript
{
object: [ 'Herman Melville', 'J. R. R. Tolkien' ],
  info:
   {
     total_pages: 2,
     pages: 2,
     current_page: 2,
     first_page: 1,
     last_page: 2,
     previous_page: 1,
     next_page: 3,
     has_previous_page: true,
     has_next_page: false,
     total_results: 4,
     first_result: 2,
     last_result: 3,
     per_page: undefined
 }
}
```

## API reference:

**JSONQueryEngine([]):** creates a new engine

**setObject(input):** feeds JSONQueryEngine with a Javascript object or JSON string

**file(path):** loads an object from the content of a file

**save(path):** saves result set to a file

**execute(query,[limit,[offset]]):** returns a JSONQueryResult

**get(index):** returns the element in the `index` position, or the first or the last elements if the `index` is out of range

**first():** returns the first element

**last():** returns the last element

**all():** returns the all the elements in the result set

## External links:

[jsonpath package](https://www.npmjs.com/package/jsonpath)

[paginator package](https://www.npmjs.com/package/paginator)

[JSONPath](http://goessner.net/articles/JsonPath/)
