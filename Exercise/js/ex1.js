// 1. Write a Stack class that simulates the structure and methods of the stack
//    Write a Queue class to simulate the structure and methods of the queue
class Stack {
  constructor() {
    this.data = [];
  }
  push(item) {
    this.data.push(item);
  }
  pop() {
    if (!this.isEmpty()) {
      return this.data.pop();
    }
  }
  peek() {
    return !this.isEmpty() ? this.data[this.data.length - 1] : undefined;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  size() {
    return this.data.length;
  }
  clear() {
    this.data = [];
  }
}

// Queue

class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(item) {
    this.data.push(item);
  }
  dequeue() {
    return this.data.shift();
  }
  peek() {
    return !this.isEmpty() ? this.data[0] : undefined;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  size() {
    return this.data.length;
  }
  clear() {
    this.data = [];
  }
}
