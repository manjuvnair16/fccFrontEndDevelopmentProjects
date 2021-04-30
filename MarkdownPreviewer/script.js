const { useState } = React;

function MarkdownApp() {
  // Declare a new state variable, which we'll call "count"
  const [markdown, setMarkdown] = useState(`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`);


  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", { class: "heading text-center" }, "Markdown Previewer"), /*#__PURE__*/
    React.createElement("div", { id: "main" }, /*#__PURE__*/

    React.createElement("div", { class: "edit-container" }, /*#__PURE__*/
    React.createElement("div", { class: "edit-header" }, /*#__PURE__*/
    React.createElement("h5", null, "Editor")), /*#__PURE__*/

    React.createElement("textArea", { id: "editor",
      onChange: e => setMarkdown(e.target.value) }, markdown)), /*#__PURE__*/



    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { class: "preview-header" }, /*#__PURE__*/
    React.createElement("h5", null, "Previewer")), /*#__PURE__*/

    React.createElement(Previewer, { markdown: markdown })))));





}

function Previewer(props) {

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    breaks: true });


  //  let clean = DOMPurify.sanitize(dangerouslySetInnerHTML.__html);
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/

    React.createElement("div", { id: "preview",
      dangerouslySetInnerHTML: {
        __html: marked(props.markdown) } })));






}

ReactDOM.render( /*#__PURE__*/React.createElement(MarkdownApp, null),
document.getElementById("root"));