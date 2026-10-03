import { h } from "preact"

const css = ""

const script = `
(() => {
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
    if (container && button && getComputedStyle(container).display !== "none") { button.click(); return true }
    return false
  }

  const toggleExplorer = () => {
    const mobile = document.querySelector(".mobile-explorer")
    if (mobile && window.matchMedia("(max-width: 1199px)").matches) { mobile.click(); return }
    const explorer = document.querySelector(".sidebar.left .explorer")
    const control = explorer?.querySelector(".desktop-explorer, .explorer-title, button")
    control?.click()
  }

  const focusSearch = () => {
    const button = document.querySelector(".search .search-button")
    if (!button) return
    button.click()
    window.setTimeout(() => document.querySelector(".search-container input")?.focus(), 40)
  }

  const showToc = () => {
    const toc = document.querySelector(".page-header .mobile-only .toc, .sidebar.right .toc")
    if (!toc) return
    toc.scrollIntoView({ behavior: "smooth", block: "start" })
    const header = toc.querySelector(".toc-header")
    if (header?.classList.contains("collapsed")) header.click()
  }

  const goHome = () => document.querySelector(".page-title a")?.click()

  const scrollTop = () => {
    const button = document.querySelector(".cv-scroll-top")
    if (button) button.click()
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const hideHelp = () => { if (help) help.hidden = true }

  const showHelp = () => {
    if (!help) {
      help = document.createElement("div")
      help.className = "cv-shortcut-help"
      help.setAttribute("role", "dialog")
      help.setAttribute("aria-modal", "true")
      help.setAttribute("aria-label", "Keyboard shortcuts")
      help.innerHTML = "<div class='cv-shortcut-help__panel' tabindex='-1'><h2 class='cv-shortcut-help__title'>Keyboard shortcuts</h2><div class='cv-shortcut-help__list'>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Focus search</span><kbd>/</kbd></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Home</span><span><kbd>G</kbd> <kbd>H</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Toggle Explorer</span><span><kbd>G</kbd> <kbd>E</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Show table of contents</span><span><kbd>G</kbd> <kbd>T</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Scroll to top</span><span><kbd>G</kbd> <kbd>G</kbd></span></div>" +
        "<div class='cv-shortcut-help__row'><span class='cv-shortcut-help__hint'>Close search / shortcuts</span><kbd>Esc</kbd></div>" +
        "</div></div>"
      help.addEventListener("click", (event) => { if (event.target === help) hideHelp() })
      document.body.appendChild(help)
    }
    help.hidden = false
    help.querySelector(".cv-shortcut-help__panel")?.focus()
  }

  const handleKeydown = (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === "Escape") {
      if (help && !help.hidden) { hideHelp(); event.preventDefault(); return }
      if (closeSearch()) event.preventDefault()
      return
    }
    if (isTypingTarget(event.target)) return
    if (event.key === "?") { event.preventDefault(); showHelp(); return }
    if (event.key === "/" && !event.shiftKey) { event.preventDefault(); focusSearch(); return }
    const key = event.key.toLowerCase()
    if (!["g","h","e","t"].includes(key)) { sequence = ""; clearTimeout(sequenceTimer); return }
    sequence += key
    clearTimeout(sequenceTimer)
    sequenceTimer = window.setTimeout(() => { sequence = "" }, 900)
    if (sequence === "gh") { sequence = ""; goHome() }
    else if (sequence === "ge") { sequence = ""; toggleExplorer() }
    else if (sequence === "gt") { sequence = ""; showToc() }
    else if (sequence === "gg") { sequence = ""; scrollTop() }
  }

  const start = () => {
    window.addEventListener("scroll", showScrollState, { passive: true })
    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("nav", hideHelp)
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true })
  else start()
})()
`

const KeyboardShortcuts = () => {
  const Component = () => h("span", { class: "cv-keyboard-shortcuts", "aria-hidden": "true" })
  Component.css = css
  Component.afterDOMLoaded = script
  return Component
}

export { KeyboardShortcuts }