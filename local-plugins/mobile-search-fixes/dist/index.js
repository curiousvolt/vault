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
  let frame = 0
  let scrollTimer = 0
  let sequenceTimer = 0
  let sequence = ""
  let help = null

  const isTypingTarget = (target) => {
    if (!target || !(target instanceof Element)) return false
    return target.matches("input, textarea, select, [contenteditable='true'], [contenteditable='']")
  }

  const showScrollState = () => {
    document.documentElement.classList.add("cv-scrolling")
    document.body?.classList.add("cv-scrolling")
    clearTimeout(scrollTimer)
    scrollTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("cv-scrolling")
      document.body?.classList.remove("cv-scrolling")
    }, 700)
  }

  const closeSearch = () => {
    const search = document.querySelector(".search")
    const container = search?.querySelector(".search-container")
    const button = search?.querySelector(".search-button")
    if (container && button && getComputedStyle(container).display !== "none") {
      button.click()
      return true
    }
    return false
  }

  const toggleExplorer = () => {
    const mobile = document.querySelector(".mobile-explorer")
    if (mobile && window.matchMedia("(max-width: 1199px)").matches) {
      mobile.click()
      return
    }

    const explorer = document.querySelector(".sidebar.left .explorer")
    const control = explorer?.querySelector(".desktop-explorer, .explorer-title, button")
    control?.click()
  }

  const focusSearch = () => {
    const button = document.querySelector(".search .search-button")
    if (!button) return

    button.click()
    window.setTimeout(() => {
      document.querySelector(".search-container input")?.focus()
    }, 40)
  }

  const showToc = () => {
    const toc = document.querySelector(".page-header .mobile-only .toc, .sidebar.right .toc")
    if (!toc) return

    toc.scrollIntoView({ behavior: "smooth", block: "start" })
    const header = toc.querySelector(".toc-header")
    if (header?.classList.contains("collapsed")) header.click()
  }

  const goHome = () => {
    document.querySelector(".page-title a")?.click()
  }

  const scrollTop = () => {
    const button = document.querySelector(".cv-scroll-top")
    if (button) button.click()
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const hideHelp = () => {
    if (help) help.hidden = true
  }

  const showHelp = () => {
    if (!help) {
      help = document.createElement("div")
      help.className = "cv-shortcut-help"
      help.setAttribute("role", "dialog")
      help.setAttribute("aria-modal", "true")
      help.setAttribute("aria-label", "Keyboard shortcuts")
      help.innerHTML =
        "<div class='cv-shortcut-help__panel' tabindex='-1'><h2 class='cv-shortcut-help__title'>Keyboard shortcuts</h2><div class='cv-shortcut-help__list'>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Focus search</span><kbd>/</kbd></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Home</span><span><kbd>G</kbd> <kbd>H</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Toggle Explorer</span><span><kbd>G</kbd> <kbd>E</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Show table of contents</span><span><kbd>G</kbd> <kbd>T</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Scroll to top</span><span><kbd>G</kbd> <kbd>G</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Close search / shortcuts</span><kbd>Esc</kbd></div>" +
        "</div></div>"
      help.addEventListener("click", (event) => {
        if (event.target === help) hideHelp()
      })
      document.body.appendChild(help)
    }

    help.hidden = false
    help.querySelector(".cv-shortcut-help__panel")?.focus()
  }

  const handleKeydown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return

    if (event.key === "Escape") {
      if (help && !help.hidden) {
        hideHelp()
        event.preventDefault()
        return
      }

      if (closeSearch()) event.preventDefault()
      return
    }

    if (isTypingTarget(event.target)) return

    if (event.key === "?") {
      event.preventDefault()
      showHelp()
      return
    }

    if (event.key === "/" && !event.shiftKey) {
      event.preventDefault()
      focusSearch()
      return
    }

    const key = event.key.toLowerCase()
    if (!["g", "h", "e", "t"].includes(key)) {
      sequence = ""
      clearTimeout(sequenceTimer)
      return
    }

    sequence += key
    clearTimeout(sequenceTimer)
    sequenceTimer = window.setTimeout(() => {
      sequence = ""
    }, 900)

    if (sequence === "gh") {
      sequence = ""
      goHome()
    } else if (sequence === "ge") {
      sequence = ""
      toggleExplorer()
    } else if (sequence === "gt") {
      sequence = ""
      showToc()
    } else if (sequence === "gg") {
      sequence = ""
      scrollTop()
    }
  }

  const start = () => {
    addCloseButton()
    requestAnimationFrame(addCloseButton)
    setTimeout(addCloseButton, 100)
    window.addEventListener("scroll", showScrollState, { passive: true })
    document.addEventListener("keydown", handleKeydown, true)
    document.addEventListener("nav", hideHelp)
    document.addEventListener("render", hideHelp)
  }
  const schedule = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      addCloseButton()
    })
  }

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

  const observer = new MutationObserver(schedule)
  observer.observe(document.body, { childList: true, subtree: true })

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true })
  } else {
    start()
  }
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
