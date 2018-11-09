import puppeteer from "puppeteer";

const getSelector = async (site, coordinates) => {
  const x = parseInt(coordinates[0]);
  const y =  parseInt(coordinates[1]);
  console.log(site, x, y);

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

  console.log(result._remoteObject.value);

  await page.waitFor(2000);
  browser.close();

  return result;
};

export default getSelector;

// const result = await getSelector('https://www.npmjs.com', [50, 120])