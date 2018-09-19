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
  broadcast(payload) {
      var broadcastEvent = new Event('broadcast');
      broadcastEvent.payload = payload;
      document.dispatchEvent(broadcastEvent);
  }

  // Listens to broadcasts
  receiver(event) {
    // this !== event.trigger && console.log('me', this, 'trigger', event.trigger);

    // Run filter ops
    var filteredData = this !== event.payload.trigger && Operations.filter(event.payload.filterFn, this);
    this !== event.payload.trigger && console.log(this.name, event.payload.trigger.data[filteredData[0]] || []);
  }

  // Propagates to the origin
  propagate(filterFn) {
    // Get origin and call it's broadcast.
    var payload = {
      trigger: this,
      filterFn: filterFn
    };
    this.origin.broadcast(payload);
  }

  // Sets the origin parent
  setOrigin() {
    return this.parent && this.parent.origin ? this.parent.origin : this.parent;
  }
}
