export default class EventManager {
  constructor() {
    this.listeners = {
      // key : value
      // addtoast: [() => {}, () = > {}]
    };
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  emit(event, payload) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    if (!this.listeners[event]) {
      return;
    }

    const filteredListeners = this.listeners[event].filter(
      (listener) => listener !== listenerToRemove
    );

    this.listeners[event] = filteredListeners;
  }
}

const toastEventManager = new EventManager();

function addtoast1(payload) {
  console.log('added toast 1', payload);
}

function addtoast2(payload) {
  console.log('added toast 2', payload);
}

toastEventManager.on('addtoast', addtoast1);

toastEventManager.on('addtoast', addtoast2);

toastEventManager.emit('addtoast', { type: 'danger', text: 'texto' });

toastEventManager.removeListener('addtoast', addtoast2);

toastEventManager.emit('addtoast', 'depois de remover o addtoast2...');
