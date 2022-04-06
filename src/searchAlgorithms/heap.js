/*
Example usage:

let h = new minHeap();
h.add([41, "jj"], (element)=> element[0])
h.add([16, "jj"], (element)=> element[0])
h.add([51, "jj"], (element)=> element[0])
h.printHeap()
console.log(h.getMin((element)=> element[0]))
*/


export class minHeap {
    constructor() {
        this.heap = [];
    }

    parentIdx(idx) {
        return Math.floor((idx - 1) / 2);
    }

    leftChildIdx(idx) {
        return (idx * 2) + 1;
    }

    rightChildIdx(idx) {
        return (idx * 2) + 2;
    }

    peek() {
        return this.heap[0];
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    add(element, callbackForValue) {
        this.heap.push(element);
        let minIdx = this.heap.length - 1
        let parentIdx = this.parentIdx(minIdx);
        while (parentIdx >= 0 && this.heap[parentIdx]) {
            if (!this.heapify(parentIdx, callbackForValue)) break
            parentIdx = this.parentIdx(parentIdx);
        }
    }

    getMin(callbackForValue) {
        [this.heap[this.heap.length -1], this.heap[0]] = [this.heap[0], this.heap[this.heap.length -1]];
        const min = this.heap.pop();
        let idx = 0;
        let minIdx
        while (true) {
            minIdx = this.heapify(idx, callbackForValue)
            if (!minIdx) break;
            idx = minIdx;
        }
        return min;
    }

    heapify(idx, callbackForValue) {
        let size = this.heap.length;
        let minIdx = idx;
        let leftIdx = this.leftChildIdx(idx);
        let rightIdx = this.rightChildIdx(idx);

        if (leftIdx < size && callbackForValue(this.heap[leftIdx]) < callbackForValue(this.heap[minIdx])) {
            minIdx = leftIdx;
        }
        if (rightIdx < size && callbackForValue(this.heap[rightIdx]) < callbackForValue(this.heap[minIdx])) {
            minIdx = rightIdx;
        }

        if (minIdx !== idx) {
            this.swap(idx, minIdx);
            return minIdx;
        }
        return false;
    }


    printHeap() {
        console.log(this.heap);
    }

}
