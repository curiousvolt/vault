import { h } from "preact"

const css = `
.cv-scroll-top {
  position: fixed;
  right: 18px;
  bottom: 28px;
  z-index: 100000;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid color-mix(in srgb,var(--lightgray) 90%,transparent);
  border-radius: 50%;
  background: color-mix(in srgb,var(--light) 92%,transparent);
  color: var(--darkgray);
  box-shadow: 0 4px 14px rgba(0,0,0,.10);
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: opacity .18s ease, transform .18s ease, visibility .18s ease,
    color .18s ease, border-color .18s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.cv-scroll-top.visible {
  opacity: .78;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}
.cv-scroll-top:hover,
.cv-scroll-top:focus-visible {
  opacity: 1;
  border-color: var(--secondary);
  color: var(--secondary);
  outline: none;
}
.cv-scroll-top svg {
  width: 17px;
  height: 17px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.cv-scroll-top .cv-icon-up {
  display: none;
}
.cv-scroll-top.is-up .cv-icon-down {
  display: none;
}
.cv-scroll-top.is-up .cv-icon-up {
  display: block;
}
@media (max-width: 800px) {
  .cv-scroll-top {
    right: 14px;
    bottom: 22px;
    width: 38px;
    height: 38px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cv-scroll-top {
    transition: opacity .1s ease, visibility .1s ease;
    transform: none;
  }
}
`

const script = `
(() => {
  let raf = 0
  let boundButton = null
  let globalBound = false

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

  const getMaxScrollY = () => {
    const el = getScrollElement()
    const height = Math.max(
      el?.scrollHeight || 0,
      document.documentElement?.scrollHeight || 0,
      document.body?.scrollHeight || 0,
    )
    return Math.max(0, height - window.innerHeight)
  }

  const update = () => {
    raf = 0
    const button = document.querySelector(".cv-scroll-top")
    if (!button) return

    const maxScrollY = getMaxScrollY()
    const scrollY = getScrollY()
    const scrollable = maxScrollY > 120

    if (!scrollable) {
      button.classList.remove("visible", "is-up")
      return
    }

    const atTop = scrollY <= 80
    button.classList.add("visible")
    button.classList.toggle("is-up", !atTop)

    const label = atTop ? "Go to bottom" : "Back to top"
    button.setAttribute("aria-label", label)
    button.setAttribute("title", label)
  }

  const scheduleUpdate = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  const scrollToTarget = (event) => {
    event.preventDefault()

    const target = getScrollY() <= 80 ? getMaxScrollY() : 0

    try {
      window.scrollTo({ top: target, behavior: "smooth" })
    } catch {
      window.scrollTo(0, target)
    }

    const el = getScrollElement()
    try {
      el.scrollTo({ top: target, behavior: "smooth" })
    } catch {
      el.scrollTop = target
    }

    scheduleUpdate()
  }

  const ensureButton = () => {
    const button = document.querySelector(".cv-scroll-top")
    if (button === boundButton) {
      scheduleUpdate()
      return
    }

    if (boundButton) {
      boundButton.removeEventListener("click", scrollToTarget)
    }

    boundButton = button

    if (boundButton) {
      boundButton.addEventListener("click", scrollToTarget)
    }

    scheduleUpdate()
  }

  const start = () => {
    ensureButton()

    if (!globalBound) {
      globalBound = true
      window.addEventListener("scroll", scheduleUpdate, { passive: true })
      document.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true })
      window.addEventListener("resize", scheduleUpdate, { passive: true })
    }

    document.addEventListener("nav", ensureButton)
    document.addEventListener("render", ensureButton)
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
        "aria-label": "Go to bottom",
        title: "Go to bottom",
      },
      h(
        "svg",
        { class: "cv-icon-down", viewBox: "0 0 24 24", "aria-hidden": "true" },
        h("path", { d: "M12 5v14" }),
        h("path", { d: "m6 13 6 6 6-6" }),
      ),
      h(
        "svg",
        { class: "cv-icon-up", viewBox: "0 0 24 24", "aria-hidden": "true" },
        h("path", { d: "M12 19V5" }),
        h("path", { d: "m6 11 6-6 6 6" }),
      ),
    )

  Component.css = css
  Component.afterDOMLoaded = script
  return Component
}

export { ScrollTop }
