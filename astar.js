/**
 * @des: A* 寻路算法
 * @autho: create by Metoor
 */
"use strict"
const BlockType = {
    ROAD: 0,
    WALL: 1,

};

//寻路地图，一个二维数组
let _mapValue = null;

let _openTable = require("./binaryHeap");
//let _closeTable = [];

let _mapNode = [];

//地图的宽度和高度
let _mapWidth = 0;
let _mapHeight = 0;

//地图权重
const _obliqueWeight = 14;
const _normalWeight = 10;

/**
 * 根据二维数组初始化寻路节点
 * @param {*} mapValue  
 */
function initMap(mapValue) {
    _mapValue = mapValue;
    _mapWidth = _mapValue[0].length;
    _mapHeight = _mapValue.length;

    //根据二维数组初始化寻路地图
    for (let row = 0; row < _mapHeight; row++) {
        for (let col = 0; col < _mapWidth; col++) {
            let node = {};
            node.blockType = _mapValue[row][col];
            node.parent = null;
            node.gValue = 0;
            node.hValue = 0;
            node.row = row;
            node.col = col;
            node.isInopenTable = false;
            node.isInCloseTable = false;
            _mapNode.push(node);
        }
    }
}

/**
 * 获得对应位置(row,col)处node
 * @param {*} row 
 * @param {*} col 
 */
function getNode(row, col) {
    if (!isVaildIndex(row, col)) {
        console.log("[waring:]=> vaild position (row:%d,col:%d), in <getNode> function", row, col);
        return null;
    }

    return _mapNode[row * _mapWidth + col];
}

/**
 * 交换数组array中索引idx1和idx2的元数
 * @param {*} array 
 * @param {*} idx1 
 * @param {*} idx2 
 */
function swapWithIndex(array, idx1, idx2) {
    if (idx1 < 0 || idx1 >= array.length || idx2 < 0 || idx2 >= array.length) {
        console.log("[waring:]=>index out of range, in <swapWithIndex> function");
        return;
    }

    let tmp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = tmp;

}

/**
 * 获得当前节点的H值
 * @param {*} curNode 
 * @param {*} endNode 
 */
function getHValue(curNode, endNode) {
    let distance = Math.abs(curNode.row - endNode.row) + Math.abs(curNode.col - endNode.col);
    return distance;
}

/**
 * 判断row和col是否属于是有效的地图索引
 * @param {*} row 
 * @param {*} col 
 */
function isVaildIndex(row, col) {
    if (row >= 0 && row < _mapHeight && col >= 0 && col < _mapWidth) {
        return true;
    };
    return false;
}

/**
 * 将处理节点插入到openTable
 * @param {*} dealNode 
 * @param {*} curNode 
 * @param {*} endNode 
 * @param {*} weight 
 */
function insertToOpenTable(dealNode, curNode, endNode, weight) {
    if (dealNode.blockType != BlockType.WALL && !dealNode.isInCloseTable) {
        let gValue = curNode.gValue + weight;
        if (dealNode.isInopenTable) {
            //在open表中
            if (dealNode.gValue > gValue) {
                dealNode.gValue = gValue;
                dealNode.parent = curNode;
            }
        } else {
            //不在open表中
            dealNode.gValue = gValue;
            dealNode.hValue = getHValue(dealNode, endNode);
            dealNode.parent = curNode;
            dealNode.isInopenTable = true;
            //_openTable.push(dealNode);
            _openTable.add(dealNode);
        }
    }
}

/**
 * 处理当前节点的邻居节点
 * @param {*} curNode 
 * @param {*} endNode 
 */
function dealNeighbors(curNode, endNode) {
    let row = curNode.row;
    let col = curNode.col;

    //右
    if (isVaildIndex(row + 1, col)) {
        insertToOpenTable(getNode(row + 1, col), curNode, endNode, _normalWeight);
    }

    //右上
    if (isVaildIndex(row + 1, col + 1)) {
        insertToOpenTable(getNode(row + 1, col + 1), curNode, endNode, _obliqueWeight);
    }

    //上
    if (isVaildIndex(row, col + 1)) {
        insertToOpenTable(getNode(row, col + 1), curNode, endNode, _normalWeight);
    }

    //左上
    if (isVaildIndex(row - 1, col + 1)) {
        insertToOpenTable(getNode(row - 1, col + 1), curNode, endNode, _obliqueWeight);
    }

    //左
    if (isVaildIndex(row - 1, col)) {
        insertToOpenTable(getNode(row - 1, col), curNode, endNode, _normalWeight);
    }

    //左下
    if (isVaildIndex(row - 1, col - 1)) {
        insertToOpenTable(getNode(row - 1, col - 1), curNode, endNode, _obliqueWeight);
    }

    //下
    if (isVaildIndex(row, col - 1)) {
        insertToOpenTable(getNode(row, col - 1), curNode, endNode, _normalWeight);
    }

    //下
    if (isVaildIndex(row + 1, col - 1)) {
        insertToOpenTable(getNode(row + 1, col - 1), curNode, endNode, _obliqueWeight);
    }

}

/**
 * 查找路径，成功的话返回{row:0,col:0}的数组否则返回空数组
 * @param {*} startRow 
 * @param {*} startCol 
 * @param {*} endRow 
 * @param {*} endCol 
 */
function search(startRow, startCol, endRow, endCol) {
    let path = [];
    let isFound = false;

    if (_mapValue == null || _mapWidth == 0 || _mapNode.length == 0) {
        console.log("[info:]=>please call <initMap> function,before call <search> function!");
        return path;
    }

    if (!isVaildIndex(startRow, startCol) && !isVaildIndex(endRow, endCol)) {
        console.log("[info:]=>!starting point(row:%d,col:%d) or end point(x:%d,y:%d) out of range!", startRow, startCol, endRow, endCol);
        return path;
    }

    if (startRow == endRow && startCol == endCol) {
        console.log("[info:]=>The starting point(row:%d,col:%d) is the same as the end point(x:%d,y:%d)!", startRow, startCol, endRow, endCol);
        return path;
    }

    //将起点加入open表
    let startNode = getNode(startRow, startCol);
    let endNode = getNode(endRow, endCol);

    startNode.gValue = 0;
    startNode.hValue = getHValue(startNode, endNode);
    startNode.parent = null;
    startNode.isInCloseTable = true;
    _openTable.add(startNode);

    isFound = false;

    while (true) {
        let curNode = _openTable.remove();
        curNode.isInopenTable = false;
        curNode.isInCloseTable = true;
        // _closeTable.push(curNode);

        if (curNode.row == endRow && curNode.col == endCol) {
            isFound = true;
            break;
        }

        dealNeighbors(curNode, endNode);

        if (_openTable.length() == 0) {
            isFound = false;
            break;
        }
    }

    if (isFound) {
        let pathNode = endNode;

        while (pathNode) {
            path.push({ row: pathNode.row, col: pathNode.col });
            pathNode = pathNode.parent;
        }

    } else {
        console.log("[info:]=>shortest path was not found!");
    }

    return path;
}

module.exports = {
    initMap: initMap,
    search: search
}
