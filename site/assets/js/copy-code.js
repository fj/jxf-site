document.addEventListener("DOMContentLoaded", function () {
  // How long the copied-state feedback stays visible, in ms, before it fades
  // back to the idle state.
  const FEEDBACK_DURATION = 1200;
  // Shown in the bubble and as the accessible name while the copied state
  // lasts; the idle wording comes from the markup instead (see below).
  const COPIED_LABEL = "Copied!";

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
    var tooltip = button.querySelector(".code-copy-tooltip");
    // The idle wording lives in the template (render-codeblock.html); capture
    // it so the reset below can't drift out of sync with the markup.
    var idleLabel = button.getAttribute("aria-label");
    var idleTooltip = tooltip ? tooltip.textContent : "";

    function setLabel(label, bubbleText) {
      button.setAttribute("aria-label", label);
      if (tooltip) tooltip.textContent = bubbleText;
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
        setLabel(COPIED_LABEL, COPIED_LABEL);
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          button.classList.remove("copied");
          setLabel(idleLabel, idleTooltip);
          resetTimer = null;
        }, FEEDBACK_DURATION);
      });
    });
  });
});
