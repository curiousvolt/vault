import { h } from "preact"

const css = `
.cv-mobile-search-close {
  display: none;
}

@media (max-width: 800px) {
  .search > .search-container {
    border-radius: 0 !important;
  }

  .search > .search-container > .search-space {
    position: relative;
  }

  .cv-mobile-search-close {
    position: fixed;
    top: 14px;
    right: 14px;
    z-index: 10001;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid var(--lightgray);
    border-radius: 50%;
    background: var(--light);
    color: var(--dark);
    box-shadow: 0 6px 18px rgba(27, 33, 48, .16);
    cursor: pointer;
  }

  .cv-mobile-search-close:hover {
    border-color: var(--secondary);
  }

  .cv-mobile-search-close svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
  }
}
`

const script = `
(() => {
  const addCloseButton = () => {
    document.querySelectorAll(".search > .search-container").forEach((container) => {
      if (container.querySelector(".cv-mobile-search-close")) return

      const button = document.createElement("button")
      button.type = "button"
      button.className = "cv-mobile-search-close"
      button.setAttribute("aria-label", "Close search")
      button.setAttribute("title", "Close search")
      button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'

      button.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        document.dispatchEvent(new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }))
      })

      container.appendChild(button)
    })
  }

  const setup = () => {
    addCloseButton()
    requestAnimationFrame(addCloseButton)
    setTimeout(addCloseButton, 50)
  }

  setup()
  document.addEventListener("DOMContentLoaded", setup, { once: true })
  document.addEventListener("nav", setup)
  document.addEventListener("render", setup)

  const observer = new MutationObserver(addCloseButton)
  observer.observe(document.body, { childList: true, subtree: true })
})()
`

const MobileSearchFixes = () => {
  const Component = () =>
    h("span", {
      class: "cv-mobile-search-fixes",
      "aria-hidden": "true",
    })

  Component.css = css
  Component.afterDOMLoaded = script
  return Component
}

export { MobileSearchFixes }
