document.addEventListener("DOMContentLoaded", function () {
  // Viewport width (px) at/above which footnotes render as margin sidenotes
  // rather than tap-to-open tooltips.
  const WIDE_BREAKPOINT = 1440;
  // Tooltip positioning distances, in px.
  const VIEWPORT_MARGIN = 16; // min gap kept between the tooltip and the viewport edges
  const TOOLTIP_GAP = 8; // vertical gap between the reference and the tooltip
  const TOOLTIP_OFFSET_X = 80; // horizontal shift left of the reference

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

    var elementChildren = Array.from(content.children).filter(function (child) {
      return child.nodeType === Node.ELEMENT_NODE;
    });

    if (elementChildren.length) {
      elementChildren.forEach(function (child, idx) {
        var clone = child.cloneNode(true);
        if (idx === 0) {
          clone.insertBefore(number, clone.firstChild);
        }
        sidenote.appendChild(clone);
      });
    } else {
      sidenote.appendChild(number);
    }

    var sup = ref.closest("sup") || ref.parentElement;
    if (sup && sup.parentNode) {
      sup.parentNode.insertBefore(sidenote, sup.nextSibling);
    }
  });

  postContent.classList.add("has-sidenotes");

  // Tooltip behavior for narrow viewports
  var activeTooltip = null;

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
      var ttRect = tooltip.getBoundingClientRect();

      // The tooltip width is fixed in CSS, so it never shrinks near an edge;
      // clamp the position to keep it fully inside the viewport.
      var maxLeft = Math.max(
        VIEWPORT_MARGIN,
        window.innerWidth - ttRect.width - VIEWPORT_MARGIN
      );
      tooltip.style.left =
        Math.min(Math.max(VIEWPORT_MARGIN, supRect.left - TOOLTIP_OFFSET_X), maxLeft) +
        "px";

      var top = supRect.bottom + TOOLTIP_GAP;
      if (top + ttRect.height > window.innerHeight - VIEWPORT_MARGIN) {
        top = supRect.top - ttRect.height - TOOLTIP_GAP;
      }
      tooltip.style.top = Math.max(VIEWPORT_MARGIN, top) + "px";

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
