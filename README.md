# prism-dom [![Circle CI](https://circleci.com/gh/andrewscwei/prism-dom/tree/master.svg?style=svg)](https://circleci.com/gh/andrewscwei/prism-dom/tree/master) [![npm version](https://badge.fury.io/js/prism-dom.svg)](https://badge.fury.io/js/prism-dom)

Syntax highlights an entire HTML string using [Prism.js](http://prismjs.com/).

## API

```js
/**
 * @param {String} htmlString - HTML string to process.
 * @param {Object} [options] - Additional options.
 * @param {String} [options.defaultLanguage='markup'] - Fallback language for code blocks.
 * @param {Boolean} [options.lineNumbers=true] - Specifies whether line numbers should show.
 * @param {Boolean} [options.showLanguage=false] - Specifies whether the language should show.
 * @param {Function} done - Method invoked when syntax highlighting completes. It will be 
 *                          invoked with the output HTML string as its only param.
 */
function prismDOM(htmlString, options, done)
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

prismDOM(`<some_html>`, {}, (htmlString) => {
  // The output HTML string with all code elements syntax highlighted.
  console.log(htmlString);
});
```

## Disclaimer

This is an experimental project driven by internal requirements.

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
