class A {
  constructor(name, parent, dataset) {
    this.data = dataset;
    this.index = [];
    this.name = name;
    this.parent = parent;
    this.children = [];
    this.origin = this.setOrigin();
  }

  // Sends to children
  sender(trigger) {
    this.children.forEach(child => {
      child.receiver(trigger);
    });
  }

  // Receives from parent
  // Call it's sender
  receiver(trigger) {
    this !== trigger && console.log('me', this, 'trigger', trigger);
    this.sender(trigger);
  }

  // Propagates to the origin
  propagate() {
    // Get origin and call it's receiver and sender.
    this.origin.receiver(this);
  }

  // Sets the origin parent
  setOrigin() {
    return this.parent && this.parent.origin ? this.parent.origin : this.parent;
  }
}

function createChild(name, obj, gdpFilter) {
  var childObj = new obj.constructor(name, obj);
  if (!obj.index.length) {
    obj.index = Array.from(Array(obj.data.length).keys())
  }
  var filteredData = gdpFilter && obj.index.filter(row => obj.data[row][1] > gdpFilter);
  childObj.data = obj.data;
  childObj.index = filteredData;

  obj.children.push(childObj);

  return childObj;
}
