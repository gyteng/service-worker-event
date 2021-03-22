declare global {
  interface Window {
    swe: ClientEvent,
    handleSampleClick: Function,
    handleBenchmarkClick: Function,
    startBenchmark: Function,
  }
}
import ClientEvent from './client-event';
import './style.scss';


/**
 * sample
 */
const initWorker = async () => {
  try {
    const pathArray = location.pathname.split('/');
    pathArray.pop();
    const serviceWorkerPath = pathArray.join('/') + '/service-worker.bundle.js';
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


/**
 * benchmark
 */
let start = 0;
let count = 0;
let benchmarkEventName = '';

const startBenchmark = () => {
  if (benchmarkEventName) {
    window.swe.remove(benchmarkEventName, handleReceiveBenchmarkMessage);
  }
  const ele = document.querySelector('body .benchmark .count');
  ele.innerHTML = '';
  count = 0;
  start = Date.now();
  benchmarkEventName = '_benchmark' + Math.random().toString().substr(2);
  window.swe.on(benchmarkEventName, handleReceiveBenchmarkMessage);
  window.swe.emit('_start_benchmark', {
    event: benchmarkEventName,
  });
};

const printCount = () => {
  const ele = document.querySelector('body .benchmark .count');
  const newElement = document.createElement('div');
  const newChildElement0 = document.createElement('div');
  newChildElement0.className = 'number';
  newChildElement0.textContent = count.toString();
  const newChildElement1 = document.createElement('div');
  newChildElement1.className = 'time';
  newChildElement1.textContent = (Date.now() - start).toString() + ' ms';
  newElement.appendChild(newChildElement0);
  newElement.appendChild(newChildElement1);
  ele.appendChild(newElement);
};

const handleReceiveBenchmarkMessage = data => {
  count++;
  if (count % 10000 === 0) {
    printCount();
  }
};

window.swe.on('_start_benchmark', data => {
  const eventName = data.event;
  if (benchmarkEventName === eventName) { return; }
  for (let i = 0; i < 30000; i++) {
    window.swe.emit(eventName, Date.now());
  }
});

window.startBenchmark = startBenchmark;

window.handleSampleClick = () =>  {
  const sample = document.querySelector('body .sample');
  // @ts-ignore
  sample.style.display = 'flex';
  const benchmark = document.querySelector('body .benchmark');
  // @ts-ignore
  benchmark.style.display = 'none';
};

window.handleBenchmarkClick = () => {
  const sample = document.querySelector('body .sample');
  // @ts-ignore
  sample.style.display = 'none';
  const benchmark = document.querySelector('body .benchmark');
  // @ts-ignore
  benchmark.style.display = 'flex';
};