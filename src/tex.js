(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.tex = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
var formatBlock = 'formatBlock';
var addEventListener = function addEventListener(parent, type, listener) {
return parent.addEventListener(type, listener);
};
var appendChild = function appendChild(parent, child) {
return parent.appendChild(child);
};
var createElement = function createElement(tag) {
return document.createElement(tag);
};
var queryCommandState = function queryCommandState(command) {
return document.queryCommandState(command);
};
var queryCommandValue = function queryCommandValue(command) {
return document.queryCommandValue(command);
};

var exec = function exec(command) {
var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
return document.execCommand(command, false, value);
};

var defaultActions = {
fontSize: {
  icon: '🗚',
  title: 'Font Size',
  result: (content, button) => {
    const fontSizeSelectId = 'fontSizeSelect';
    let fontSizeSelect = document.getElementById(fontSizeSelectId);

    if (!fontSizeSelect) {
      fontSizeSelect = document.createElement('select');
      fontSizeSelect.id = fontSizeSelectId;
      const fontSizes = [3, 4, 5, 6, 7];
      fontSizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        fontSizeSelect.appendChild(option);
      });
      button.parentNode.insertBefore(fontSizeSelect, button.nextSibling);
      fontSizeSelect.addEventListener('change', () => {
        const fontSize = fontSizeSelect.value;
        exec('fontSize', fontSize + 'px');
      });
    } else {
      fontSizeSelect.parentNode.removeChild(fontSizeSelect);
    }
  }
},
bold: {
  icon: '<b>B</b>',
  title: 'Bold',
  state: () => queryCommandState('bold'),
  result: () => exec('bold')
},
italic: {
  icon: '<i>I</i>',
  title: 'Italic',
  state: () => queryCommandState('italic'),
  result: () => exec('italic')
},
underline: {
  icon: '<u>U</u>',
  title: 'Underline',
  state: () => queryCommandState('underline'),
  result: () => exec('underline')
},
removeFormat: {
  icon: '⌫',
  title: 'Remove Format',
  result: () => exec('removeFormat')
},
strikethrough: {
  icon: '<strike>S</strike>',
  title: 'Strike-through',
  state: () => queryCommandState('strikeThrough'),
  result: () => exec('strikeThrough')
},
heading1: {
  icon: '<b>H<sub>1</sub></b>',
  title: 'Heading 1',
  result: () => exec(formatBlock, '<h1>')
},
heading2: {
  icon: '<b>H<sub>2</sub></b>',
  title: 'Heading 2',
  result: () => exec(formatBlock, '<h2>')
},
paragraph: {
  icon: '&#182;',
  title: 'Paragraph',
  result: () => exec(formatBlock, '<p>')
},
quote: {
  icon: '&#8220; &#8221;',
  title: 'Quote',
  result: () => exec(formatBlock, '<blockquote>')
},
olist: {
  icon: '&#35;',
  title: 'Ordered List',
  result: () => exec('insertOrderedList')
},
ulist: {
  icon: '&#8226;',
  title: 'Unordered List',
  result: () => exec('insertUnorderedList')
},
code: {
  icon: '&lt;/&gt;',
  title: 'Code',
  result: () => exec(formatBlock, '<pre>')
},
line: {
  icon: '&#8213;',
  title: 'Horizontal Line',
  result: () => exec('insertHorizontalRule')
},
link: {
  icon: '&#128279;',
  title: 'Link',
  result: () => {
    const url = window.prompt('Enter the link URL');
    if (url) exec('createLink', url);
  }
},
image: {
  icon: 'Img',
  title: 'Image',
  result: () => {
    const url = window.prompt('Enter the image URL');
    if (url) exec('insertImage', url);
  }
},
html: {
  icon: 'HTML',
  title: 'Html',
  result: element => {
    const parentElement = element.parentNode;
    const htmlContentElement = parentElement.querySelector('.htmlContent'); 
    const elementContentElement = parentElement.querySelector('.tex-content'); 

    if (htmlContentElement) {
      if (htmlContentElement.style.display === 'none') {
        htmlContentElement.style.display = 'block';
        elementContentElement.style.display = 'none';
      } else {
        htmlContentElement.style.display = 'none';
        elementContentElement.style.display = 'block';
      }
    }
  }
},
textColor: {
  icon: '<span>A</span>',
  title: 'Text Color',
  result: (content, button) => {
    const textColorInputId = 'textColorInput';
    let textColorInput = document.getElementById(textColorInputId);
    if (!textColorInput) {
      textColorInput = document.createElement('input');
      textColorInput.id = textColorInputId;
      textColorInput.type = 'color';
      textColorInput.addEventListener('input', () => {
        exec('foreColor', textColorInput.value);
        button.style.color = textColorInput.value;
      });
      button.parentNode.insertBefore(textColorInput, button.nextSibling);
    } else {
      textColorInput.parentNode.removeChild(textColorInput);
    }
  }
},
textBackColor: {
  icon: '<span style="padding:3px; background:lightgray;">A</span>',
  title: 'Text Color',
  result: (content, button) => {
    const textColorInputId = 'textColorInput';
    let textColorInput = document.getElementById(textColorInputId);
    if (!textColorInput) {
      textColorInput = document.createElement('input');
      textColorInput.id = textColorInputId;
      textColorInput.type = 'color';
      textColorInput.addEventListener('input', () => {
        exec('backColor', textColorInput.value);
        button.querySelector('span').style.background = textColorInput.value;
      });
      button.parentNode.insertBefore(textColorInput, button.nextSibling);
    } else {
      textColorInput.parentNode.removeChild(textColorInput);
    }
  }
},
indent: {
  icon: '&rsaquo;',
  title: 'Indent',
  result: () => exec('indent')
},
outdent: {
  icon: '&lsaquo;',
  title: 'Outdent',
  result: () => exec('outdent')
},
undo: {
  icon: '↶',
  title: 'Undo',
  result: () => exec('undo')
},
redo: {
  icon: '↷',
  title: 'Redo',
  result: () => exec('redo')
},
justifyCenter: {
  icon: '⇥⇤',
  title: 'Justify Center',
  result: () => exec('justifyCenter')
},
justifyFull: {
  icon: '⇤⇥',
  title: 'Justify Full',
  result: () => exec('justifyFull')
},
justifyLeft: {
  icon: '⇤',
  title: 'Justify Left',
  result: () => exec('justifyLeft')
},
justifyRight: {
  icon: '⇥',
  title: 'Justify Right',
  result: () => exec('justifyRight')
}
};

