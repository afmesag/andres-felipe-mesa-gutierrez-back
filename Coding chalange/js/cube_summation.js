/**
 * Created by afmesag on 16.06.17.
 */
function execute() {
  var input = $('#input').val().split('\n');
  var line = 0;
  var testCases = Number(input[line++]);
  var result = '';
  while (testCases--) {
    var newLine = input[line++].split(' ');
    var N = Number(newLine[0]);
    var cube = []
    var M = Number(newLine[1]);
    while (M--) {
      newLine = input[line++].split(' ');
      switch (newLine[0]) {
        case 'UPDATE':
          var x = Number(newLine[1]), y = Number(newLine[2]), z = Number(newLine[3]), w = Number(newLine[4]);
          var newElement = {
            x: Number(newLine[1]),
            y: Number(newLine[2]),
            z: Number(newLine[3]),
            w: Number(newLine[4])
          };
          var values = cube.filter(function(item) {
            return item.x === newElement.x && item.y === newElement.y && item.z === newElement.z;
          });
          if (values.length > 0) {
            cube[cube.indexOf(values[0])] = newElement;
          }
          else {
            cube.push(newElement);
          }
          break;
        case 'QUERY':
          var x1 = Number(newLine[1]), y1 = Number(newLine[2]), z1 = Number(newLine[3]);
          var x2 = Number(newLine[4]), y2 = Number(newLine[5]), z2 = Number(newLine[6]);
          var values = cube.filter(function(item) {
              return x1 <= item.x && item.x <= x2 && y1 <= item.y && item.y <= y2 && z1 <= item.z && item.z <= z2;
            }
          );
          var sum = Number();
          for (var i = 0; i < values.length; i++) {
            sum += Number(values[i].w);
          }
          result += sum + '\n';
          break;
      }
    }
    $('#output').val(result);
  }
}
function clearText() {
  $('#input').val('');
  $('#output').val('');
}