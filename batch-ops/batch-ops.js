/**
 * batch-ops.js
 *
 * Copyright (c) 2013 Ryan Nigro
 * http://www.ryannigro.com
 *
 * Licensed under the MIT (X11) license
 *
 * Adds more batch operation methods to IDBWrapper:
 *
 * - putBatch()
 * - removeBatch()
 * - removeBatchByKeyRange()
 * - getBatch()
 *
 */
;(function () {

  IDBStore.prototype.putBatch = function (arr, onSuccess, onError) {
    var batchOps = [];

    for (var i = 0; i < arr.length; i++) {
      batchOps.push({ type: 'put', value: arr[i] });
    }

    if (batchOps.length > 0)
      this.batch(batchOps, onSuccess, onError);
    else
      onSuccess();
  };

  IDBStore.prototype.removeBatch = function (arr, onSuccess, onError) {
    var batchOps = [];
    var keyPath = this.keyPath;

    for (var i = 0; i < arr.length; i++) {
      batchOps.push({ type: 'remove', key: arr[i][keyPath] });
    }

    if (batchOps.length > 0)
      this.batch(batchOps, onSuccess, onError);
    else
      onSuccess();
  };

  IDBStore.prototype.removeBatchByKeyRange = function (keyRange, index, onSuccess, onError) {
    var self = this;

    self.query(function (arr) {
      self.removeBatch(arr, onSuccess, onError);
    }, {
      index: index,
      keyRange: keyRange,
      onError: onError
    });
  };

  var pendingGetOps = 0;
  var pendingGetData = [];

  IDBStore.prototype.getBatch = function (arr, onSuccess, onError) {
    pendingGetOps = arr.length;
    pendingGetData = [];
    if (pendingGetOps == 0) {
      onSuccess(pendingGetData);
      return;
    }

    for (var i = 0; i < arr.length; i++) {
      var cur = arr[i];
      this.get(cur, function (d) {
        handleGetBatchCompleted(d, onSuccess);
      });
    }
  };

  function handleGetBatchCompleted (data, callback) {
    pendingGetData.push(data);

    pendingGetOps -= 1;
    if (pendingGetOps == 0)
      callback(pendingGetData);
  }

})();
