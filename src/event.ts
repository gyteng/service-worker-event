type FunctionObject = {
  fn: Function,
  isOnce: boolean,
};
type FunctionSet = Set<FunctionObject>;
type FunctionEventMap = Map<string, FunctionSet>;

class ServiceWorkerEvent {
  protected functionEventMap: FunctionEventMap;

  constructor() {
    this.functionEventMap = new Map<string, FunctionSet>();
  }
  
  emit(eventName: string, ...eventData: any) {
    const functions = this.functionEventMap.get(eventName);
    if (!functions) { return; }
    for (const fnObj of functions) {
      try {
        fnObj.fn(...eventData); 
      } catch(err) {
        console.error(`function error in [${eventName}]:`, err);
      }
      if (fnObj.isOnce) {
        this.remove(eventName, fnObj.fn);
      }
    }
  }

  on(eventName: string, listener: Function) {
    if (!this.functionEventMap.has(eventName)) {
      this.functionEventMap.set(eventName, new Set());
    }
    const functions = this.functionEventMap.get(eventName);
    let hasListener = false;
    for (const fnObj of functions) {
      if (fnObj.fn === listener) {
        hasListener = true;
        fnObj.isOnce = false;
        break;
      }
    }
    if (!hasListener) {
      functions.add({ fn: listener, isOnce: false });
    }
  }

  once(eventName: string, listener: Function) {
    if (!this.functionEventMap.has(eventName)) {
      this.functionEventMap.set(eventName, new Set());
    }
    const functions = this.functionEventMap.get(eventName);
    let hasListener = false;
    for (const fnObj of functions) {
      if (fnObj.fn === listener) {
        hasListener = true;
        fnObj.isOnce = true;
        break;
      }
    }
    if (!hasListener) {
      functions.add({ fn: listener, isOnce: true });
    }
  }

  remove(eventName: string, listener: Function) {
    const functions = this.functionEventMap.get(eventName);
    if (!functions) { return; }
    for (const fnObj of functions) {
      if (fnObj.fn === listener) {
        functions.delete(fnObj);
        break;
      }
    }
    if (functions.size === 0) {
      this.functionEventMap.delete(eventName);
    }
  }

  removeAll(eventName: string) {
    this.functionEventMap.delete(eventName);
  }

  protected hasEventName(eventName: string): boolean {
    return !!this.functionEventMap.has(eventName) && this.functionEventMap.get(eventName).size > 0;
  }
}

export default ServiceWorkerEvent;
