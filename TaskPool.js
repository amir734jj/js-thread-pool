/*
## Overview

We want to send a large number of requests to the server, but not all at once.

Run the code now.

The logs show all of the requests were sent very quickly.
To fix this, write code to meet the following requirement.

## Requirements

1. The TaskPool instance can be called with asynchronous tasks at any time.
2. It will execute tasks as quickly as possible.
3. It will never execute more than the max number of tasks at a time.

NOTE: If you have already completed a similar problem before, please let me know.
*/

module.exports = class TaskPool {
  constructor(poolSize) {
    this.poolSize = poolSize;
    this.queue = [];
    this.runningTasks = 0;
    this.scheduled = null;
    this.id = 0;
  }

  backgroundRunner() {
    if (this.queue.length) {
      if (this.runningTasks < this.poolSize) {
        const index = 0;
        const [[task, id]] = this.queue.splice(index, 1);
        this.runningTasks++;
        task(id).finally(() => {
          this.runningTasks--;
          this.backgroundRunner();
        });
      } else {
        console.log('queue is full');
        if (!this.scheduled) {
          console.log('scheduled for later');
          this.scheduled = setTimeout(() => {
            this.backgroundRunner();
            this.scheduled = false;
          }, 1000);
        }
      }
    }
  }

  run(task) {
    this.queue.push([task, ++this.id]);
    this.backgroundRunner();
  }
}
