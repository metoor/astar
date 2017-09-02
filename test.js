const map = require("./map");
const astar = require("./astar");

const wall = 1;
const roud = 0;
const start = 2;
const end = 3;
const line = 4;

const isPrintPathMap = false;

//测试数据
let startPos = {
    row: 2,
    col: 5
}

let endPos = {
    row: 9,
    col: 999
}

let mapSize = {
    size: 1000,
    prob: 12
}


let mv = map.init(mapSize.size, mapSize.prob);
astar.initMap(mv);

//显示初始的地图，起点和终点
let beginPath = [endPos, startPos];
generateMap(beginPath);
disPlayMap(mv);
console.log("[info:]=> search path(row:%d, col:%d) to (row:%d, col:%d)!", startPos.row, startPos.col, endPos.row, endPos.col);


let t1 = new Date().getTime();
let t2 = t1;
t1 = process.uptime() * 1000;

let path = astar.search(startPos.row, startPos.col, endPos.row, endPos.col);

t2 = process.uptime() * 1000;
console.log("[info:]=>search finished,cost time:", t2 - t1, "ms");

//显示成功后的路径
if (path.length != 0) {
    generateMap(path);
    disPlayMap(mv);
} else {
    console.log("[info:]=>can not find path (row:%d, col:%d) to (row:%d, col:%d)!", startPos.row, startPos.col, endPos.row, endPos.col);
}





function disPlayMap(map) {
    if(!isPrintPathMap){
        return;
    }

    console.log("\n");
    for (let i = 0; i < map.length; i++) {
        let str = "";
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == roud) {
                str += " * "; //可行区域
            } else if (map[i][j] == wall) {
                str += " | "; //墙
            } else if (map[i][j] == start) {
                str += " S "; //起点
            } else if (map[i][j] == end) {
                str += " E "; //终点
            } else if (map[i][j] == line) {
                str += " X "; //路径
            }
        }
        console.log(str, "\n");
    }
}

function generateMap(path) {
    if(!isPrintPathMap){
        if(path.length > 2){
            console.log("[info:]=>path is:", path);
        }
        return;
    }
    for (let i = 0; i < path.length; i++) {
        if (i == 0 || i == path.length - 1) {
            let temp = path[i];
            mv[temp.row][temp.col] = i == 0 ? end : start;
        } else {
            let temp = path[i];
            mv[temp.row][temp.col] = line;
        }
    }
}