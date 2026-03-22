import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', error => console.error('BROWSER_CRASH:', error.message));
  
  await page.goto('http://localhost:5173');
  
  await page.waitForSelector('input[placeholder="https://smartstore.naver.com/..."]');
  await page.type('input[placeholder="https://smartstore.naver.com/..."]', 'naver.com');
  
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('분석 시작')) {
      await btn.click();
      break;
    }
  }
  
  // Wait enough for the API call and possible crash
  await new Promise(r => setTimeout(r, 8000));
  
  const innerHtml = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
  console.log("------- BODY HTML (FIRST 500) -------");
  console.log(innerHtml);
  
  await browser.close();
})();
