type EventSet = Set<string>;
type ClientEventMap = Map<any, EventSet>;
const clientEventMap: ClientEventMap = new Map<any, EventSet>();

const sendMessageToClient = (client, message) => {
  // @ts-ignore
  self.clients.get(client.id).then(function(myClient) {
    message.from = 'service worker event';
    myClient.postMessage(message);
  });
};

const handleClientRegister = (event) => {
  const client = event.source;
  clientEventMap.set(client, new Set<string>());
};

const handleClientUnregister = (event) => {
  const client = event.source;
  clientEventMap.delete(client);
};

const handleMessageFromClient = (event) => {
  const fromClient = event.source;
  const { from, type, eventName, data } = event.data;
  if (from !== 'service worker event') { return; }
  if (type === 'unregister') {
    handleClientUnregister(event);
  }
  if (type === 'on' || type === 'once') {
    if (!clientEventMap.has(fromClient)) {
      handleClientRegister(event);
    }
    const events = clientEventMap.get(fromClient);
    events.add(eventName);
  }
  if (type === 'emit') {
    for (const [client, events] of clientEventMap) {
      if (events.has(eventName) && fromClient !== client) {
        sendMessageToClient(client, { type, eventName, data });
      }
    }
  }
  if (type === 'remove') {
    const events = clientEventMap.get(fromClient);
    events && events.delete(eventName);
  }
  if (type === 'removeAll') {
    for (const [client, events] of clientEventMap) {
      if (events.has(eventName)) {
        sendMessageToClient(client, { type, eventName, data });
        events && events.delete(eventName);
      }
    }
  }
}

self.addEventListener('message', handleMessageFromClient);
