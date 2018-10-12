
var Map = require('./map.js');
console.log("This is, map escape.");
console.log("");

var grid = new Map.Map(8, 8);
grid.path = grid.genMap();
grid.displayMap(grid.path);

console.log("end");
