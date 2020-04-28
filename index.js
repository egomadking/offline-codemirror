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
  'node_modules/file-saver/dist/FileSaver.js',
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

/*
  let resources = {
  sample: `<html>
  <!-- This editor is a work in progress. Please use the version found at https://pub.afcent.af.mil/mgt/codemirror/SitePages/proof-of-concept.aspx for basic editing needs.-->
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

let scripts = {
  codemirror: {src:"/mgt/codemirror/SiteAssets/codemirror/lib/codemirror.js", filename:"codemirror.js"},
  dependents: [
    {src:"/mgt/codemirror/SiteAssets/codemirror/mode/css/css.js", filename:"css.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/mode/javascript/javascript.js", filename:"javascript.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/mode/xml/xml.js", filename:"xml.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/mode/htmlmixed/htmlmixed.js", filename:"htmlmixed.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/edit/matchbrackets.js", filename:"matchbrackets.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/edit/matchtags.js", filename:"matchtags.js"},  
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/edit/closetag.js", filename:"closetag.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/fold/xml-fold.js", filename:"xml-fold.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/fold/foldcode.js", filename:"foldcode.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/fold/foldgutter.js", filename:"foldgutter.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/search/match-highlighter.js", filename:"match-highlighter.js"},
    {src:"/mgt/codemirror/SiteAssets/codemirror/addon/selection/active-line.js", filename:"active-line.js"}
  ]
}

SP.SOD.registerSod(scripts.codemirror.filename, scripts.codemirror.src);
let sodScripts = [scripts.codemirror.filename];

scripts.dependents.forEach( script => {
  SP.SOD.registerSod(script.filename, script.src);
  SP.SOD.registerSodDep(script.filename, scripts.codemirror.filename)
  sodScripts.push(script.filename);
});

let baseEditor;

let baseOptions = {
  mode: {
    name: 'htmlmixed',
  },
  value: resources.sample,
  tabSize: 2,
  theme: 'material-darker',
  highlightSelectionMatches: true,
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  matchBrackets: true,
  matchTags: true,
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
} 

function init(){
  var main = document.getElementsByTagName('main')[0];
  baseEditor = CodeMirror(main, baseOptions);
}

SP.SOD.loadMultiple(sodScripts, init);

const activeMode = document.getElementById('active-mode');

function setMode(mode){
  if(mode === baseEditor.getOption('mode').name){
    return
  };
  switch(mode){
    case 'htmlmixed':
      activeMode.classList = "html-mode";
      activeMode.innerText = 'html';
      break;
    case 'css':
      activeMode.classList = "css-mode";
      activeMode.innerText = 'css';
      break;
    case 'javascript':
      activeMode.classList = "js-mode";
      activeMode.innerText = 'js';
      break;
    case 'markdown': //gfm is an object...
      activeMode.classList = "md-mode";
      activeMode.innerText = 'md';
      break;
  };
  baseEditor.setOption('mode', mode);
}

const uiControls = {
  openFile: function(){
  },
  saveFile(){
  },
  saveFileAs(){
  },
  clearEditor(){
    let val = confirm("Do you wish to clear out the editor? This action cannot be undone.")
    if(val){
      baseEditor.setValue('');
    };
  },
  setFontSize: function(size){
    const cm = document.getElementsByClassName("CodeMirror")[0];
    cm.style.fontSize = size;
  },
  setEditorWidth: function(w){
    const wrapper = document.getElementById('editor-wrapper');
    wrapper.style. width = w;
  },
  setTabSize(size){
    baseEditor.setOption('tabSize', size)
  }
}
*/
