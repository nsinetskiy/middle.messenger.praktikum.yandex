import EventBus from './EventBus';

export enum WSTransportEvents {
  Open = 'open',
  Message = 'message',
  Error = 'error',
  Close = 'close'
}

export class WSTransport extends EventBus {
  private webSocket: WebSocket;
  private url: string;
  private pingTimer: number = 0;

  constructor(url: string) {
    super();
    this.url = url;
    this.webSocket = new WebSocket(this.url);
  }

  public connect(): Promise<void> {
    this.webSocket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Open);
    });
    this.webSocket.addEventListener('message', (event) => {
      this.emit(WSTransportEvents.Message, JSON.parse(event.data));
    });
    this.webSocket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });
    this.pingPong();

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.Open, () => {
        resolve();
      });
      this.on(WSTransportEvents.Error, (error) => {
        reject(error);
      });
    });
  }

  public send(data: Record<string, unknown>) {
    this.webSocket.send(JSON.stringify(data));
  }

  public close() {
    clearInterval(this.pingTimer);
    this.webSocket.close();
  }

  private pingPong() {
    this.pingTimer = setInterval(() => {
      this.webSocket.send(JSON.stringify({ type: 'ping' }));
    }, 10000);
  }
}

export default WSTransport;
