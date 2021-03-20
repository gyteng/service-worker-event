declare global {
  interface Window { swe: ClientEvent }
}
import ClientEvent from './client-event';

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

initWorker();
