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
  return Component
}

export { CuriousVoltFooter }
