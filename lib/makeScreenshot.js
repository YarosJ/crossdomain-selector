import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const makeScreenshot = async (site, imagePath) => {
  console.log(site);
  await puppeteer.launch({args: ['--no-sandbox', '--headless']}).then(async browser => {
    const page = await browser.newPage();
    await page.goto(site);
    await page.waitFor(2000);
    // await page.waitForNavigation();
    await page.screenshot({
      path: path.resolve(imagePath),
      fullPage: true,
    });
    await browser.close();
  });

  return fs.readFileSync(path.resolve('./public/screenshot.png'));
};

export default makeScreenshot;

//  const result = await makeScreenshot('https://www.npmjs.com');
