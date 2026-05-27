document.addEventListener("DOMContentLoaded", function () {
  var footnotesSection = document.querySelector(
    '.footnotes, [role="doc-endnotes"]'
  );
  if (!footnotesSection) return;

  var postContent = document.querySelector(".post-content");
  if (!postContent) return;

  var refs = postContent.querySelectorAll(
    'a.footnote-ref, a[role="doc-noteref"]'
  );
  if (!refs.length) return;

  refs.forEach(function (ref, i) {
    var href = ref.getAttribute("href");
    if (!href) return;
    var footnoteId = href.replace("#", "");
    var footnoteEl = document.getElementById(footnoteId);
    if (!footnoteEl) return;

    var content = footnoteEl.cloneNode(true);
    var backrefs = content.querySelectorAll(
      '.footnote-backref, [role="doc-backlink"]'
    );
    backrefs.forEach(function (br) {
      br.remove();
    });

    var sidenote = document.createElement("span");
    sidenote.className = "sidenote";
    sidenote.setAttribute("role", "note");
    sidenote.setAttribute("aria-label", "Sidenote " + (i + 1));

    var number = document.createElement("span");
    number.className = "sidenote-number";
    number.textContent = (i + 1) + ".";
    sidenote.appendChild(number);
    sidenote.append(" ");

    Array.from(content.children).forEach(function (child) {
      var clone = child.cloneNode(true);
      if (clone.nodeType === 1) {
        sidenote.appendChild(clone);
      }
    });

    var sup = ref.closest("sup") || ref.parentElement;
    if (sup && sup.parentNode) {
      sup.parentNode.insertBefore(sidenote, sup.nextSibling);
    }
  });

  postContent.classList.add("has-sidenotes");

  // Tooltip behavior for narrow viewports
  var activeTooltip = null;
  var WIDE_BREAKPOINT = 1440;

  function isNarrow() {
    return window.innerWidth < WIDE_BREAKPOINT;
  }

  function closeTooltip() {
    if (activeTooltip) {
      activeTooltip.remove();
      activeTooltip = null;
    }
  }

  refs.forEach(function (ref) {
    ref.addEventListener("click", function (e) {
      if (!isNarrow()) return;

      e.preventDefault();
      closeTooltip();

      var href = ref.getAttribute("href");
      if (!href) return;
      var footnoteId = href.replace("#", "");
      var footnoteEl = document.getElementById(footnoteId);
      if (!footnoteEl) return;

      var content = footnoteEl.cloneNode(true);
      var backrefs = content.querySelectorAll(
        '.footnote-backref, [role="doc-backlink"]'
      );
      backrefs.forEach(function (br) {
        br.remove();
      });

      var tooltip = document.createElement("div");
      tooltip.className = "footnote-tooltip";
      tooltip.setAttribute("role", "tooltip");

      var closeBtn = document.createElement("button");
      closeBtn.className = "footnote-tooltip-close";
      closeBtn.setAttribute("aria-label", "Close footnote");
      closeBtn.textContent = "×";
      closeBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        closeTooltip();
      });
      tooltip.appendChild(closeBtn);

      Array.from(content.children).forEach(function (child) {
        tooltip.appendChild(child.cloneNode(true));
      });

      document.body.appendChild(tooltip);

      var sup = ref.closest("sup") || ref.parentElement;
      var supRect = sup.getBoundingClientRect();

      tooltip.style.top = supRect.bottom + 8 + "px";
      tooltip.style.left = Math.max(16, supRect.left - 80) + "px";

      requestAnimationFrame(function () {
        var ttRect = tooltip.getBoundingClientRect();
        if (ttRect.right > window.innerWidth - 16) {
          tooltip.style.left =
            window.innerWidth - ttRect.width - 16 + "px";
        }
        if (ttRect.bottom > window.innerHeight - 16) {
          tooltip.style.top = supRect.top - ttRect.height - 8 + "px";
        }
      });

      activeTooltip = tooltip;
    });
  });

  document.addEventListener("click", function (e) {
    if (
      activeTooltip &&
      !activeTooltip.contains(e.target) &&
      !e.target.closest("sup")
    ) {
      closeTooltip();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeTooltip();
  });
});
