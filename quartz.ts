import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.FolderPage({
  sort: (a, b) => {
    const aTime = a.dates?.created?.getTime?.() ?? 0
    const bTime = b.dates?.created?.getTime?.() ?? 0
    return aTime - bTime
  },
})

const config = await loadQuartzConfig()

export default config

export const layout = await loadQuartzLayout()
