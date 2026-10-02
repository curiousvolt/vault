import { h } from "preact"

const css = `
.cv-scroll-top {
  position: fixed;
  right: 18px;
  bottom: 84px;
  z-index: 100000;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid var(--lightgray);
  border-radius: 50%;
  background: var(--light);
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
    right: 16px;
    bottom: 84px;
    width: 42px;
    height: 42px;
  }
}
`

const script = `
(() => {
  let raf = 0

  const getScrollElement = () =>
    document.scrollingElement || document.documentElement || document.body

  const getScrollY = () => {
    const el = getScrollElement()
    return Math.max(
      window.scrollY || 0,
      el?.scrollTop || 0,
      document.documentElement?.scrollTop || 0,
      document.body?.scrollTop || 0,
    )
  }

  const update = () => {
    raf = 0
    const button = document.querySelector(".cv-scroll-top")
    if (!button) return
    button.classList.toggle("visible", getScrollY() > 200)
  }

  const scheduleUpdate = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  const bind = () => {
    const button = document.querySelector(".cv-scroll-top")
    if (!button || button.dataset.bound === "true") {
      scheduleUpdate()
      return
    }

    button.dataset.bound = "true"

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    document.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true })
    document.documentElement.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("wheel", scheduleUpdate, { passive: true })
    window.addEventListener("touchmove", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate, { passive: true })

    button.addEventListener("click", (event) => {
      event.preventDefault()
      const el = getScrollElement()

      try {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        window.scrollTo(0, 0)
      }

      try {
        el.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        el.scrollTop = 0
      }

      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      scheduleUpdate()
    })

    scheduleUpdate()
  }

  const start = () => {
    bind()
    document.addEventListener("nav", bind)
    document.addEventListener("render", bind)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true })
  } else {
    start()
  }
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
