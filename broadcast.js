class A {
  constructor(name, parent, dataset) {
    this.data = dataset;
    this.index = [];
    this.name = name;
    this.parent = parent;
    this.children = [];
    this.origin = this.setOrigin();

    var _this = this;

    // Attach receiver method to broadcast event
    document.addEventListener('broadcast', function(event) {
      _this.receiver(event);
    }, false);
  }

  // Broadcastes an event with the trigger info
  broadcast(trigger) {
      trigger = trigger || this;
      var broadcastEvent = new Event('broadcast');
      broadcastEvent.trigger = trigger;
      document.dispatchEvent(broadcastEvent);
  }

  // Listens to broadcasts
  receiver(event) {
      this !== event.trigger && console.log('belongs to', this, 'event', event.trigger);
  }

  // Propagates to the origin
  propagate() {
      // Get origin and call it's broadcast.
      this.origin.broadcast(this);
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
