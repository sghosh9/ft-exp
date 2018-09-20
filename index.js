var dataset = [
  [382, 'Washington Square E', 265, 1],
  [372, 'Broadway & E 14 St', 439, 2],
  [591, 'Perry St & Bleecker St', 251, 2],
  [583, 'E 11 St & Broadway', 284, 1],
  [223, 'Allen St & Rivington St', 439, 1],
  [541, 'Warren St & Church St', 331, 1],
  [354, 'E 19 St & 3 Ave', 439, 1],
  [916, 'Emerson Pl & Myrtle Ave', 395, 1],
  [277, 'Mercer St & Bleecker St', 369, 1],
];

var mainView = new A('mainView', undefined, dataset);

var tripDurationView = Operations.createChild('Trip Duration', mainView, [['filter', row => parseInt(row[0]) > 500]]);
var stationStartLetter = Operations.createChild('Station Start Letter', mainView, [['filter', row => row[1].toLowerCase().startsWith('w')]]);

var gender2 = Operations.createChild('Gender is 2', tripDurationView, [['filter', row => parseInt(row[3]) === 2]]);

// console.log(tripDurationView);
// console.log(stationStartLetter);
// console.log(gender2);


var interpreter = function(payload) {
  Operations.query(this, [['filter', row => row[payload.data.index] > payload.data.value]], true);
}

mainView.setInterpreter(interpreter);

// var c = Operations.createChild('c', a, (obj, row) => obj.data[row][1] < 5000000);

// var d = Operations.createChild('d', c, (obj, row) => obj.data[row][1] > 10000);
// var e = Operations.createChild('e', c, (obj, row) => obj.data[row][1] > 40000);
// var f = Operations.createChild('f', c, (obj, row) => obj.data[row][1] > 80000);

// var g = Operations.createChild('g', b, (obj, row) => obj.data[row][1] > 80000);
// var h = Operations.createChild('h', b, (obj, row) => obj.data[row][1] > 80000);
// // var g = createChild('g', b);
// // var h = createChild('h', b);

// // var i = createChild('i', d);
// // var j = createChild('j', d);

// // var k = createChild('k', f);

// // var l = createChild('l', k);

gender2.propagate({index: 2, value: 300});
