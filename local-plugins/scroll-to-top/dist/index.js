import { h } from "preact"

const css = `
.cv-scroll-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 99999;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid var(--lightgray);
  border-radius: 50%;
  background: color-mix(in srgb, var(--light) 94%, transparent);
  color: var(--dark);
  box-shadow: 0 6px 20px rgba(0,0,0,.18);
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity .18s ease, transform .18s ease, visibility .18s ease;
}
.cv-scroll-top.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}
.cv-scroll-top:hover {
  border-color: var(--secondary);
  color: var(--secondary);
}
.cv-scroll-top svg {
  width: 19px;
  height: 19px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
@media (max-width: 800px) {
  .cv-scroll-top {
    right: 18px;
    bottom: 72px;
    width: 42px;
    height: 42px;
  }
}
`

const script = `
(() => {
  const setup = () => {
    const button = document.querySelector(".cv-scroll-top")
    if (!button) return

    if (button.dataset.bound !== "true") {
      button.dataset.bound = "true"

      const getScrollY = () => {
        const scrolling = document.scrollingElement
        return Math.max(
          window.scrollY || 0,
          scrolling?.scrollTop || 0,
          document.documentElement.scrollTop || 0,
          document.body.scrollTop || 0,
        )
      }

      const update = () => {
        button.classList.toggle("visible", getScrollY() > 200)
      }

      window.addEventListener("scroll", update, { passive: true, capture: true })
      document.addEventListener("scroll", update, { passive: true, capture: true })
      window.addEventListener("resize", update, { passive: true })

      button.addEventListener("click", (event) => {
        event.preventDefault()
        const scrolling = document.scrollingElement
        window.scrollTo({ top: 0, behavior: "smooth" })
        if (scrolling) scrolling.scrollTo({ top: 0, behavior: "smooth" })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    }

    requestAnimationFrame(() => {
      const y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      button.classList.toggle("visible", y > 250)
    })
  }

  setup()
  document.addEventListener("DOMContentLoaded", setup, { once: true })
  document.addEventListener("nav", setup)
})()
`

const ScrollTop = () => {
  const Component = () =>
    h(
      "button",
      {
        class: "cv-scroll-top",
        type: "button",
        "aria-label": "Scroll to top",
        title: "Scroll to top",
      },
      h(
        "svg",
        { viewBox: "0 0 24 24", "aria-hidden": "true" },
        h("path", { d: "M12 19V5" }),
        h("path", { d: "m6 11 6-6 6 6" }),
      ),
    )

  Component.css = css
  Component.afterDOMLoaded = script
  return Component
}

export { ScrollTop }
