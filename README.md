### service-worker-event

An event emitter for communication between tabs using service worker.

### Usage

1. add `dist/index.bundle.js` in script

    ```
    <script src="./index.bundle.js" />
    ```

2. open two tabs of the page and run these commands in console:

    ```
    swe.on('test', console.log);
    ```

    ```
    swe.emit('test', 'just a test.');
    ```