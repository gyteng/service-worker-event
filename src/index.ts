import ClientEvent from './client-event';

const initWorker = async () => {
  const registration = await navigator.serviceWorker.register('./service-worker.bundle.js', { scope: '/' });
  let worker;
  if (registration.installing) {
    worker = registration.installing;
  } else if (registration.waiting) {
    worker = registration.waiting;
  } else if (registration.active) {
    worker = registration.active;
    const ce = new ClientEvent(worker);
    // @ts-ignore
    window.ce = ce;
    return;
  }
  if (worker) {
    worker.addEventListener('statechange', function (e) {
      // console.log(e.target.state);
      if (e.target.state === 'activated') {
        const ce = new ClientEvent(worker);
        // @ts-ignore
        window.ce = ce;
      }
    });
  }
}

initWorker();