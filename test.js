var jqe = require('./')();
jqe.file('./example.json');

console.log(jqe.execute('$.store.book[*]').execute('$..author',2,2));
