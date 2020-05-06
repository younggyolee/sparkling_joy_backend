const puppeteer = require('puppeteer');

exports.getImageForKeyword = async function(keyword) {
  console.log('google bot turned on!');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 800});
  await page.goto('https://www.google.com/imghp?hl=en', { waitUntil: 'networkidle2' });
  await page.screenshot({path: 'page.png'});
  await page.type('input[title="Search"]', keyword);
  const searchButtonSelector = 'button[aria-label="Google Search"]';
  await page.waitForSelector(searchButtonSelector);
  await page.waitFor(500 + Math.random() * 1000);
  await page.click(searchButtonSelector);
  await page.waitFor(3000 + Math.random() * 1000);
  await page.screenshot({path: 'page2.png'});
  // 
  const firstImageSelector = 'img[alt]:not([alt=""])';
  await page.waitForSelector(firstImageSelector);
  await page.waitFor(500 + Math.random() * 1000);
  await page.click(firstImageSelector);
  const largeImageSelector = 'img[style]:not([style=""])';
  await page.waitForSelector(largeImageSelector);
  await page.waitFor(500 + Math.random() * 1000);
  const imgs = await page.$$eval(largeImageSelector, imgs => imgs.map(img => img.getAttribute('src')));
  console.log('imgs', imgs);
  return imgs[0]

  // const imgSrc = imgs.filter(img => img.includes('https://'))[0];
  // return imgSrc;
};
