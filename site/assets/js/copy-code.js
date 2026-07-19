document.addEventListener("DOMContentLoaded", function () {
  // How long the copied-state feedback stays visible, in ms.
  const FEEDBACK_DURATION = 2000;

  var buttons = document.querySelectorAll(".code-block .code-copy");
  if (!buttons.length) return;

  var clipboardSupported =
    navigator.clipboard && typeof navigator.clipboard.writeText === "function";
  if (!clipboardSupported) {
    // Without the async clipboard API there is no reliable way to copy, so
    // hide the buttons rather than leave them inert.
    buttons.forEach(function (button) {
      button.hidden = true;
    });
    return;
  }

  buttons.forEach(function (button) {
    var resetTimer = null;
    // The idle label lives in the template (render-codeblock.html); capture
    // it so the reset below can't drift out of sync with the markup.
    var idleLabel = button.getAttribute("aria-label");

    function setLabel(label) {
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    }

    button.addEventListener("click", function () {
      var block = button.closest(".code-block");
      if (!block) return;

      // With Chroma line numbers enabled the block holds two <code> elements
      // (line numbers and code); the code proper is always the last one.
      var codes = block.querySelectorAll("pre code");
      var code = codes.length
        ? codes[codes.length - 1]
        : block.querySelector("pre");
      if (!code) return;

      navigator.clipboard.writeText(code.innerText).then(function () {
        button.classList.add("copied");
        setLabel("Copied");
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          button.classList.remove("copied");
          setLabel(idleLabel);
          resetTimer = null;
        }, FEEDBACK_DURATION);
      });
    });
  });
});
