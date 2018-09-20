var dataset = [];
// dataset = [
//   [382, 'Washington Square E', 265, 1],
//   [372, 'Broadway & E 14 St', 439, 2],
//   [591, 'Perry St & Bleecker St', 251, 2],
//   [583, 'E 11 St & Broadway', 284, 1],
//   [223, 'Allen St & Rivington St', 439, 1],
//   [541, 'Warren St & Church St', 331, 1],
//   [354, 'E 19 St & 3 Ave', 439, 1],
//   [916, 'Emerson Pl & Myrtle Ave', 395, 1],
//   [277, 'Mercer St & Bleecker St', 369, 1],
// ];


fetch('sample1.csv')
.then(response => response.text())
.then(str => {
  dataset = str.split('\n').map(row => {
    return row.split(',');
  });
  dataset.pop();

  // console.log(dataset);

  var mainView = new A('mainView', undefined, dataset);

  var tripDurationView = Operations.createChild('Trip duration more than 500', mainView, [['filter', row => parseInt(row[0]) > 500]]);
  var stationStartLetter = Operations.createChild('Station starts with W', mainView, [['filter', row => row[1].toLowerCase().startsWith('w')]]);

  var gender2 = Operations.createChild('Gender is 2', tripDurationView, [['filter', row => parseInt(row[3]) === 2]]);

  console.log(mainView);
  console.log(tripDurationView);
  console.log(stationStartLetter);
  console.log(gender2);


  var interpreter = function(payload) {
    Operations.query(this, [['filter', row => row[payload.data.index] > payload.data.value]], true);
  }

  mainView.setInterpreter(interpreter);

  // propagate a change/payload manually for demo
  // end station id = 500
  gender2.propagate({index: 2, value: 500});
});
