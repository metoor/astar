let _map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * 初始化测试地图
 * @param {*} size [0,100]
 * @param {*} probability 概率[0,100]
 */
function init(size, probability) {
    let _mapValue = [];
    for (let row = 0; row < size; row++) {
        let array = [];
        for (let col = 0; col < size; col++) {
            let rd = Math.random() * 100;
            array[col] = rd < probability ? 1 : 0;
        }
        _mapValue[row] = array;
    }

    return _mapValue;
}

module.exports = {
    init:init,
    map:_map
}