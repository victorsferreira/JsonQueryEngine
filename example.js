var JSONQueryEngine = require('./');

var jqe = JSONQueryEngine();
jqe.file('./example.json');
jqe.execute('$.store.book[*]').execute('$..author',2,2).save('./base.json');
