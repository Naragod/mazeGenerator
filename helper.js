let coordinates = {
    //left
    0: [-1, 0],
    //top
    1: [0, -1], 
    //right
    2: [1, 0], 
    //down
    3: [0, 1]
};

module.exports = {

    "coordinates": coordinates,

    randomDirection: function* (){
        let co = [0, 1, 2, 3];
        while(co.length > 0){
            let direction = Math.floor(Math.random() * 10) % co.length;
            let res = coordinates[co[direction]];
            co.splice(direction, 1);
            yield res;
        }
    },

    checkWall: function(grid, x, y){
        for(let i = 0; i < 4; i++){
            x += coordinates[i][0];
            y += coordinates[i][1];
            if(x < 0 || x >= grid.length || y < 0 || y >= grid[0].length)
                continue;
            if(grid[y][x] == "*")
                return [x, y];
        }

        return false;
    },

    isStuck: function(grid, x, y, onlyEdges = false){
        // Edges
        if(x < 0 || x >= grid[0].length || y < 0 || y >= grid.length){
            return true;
        }
        if(onlyEdges)
            return false;

        // End and adjacent
        if(grid[y][x] !== '2' && grid[y][x] !== '0'){
            return true;
        }
        
        return false;
    }

};