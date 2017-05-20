var jqe = require('./')();
jqe.file('./store.json');

console.log(jqe.execute('$.store.book[*]').execute('$..author',2,2));
