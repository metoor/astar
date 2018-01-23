/**
 * create by Metoor
 * des：最小二叉堆
 */
"use strict"

function BinaryHeap() {
    this._binaryHeap = [];
}

BinaryHeap.prototype.add = function (element) {
    let len = this._binaryHeap.length;

    if (len == 0) {
        this._binaryHeap[len] = element;
    } else {
        let parentIndex = this.getParentIndex(len);
        let curIndex = len;
        while (parentIndex != -1) {
            if (this.isMin(this._binaryHeap[parentIndex], element)) {
                //父节点比孩子节点小，插入完成
                this._binaryHeap[curIndex] = element;
                break;
            }

            //子节点比父节点来的小，将子节点和父节点位置互换
            this._binaryHeap[curIndex] = this._binaryHeap[parentIndex];
            curIndex = parentIndex;
            parentIndex = this.getParentIndex(parentIndex);
        }

        if (parentIndex == -1) {
            //当前插入的元数是整个堆中最小的
            this._binaryHeap[curIndex] = element;
        }
    }
}

/****
 * first 是否小于 second
 */
BinaryHeap.prototype.isMin = function (first, second) {
    let firstFValue = first.hValue + first.gValue;
    let secondFValue = second.hValue + second.gValue;

    return firstFValue < secondFValue?true:false;
}

BinaryHeap.prototype.remove = function () {
    if (this._binaryHeap.length < 1) {
        console.log("binary heap is empty");
        return null;
    }

    let min = this._binaryHeap[0];

    let lastElement = this._binaryHeap.pop();

    if (this._binaryHeap.length != 0) {
        this.down(lastElement, this._binaryHeap.length - 1);
    }

    return min;
}

BinaryHeap.prototype.down = function (element, endIndex) {
    let currentIndex = 0;
    let leftIndex = this.getLeftChildIndex(currentIndex);

    while (leftIndex != -1) {
        if (leftIndex < endIndex && this.isMin(this._binaryHeap[leftIndex + 1], this._binaryHeap[leftIndex])) {
            //选择左右孩子中较小的
            ++leftIndex;
        }

        if (this.isMin(element, this._binaryHeap[leftIndex])) {
            //找到了位置
            this._binaryHeap[currentIndex] = element;
            break;
        } else {
            //大的元素，往下调
            this._binaryHeap[currentIndex] = this._binaryHeap[leftIndex];
            currentIndex = leftIndex;
            leftIndex = this.getLeftChildIndex(currentIndex);
        }
    }

    this._binaryHeap[currentIndex] = element;
}

BinaryHeap.prototype.getParentIndex = function (idx) {
    let parentIndex = -1;

    if (idx > 0) {
        parentIndex = Math.floor((idx - 1) / 2);
    }
    return parentIndex;
}

BinaryHeap.prototype.getLeftChildIndex = function (idx) {
    let index = -1;

    if (idx >= 0) {
        let leftChild = 2 * idx + 1;
        if (leftChild <= this._binaryHeap.length - 1) {
            index = leftChild;
        }
    }
    return index;
}

BinaryHeap.prototype.getRightChildIndex = function (idx) {
    let index = -1;

    if (idx >= 0) {
        rightChild = 2 * idx + 2;
        if (rightChild <= this._binaryHeap.length - 1) {
            index = rightChild;
        }
    }
    return index;
}

BinaryHeap.prototype.length = function(){
    return this._binaryHeap.length;
}

module.exports = new BinaryHeap();