const TaskPool = require("./TaskPool");

function task(id) {
  //create an ID
  return new Promise((resolve, _) => {
    console.log('running task #', id);
    setTimeout(() => {
      console.log('done running task #', id);
      resolve();
    }, 400);
  });
}

const pool = new TaskPool(3);
for (let i = 0; i < 10; i++) {
  pool.run(task);
}
