Q = require('q');

var dfd = Q.defer();
var promise = dfd.promise;

setTimeout(function () {
  dfd.reject({ error: 'test' });
}, 1000);

promise.fail(function () {
  console.log('there was some error');
});
promise.then(function () {
  console.log('success');
});
