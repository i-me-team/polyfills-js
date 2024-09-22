class EventEmitter {
  constructor() {
    this.subscriptions = new Map();
  }
  subscribe(eventName, callback) {
    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, new Set());
    }
    const subscription = this.subscriptions.get(eventName);
    const callbackObj = { callback };
    subscription.add(callbackObj);

    return {
      release: () => {
        subscription.delete(callbackObj);
        if (subscription.size === 0) {
          this.subscriptions.delete(eventName);
        }
      },
    };
  }
  emit(eventName, ...args) {
    const subscription = this.subscriptions.get(eventName);
    if (subscription) {
      subscription.forEach((subs) => subs.callback.apply(null, args));
    }
  }
}

export class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }
  addTasks(task) {
    this.emit('taskAdded', task);
    this.tasks.push(task);
  }
  markAsCompleted(taskId) {
    const taskToMark = this.tasks.find((task) => task.id === taskId);
    if (taskToMark) {
      this.emit('taskCompleted', taskToMark);
      taskToMark.completed = true;
    }
  }
  getTasks() {
    return this.tasks;
  }
}

// Application and usage
const taskManager = new TaskManager();

// Create Subscriptions
const taskAddedSubscription = taskManager.subscribe('taskAdded', (task) => {
  console.log(`New task Added: ${task.title}`);
  // Send notifications
  // Display something on the UI.
});

const taskCompletedSubscription = taskManager.subscribe(
  'taskCompleted',
  (task) => {
    console.log(`${task.title} is completed now...`);
    // Do whatever you wish to...
  },
);

taskManager.addTasks({ id: 1, title: 'Learn Event Emitter', completed: false });
taskManager.addTasks({
  id: 2,
  title: 'Implement event emitter in taskManager',
  completed: false,
});
// Getting tasks
console.log(taskManager.getTasks());
// Mark a task as completed
taskManager.markAsCompleted(2);
// Getting tasks
console.log(taskManager.getTasks());

// Unsubscribe the subscribers(Cleanup)
console.log('Unsubscribing events...');
taskAddedSubscription.release();
taskCompletedSubscription.release();
