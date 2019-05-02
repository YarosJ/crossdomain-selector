# README

This package allows you to get an element selector from another site using the screenshot, which is not possible with a cross-domain iframe due to browser security restrictions.

## Usage

Import package:

    import { makeScreenshot, getSelector } from 'crossdomain-selector';

Make screenshot:

    const base64Screenshot = await makeScreenshot('https://www.npmjs.com');

Then you can display this screenshot on the client and get click coordinates on an screenshot with something like this:

    recivedBase64Image = '[You should receive it from server]'
    <img src={`data:image/jpeg;base64,${recivedBase64Image}`} alt="Error" onClick={ e => {
      const coordinates = { x: e.pageX, y: e.pageY };
      // Send on server coordinates
    }}/>

Now you can get a selector on the received coordinates on the server:

    const coordinates = [50, 120]; // Received from the client
    const selector = await getSelector('https://www.npmjs.com', coordinates);

## Docker

If you use Docker you need to pass true to the methods:

    makeScreenshot('https://www.npmjs.com', true);
    getSelector('https://www.npmjs.com', coordinates, true);

Important! [You should read this to make proper dockerfile] (https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-on-alpine)

## License

MIT License. Copyright 2018 Yaroslaw Zhuk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
