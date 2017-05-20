var JSONQueryEngine = require('./');

var jqe = JSONQueryEngine();
jqe.file('./example.json');
var result = jqe.execute('$.store.book[*]').execute('$..author');
console.log(result);
result.save('./base.json');
