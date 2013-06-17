#About

batch-ops.js adds more batch operation methods to IDBWrapper.

#Usage

Just include the batch-ops.js file in your project (make sure you load it *after* loading IDBWrapper).

#Methods

Including the file adds the following methods to IDBWrapper:

###`putBatch(arr, onSuccess, onError)`

Takes an aray of objects and stores them.

Example:

```javascript
var dataArray = [
  { id: 18, foo: 'bar'},
  { id: 25, foo: 'baz'}
];
myStore.putBatch(dataArray, function(){
  console.log('success.');
}, function(err){
  console.log('error:', err);
});
```

###`removeBatch(arr, onSuccess, onError)`

Takes an array of keys and removes the according objects.

Example:

```javascript
myStore.removeBatch([18, 25], function(){
  console.log('all removed.');
}, function(err){
  console.log('error:', err);
});
```


###`removeBatchByKeyRange(keyRange, index, onSuccess, onError)`

Takes a keyRange and an index and removes matching objects.

Example:

```javascript
// remove all customers having a last name starting with 'M' or higher:
var keyRange = myStore.makeKeyRange({
  lower: 'M'
});
var index = 'lastname';

myStore.removeBatchByKeyRange(keyRange, index, function(){
  console.log('all matches removed');
}, function(err){
  console.log('error:', err);
});
```

###`getBatch(arr, onSuccess, onError)`

Takes an array of keys and fetches the according objects from the store. The success handler gets an array of objects as first and only argument.

Example:

```javascript
myStore.getBatch([18, 25], function(dataArray){
  console.log('got data:', dataArray);
}, function(err){
  console.log('error:', err);
});
```
