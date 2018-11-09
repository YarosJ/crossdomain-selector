const makeScreenshot = require('./lib/makeScreenshot');
const getSelector = require('./lib/getSelector');

module.exports = { makeScreenshot, getSelector };

// const result = await getSelector('https://www.npmjs.com', [50, 120])
//  const result = await makeScreenshot('https://www.npmjs.com');
