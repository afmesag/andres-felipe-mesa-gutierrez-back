/**
 * Created by afmesag on 16.06.17.
 */
function execute() {
  var response = codeSummation($('#input').val());
  $('#output').val(response);
}
function codeSummation(input) {
  // Read text from textarea and split it
  var input = input.split('\n');
  var line = 0;
  var testCases = Number(input[line++]);
  var result = '';
  while (testCases--) {
    var newLine = input[line++].split(' ');
    var cube = [];
    // N is not needed
    var M = Number(newLine[1]);
    while (M--) {
      newLine = input[line++].split(' ');
      switch (newLine[0]) {
        case 'UPDATE':
          var newElement = {
            x: Number(newLine[1]),
            y: Number(newLine[2]),
            z: Number(newLine[3]),
            w: Number(newLine[4])
          };
          // Look for an entry in the saved entries which has the same coordinates of the new entry
          var duplicate = cube.filter(function(item) {
            return item.x === newElement.x && item.y === newElement.y && item.z === newElement.z;
          });
          // If exist a duplicate coordinates entry, replace it
          if (duplicate.length > 0) {
            cube[cube.indexOf(duplicate[0])] = newElement;
          }
          // If not, add the new entry
          else {
            cube.push(newElement);
          }
          break;
        case 'QUERY':
          var x1 = Number(newLine[1]), y1 = Number(newLine[2]), z1 = Number(newLine[3]);
          var x2 = Number(newLine[4]), y2 = Number(newLine[5]), z2 = Number(newLine[6]);
          // Find the entries whose coordinates (x,y,z) are between the (x1,y1,z1) and (x2,y2,z2)
          var values = cube.filter(function(item) {
              return x1 <= item.x && item.x <= x2 && y1 <= item.y && item.y <= y2 && z1 <= item.z && item.z <= z2;
            }
          );
          // If there is values, then calculate the total of the weights
          var sum = Number();
          for (var i = 0; i < values.length; i++) {
            sum += Number(values[i].w);
          }
          result += sum + '\n';
          break;
      }
    }
  }
  // Print the result in the textarea
  return result;
}

function clearText() {
  $('#input').val('');
  $('#output').val('');
}