import { h } from "preact"

const css = `
.cv-footer {
  width: 100%;
  box-sizing: border-box;
  padding: 28px 20px 32px;
  border-top: 1px solid var(--lightgray);
  color: var(--gray);
  text-align: center;
  font-size: .76rem;
  line-height: 1.5;
}

.cv-footer p {
  margin: 0;
}

.cv-footer a {
  color: var(--darkgray);
  text-decoration: none;
}

.cv-footer a:hover,
.cv-footer a:focus-visible {
  color: var(--secondary);
}

@media all and (min-width:801px){
  .page[data-frame="canvas"] .cv-footer{
    position:absolute;
    left:0;
    right:0;
    bottom:10px;
    z-index:25;
    padding:8px 16px;
    border-top:0;
    pointer-events:none;
    background:transparent;
  }

  .page[data-frame="canvas"] .cv-footer a{
    pointer-events:auto;
  }
}

@media all and (max-width:800px){
  .page[data-frame="canvas"] .cv-footer{
    position:absolute;
    left:0;
    right:0;
    bottom:8px;
    z-index:25;
    padding:6px 12px;
    border-top:0;
    pointer-events:none;
    background:transparent;
  }

  .page[data-frame="canvas"] .cv-footer a{
    pointer-events:auto;
  }
}

.cv-footer-separator {
  display: inline-block;
  margin: 0 .45rem;
  color: var(--lightgray);
}

@media (max-width: 800px) {
  .cv-footer {
    padding: 24px 16px 28px;
  }
}
`

const CuriousVoltFooter = () => {
  const Component = () => {
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
        h("span", null, "Aman Kumar"),
      ),
    )
  }

  Component.css = css

  Component.afterDOMLoaded = `
    (() => {
      const addCanvasFooter = () => {
        const frame = document.querySelector(".page[data-frame="canvas"] .canvas-frame")
        if (!frame || frame.querySelector(".cv-footer")) return

        const footer = document.createElement("footer")
        footer.className = "cv-footer"
        const year = new Date().getFullYear()
        footer.innerHTML =
          '<p><span>© ' + year + ' </span>' +
          '<a href="https://curiousvolt.is-a.dev" rel="me">CuriousVolt</a>' +
          '<span class="cv-footer-separator" aria-hidden="true">·</span>' +
          '<span>Aman Kumar</span></p>'

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
