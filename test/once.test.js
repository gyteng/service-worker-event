let page0;
let page1;
let page2;
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

describe('Once event', () => {
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

  it('emit0', async () => {
    await page0.evaluate(() => {
      window.onTestOnce = data => {
        const newDiv = document.createElement('div');
        newDiv.className = data;
        const newContent = document.createTextNode(data);
        newDiv.appendChild(newContent);
        const testDiv = document.getElementById('test');
        testDiv.appendChild(newDiv);
      };
      swe.once('once', window.onTestOnce);
    });
    await sleep(100);
    await page1.evaluate(() => {
      swe.emit('once', 'test_once0');
    });
    await sleep(100);
    let text = await page0.evaluate(() => {
      return document.querySelector('#test .test_once0').textContent;
    });
    await expect(text).toBe('test_once0');
  });

  it('emit1', async () => {
    await page2.evaluate(() => {
      swe.emit('once', 'test_once1');
    });
    await sleep(100);
    let text = await page0.evaluate(() => {
      return document.querySelector('#test .test_once1');
    });
    await expect(text).toBeNull();
  });
});
