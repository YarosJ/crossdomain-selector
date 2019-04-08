const puppeteer = require("puppeteer");

module.exports = async (site) => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--headless']});
  const page = await browser.newPage();

  await page.goto(site);
  await page.waitFor(2000);
  const screen = await page.screenshot({ fullPage: true, encoding: 'base64' });
  await browser.close();

  return screen;
};
