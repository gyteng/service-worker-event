import ServiceWorkerEvent from './event';

class ClientEvent extends ServiceWorkerEvent {
  worker: ServiceWorker;
  private _lastSendMessage: number;
  private _sendMessageTimeout: number | null;
  private _combineMessages: Array<any>;
  constructor(worker: ServiceWorker) {
    super();
    this.worker = worker;
    this._lastSendMessage = 0;
    this._sendMessageTimeout = null;
    this._combineMessages = [];
    navigator.serviceWorker.addEventListener('message', this._handleMessage.bind(this));
    window.addEventListener('beforeunload', () => {
      this._sendMessageToWorker({ type: 'unregister' });
    });
  }

  private _handleMessage(event) {
    let messages = [];
    if (Array.isArray(event.data)) {
      messages = event.data;
    } else {
      messages[0] = event.data;
    }
    for (const message of messages) {
      const { from, type, eventName, data } = message;
      if (from !== 'service worker event') { return; }
      if (type === 'emit') {
        super.emit(eventName, ...data);
      }
      if (type === 'removeAll') {
        super.removeAll(eventName);
      }
    }
  }

  private _sendMessageToWorker(message?) {
    if (message) {
      message.from = 'service worker event';
      this._combineMessages.push(message);
    }
    if (30 > Date.now() - this._lastSendMessage && this._combineMessages.length < 100) {
      if (this._sendMessageTimeout) {
        window.clearTimeout(this._sendMessageTimeout);
      }
      this._sendMessageTimeout = window.setTimeout(() => {
        this._sendMessageTimeout = null;
        this._sendMessageToWorker();
      }, Date.now() - this._lastSendMessage);
      return;
    }
    this._lastSendMessage = Date.now();
    this.worker.postMessage(this._combineMessages);
    this._combineMessages = [];
  }

  emit(eventName: string, ...eventData: any) {
    this._sendMessageToWorker({
      type: 'emit',
      eventName,
      data: eventData,
    });
    super.emit(eventName, ...eventData);
    if (!super.hasEventName(eventName)) {
      this._sendMessageToWorker({
        type: 'remove',
        eventName,
      });
    }
  }

  on(eventName: string, listener: Function) {
    this._sendMessageToWorker({
      type: 'on',
      eventName,
    });
    super.on(eventName, listener);
  }

  once(eventName: string, listener: Function) {
    this._sendMessageToWorker({
      type: 'once',
      eventName,
    });
    super.once(eventName, listener);
  }

  remove(eventName: string, listener: Function) {
    super.remove(eventName, listener);
    if (!super.hasEventName(eventName)) {
      this._sendMessageToWorker({
        type: 'remove',
        eventName,
      });
    }
  }

  removeAll(eventName: string) {
    this._sendMessageToWorker({
      type: 'removeAll',
      eventName,
    });
    super.removeAll(eventName);
  }
}

export default ClientEvent;
