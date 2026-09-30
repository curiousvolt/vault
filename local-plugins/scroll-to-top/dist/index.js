import { h } from "preact"

const css = `
.cv-scroll-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid var(--lightgray);
  border-radius: 50%;
  background: color-mix(in srgb, var(--light) 92%, transparent);
  color: var(--dark);
  box-shadow: 0 6px 20px rgba(0,0,0,.16);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity .18s ease, transform .18s ease, visibility .18s ease;
}
.cv-scroll-top.visible {
  opacity: 1;
  visibility: visible;
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
    right: 16px;
    bottom: 18px;
    width: 42px;
    height: 42px;
  }
}
`

const script = `
document.addEventListener("nav", () => {
  const button = document.querySelector(".cv-scroll-top")
  if (!button || button.dataset.bound === "true") return

  button.dataset.bound = "true"
  const update = () => {
    button.classList.toggle("visible", window.scrollY > 500)
  }

  window.addEventListener("scroll", update, { passive: true })
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
  update()
})
`

const ScrollTop = () =>
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

ScrollTop.css = css
ScrollTop.afterDOMLoaded = script

export { ScrollTop }
