import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"
import { getDate } from "./quartz/components/Date"

ExternalPlugin.FolderPage({
  sort: (a, b) => {
    const aCanvas = a.slug?.endsWith(".canvas") ?? false
    const bCanvas = b.slug?.endsWith(".canvas") ?? false

    // Keep Canvas files as their own group after regular Markdown notes.
    if (aCanvas !== bCanvas) return aCanvas ? 1 : -1

    const aTime = getDate(a)?.getTime() ?? 0
    const bTime = getDate(b)?.getTime() ?? 0
    return aTime - bTime
  },
})

const config = await loadQuartzConfig()

export default config

export const layout = await loadQuartzLayout()
