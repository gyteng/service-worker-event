type EventSet = Set<string>;
type ClientObj = {
  client: any,
  events: EventSet,
  lastSendMessage: number,
  sendMessageTimeout: number | null;
  combineMessages: Array<any>,
};
type Clients = {
  [key: string]: ClientObj,
};
const clients: Clients = {};

const sendMessageToClient = async (client, message?) => {
  // @ts-ignore
  const myClient = await self.clients.get(client.id);
  if (!myClient) {
    delete clients[client.id];
    return;
  }
  const clientObj = getClient(client);
  if (message) {
    message.from = 'service worker event';
    clientObj.combineMessages.push(message);
  }
  if (30 > Date.now() - clientObj.lastSendMessage && clientObj.combineMessages.length < 100) {
    if (clientObj.sendMessageTimeout) {
      self.clearTimeout(clientObj.sendMessageTimeout);
    }
    clientObj.sendMessageTimeout = self.setTimeout(() => {
      clientObj.sendMessageTimeout = null;
      sendMessageToClient(client);
    }, Date.now() - clientObj.lastSendMessage);
    return;
  }
  clientObj.lastSendMessage = Date.now();
  myClient.postMessage(clientObj.combineMessages);
  clientObj.combineMessages = [];
};

const hasClient = (client): Boolean => {
  return !!clients[client.id];
};

const getClient = (client): ClientObj => {
  return clients[client.id];
};

const handleClientRegister = (event) => {
  const client = event.source;
  clients[client.id] = {
    client,
    events: new Set<string>(),
    lastSendMessage: 0,
    sendMessageTimeout: null,
    combineMessages: [],
  };
};

const handleClientUnregister = (event) => {
  const client = event.source;
  delete clients[client.id];
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
      if (!hasClient(fromClient)) {
        handleClientRegister(event);
      }
      const { events } = getClient(fromClient);
      events.add(eventName);
    }
    if (type === 'emit') {
      for (const id in clients) {
        const { client, events } = clients[id];
        if (events.has(eventName) && fromClient.id !== client.id) {
          sendMessageToClient(client, { type, eventName, data });
        }
      }
    }
    if (type === 'remove') {
      const { events } = getClient(fromClient);
      events && events.delete(eventName);
    }
    if (type === 'removeAll') {
      for (const id in clients) {
        const { client, events } = clients[id];
        if (events.has(eventName)) {
          sendMessageToClient(client, { type, eventName, data });
          events && events.delete(eventName);
        }
      }
    }
  }
}

self.addEventListener('message', handleMessageFromClient);
