<img src="images/tex_logo.png" width="250" alt="Logo">

TEX is a ultra-lightweight and straightforward JavaScript library for creating rich text editors (WYSIWYG) directly in the browser. It is designed to work with both `<textarea>` and `<div>` elements.

> Live demo: [https://codepen.io/marcellov7/pen/BabGydp](https://codepen.io/marcellov7/pen/BabGydp)

## Key Features

- Pure JavaScript, no dependencies, written in ES6.
- Simple and intuitive user interface.
- Wide selection of predefined buttons for text formatting.
- Support for inserting HTML directly into the editor.
- Support for plugins.
- Easily Customizable themes to fit your website design.
- Ultra lightweight and fast.
- Light and dark mode.

[![Live demo](/images/screenshot.jpg?raw=true "Demo")](/images/screenshot.jpg)

## Comparisons

| library       | size (min+gzip) | size (min) | jquery | bootstrap | react | link |
|---------------|-----------------|------------|--------|-----------|-------|------|
| TEX          | 2.3kB          | 6.3kB     |        |           |       | https://github.com/marcellov7/tex |
| quill         | 43kB            | 205kB      |        |           |       | https://github.com/quilljs/quill |
| trix          | 47kB            | 204kB      |        |           |       | https://github.com/basecamp/trix |
| ckeditor      | 163kB           | 551kB      |        |           |       | https://ckeditor.com |
| trumbowyg     | 8kB             | 23kB       | x      |           |       | https://github.com/Alex-D/Trumbowyg |
| summernote    | 26kB            | 93kB       | x      | x         |       | https://github.com/summernote/summernote |
| froala        | 52kB            | 186kB      | x      |           |       | https://github.com/froala/wysiwyg-editor |
| tinymce       | 157kB           | 491kB      | x      |           |       | https://github.com/tinymce/tinymce |

## How to Use TEX

To use TEX in your project, follow these simple steps:

1. Link TEX to your HTML:
```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/marcellov7/tex@main/src/tex.min.css">
<script src="https://cdn.jsdelivr.net/gh/marcellov7/tex@main/src/tex.min.js"></script>
```

3. Add HTML elements where you want to display the text editors:

```html
<div id="editor">Hello</div>
<!--or-->
<textarea id="editor">Hello</textarea>
```

## Usage

### Initialization

To initialize TEX, use the `tex.init()` method, passing in an object with the desired settings. Here's how you can do it:

```javascript 
const tex = window.tex;

tex.init({
    element: document.getElementById("editor"),
    buttons: ['bold', 'italic', 'underline', 'textColor', 'heading1', 'heading2', 'paragraph', 'removeFormat', 'olist', 'ulist', 'code', 'line', 'link', 'image', 'html'],
    onChange: (content) => {
        console.log("Editor :", content);
    }
});
```

### API
```javascript 
// ES6
import tex from 'tex'
// or
import { exec, init, destroy, getContent } from 'tex'
```

### Parameters

- `element`: The HTML element (either `<textarea>` or `<div>`) to be converted into a text editor.
- `buttons`: An array of buttons to be displayed in the editor toolbar.
- `plugins`: An array of plugins.
- `paragraphSeparator` : 'p', // optional, default = 'div'
- `cssStyle`: false | true,   // Outputs <span style="font-weight: bold;"></span> instead of <b></b> 
- `theme`: 'dark' | default (light),
- `onChange`: A callback function to be executed when the content of the editor changes.

### Get Content
```javascript
tex.getContent(document.getElementById("editor"));
```

### Exec
```javascript
// Execute a document command.
// Reference: https://developer.mozilla.org/en/docs/Web/API/Document/execCommand
tex.exec(command<string>, value<string>)
```

### Destroy
```javascript
tex.destroy(document.getElementById("editor"));
```

### List of predefined buttons

- fontSize
- bold
- italic
- underline
- strikethrough
- heading1
- heading2
- paragraph
- removeFormat
- quote
- olist
- ulist
- code
- line
- link
- image
- html
- textColor
- textBackColor
- indent
- outdent
- undo
- redo
- justifyCenter
- justifyFull
- justifyLeft
- justifyRight

## Plugins
```js
var pluginImageUpload = {
    name: 'pluginImageUpload',
    icon: '-↑-',
    title: 'Image Upload',
    result: function(res) {
        //Example function to display an input and upload the image.
    }
};
```

Initialise the button in the position you want and the plugin, like this:
```js
 tex.init({
    element: document.getElementById("editor"),
    buttons: ['pluginImageUpload', 'bold', 'fontSize', 'bold', 'italic'],
    plugins: [pluginImageUpload],
    onChange: () => {
    }
});
```

## Styles
For example:
If you want to change the height of the editor after the DOM has been initialized, you can do so by targeting the ".tex-content" class and adjusting the height property in your CSS file.

```css
.tex-content {
    height: 400px;
}
```

## Contributing

If you'd like to contribute to TEX, follow these steps:

1. Fork this repository.
2. Create a new branch for your changes: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push your branch: `git push origin feature/new-feature`.
5. Submit a pull request for your changes.

## License

TEX is released under the [MIT License](LICENSE).
