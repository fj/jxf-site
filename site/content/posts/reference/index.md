---
draft: false
date: "2025-01-01T10:00:00Z"
title: "Reference: Everything"
description: "A comprehensive reference post exercising every typographic, interactive, and layout feature available on this site."
slug: "reference"
authors: ["John Feminella"]
tags: ["reference", "typography", "quotations", "images", "mathematics", "interactive", "sidenotes"]
categories: ["reference"]
series: ["Reference Posts"]
math: true
---

This post is a comprehensive reference that exercises every content feature available on this site: prose and typography, quotations and callouts, images and figures, mathematics and notation, interactive elements, and sidenotes. It serves as both a visual regression test and a living style guide.

Here is a second paragraph to demonstrate paragraph spacing. Good typography creates a comfortable reading rhythm. The space between paragraphs, the line height within them, and the measure (line length) all contribute to readability. A well-set paragraph invites the reader forward.

## Headings

Headings provide hierarchical structure. This post uses heading levels two through five. (Level one is reserved for the post title.)

### Third-level heading

Third-level headings break a section into subtopics. They are smaller than second-level headings but still prominent.

#### Fourth-level heading

Fourth-level headings are useful for fine-grained subdivision.

##### Fifth-level heading

Fifth-level headings are the deepest level typically used in prose.

## Emphasis and inline elements

You can make text **bold** or *italic* or ***both at once***. You can also ~~strike through~~ text that you want to visually retract. Inline `code` uses a monospaced font to distinguish it from surrounding prose, which is useful when referencing things like `variable_names`, `functionCalls()`, or file paths like `src/main.rs`.

You can also use <kbd>Ctrl</kbd>+<kbd>C</kbd> to represent keyboard shortcuts, and <mark>highlighted text</mark> to draw attention to a passage.

## Hyperlinks

An inline link points to [an external site](https://example.com), while a relative link points to [another page on this site](/posts/). You can also link to [a specific section on the current page](#code-blocks) using a fragment identifier, or combine the two to reach [a section on another page](/posts/reference/#callout-boxes).

A [reference-style link][ref-example] separates the URL from the prose, which can be easier to read when a paragraph has many links. Multiple links can share the same reference, so you can mention [the same destination][ref-example] more than once without repeating the URL.

Bare URLs are automatically linked: https://example.com. You can also write an autolinked email address: <user@example.com>.

[ref-example]: https://example.com "Example Domain"

## Lists

### Unordered lists

Here is an unordered list of the noble gases:

- Helium
- Neon
- Argon
- Krypton
- Xenon
- Radon
- Oganesson

### Ordered lists

Here is an ordered list of the first several prime numbers:

1. 2
2. 3
3. 5
4. 7
5. 11
6. 13

### Nested lists

Lists can be nested to represent hierarchical information:

- Programming paradigms
  - Imperative
    - Procedural (C, Fortran)
    - Object-oriented (Java, Python)
  - Declarative
    - Functional (Haskell, Lisp)
    - Logic (Prolog, Datalog)
- Data structures
  - Linear
    - Arrays
    - Linked lists
  - Nonlinear
    - Trees
    - Graphs

### Definition-style lists

Using bold terms with descriptions:

- **Idempotent**: An operation that produces the same result whether applied once or multiple times.
- **Referential transparency**: An expression that can be replaced with its value without changing the program's behavior.
- **Monotonic**: A function or sequence that is entirely non-increasing or non-decreasing.

## Code blocks

### Python

```python
def fibonacci(n: int) -> list[int]:
    """Generate the first n Fibonacci numbers."""
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-2] + sequence[-1])
    return sequence[:n]

for i, fib in enumerate(fibonacci(10)):
    print(f"F({i}) = {fib}")
```

### JavaScript

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 300);
```

### Shell

```bash
#!/usr/bin/env bash
set -euo pipefail

for file in *.md; do
  word_count=$(wc -w < "$file")
  printf "%-30s %6d words\n" "$file" "$word_count"
