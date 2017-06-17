/**
 * Created by afmesag on 16.06.17.
 */
function execute() {
  var input = $('#input').val().split('\n');
  var line = 0;
  var testCases = parseInt(input[line++]);
  var result='';
  while (testCases--) {
    var newLine = input[line++].split(' ');
    var N = parseInt(newLine[0]);
    var cube = []
    var M = parseInt(newLine[1]);
    while (M--) {
      newLine = input[line++].split(' ');
      switch (newLine[0]) {
        case 'UPDATE':
          cube.push({x: newLine[1], y: newLine[2], z: newLine[3], w: newLine[4]});
          break;
        case 'QUERY':
          var x1 = newLine[1], y1 = newLine[2], z1 = newLine[3];
          var x2 = newLine[4], y2 = newLine[5], z2 = newLine[6];
          var values = cube.filter(function(item) {
              return x1 <= item.x && item.x <= x2 && y1 <= item.y && item.y <= y2 && z1 <= item.z && item.z <= z2;
            }
          );
          var sum = 0;
          for (var i = 0; i < values.length; i++) {
            sum += parseInt(values[i].w);
          }
          result+=sum+'\n';
          break;
      }
    }
    $('#output').val(result);
  }
}
function updateW(x, y, z, w) {
  cube
}
function clearText() {
  $('#input').val('');
  $('#output').val('');
}