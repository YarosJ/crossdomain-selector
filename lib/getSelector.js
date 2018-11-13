const puppeteer = require("puppeteer");

module.exports = async (site, coordinates) => {
  const x = parseInt(coordinates[0]);
  const y =  parseInt(coordinates[1]);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(site);
  await page.waitFor(2000);

  const result = await page.evaluateHandle((x, y) => {
    const generateQuerySelector = function(el) {
      if (el.tagName.toLowerCase() === 'html')
        return 'HTML';
      let str = el.tagName;
      str += (el.id !== '') ? '#' + el.id : '';
      if (el.className) {
        let classes = el.className.split(/\s/);
        for (let i = 0; i < classes.length; i++) {
          str += '.' + classes[i]
        }
      }
      return generateQuerySelector(el.parentNode) + " > " + str;
    };
    return generateQuerySelector(document.elementFromPoint(x, y));
  }, x, y);

  await page.waitFor(2000);
  browser.close();

  return result._remoteObject.value;
};
