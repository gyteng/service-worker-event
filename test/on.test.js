let page0;
let page1;
let page2;
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

describe('On event', () => {
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

  it('on0', async () => {
    await page0.evaluate(() => {
      window.testOnData = {};
      window.onTestOn = data => {
        window.testOnData[data] = data;
      };
      swe.on('test_on', window.onTestOn);
    });
    await page1.evaluate(() => {
      window.testOnData = {};
      window.onTestOn = data => {
        window.testOnData[data] = data;
      };
      swe.on('test_on', window.onTestOn);
    });
    await sleep(30);
    await page2.evaluate(() => {
      swe.emit('test_on', 'test_on0');
    });
    await sleep(30);
    let text0 = await page0.evaluate(() => {
      return window.testOnData.test_on0;
    });
    let text1 = await page1.evaluate(() => {
      return window.testOnData.test_on0;
    });
    expect(text0).toBe('test_on0');
    expect(text1).toBe('test_on0');
  });

  it('on1', async () => {
    await page0.evaluate(() => {
      swe.emit('test_on', 'test_on1');
    });
    let text0 = await page0.evaluate(() => {
      return window.testOnData.test_on1;
    });
    let text1 = await page1.evaluate(() => {
      return window.testOnData.test_on1;
    });
    expect(text0).toBe('test_on1');
    expect(text1).toBe('test_on1');
  });
});
