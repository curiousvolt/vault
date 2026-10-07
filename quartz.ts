import { componentRegistry } from "./quartz/components/registry"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

componentRegistry.setOptionOverrides("@quartz-community/folder-page", {
  sort: (a, b) => {
    const aCanvas = a.slug?.endsWith(".canvas") ?? false
    const bCanvas = b.slug?.endsWith(".canvas") ?? false

    // Keep Canvas files as their own group after regular Markdown notes.
    if (aCanvas !== bCanvas) return aCanvas ? -1 : 1

    // Canvas virtual pages do not carry Quartz date metadata.
    if (aCanvas && bCanvas) {
      const aTitle = a.frontmatter?.title ?? a.slug ?? ""
      const bTitle = b.frontmatter?.title ?? b.slug ?? ""
      return aTitle.localeCompare(bTitle, undefined, { sensitivity: "base" })
    }

    const aTime = a.dates?.modified instanceof Date ? a.dates.modified.getTime() : 0
    const bTime = b.dates?.modified instanceof Date ? b.dates.modified.getTime() : 0

    if (aTime !== bTime) return aTime - bTime

    const aTitle = a.frontmatter?.title ?? a.slug ?? ""
    const bTitle = b.frontmatter?.title ?? b.slug ?? ""
    return aTitle.localeCompare(bTitle, undefined, { sensitivity: "base" })
  },
})

const config = await loadQuartzConfig()

export default config

export const layout = await loadQuartzLayout()
