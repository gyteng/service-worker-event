import ServiceWorkerEvent from './event';

class ClientEvent extends ServiceWorkerEvent {
  worker: ServiceWorker;
  constructor(worker: ServiceWorker) {
    super();
    this.worker = worker;
    navigator.serviceWorker.addEventListener('message', this.handleMessage.bind(this));
    window.addEventListener('beforeunload', () => {
      this.sendMessageToWorker({ type: 'unregister' });
    });
  }

  private handleMessage(event) {
    const { from, type, eventName, data } = event.data;
    if (from !== 'service worker event') { return; }
    if (type === 'emit') {
      super.emit(eventName, data);
    }
    if (type === 'removeAll') {
      super.removeAll(eventName);
    }
  }

  private sendMessageToWorker(message) {
    message.from = 'service worker event';
    return this.worker.postMessage(message);
  }

  emit(eventName: string, eventData: any) {
    this.sendMessageToWorker({
      type: 'emit',
      eventName,
      data: eventData,
    });
    super.emit(eventName, eventData);
    if (!super.hasEventName(eventName)) {
      this.sendMessageToWorker({
        type: 'remove',
        eventName,
      });
    }
  }

  on(eventName: string, listener: Function) {
    this.sendMessageToWorker({
      type: 'on',
      eventName,
    });
    super.on(eventName, listener);
  }

  once(eventName: string, listener: Function) {
    this.sendMessageToWorker({
      type: 'once',
      eventName,
    });
    super.once(eventName, listener);
  }

  remove(eventName: string, listener: Function) {
    super.remove(eventName, listener);
    if (!super.hasEventName(eventName)) {
      this.sendMessageToWorker({
        type: 'remove',
        eventName,
      });
    }
  }

  removeAll(eventName: string) {
    this.sendMessageToWorker({
      type: 'removeAll',
      eventName,
    });
    super.removeAll(eventName);
  }
}

export default ClientEvent;
