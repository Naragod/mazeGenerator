
let h = require('./helper.js');
let Path = require('./path.js');

module.exports = {

    Map: class{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.x = 0;
            this.y = 0;
            this.walls = [];
            this.path = [];
            this.grid = this.makeGrid(width, height);
        }

        makeGrid(width, height){
            let grid = [];
            for(var j = 0; j < height; j++){
                let row = [];
                for(var i = 0; i < width; i++){
                    row.push('0');
                }
                grid.push(row);
            }
        
            return grid;
        }

        displayMap(path){
            let s = '';
            let lastNode = path[path.length - 1];
            for(let y in this.grid){
                for(let x in this.grid[y]){
                    if(this.grid[y][x] == 'x'){
                        let color = '\x1b[32m'; // Green foreground
                        if(lastNode.x == x && lastNode.y == y)
                            color = '\x1b[41m'; // Red background
                        s += ' ' + color + this.grid[y][x] + '\x1b[0m';
                        continue;
                    }
                    s += ' ' + this.grid[y][x];
                }
                s += '\n';
            }
            console.log(s);
        }

        genMap(currentNode = new Path.Node(this.x, this.y, [1, 0]), path = []){
            // Default start and end points
            this.grid[this.y][this.x] = '1';
            this.grid[this.height - 1][this.width - 1] = '2';
            let currentPath = this.generatePath(currentNode);
            path = path.concat(currentPath);
            currentNode = path[path.length - 1];

            // Base Case
            if(currentNode.neighbours.some(n => n == '2')){
                // this.buildWalls(path);
                return path;
            }

            let prevNode = currentNode.parent;
            return this.genMap(prevNode, path);
        }

        generatePath(sNode){
            let dir = [];
            let path = [sNode];
            let terminate = false;
            let chooseDir = h.randomDirection();
            while((dir = chooseDir.next().value) !== undefined){
                let c = path.length;
                let x = sNode.x + dir[0];
                let y = sNode.y + dir[1];
                let node = new Path.Node(x, y, dir, sNode);
                
                // Edges of map or an already travelled path
                if(h.isStuck(this.grid, node.x, node.y)){
                    continue;
                }
                // If a node has a neighbour that is not its predecessor it cannot be part of the path
                node.getNeighbours(this.grid);
                let pNeigh = node.neighbours.map((n, i) => {
                    if(n == '2')
                        terminate = true;
                    if(n !== '0') 
                        return i;
                }).filter(e => e !== undefined);

                if(pNeigh.length > 2){
                    continue;
                }
                if(pNeigh.length == 2 && !terminate){
                    continue;
                }

                path.push(node);
                this.grid[node.y][node.x] = 'x';
                sNode = node;
                if(terminate)
                    break;
                chooseDir = h.randomDirection();
                // console.log("x", x, "y", y, "dir", [node.xDir, node.yDir], "neighbours:", pNeigh, "c", c);
            }
            return path;
        }

        buildWalls(path){
            this.updateAllNeighbours(path);

            for(let e = 1; e < path.length; e++){
                let currentNode = path[e];
                for(let n = 0; n < currentNode.neighbours.length; n++){
                    if(currentNode.neighbours[n] == '0'){
                        let coor = h.coordinates[n];
                        let x = currentNode.x + coor[0];
                        let y = currentNode.y + coor[1];
                        if(h.isStuck(this.grid, x, y, true)){
                            continue;
                        }
                        this.grid[y][x] = '#';
                    }
                }
            }
        }

        updateAllNeighbours(path){
            path.forEach(node => {
                node.getNeighbours(this.grid);
            });
        }

    }

};

