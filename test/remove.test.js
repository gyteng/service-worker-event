let page0;
let page1;
let page2;
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

describe('Remove event', () => {
  beforeAll(async () => {
    page0 = await browser.newPage();
    page1 = await browser.newPage();
    page2 = await browser.newPage();
    await page0.goto('http://localhost:19000');
    await page1.goto('http://localhost:19000');
    await page2.goto('http://localhost:19000');

    // await jestPuppeteer.debug();
  });

  it('emit0', async () => {
    await page0.evaluate(() => {
      window.onTestRemove = data => {
        const newDiv = document.createElement('div');
        newDiv.className = data;
        const newContent = document.createTextNode(data);
        newDiv.appendChild(newContent);
        const testDiv = document.getElementById('test');
        testDiv.appendChild(newDiv);
      };
      swe.on('test_remove', window.onTestRemove);
    });
    await sleep(100);
    await page1.evaluate(() => {
      swe.emit('test_remove', 'test_remove0');
    });
    await sleep(100);
    let text = await page0.evaluate(() => {
      return document.querySelector('#test .test_remove0').textContent;
    });
    await expect(text).toBe('test_remove0');
  });

  it('emit1', async () => {
    await page2.evaluate(() => {
      swe.emit('test_remove', 'test_remove1');
    });
    await sleep(100);
    let text = await page0.evaluate(() => {
      return document.querySelector('#test .test_remove1').textContent;
    });
    await expect(text).toBe('test_remove1');
  });

  it('remove', async () => {
    await page0.evaluate(() => {
      swe.remove('test_remove', window.onTestRemove);
    });
    await page2.evaluate(() => {
      swe.emit('test_remove', 'test_remove2');
    });
    await sleep(100);
    let text = await page0.evaluate(() => {
      return document.querySelector('#test .test_remove2');
    });
    await expect(text).toBeNull();
  });
});
