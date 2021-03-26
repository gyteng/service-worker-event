let page0;
let page1;
let page2;
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

describe('Emit event', () => {
  beforeAll(async () => {
    page0 = await browser.newPage();
    page1 = await browser.newPage();
    page2 = await browser.newPage();
    await page0.goto('http://localhost:19000');
    await page1.goto('http://localhost:19000');
    await page2.goto('http://localhost:19000');

    // await jestPuppeteer.debug();
  });

  afterAll(async () => {
    await page0.close();
    await page1.close();
    await page2.close();
  });

  it('string', async () => {
    await page0.evaluate(() => {
      swe.on('test_string', data => {
        const newDiv = document.createElement('div');
        newDiv.className = 'test_string';
        const newContent = document.createTextNode(data);
        newDiv.appendChild(newContent);
        const testDiv = document.getElementById('test');
        testDiv.appendChild(newDiv);
      });
    });
    await sleep(100);
    await page1.evaluate(() => {
      swe.emit('test_string', 'ABCDEabced');
    });
    await sleep(100);
    const text = await page0.evaluate(() => {
      swe.removeAll('test_string');
      return document.querySelector('#test .test_string').textContent;
    });
    await expect(text).toBe('ABCDEabced');
  });

  it('number', async () => {
    setTimeout(async () => {
      await page1.evaluate(() => {
        swe.on('test_number', data => {
          const newDiv = document.createElement('div');
          newDiv.className = 'test_number';
          const newContent = document.createTextNode(data.toString());
          newDiv.appendChild(newContent);
          const testDiv = document.getElementById('test');
          testDiv.appendChild(newDiv);
        });
      });
    }, 100);
    setTimeout(async () => {
      await page2.evaluate(() => {
        swe.emit('test_number', 13579);
      });
    }, 200);
    let text = () => new Promise(resolve => {
      setTimeout(() => resolve(page1.evaluate(() => {
        swe.removeAll('test_number');
        return +document.querySelector('#test .test_number').textContent;
      })), 500);
    });
    await expect(text()).resolves.toBe(13579);
  });

  it('object', async () => {
    setTimeout(async () => {
      await page2.evaluate(() => {
        swe.on('test_object', data => {
          const newDiv = document.createElement('div');
          newDiv.className = 'test_object';
          const newContent = document.createTextNode(JSON.stringify(data));
          newDiv.appendChild(newContent);
          const testDiv = document.getElementById('test');
          testDiv.appendChild(newDiv);
        });
      });
    }, 100);
    setTimeout(async () => {
      await page0.evaluate(() => {
        swe.emit('test_object', { a: '123', b: 456, c: { d: '789' } });
      });
    }, 200);
    let text = () => new Promise(resolve => {
      setTimeout(() => resolve(page2.evaluate(() => {
        swe.removeAll('test_object');
        return document.querySelector('#test .test_object').textContent;
      })), 500);
    });
    await expect(text()).resolves.toBe(JSON.stringify({ a: '123', b: 456, c: { d: '789' } }));
  });

  it('multi', async () => {
    await page0.evaluate(() => {
      swe.on('test_multi', data => {
        const newDiv = document.createElement('div');
        newDiv.className = 'test_multi_' + data;
        const newContent = document.createTextNode(data);
        newDiv.appendChild(newContent);
        const testDiv = document.getElementById('test');
        testDiv.appendChild(newDiv);
      });
    });
    await sleep(100);
    await page1.evaluate(() => {
      for (let i = 0; i < 300; i++) {
        swe.emit('test_multi', i.toString());
      }
    });
    await sleep(400);
    const text = await page0.evaluate(() => {
      swe.removeAll('test_multi');
      let result = [];
      for (let i = 0; i < 300; i++) {
        result.push(document.querySelector('#test .test_multi_' + i).textContent);
      }
      return result;
    });
    await expect(text).toEqual([...new Array(300).keys()].map(m => m.toString()));
  });

  it('args', async () => {
    await page0.evaluate(() => {
      window.onTestArgs = (...args) => {
        window.testArgsData = args;
      };
      swe.on('test_args', window.onTestArgs);
    });
    await page1.evaluate(() => {
      window.onTestArgs = (...args) => {
        window.testArgsData = args;
      };
      swe.on('test_args', window.onTestArgs);
    });
    await sleep(100);
    await page1.evaluate(() => {
      swe.emit('test_args', 'test_args1', 'test_args2', 1234, 5678, { foo: 'bar' });
    });
    await page2.evaluate(() => {
      swe.emit('test_args', 'test_args1', 'test_args2', 1234, 5678, { foo: 'bar' });
    });
    await sleep(100);
    const text0 = await page0.evaluate(() => {
      return window.testArgsData;
    });
    const text1 = await page1.evaluate(() => {
      return window.testArgsData;
    });
    expect(text0).toEqual([ 'test_args1', 'test_args2', 1234, 5678, { foo: 'bar' } ]);
    expect(text1).toEqual([ 'test_args1', 'test_args2', 1234, 5678, { foo: 'bar' } ]);
  });
});
