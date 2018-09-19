class Operations {
  static filter(fn, obj) {
    if (!obj.index.length) {
      obj.index = Array.from(Array(obj.data.length).keys())
    }
    var filteredData = obj.index.filter(row => fn(obj, row));
    return filteredData || [];
  }

  static createChild(name, obj, filterFn) {
    var childObj = new obj.constructor(name, obj);
    childObj.data = obj.data;
    childObj.index = this.filter(filterFn, obj);

    obj.children.push(childObj);

    return childObj;
  }
}
