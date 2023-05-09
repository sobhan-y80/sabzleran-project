// Start Click For Copy in Table

const copyTableTextHandler = (tableElm) => {
  tableElm.addEventListener("click", (event) => {
    let elm = event.target;
    let { tagName: elmTagName, innerHTML: elmValue } = event.target;

    if (elmTagName === "TD" && !elm.classList.contains("no-copy")) {
      navigator.clipboard.writeText(elmValue);
    }
  });
};
// Finish Click For Copy in Table

export { copyTableTextHandler };
