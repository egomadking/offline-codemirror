//TODO: emmet: HTML, JS, CSS
//TODO: autocomplete(maybe)
//TODO: search (better than brower's search?)
//TODO: open from filesystem
//TODO: open from site
//TODO: saving to filesystem
//TODO: saving to site
//TODO: flexible height
//TODO: key bindings (which?)
//TODO: flexible width, wrapping
//TODO: multi-editor option
//TODO: linting - lots of otions
//TODO: chose mode (JS, CSS, HTML, MixedHTML)
//TODO: spawn side-by-side editors
//TODO: map tabs to spaces

let resources = {
  sample: `<html>
    <head>
      <style>
      div{
        color: red;
        background-color: perriwinkle;
      }
      </style>
    </head>
    <body>
      <div>
        <p>This some stuffAdipisicing consectetur cupidatat quis tempor sunt labore dolor irure nisi. Tempor irure ipsum do occaecat consequat est elit fugiat duis. Ea occaecat ipsum eu ut in exercitation minim cillum amet. Aliqua mollit veniam mollit ipsum cupidatat do commodo voluptate ut.</p>
        <p>Exercitation duis commodo anim proident sunt id excepteur nulla excepteur ullamco deserunt velit anim ipsum. Irure dolor elit esse sit fugiat eiusmod quis id qui velit officia reprehenderit deserunt. Magna amet sit ea Lorem deserunt nostrud eiusmod.</p>
      </div>
      <script>
        var taco="yummy taco";
        function rateTaco(){
          console.log(taco);
        }
        rateTaco();
      </script>
    </body>
  </html>`,
};

require([
  'node_modules/codemirror/lib/codemirror',
  'node_modules/codemirror/mode/htmlmixed/htmlmixed',
  //edit
  'node_modules/codemirror/addon/edit/matchbrackets.js',
  'node_modules/codemirror/addon/edit/matchtags.js',
  'node_modules/codemirror/addon/edit/closetag.js',
  //fold
  'node_modules/codemirror/addon/fold/xml-fold.js',
  'node_modules/codemirror/addon/fold/foldgutter.js',
  //search
  'node_modules/codemirror/addon/search/match-highlighter.js',
  //selection
  'node_modules/codemirror/addon/selection/active-line.js',
  //external addons
  'node_modules/@emmetio/codemirror-plugin/dist/browser.js',
], function (CodeMirror) {
  var main = document.getElementsByTagName('main')[0];
  myCodeMirror = CodeMirror(main, {
    mode: {
      name: 'htmlmixed',
    },
    extraKeys: {
      Tab: 'emmetExpandAbbreviation',
      Esc: 'emmetResetAbbreviation',
      Enter: 'emmetInsertLineBreak',
    },
    value: resources.sample,
    tabSize: 2,
    theme: 'material-darker',
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    matchTags: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    highlightSelectionMatches: true,
    styleActiveLine: true,
    emmet: {
      mark: true,
      markTagPairs: true,
      previewOpenTag: true,
    },
  });
});
