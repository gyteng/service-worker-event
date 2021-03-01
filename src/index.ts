declare global {
  interface Window { swe: ClientEvent; }
}
import ClientEvent from './client-event';

const initWorker = async () => {
  const registration = await navigator.serviceWorker.register('./service-worker.bundle.js', { scope: './' });
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
  if (worker) {
    worker.addEventListener('statechange', function (e) {
      if (e.target.state === 'activated') {
        const swe = new ClientEvent(worker);
        window.swe = swe;
      }
    });
  }
}

initWorker();
