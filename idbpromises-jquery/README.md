#About

IDBPromises for jQuery takes IDBWrapper and wraps all async functionality in [jQuery Promises](http://api.jquery.com/category/deferred-object/). I.e., all methods containing async functionality now don't take handlers as arguments, but instead return Promises that you can use to handle flow.

This has some technical benefits -- but it also leads to improved readability of code.

Taking IDBWrapper's `iterate()` method for example, this is how it looks like when using IDBPromises:

```javascript
myStore.iterate()
  .progress(function(item){ console.log('got item:', item); })
  .done(function(){ console.log('all done!'); })
  .fail(function(err){ console.log('oopsie:', err); });
```

Or you could leverage the jQuery.when() function to combine calls:

```javascript
$.when(myStore1.remove(id), myStore2.put(someObj))
  .done(function(){ console.log('All ops done.'); });
```

#Demo

You can check out a demo here: [http://jensarps.github.io/idbwrapper-utils/idbpromises-jquery/demo.html](http://jensarps.github.io/idbwrapper-utils/idbpromises-jquery/demo.html). The source is here: [demo.html](https://github.com/jensarps/idbwrapper-utils/blob/master/idbpromises-jquery/demo.html).


#Usage

IDBPromises exposes all methods that IDBWrapper does, plus an additional open() method. Creating an IDBPromises instance looks like this:

```javascript
var myStore = new IDBPromises(options);

myStore.open()
  .then(function(){ console.log('ready!'); });
```

The API is the same as IDBWrapper's, only that whenever you'd pass a handler to an async method, you don't do it with IDBPromises. Instead, you use the returned promise to handle asynchronity.


##Methods with changed signature

The following methods have a different signature than the original IDBWrapper methods (all return a promise):

###`open()`

The open() method is new. It doesn't take any arguments.

###`put(value)`

The put() method only takes the value argument.

###`get(key)`

The get() method only takes the key argument.

###`remove(key)`

The remove() method only takes the key argument.

###`batch(dataArray)`

The batch() method only takes the dataArray argument.

###`getAll()`

The getAll() method takes no arguments.

###`clear()`

The clear() method takes no arguments.

###`iterate(options)`

The iterate() method only takes the options argument. This method also triggers progress events. Note that the `onEnd` and `onError` properties of the options object are ignored.

###`query(options)`

The query() method only takes the options argument. Note that the `onError` property of the options object is ignored.

###`count(options)`

The count() method only takes the options argument. Note that the `onError` property of the options object is ignored.
