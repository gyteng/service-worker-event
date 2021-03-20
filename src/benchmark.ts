declare global {
  interface Window {
    swe: ClientEvent,
    startBenchmark: Function,
  }
}
import ClientEvent from './client-event';

const initWorker = async () => {
  try {
    const pathArray = location.pathname.split('/');
    pathArray.pop();
    const serviceWorkerPath = pathArray.join('/') + 'service-worker.bundle.js';
    const registration = await navigator.serviceWorker.register(serviceWorkerPath);
    let worker;
    if (registration.installing) {
      worker = registration.installing;
    } else if (registration.waiting) {
      worker = registration.waiting;
    } else if (registration.active) {
      worker = registration.active;
      const swe = new ClientEvent(worker);
      window.swe = swe;
      return;
    }
    if (!worker) {
      throw new Error('worker not exists');
    }
    worker.addEventListener('statechange', function (e) {
      if (e.target.state === 'activated') {
        const swe = new ClientEvent(worker);
        window.swe = swe;
      }
    });
  } catch (err) {
    console.error('init service worker error:', err);
  }
}

await initWorker();

let start = 0;
let count = 0;
let benchmarkEventName = '';

const startBenchmark = () => {
  start = Date.now();
  benchmarkEventName = '_benchmark' + Math.random().toString().substr(2);
  window.swe.on(benchmarkEventName, handleReceiveBenchmarkMessage);
  window.swe.emit('_start_benchmark', {
    event: benchmarkEventName,
  });
};

const printCount = () => {
  const ele = document.querySelector('#benchmark .count');
  const newEle = document.createElement('div');
  newEle.textContent = count.toString() + ' ' + (Date.now() - start);
  ele.appendChild(newEle);
};
const handleReceiveBenchmarkMessage = data => {
  count++;
  if (count % 1000 === 0) {
    printCount();
  }
};

window.swe.on('_start_benchmark', data => {
  const eventName = data.event;
  if (benchmarkEventName === eventName) { return; }
  for (let i = 0; i < 10000; i++) {
    window.swe.emit(eventName, Date.now());
  }
});

window.startBenchmark = startBenchmark;
