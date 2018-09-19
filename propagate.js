class A {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
    }

    // // Sends to children
    // sender() {
    // }

    // Receives from parent
    receiver(trigger) {
        this !== trigger && console.log('me', this, 'trigger', trigger);
    }

    // Propagates to the origin
    propagate() {
        // Get origin and call it's broadcast.
        var origin = this.getOrigin();
        this.broadcast(origin);
    }

    // Broadcastes receivers
    broadcast(origin, trigger) {
        // Call receiver of all children in all levels

        trigger = trigger || this;

        // for each child,
        //  call receiver
        //  call broadcast with child
        origin.children.forEach(child => {
            child.receiver(trigger);
            this.broadcast(child, trigger);
        });
    }

    // Returns the origin parent
    getOrigin(obj) {
        obj = obj || this;

        if (obj.parent === null) {
            return obj;
        } else {
            obj = this.getOrigin(obj.parent);
        }

        return obj;
    }
}

function createChild(name, obj) {
    // Create a child and
    //  1. set it's parent as given object
    //  2. set new child as children in given object
    var childObj = Object.create(obj, {
        'name': {value: name},
        'parent': {value: obj},
        'children': {value: []}
    });

    obj.children.push(childObj);
    return childObj;
}
