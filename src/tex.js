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
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    state: function state() {
      return queryCommandState('bold');
    },
    result: function result() {
      return exec('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    state: function state() {
      return queryCommandState('italic');
    },
    result: function result() {
      return exec('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    state: function state() {
      return queryCommandState('underline');
    },
    result: function result() {
      return exec('underline');
    }
  },
  removeFormat: {
    icon: '⌫',
    title: 'Remove Format',
    result: function result() {
      return exec('removeFormat');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    state: function state() {
      return queryCommandState('strikeThrough');
    },
    result: function result() {
      return exec('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: function result() {
      return exec(formatBlock, '<h1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: function result() {
      return exec(formatBlock, '<h2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: function result() {
      return exec(formatBlock, '<p>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: function result() {
      return exec(formatBlock, '<blockquote>');
    }
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: function result() {
      return exec('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: function result() {
      return exec('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: function result() {
      return exec(formatBlock, '<pre>');
    }
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: function result() {
      return exec('insertHorizontalRule');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: function result() {
      var url = window.prompt('Enter the link URL');
      if (url) exec('createLink', url);
    }
  },
  image: {
    icon: '🖼️',
    title: 'Image',
    result: function result() {
      var url = window.prompt('Enter the image URL');
      if (url) exec('insertImage', url);
    }
  },
  html: {
    icon: 'HTML',
    title: 'Html',
    result: function result(element) {
        var parentElement = element.parentNode;
        var htmlContentElement = parentElement.querySelector('.htmlContent'); 
        var elementContentElement = parentElement.querySelector('.tex-content'); 

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
    icon: '🎨',
    title: 'Text Color',
    result: function result() {
      var colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.addEventListener('input', function() {
        exec('foreColor', colorInput.value);
      });
      colorInput.click();
    }
  }
};

var defaultClasses = {
  actionbar: 'tex-actionbar',
  button: 'tex-button',
  content: 'tex-content tex-editor',
  selected: 'tex-button-selected'
};

var init = function init(settings) {
    var theme = settings.theme || 'light';
    var classes = _extends({}, defaultClasses, settings.classes);
    var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';
    var editorContainer = createElement('div');
    editorContainer.className = 'tex-container';
    editorContainer.classList.add('theme-' + theme);
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
  
    content.onkeydown = function (event) {
      if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
        setTimeout(function () {
          return exec(formatBlock, '<' + defaultParagraphSeparator + '>');
        }, 0);
      }
    };
    appendChild(editorContainer, content);
    appendChild(settings.element.parentNode, editorContainer);
  
    var actions = [];
    if (settings.buttons) {
      actions = settings.buttons.map(function (buttonKey) {
        var defaultAction = defaultActions[buttonKey];
        if (defaultAction) {
          return { icon: defaultAction.icon, title: defaultAction.title, key: buttonKey, result: defaultAction.result };
        }
      }).filter(function (action) { return action !== undefined; });
    } else if (settings.actions) {
      actions = settings.actions.map(function (action) {
        if (typeof action === 'string') return defaultActions[action];
        else if (action.name === 'custom') return { icon: action.icon, title: action.title, result: action.result };
        else if (defaultActions[action.name]) return _extends({}, defaultActions[action.name], action);
        return action;
      });
    }
  
    actions.forEach(function (action) {
      var button = createElement('button');
      button.className = classes.button;
      button.innerHTML = action.icon;
      button.title = action.title;
      button.setAttribute('type', 'button');
      button.onclick = function () {
        action.result(content);
        return content.focus();
      };
  
      if (action.state) {
        var handler = function handler() {
          return button.classList[action.state() ? 'add' : 'remove'](classes.selected);
        };
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
  
    content.oninput = function (_ref) {
      var firstChild = _ref.target.firstChild;
  
      if (firstChild && firstChild.nodeType === 3) exec(formatBlock, '<' + defaultParagraphSeparator + '>');
      else if (content.innerHTML === '<br>') content.innerHTML = '';
  
      if (settings.element.tagName.toLowerCase() === 'textarea') {
        settings.element.value = content.innerHTML;
      }
      htmlContent.value = content.innerHTML;
    };
  
    htmlContent.oninput = function (_ref) {
      content.innerHTML = htmlContent.value;
      settings.element.value = content.innerHTML;
    };
  
    return settings.element;
  };

var tex = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = tex;

Object.defineProperty(exports, '__esModule', { value: true });

})));