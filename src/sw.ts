type EventSet = Set<string>;
type ClientEventMap = Map<any, EventSet>;
const clientEventMap: ClientEventMap = new Map<any, EventSet>();

const sendMessageToClient = (client, message) => {
  // @ts-ignore
  self.clients.get(client.id).then(myClient => {
    if (!myClient) {
      clientEventMap.delete(client);
      return;
    }
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
  let messages = [];
  if (Array.isArray(event.data)) {
    messages = event.data;
  } else {
    messages[0] = event.data;
  }
  for (const message of messages) {
    const { from, type, eventName, data } = message;
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
}

self.addEventListener('message', handleMessageFromClient);