done
```

### Plain text

```
No syntax highlighting here.
Just monospaced text in a box,
useful for logs, output, or ASCII art.
```

## Tables

### Simple table

| Element  | Symbol | Atomic Number |
|----------|--------|---------------|
| Hydrogen | H      | 1             |
| Helium   | He     | 2             |
| Lithium  | Li     | 3             |
| Carbon   | C      | 6             |
| Nitrogen | N      | 7             |
| Oxygen   | O      | 8             |

### Aligned columns

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Row 1        |    Center 1    |         $1.00 |
| Row 2        |    Center 2    |        $12.50 |
| Row 3        |    Center 3    |       $100.00 |
| **Total**    |                |   **$113.50** |

## Horizontal rules

Horizontal rules provide a thematic break between sections of content:

---

Above and below this text are horizontal rules. They signal a shift in topic or tone without requiring a new heading.

---

## Simple blockquotes

A blockquote is used to highlight a passage of text from another source, or to set apart a significant statement:

> The purpose of computing is insight, not numbers.

Multiple paragraphs can be included in a single blockquote:

> A complex system that works is invariably found to have evolved from a simple system that worked.
>
> A complex system designed from scratch never works and cannot be patched up to make it work. You have to start over with a working simple system.

## Nested blockquotes

Blockquotes can be nested to represent a conversation or a quote within a quote:

> Someone once told me:
>
> > The best time to plant a tree was twenty years ago. The second best time is now.
>
> I think about that often.

## Blockquotes with attribution

Use the `blockquote-cite` shortcode to include an author and source:

{{< blockquote-cite author="Edsger Dijkstra" source="The Humble Programmer (1972)" >}}
The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos as effectively as possible.
{{< /blockquote-cite >}}

{{< blockquote-cite author="Grace Hopper" >}}
The most dangerous phrase in the language is, "We've always done it this way."
{{< /blockquote-cite >}}

{{< blockquote-cite author="Donald Knuth" source="The Art of Computer Programming" >}}
Premature optimization is the root of all evil (or at least most of it) in programming.
{{< /blockquote-cite >}}

{{< blockquote-cite author="Alan Kay" >}}
The best way to predict the future is to invent it.
{{< /blockquote-cite >}}

## Callout boxes

Callout boxes (also called admonitions or notices) draw attention to specific types of information. Each type has a distinct color and icon.

### Note

{{< notice note >}}
This is a **note** callout. Use it for supplementary information that adds context but is not essential to the main narrative.
{{< /notice >}}

### Tip

{{< notice tip >}}
This is a **tip** callout. Use it for actionable advice, best practices, or shortcuts that help the reader.
{{< /notice >}}

### Example

{{< notice example >}}
This is an **example** callout. Use it to provide a concrete illustration of an abstract concept.

Here is a code sample inside a callout:

```
result = compute(input)
```
{{< /notice >}}

### Question

{{< notice question >}}
This is a **question** callout. Use it to pose a question for the reader to consider, or to flag an open problem.
{{< /notice >}}

### Info

{{< notice info >}}
This is an **info** callout. Use it for factual, neutral information that the reader should be aware of.
{{< /notice >}}

### Warning

{{< notice warning >}}
This is a **warning** callout. Use it for information about potential pitfalls, deprecated features, or important caveats.
{{< /notice >}}

### Error

{{< notice error >}}
This is an **error** callout. Use it for critical information about breaking changes, dangerous operations, or known defects.
{{< /notice >}}

### Custom titles

The notice shortcode accepts an optional second argument to override the title:

{{< notice info "Sponsor" >}}
This post is brought to you by the number 42 and the letter Q. This demonstrates using a custom title on a callout box.
{{< /notice >}}

{{< notice tip "Pro tip" >}}
You can combine callouts with other Markdown elements like **bold text**, `inline code`, and [links](https://example.com).
{{< /notice >}}

## Simple image

A simple image inserted with Markdown syntax, without a caption:

![A sunset over water, rendered as abstract geometric shapes](landscape.svg)

## Figures with captions

Hugo's built-in `figure` shortcode provides semantic HTML (`<figure>` and `<figcaption>`) for images that deserve a caption.

{{< figure src="landscape.svg" alt="A sunset over water with warm gradient colors" caption="Figure 1. A landscape scene showing a sunset reflected in water." >}}

{{< figure src="portrait.svg" alt="Concentric circles above horizontal lines on a purple gradient" caption="Figure 2. A portrait-oriented abstract composition with concentric circles and horizontal rules." >}}

## Wide images

Some images are naturally wider than the text column. The panorama below uses a 4:1 aspect ratio:

{{< figure src="panorama.svg" alt="Layered mountain silhouettes under a blue sky with a sun" caption="Figure 3. A panoramic mountain range at different depths, demonstrating a wide-format image." >}}

## Multiple figures in sequence

When several figures appear together, they form a visual sequence:

{{< figure src="landscape.svg" alt="Sunset landscape" caption="Figure 4a. The same landscape scene, repeated to show sequential figure behavior." >}}

{{< figure src="portrait.svg" alt="Abstract portrait" caption="Figure 4b. The portrait composition appears at its natural narrower width." >}}

{{< figure src="panorama.svg" alt="Mountain panorama" caption="Figure 4c. The panorama stretches to fill the available width." >}}

## Inline HTML image with caption

When you need full control over the markup, you can use raw HTML since the renderer permits it:

<figure>
  <img src="landscape.svg" alt="Sunset over water" style="max-width: 60%; margin: 0 auto; display: block;">
  <figcaption><p>Figure 5. A constrained-width image centered in the column, set to 60% of the available width using an inline style.</p></figcaption>
</figure>

## Inline mathematics

Inline math is delimited by single dollar signs. For example, the quadratic formula says that if $ax^2 + bx + c = 0$, then $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. Euler's identity $e^{i\pi} + 1 = 0$ relates five fundamental constants. The Pythagorean theorem states that $a^2 + b^2 = c^2$ for a right triangle with legs $a$ and $b$ and hypotenuse $c$.

## Display mathematics

Display math is delimited by double dollar signs and renders centered on its own line.

The Gaussian integral:

$$\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}$$

The Basel problem, solved by Euler in 1734:

$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$$

Stirling's approximation for the factorial:

$$n! \approx \sqrt{2\pi n} \left(\frac{n}{e}\right)^n$$

## Equations and alignment

Aligned equations show multiple steps of a derivation. Here is the derivation of the variance of a random variable $X$:

$$\begin{aligned}
\text{Var}(X) &= E\left[(X - \mu)^2\right] \\
              &= E\left[X^2 - 2\mu X + \mu^2\right] \\
              &= E[X^2] - 2\mu E[X] + \mu^2 \\
              &= E[X^2] - 2\mu^2 + \mu^2 \\
              &= E[X^2] - \mu^2 \\
              &= E[X^2] - (E[X])^2
\end{aligned}$$

## Fractions, binomials, and combinatorics

The binomial theorem:

$$
(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^{n-k} y^k
$$

A continued fraction representation of the golden ratio:

$$
\varphi = 1 + \cfrac{1}{1 + \cfrac{1}{1 + \cfrac{1}{1 + \cdots}}}
$$

## Matrices and systems

A rotation matrix in two dimensions:

$$
R(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}
$$

A system of linear equations in augmented matrix form:

$$
\left(\begin{array}{ccc|c}
1 & 2 & -1 & 8 \\
0 & 3 & 1  & 11 \\
2 & -1 & 4 & 3
\end{array}\right)
$$

The determinant of a 3x3 matrix:

$$
\det(A) = \begin{vmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{vmatrix}
= a(ei - fh) - b(di - fg) + c(dh - eg)
$$

## Calculus

The fundamental theorem of calculus:

$$\frac{d}{dx} \int_a^x f(t) \, dt = f(x)$$

Taylor series expansion of $e^x$ around $x = 0$:

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

The Laplace transform:

$$\mathcal{L}\{f(t)\} = F(s) = \int_0^{\infty} e^{-st} f(t) \, dt$$

## Probability and statistics

Bayes' theorem:

$$P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}$$

The probability density function of the normal distribution:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)$$

The Poisson distribution for $k$ events:

$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

## Greek letters and symbols

Math notation uses many Greek letters and special symbols. Here are some common ones in context:

- The angular frequency is $\omega = 2\pi f$.
- The Dirac delta satisfies $\int_{-\infty}^{\infty} \delta(x) \, dx = 1$.
- The gradient of a scalar field: $\nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z}\right)$.
- Set notation: $A \cup B$, $A \cap B$, $A \subseteq B$, $x \in \mathbb{R}$.
- Logical notation: $p \land q$, $p \lor q$, $\neg p$, $p \implies q$, $\forall x \, \exists y$.

## Interactive sine wave

The visualization below plots a sine wave whose amplitude, frequency, and phase you can control with sliders.[^1] The wave is drawn as an SVG `<path>` element that updates in real time.

[^1]: The sine function is one of the fundamental periodic functions in mathematics. It appears in fields ranging from acoustics to quantum mechanics.

<div class="interactive-svg-container">
<figure>
  <svg id="sine-wave" viewBox="0 0 700 320" width="700" height="320" role="img" aria-label="Interactive sine wave plot with adjustable amplitude, frequency, and phase">
    <defs>
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e0e0e0" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="700" height="320" fill="#fafafa"/>
    <rect width="700" height="320" fill="url(#grid)"/>
    <line x1="0" y1="160" x2="700" y2="160" stroke="#aaa" stroke-width="1" stroke-dasharray="4,4"/>
    <text x="8" y="18" font-size="12" fill="#999" font-family="sans-serif">y</text>
    <text x="680" y="175" font-size="12" fill="#999" font-family="sans-serif">x</text>
    <path id="sine-path" d="" fill="none" stroke="#1565c0" stroke-width="2.5" stroke-linecap="round"/>
  </svg>
  <figcaption><p>An interactive sine wave: <em>y</em> = <em>A</em> sin(2&pi;<em>f</em><em>x</em> + &phi;).</p></figcaption>
</figure>

<div class="interactive-controls" role="group" aria-label="Sine wave controls">
  <div class="control-row">
    <label for="amplitude">Amplitude (<em>A</em>):</label>
    <input type="range" id="amplitude" min="10" max="140" value="80" step="1" aria-describedby="amp-val">
    <output id="amp-val">80</output>
  </div>
  <div class="control-row">
    <label for="frequency">Frequency (<em>f</em>):</label>
    <input type="range" id="frequency" min="1" max="8" value="2" step="0.1" aria-describedby="freq-val">
    <output id="freq-val">2</output>
  </div>
  <div class="control-row">
    <label for="phase">Phase shift (&phi;):</label>
    <input type="range" id="phase" min="0" max="6.28" value="0" step="0.01" aria-describedby="phase-val">
    <output id="phase-val">0</output>
  </div>
</div>
</div>

<style>
.interactive-svg-container {
  margin: 2rem 0;
}

.interactive-svg-container svg {
  display: block;
  max-width: 100%;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 0.6rem;
}

.interactive-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 0.6rem;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
}

.control-row label {
  min-width: 16rem;
  text-align: right;
}

.control-row input[type="range"] {
  flex: 1;
  max-width: 30rem;
  accent-color: #1565c0;
}

.control-row output {
  min-width: 4rem;
  text-align: right;
  font-family: monospace;
  font-size: 1.4rem;
  color: #555;
}

body.colorscheme-dark .interactive-svg-container svg {
  border-color: #444;
}

body.colorscheme-dark .interactive-svg-container svg rect:first-of-type {
  fill: #2d2d2d;
}

body.colorscheme-dark .interactive-svg-container svg line {
  stroke: #555;
}

body.colorscheme-dark .interactive-svg-container svg text {
  fill: #888;
}

body.colorscheme-dark .interactive-svg-container svg pattern path {
  stroke: #3a3a3a;
}

body.colorscheme-dark #sine-path {
  stroke: #42a5f5;
}

body.colorscheme-dark .interactive-controls {
  background: #333;
}

body.colorscheme-dark .control-row output {
  color: #aaa;
}

@media (prefers-color-scheme: dark) {
  body.colorscheme-auto .interactive-svg-container svg {
    border-color: #444;
  }
  body.colorscheme-auto .interactive-svg-container svg rect:first-of-type {
    fill: #2d2d2d;
  }
  body.colorscheme-auto .interactive-svg-container svg line {
    stroke: #555;
  }
  body.colorscheme-auto .interactive-svg-container svg text {
    fill: #888;
  }
  body.colorscheme-auto .interactive-svg-container svg pattern path {
    stroke: #3a3a3a;
  }
  body.colorscheme-auto #sine-path {
    stroke: #42a5f5;
  }
  body.colorscheme-auto .interactive-controls {
    background: #333;
  }
  body.colorscheme-auto .control-row output {
    color: #aaa;
  }
}
</style>

<script>
(function() {
  var svg = document.getElementById("sine-wave");
  if (!svg) return;

  var path = document.getElementById("sine-path");
  var ampSlider = document.getElementById("amplitude");
  var freqSlider = document.getElementById("frequency");
  var phaseSlider = document.getElementById("phase");
  var ampOut = document.getElementById("amp-val");
  var freqOut = document.getElementById("freq-val");
  var phaseOut = document.getElementById("phase-val");

  function drawWave() {
    var A = parseFloat(ampSlider.value);
    var f = parseFloat(freqSlider.value);
    var phi = parseFloat(phaseSlider.value);
    var w = 700;
    var midY = 160;
    var points = [];

    for (var x = 0; x <= w; x += 2) {
      var t = (x / w) * 2 * Math.PI * f;
      var y = midY - A * Math.sin(t + phi);
      points.push((x === 0 ? "M" : "L") + x + "," + y.toFixed(2));
    }

    path.setAttribute("d", points.join(" "));
    ampOut.textContent = A;
    freqOut.textContent = f;
    phaseOut.textContent = parseFloat(phi).toFixed(2);
  }

  ampSlider.addEventListener("input", drawWave);
  freqSlider.addEventListener("input", drawWave);
  phaseSlider.addEventListener("input", drawWave);

  drawWave();
})();
</script>

## Footnotes and sidenotes

On wide viewports (at least 1440 px), footnotes are duplicated as sidenotes in the right margin.[^2] This provides a reading experience where you can see the note's content without scrolling to the bottom of the page. On narrower viewports, clicking a footnote number opens a popup tooltip near the reference.[^3]

[^2]: The sidenote pattern is inspired by Edward Tufte's book designs, where marginal notes keep supplementary information close to the referring text.

[^3]: Tooltip behavior is progressive enhancement. If JavaScript is disabled, footnote links scroll to the traditional footnotes section at the bottom, which always remains in the HTML.

### How sidenotes work

The sidenote system is built in three layers:

1. **Markdown footnotes** are the authoring format. You write `[^N]` in the text and define the footnote content elsewhere.[^4]
2. **JavaScript** runs at page load, finds each footnote reference, and creates a corresponding `<span class="sidenote">` element positioned near the reference in the DOM.[^5]
3. **CSS** handles the responsive behavior: on wide viewports, sidenotes float into the right margin; on narrow viewports, they are hidden and replaced by tooltip popups.

[^4]: Hugo's Goldmark renderer converts the Markdown footnote syntax into semantic HTML with `role="doc-noteref"` and `role="doc-endnote"` attributes.

[^5]: The sidenote elements use `role="note"` for accessibility, so screen readers announce them appropriately.

### A passage with several footnotes

The wave equation $\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}$ describes how waves propagate through a medium.[^6] Its solutions include traveling waves of the form $u(x, t) = f(x - ct) + g(x + ct)$, where $f$ and $g$ are arbitrary functions determined by initial conditions.[^7]

[^6]: Here $c$ is the wave speed, which depends on the physical properties of the medium (tension and density for a string, bulk modulus and density for a fluid).

[^7]: This is d'Alembert's solution, published in 1747. Jean le Rond d'Alembert was a French mathematician and philosopher who also co-edited the *Encyclopedie*.

The superposition principle tells us that any linear combination of solutions is also a solution.[^8] This is why Fourier analysis is so powerful for wave problems: we can decompose a complex wave into a sum of simple sinusoidal components, analyze each one independently, and then reconstruct the full solution.[^9]

[^8]: Superposition holds because the wave equation is linear. Nonlinear wave equations, like the Korteweg--de Vries equation, exhibit more exotic behavior such as solitons.

[^9]: Joseph Fourier's original motivation was the heat equation, not the wave equation. His 1822 work *Theorie analytique de la chaleur* laid the groundwork for what we now call Fourier analysis.
