export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(event, listener) {
    if (this.hasListener(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(listener);
  }

  emit(event, payload) {
    if (this.hasListener(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener) => {
      listener(payload);
    });
  }

  unsubscribe(event, listenerToRemove) {
    if (this.hasListener(event)) {
      return;
    }

    const filteredListeners = this.listeners
      .get(event)
      .filter((listener) => listener !== listenerToRemove);

    this.listeners.set(event, filteredListeners);
  }

  hasListener(event) {
    return !this.listeners.has(event);
  }
}

const toastEventManager = new EventManager();

function addtoast1(payload) {
  console.log('added toast 1', payload);
}

function addtoast2(payload) {
  console.log('added toast 2', payload);
}

toastEventManager.subscribe('addtoast', addtoast1);

toastEventManager.subscribe('addtoast', addtoast2);

toastEventManager.emit('addtoast', { type: 'danger', text: 'texto' });

toastEventManager.unsubscribe('addtoast', addtoast2);

toastEventManager.emit('addtoast', 'depois de remover o addtoast2...');
