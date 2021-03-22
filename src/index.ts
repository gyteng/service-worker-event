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
let startBenchmarkEventName = '';
let prepareBenchmarkEventName = '';
let tabs = 0;
let timeout = null;

const startBenchmark = () => {
  if (startBenchmarkEventName) {
    window.swe.remove(startBenchmarkEventName, handleReceiveBenchmarkMessage);
  }
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  tabs = 0;
  const ele = document.querySelector('body .benchmark .count');
  ele.innerHTML = '';
  count = 0;
  const random = Math.random().toString().substr(2);
  startBenchmarkEventName = '_benchmark' + random;
  prepareBenchmarkEventName = '_prepare_benchmark' + random;
  timeout = setTimeout(() => {
    if (!tabs) {
      const tips = document.querySelector('body .benchmark .tips');
      tips.setAttribute('style', 'display: flex');
      return;
    }
    const tips = document.querySelector('body .benchmark .tips');
    tips.setAttribute('style', 'display: none');
    start = Date.now();
    timeout = null;
    window.swe.emit('_start_benchmark', {
      start: startBenchmarkEventName,
      number: Math.ceil(150000/tabs),
    });
  }, 1000);
  window.swe.on(startBenchmarkEventName, handleReceiveBenchmarkMessage);
  window.swe.on(prepareBenchmarkEventName, handlePrepareBenchmarkMessage);
  window.swe.emit('_prepare_benchmark', {
    prepare: prepareBenchmarkEventName,
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

const handlePrepareBenchmarkMessage = data => {
  tabs++;
};

window.swe.on('_start_benchmark', data => {
  const startEventName = data.start;
  const number = data.number;
  if (startBenchmarkEventName === startEventName) { return; }
  for (let i = 0; i < number; i++) {
    window.swe.emit(startEventName, Date.now());
  }
});

window.swe.on('_prepare_benchmark', data => {
  const prepareEventName = data.prepare;
  if (prepareBenchmarkEventName === prepareEventName) { return; }
  window.swe.emit(prepareEventName, '');
});

window.startBenchmark = startBenchmark;

window.handleSampleClick = () =>  {
  const sample = document.querySelector('body .sample');
  sample.setAttribute('style', 'display: flex');
  const benchmark = document.querySelector('body .benchmark');
  benchmark.setAttribute('style', 'display: none');
};

window.handleBenchmarkClick = () => {
  const sample = document.querySelector('body .sample');
  sample.setAttribute('style', 'display: none');
  const benchmark = document.querySelector('body .benchmark');
  benchmark.setAttribute('style', 'display: flex');
};