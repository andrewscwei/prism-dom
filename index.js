// © Andrew Wei

const async = require('async');
const chalk = require('chalk');
const { JSDOM } = require('jsdom');
const Prism = require('prismjs');
require('prismjs/components/prism-c');

const DEFAULT_CONFIG = {
  defaultLanguage: 'markup',
  lineNumbers: true,
  showLanguage: false,
};

module.exports = function(htmlString, options) {
  const window = new JSDOM(htmlString).window;
  const selectors = ['code[class*="language-"]', '[class*="language-"] code', 'code[class*="lang-"]', '[class*="lang-"] code'].join(',');
  const elements = window.document.querySelectorAll(selectors);

  options = Object.assign(DEFAULT_CONFIG, options || {});

  return new Promise((resolve, reject) => {
    async.eachSeries(elements, (element, next) => {
      const code = element.innerHTML;
      const parent = (element.parentNode instanceof window.HTMLPreElement) && element.parentNode;

      let language = element.className.match(/\b(language|lang)-(\w+)\b/)[2];

      if (!Prism.languages[language]) {
        try {
          require(`prismjs/components/prism-${language}`);
        }
        catch (err) {
          /* eslint-disable-next-line no-console */
          console.log(`${chalk.cyan('[prism-dom]')} Unrecognized language ${chalk.cyan(language)}, defaulting to ${chalk.cyan(options.defaultLanguage)}`);
          element.className = `language-${options.defaultLanguage}`;
          language = undefined;
        }
      }

      if (options.lineNumbers && parent) parent.className += ' line-numbers';

      // HACK ALERT: Until Prism plugins properly supports Node
      // environment, the easiest way is to copy and paste its code here
      // rather than trying to spoof the plugin.
      if (options.showLanguage && (typeof language === 'string')) {
        const Languages = { 'html': 'HTML', 'xml': 'XML', 'svg': 'SVG', 'mathml': 'MathML', 'css': 'CSS', 'clike': 'C-like', 'javascript': 'JavaScript', 'abap': 'ABAP', 'actionscript': 'ActionScript', 'apacheconf': 'Apache Configuration', 'apl': 'APL', 'applescript': 'AppleScript', 'asciidoc': 'AsciiDoc', 'aspnet': 'ASP.NET (C#)', 'autoit': 'AutoIt', 'autohotkey': 'AutoHotkey', 'basic': 'BASIC', 'csharp': 'C#', 'cpp': 'C++', 'coffeescript': 'CoffeeScript', 'css-extras': 'CSS Extras', 'fsharp': 'F#', 'glsl': 'GLSL', 'http': 'HTTP', 'inform7': 'Inform 7', 'json': 'JSON', 'latex': 'LaTeX', 'lolcode': 'LOLCODE', 'matlab': 'MATLAB', 'mel': 'MEL', 'nasm': 'NASM', 'nginx': 'nginx', 'nsis': 'NSIS', 'objectivec': 'Objective-C', 'ocaml': 'OCaml', 'parigp': 'PARI/GP', 'php': 'PHP', 'php-extras': 'PHP Extras', 'powershell': 'PowerShell', 'protobuf': 'Protocol Buffers', 'jsx': 'React JSX', 'rest': 'reST (reStructuredText)', 'sas': 'SAS', 'sass': 'Sass (Sass)', 'scss': 'Sass (Scss)', 'sql': 'SQL', 'typescript': 'TypeScript', 'vhdl': 'VHDL', 'vim': 'vim', 'wiki': 'Wiki markup', 'yaml': 'YAML' };
        language = parent.getAttribute('data-language') || Languages[language] || (language.substring(0, 1).toUpperCase() + language.substring(1));
        /* check if the divs already exist */
        let sib = parent.previousSibling;
        let div, div2;
        if (sib && /\s*\bprism-show-language\b\s*/.test(sib.className) &&
          sib.firstChild &&
          /\s*\bprism-show-language-label\b\s*/.test(sib.firstChild.className)) {
          div2 = sib.firstChild;
        }
        else {
          div = window.document.createElement('div');
          div2 = window.document.createElement('div');
          div2.className = 'prism-show-language-label';
          div.className = 'prism-show-language';
          div.appendChild(div2);
          parent.parentNode.insertBefore(div, parent);
        }
        div2.innerHTML = language;
      }

      Prism.highlightElement(element, true, () => {
        // HACK ALERT: Until Prism plugins properly supports Node
        // environment, the easiest way is to copy and paste its code
        // here rather than trying to spoof the plugin.
        if (options.lineNumbers && parent) {
          // Add line numbers
          let match = code.match(/\n(?!$)/g);
          let linesNum = match ? match.length + 1 : 1;
          let lineNumbersWrapper;

          let lines = new Array(linesNum + 1);
          lines = lines.join('<span></span>');

          lineNumbersWrapper = window.document.createElement('span');
          lineNumbersWrapper.className = 'line-numbers-rows';
          lineNumbersWrapper.innerHTML = lines;

          if (parent.hasAttribute('data-start')) {
            parent.style.counterReset = 'linenumber ' + (parseInt(parent.getAttribute('data-start'), 10) - 1);
          }

          element.appendChild(lineNumbersWrapper);
        }

        next();
      });
    }, () => {
      const html = '<!DOCTYPE html>\n' + window.document.documentElement.outerHTML.replace(/^(\n|\s)*/, '');
      resolve(html);
    });
  });
};