var defaultClasses = {
actionbar: 'tex-actionbar',
button: 'tex-button',
content: 'tex-content tex-editor',
selected: 'tex-button-selected'
};

var destroy = el => {
var element = document.querySelector(`[tex-id="${el.id}"]`);
var elementBase = document.getElementById(el.id);
var content = element.querySelector('.tex-content');
var actionbar = element.querySelector('.tex-actionbar');
if (element) {
  var contentClone = content.cloneNode(true);
  content.parentNode.replaceChild(contentClone, content);

  var actionbarClone = actionbar.cloneNode(true);
  actionbar.parentNode.replaceChild(actionbarClone, actionbar);

  actionbarClone.remove();

  if (elementBase.tagName.toLowerCase() === 'textarea') {
    elementBase.style.display = 'block';
    element.remove();
  } else { 
    element.innerHTML = contentClone.innerHTML;
    element.removeAttribute("tex-id");
    element.classList.remove("theme-light", "theme-dark", "tex-container");
  }
}
};

var getContent = el => {
const element = document.querySelector(`[tex-id="${el.id}"]`);
const content = element.querySelector('.tex-content');
return content.innerHTML;
};

var init = settings => {
  var theme = settings.theme || 'light';
  var classes = { ...defaultClasses, ...settings.classes };
  var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';
  var editorContainer = createElement('div');
  editorContainer.className = 'tex-container';
  editorContainer.classList.add(`theme-${theme}`);
  editorContainer.setAttribute("tex-id", settings.element.id);
  var actionbar = createElement('div');
  actionbar.className = classes.actionbar;
  appendChild(editorContainer, actionbar);

  var content = settings.element.content = createElement('div');
content.contentEditable = true;
content.className = classes.content;

if (settings.element.tagName.toLowerCase() === 'textarea') {
  content.innerHTML = settings.element.value;
} else {
  content.innerHTML = settings.element.innerHTML;
}

content.onkeydown = event => {
  if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
    setTimeout(() => exec(formatBlock, `<${defaultParagraphSeparator}>`), 0);
  }
};
appendChild(editorContainer, content);
appendChild(settings.element.parentNode, editorContainer);

let actions = [];
if (settings.buttons) {
  actions = settings.buttons.map(buttonKey => {
      var defaultAction = defaultActions[buttonKey];
    if (defaultAction) {
      return { icon: defaultAction.icon, title: defaultAction.title, key: buttonKey, result: defaultAction.result };
    }
  }).filter(action => action !== undefined);
} else if (settings.actions) {
  actions = settings.actions.map(action => {
    if (typeof action === 'string') return defaultActions[action];
    else if (action.name === 'custom') return { icon: action.icon, title: action.title, result: action.result };
    else if (defaultActions[action.name]) return { ...defaultActions[action.name], ...action };
    return action;
  });
}

actions.forEach(action => {
  var button = createElement('button');
  button.className = classes.button;
  button.innerHTML = action.icon;
  button.title = action.title;
  button.setAttribute('type', 'button');
  button.onclick = () => action.result(content, button) && content.focus();

  if (action.state) {
    var handler = () => button.classList[action.state() ? 'add' : 'remove'](classes.selected);
    addEventListener(content, 'keyup', handler);
    addEventListener(content, 'mouseup', handler);
    addEventListener(button, 'click', handler);
  }

  appendChild(actionbar, button);
});

if (settings.styleWithCSS) exec('styleWithCSS');
exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

if (settings.element.tagName.toLowerCase() === 'textarea') {
  settings.element.style.display = 'none';
} else {
  document.getElementById(settings.element.id).remove();
  editorContainer.id = settings.element.id;
}

var htmlContent = createElement('textarea');
htmlContent.setAttribute('class', 'htmlContent');
appendChild(editorContainer, htmlContent);

htmlContent.value = content.innerHTML;
htmlContent.style.display = 'none';

content.oninput = ({ target: { firstChild } }) => {
  if (firstChild && firstChild.nodeType === 3) exec(formatBlock, `<${defaultParagraphSeparator}>`);
  else if (content.innerHTML === '<br>') content.innerHTML = '';

  settings.onChange(content.innerHTML);

  if (settings.element.tagName.toLowerCase() === 'textarea') {
    settings.element.value = content.innerHTML;
  }
  
  htmlContent.value = content.innerHTML;
};

htmlContent.oninput = ({ target: { firstChild } }) => {
  content.innerHTML = htmlContent.value;
  settings.element.value = content.innerHTML;
};

return settings.element;
};

var tex = { exec: exec, init: init, destroy: destroy, getContent: getContent};

exports.exec = exec;
exports.init = init;
exports.destroy = destroy;
exports.getContent = getContent;
exports['default'] = tex;

Object.defineProperty(exports, '__esModule', { value: true });

})));