class A {
  constructor(name, parent, dataset) {
    this.name = name;
    this.data = dataset;
    this.parent = parent;
    this.children = [];
    this.origin = this.setOrigin();
    this.ops = [];
    this.index = [];
  }

  setInterpreter(interpreter) {
    this.interpreter = interpreter;
  }

  getInterpreter(interpreter) {
    return this.interpreter;
  }

  // Sends to children
  sender(payload) {
    this.children.forEach(child => {
      child.receiver(payload);
    });
  }

  // Receives from parent/originator
  // Call it's sender
  receiver(payload) {
    this.updatedIndex = this.parent ? this.parent.updatedIndex : Array.from(Array(this.data.length).keys());

    // call it's interpreter if exists
    this.getInterpreter() && this.getInterpreter().call(this, payload);

    // re run ops on it's parent's updatedIndex
    Operations.query(this, this.ops, true);


    console.log('View name: ', this.name, '| Originated at: ', payload.trigger.name, '| Original index: ', this.index, ' | Updated index: ', this.updatedIndex);
    console.log('********************', this.updatedIndex.length && this.origin.data[this.updatedIndex[0]], this.updatedIndex.length && this.origin.data[this.updatedIndex[1]], '********************');


    // finally send payload to this view's sender to propagate to it's children
    this.sender(payload);
  }

  // Propagates to the origin
  propagate(data) {
    // Get origin and call it's receiver and sender.
    var payload = {
      trigger: this,
      data: data
    };
    this.origin.receiver(payload);
  }

  // Sets the origin parent
  setOrigin() {
    return this.parent ? (this.parent.origin ? this.parent.origin : this.parent) : this;
  }
}
