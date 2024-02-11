import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated'
}

class Store<State extends Record<string, unknown>> extends EventBus {
  private state: State = {} as State;

  constructor(initialState: State) {
    super();

    this.state = initialState;
    this.set(initialState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

export default Store;
