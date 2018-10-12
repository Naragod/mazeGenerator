let h = require("./helper.js");

module.exports = {
    
    Node: class {
        constructor(x, y, direction, parent = null){
            let _x = x;
            let _y = y;
            this.x = (() => _x)();
            this.y = (() => _y)();
            let _parent = parent;
            this.parent = (() => _parent)();
            this.xDir = direction[0];
            this.yDir = direction[1];
            this.neighbours = Array.apply(null, new Array(5)).map(n => '0');
        }

        getNeighbours(grid){
            let coor = h.coordinates;
            for(let c in coor){
                let x = this.x + coor[c][0];
                let y = this.y + coor[c][1];
                if(h.isStuck(grid, x, y, true)){
                    continue;
                }
                this.neighbours[c] = grid[y][x];
            }
        }
    }
};