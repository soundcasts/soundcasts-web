module.exports = selectionDriver;

function selectionDriver(selections$) {
  selections$.observe((node) => node ?
    selectTextInNode(node) : clearSelection()
  );
}

function clearSelection() {
  window.getSelection().removeAllRanges();
}

function selectTextInNode(node) {
  if (document.selection) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}
