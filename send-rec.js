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
  sender(payload) {
    this.children.forEach(child => {
      child.receiver(payload);
    });
  }

  // Receives from parent
  // Call it's sender
  receiver(payload) {
    // this !== trigger && console.log('me', this, 'trigger', trigger);

    // Run filter ops
    var filteredData = this !== payload.trigger && Operations.filter(payload.filterFn, this);
    this !== payload.trigger && console.log(this.name, payload.trigger.data[filteredData[0]] || []);

    this.sender(payload);
  }

  // Propagates to the origin
  propagate(filterFn) {
    // Get origin and call it's receiver and sender.
    var payload = {
      trigger: this,
      filterFn: filterFn
    };
    this.origin.receiver(payload);
  }

  // Sets the origin parent
  setOrigin() {
    return this.parent && this.parent.origin ? this.parent.origin : this.parent;
  }
}
