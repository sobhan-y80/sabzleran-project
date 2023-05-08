// Start Click For Copy in Table

const copyTableTextHandler = (tableElm) => {
  tableElm.addEventListener("click", (event) => {
    let elmSelected = event.target.tagName;
    let elmValue = event.target.innerHTML;

    if (elmSelected === "TD") {
      navigator.clipboard.writeText(elmValue);
    }
  });
};
// Finish Click For Copy in Table

export { copyTableTextHandler };
