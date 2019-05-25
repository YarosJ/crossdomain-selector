/* eslint-disable no-underscore-dangle */
/* global window, document */

const puppeteer = require('puppeteer');

/**
 * Go to the site and retrieves the query selector
 * @param site
 * @param coordinates
 * @param docker
 * @returns {Promise<*>}
 */

module.exports = async ({ site, coordinates, docker }) => {
  const x = parseInt(coordinates[0], 10);
  const y = parseInt(coordinates[1], 10);
  let browser;

  if (docker) {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      headless: true,
      args: ['--no-sandbox'],
    });
  } else browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.goto(site);
  await page.waitFor(2000);

  // eslint-disable-next-line no-shadow
  const result = await page.evaluateHandle((x, y) => {
    /**
     * Retrieves the query selector path of element
     * @param el
     * @returns {string}
     */

    const generateQuerySelector = (el) => {
      let str = el.tagName.toLowerCase();

      if (str === 'html') { return 'html'; }

      str += (el.id !== '') ? `#${el.id}` : '';

      if (el.className) {
        const classes = el.className.split(/\s/);
        for (let i = 0; i < classes.length; i += 1) {
          str += `.${classes[i]}`;
        }
      }

      return `${generateQuerySelector(el.parentNode)} > ${str}`;
    };

    const { innerWidth, innerHeight } = window;
    const xScroll = x > innerWidth;
    const yScroll = y > innerHeight;

    if (xScroll) window.scrollBy(x - innerWidth, 0);
    if (yScroll) window.scrollBy(0, y - innerHeight);

    return generateQuerySelector(document
        .elementFromPoint(xScroll ? innerWidth - 1 : x, yScroll ? innerHeight - 1 : y));
  }, x, y);

  await page.waitFor(2000);
  browser.close();

  return result._remoteObject.value;
};
