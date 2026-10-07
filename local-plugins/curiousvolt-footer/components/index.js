import { h } from "preact"

const css = `
.cv-footer {
  width: 100%;
  box-sizing: border-box;
  padding: 28px 20px 32px;
  color: var(--gray);
  text-align: center;
  font-family: "Inter", "Lexend", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: .78rem;
  font-weight: 500;
  letter-spacing: .01em;
  line-height: 1.5;
}

.cv-footer p {
  margin: 0;
}

.cv-footer a {
  color: var(--darkgray);
  font-weight: 600;
  text-decoration: none;
  transition: color .2s ease;
}

.cv-footer a:hover,
.cv-footer a:focus-visible {
  color: var(--secondary);
}

.cv-footer-separator {
  display: inline-block;
  margin: 0 .45rem;
  color: var(--gray);
  font-weight: 700;
  opacity: .9;
}

@media all and (max-width:800px){
  .cv-footer {
    padding: 24px 16px 28px;
  }
}

/* Canvas uses its own frame, so the footer is injected inside that frame. */
.page[data-frame="canvas"] .cv-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 25;
  padding: 8px 16px;
  border-top: 0;
  pointer-events: none;
  background: transparent;
}

.page[data-frame="canvas"] .cv-footer a {
  pointer-events: auto;
}

@media all and (max-width:800px){
  .page[data-frame="canvas"] .cv-footer {
    bottom: 8px;
    padding: 6px 12px;
  }
}
`

const renderFooter = () => {
  const year = new Date().getFullYear()

  return h(
    "footer",
    { class: "cv-footer" },
    h(
      "p",
      null,
      h("span", null, `© ${year} `),
      h(
        "a",
        {
          href: "https://curiousvolt.is-a.dev",
          rel: "me",
        },
        "CuriousVolt",
      ),
      h("span", { class: "cv-footer-separator", "aria-hidden": "true" }, "·"),
      h(
        "a",
        {
          href: "https://curiousvolt.is-a.dev",
          rel: "me",
        },
        "Aman Kumar",
      ),
    ),
  )
}

const CuriousVoltFooter = () => {
  const Component = () => renderFooter()

  Component.css = css

  Component.afterDOMLoaded = `
    (() => {
      const addCanvasFooter = () => {
        const page = document.querySelector('.page[data-frame="canvas"]')
        const frame = page?.querySelector('.canvas-frame')
        if (!page || !frame || frame.querySelector(".cv-footer")) return

        const footer = document.createElement("div")
        footer.className = "cv-footer"
        const year = new Date().getFullYear()
        footer.innerHTML =
          '<p><span>© ' + year + ' </span>' +
          '<a href="https://curiousvolt.is-a.dev" rel="me">CuriousVolt</a>' +
          '<span class="cv-footer-separator" aria-hidden="true">·</span>' +
          '<a href="https://curiousvolt.is-a.dev" rel="me">Aman Kumar</a></p>'

        frame.appendChild(footer)
      }

      addCanvasFooter()
      document.addEventListener("nav", addCanvasFooter)
      document.addEventListener("render", addCanvasFooter)
    })()
  `

  return Component
}

export { CuriousVoltFooter }
