class Operations {
  static filter(viewObj, fn) {
    // filter using provided function
    var filteredIndex = viewObj.operationIndex.filter(row => fn((viewObj.data && viewObj.data[row]) || (viewObj.origin.data && viewObj.origin.data[row])));

    return filteredIndex || [];
  }

  static query(viewObj, opsArr, update = false) {
    opsArr.forEach(ops => {
      switch (ops[0]) {
        case 'filter':
          if (update) {
            viewObj.operationIndex = viewObj.updatedIndex
            viewObj.updatedIndex = this.filter(viewObj, ops[1]);
          } else {
            viewObj.operationIndex = viewObj.index
            viewObj.index = this.filter(viewObj, ops[1]);
          }
          break;
      }
    });

    delete viewObj.operationIndex;
  }

  static createChild(name, viewObj, opsArr) {
    // create the child view with given view as parent
    var childViewObj = new viewObj.constructor(name, viewObj);

    // save the operations array in the child view
    childViewObj.ops = opsArr;

    // set child view's index to same as parent's before operations,
    // so operations may be performed on those indexes and reduce them if applicable
    // if parent's index is empty then set to full
    childViewObj.index = viewObj.index.length ? viewObj.index : Array.from(Array(viewObj.data.length).keys());

    // apply the query on the view object
    this.query(childViewObj, opsArr);

    // save the child view in the given view's children array
    viewObj.children.push(childViewObj);

    // return the child view
    return childViewObj;
  }
}
