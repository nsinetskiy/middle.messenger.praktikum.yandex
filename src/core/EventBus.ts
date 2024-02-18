type Callback<T extends unknown[] = unknown[]> = (...args: T) => void

class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, unknown[]>> {
  private listeners: { [key in E]?: Callback<M[E]>[] } = {};

  on(event: E, callback: Callback<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: Callback<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(listener => {
      return listener !== callback;
    });
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach(listener => {
      listener(...args);
    });
  }
}

export default EventBus;
