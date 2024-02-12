<img src="images/tex_logo.png" width="250" alt="Logo">

TEX is a ultra-lightweight and straightforward JavaScript library for creating rich text editors (WYSIWYG) directly in the browser. It is designed to work with both `<textarea>` and `<div>` elements.

## Key Features

- Pure JavaScript, no dependencies, written in ES6.
- Simple and intuitive user interface.
- Wide selection of predefined buttons for text formatting.
- Support for inserting HTML directly into the editor.
- Easily Customizable themes to fit your website design.
- Ultra lightweight and fast.
- Light and dark mode.

[![Live demo](/images/screenshot.jpg?raw=true "Demo")](/images/screenshot.jpg)

## Comparisons

| library       | size (min+gzip) | size (min) | jquery | bootstrap | react | link |
|---------------|-----------------|------------|--------|-----------|-------|------|
| TEX          | 1.8kB          | 4.5kB     |        |           |       | https://github.com/marcellov7/tex |
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
or
<textarea id="editor">Hello</textarea>
```

## Usage

### Initialization

To initialize TEX, use the `tex.init()` method, passing in an object with the desired settings. Here's how you can do it:

```javascript
tex.init({
    element: document.getElementById("editor1"),
    buttons: ['bold', 'italic', 'underline', 'strikethrough', 'textColor', 'heading1', 'heading2', 'paragraph', 'removeFormat', 'quote', 'olist', 'ulist', 'code', 'line', 'link', 'image', 'html'],
    onChange: (content) => {
        console.log("Editor 1:", content);
    }
});
```

### Parameters

- `element`: The HTML element (either `<textarea>` or `<div>`) to be converted into a text editor.
- `buttons`: An array of predefined buttons to be displayed in the editor toolbar.
- `defaultParagraphSeparator` : 'p', // optional, default = 'div'
- `styleWithCSS`: false | true,   // Outputs <span style="font-weight: bold;"></span> instead of <b></b> 
- `theme`: 'dark' | default (light),
- `onChange`: A callback function to be executed when the content of the editor changes.

For a complete list of available actions/buttons and their configurations, refer to the Tex.js documentation.

### List of buttons

- bold
- italic
- underline
- strikethrough
- removeFormat
- heading1
- heading2
- paragraph
- textColor
- quote
- olist
- ulist
- code
- line
- link
- image
- html

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