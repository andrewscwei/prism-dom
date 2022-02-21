# Prism DOM ![](https://img.shields.io/maintenance/no/2019) [![npm](https://img.shields.io/npm/v/prism-dom.svg)](https://www.npmjs.com/package/prism-dom) [![CI](https://github.com/andrewscwei/prism-dom/workflows/CI/badge.svg)](https://github.com/andrewscwei/prism-dom/actions?query=workflow%3ACI) [![CD](https://github.com/andrewscwei/prism-dom/workflows/CD/badge.svg)](https://github.com/andrewscwei/prism-dom/actions?query=workflow%3ACD)

Syntax highlights an entire HTML string using [Prism.js](http://prismjs.com/).

## API

```js
/**
 * Parses an HTML string and syntax highlights all code blocks using Prism.js.
 *
 * @param {String} htmlString - HTML string to process.
 * @param {Object} [options] - Additional options.
 * @param {String} [options.defaultLanguage='markup'] - Fallback language for
 *                                                      code blocks.
 * @param {Boolean} [options.lineNumbers=true] - Specifies whether line numbers
 *                                               should show.
 * @param {Boolean} [options.showLanguage=false] - Specifies whether the
 *                                                 language label should show.
 *
 * @return {Promise<String>} - Promise with the output HTML as the fulfillment
 *                             value.
 */
function prismDOM(htmlString, options)
```

## Usage

```sh
$ npm install prism-dom
```

This module crawls the HTML string for two elements:
1. `<code>` elements with `class` set to `language-<programming_language>`, i.e. `<code class='language-javascript'>`. You can also use `lang-` for short in place of `language`.
2. `<code>` elements whose direct parent element has its `class` set to `language-<programming_language>`, i.e. `<code class='language-javascript'>`. You can also use `lang-` for short in place of `language`.

For a list of supported languages or CSS themes, refer to [Prism.js](http://prismjs.com/).

Example:

```js
const prismDOM = require('prism-dom');

prismDOM(`<some_html>`, {}).then(htmlString => {
  // The output HTML string with all code elements syntax highlighted.
  console.log(htmlString);
});
```

## Disclaimer

This is an experimental project driven by internal requirements.
