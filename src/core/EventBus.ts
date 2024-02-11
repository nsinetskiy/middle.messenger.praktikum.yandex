type Callback = (...args: unknown[]) => void

class EventBus {
  private listeners: { [key: string]: Callback[] } = {};

  on(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(listener => {
      return listener !== callback;
    });
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}

export default EventBus;
