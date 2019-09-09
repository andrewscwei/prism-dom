const { describe, it } = require('mocha');
const prismDOM = require('../');
const assert = require('assert');

describe('mathjax-dom', () => {
  it('can parse an HTML string', (done) => {
    const htmlString = `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <pre><code class="language-bash"># Example Bash code
          mkdir /foo
          cd /foo
          touch bar.txt
          nano bar.txt</code></pre>
        </body>
      </html>
    `;

    prismDOM(htmlString)
      .then(html => {
        assert(html.startsWith('<!DOCTYPE html>'));
        done();
      });
  });
});
