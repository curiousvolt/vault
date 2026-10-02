import { h } from "preact"

const css = `
.cv-mobile-search-close {
  display: none;
}

@media (max-width: 800px) {
  /* The search component itself owns the backdrop. Keep it rectangular. */
  .search > .search-container {
    border-radius: 0 !important;
  }

  /* The button lives inside the fixed search overlay, so absolute positioning
     is deterministic relative to that overlay. */
  .cv-mobile-search-close {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10010;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid var(--lightgray);
    border-radius: 50%;
    background: var(--light);
    color: var(--dark);
    box-shadow: 0 4px 16px rgba(27, 33, 48, .12);
    cursor: pointer;
  }

  .cv-mobile-search-close:hover,
  .cv-mobile-search-close:focus-visible {
    border-color: var(--secondary);
    outline: none;
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
      button.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>'

      button.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()

        const searchButton = container
          .closest(".search")
          ?.querySelector(".search-button")

        if (searchButton) {
          searchButton.click()
        }
      })

      container.appendChild(button)
    })
  }

  const setup = () => {
    addCloseButton()
    requestAnimationFrame(addCloseButton)
    setTimeout(addCloseButton, 100)
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
