### service-worker-event

An event emitter for communication between tabs using [service worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API).


### Demo

[live demo](https://gyteng.github.io/service-worker-event/)
### Usage

1. add `docs/index.bundle.js` in script

    ```
    <script src="./index.bundle.js"></script>
    ```

2. open two tabs of the page and run these commands in console:

    ```
    swe.on('test', console.log);
    ```

    ```
    swe.emit('test', 'just a test.');
    ```

### API

1. `swe.on(eventName, listener)`

2. `swe.once(eventName, listener)`

3. `swe.emit(eventName, payload0, payload1, payload2, ...)`

4. `swe.remove(eventName, listener)`

5. `swe.removeAll(eventName)`

### Test

run `npm run test`

### Benchmark

Open multi [demo page](https://gyteng.github.io/service-worker-event/) and click the benchmark start button.
