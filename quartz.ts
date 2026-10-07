import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"
import { getDate } from "./quartz/components/Date"

ExternalPlugin.FolderPage({
  sort: (a, b) => {
    const aTime = getDate(a)?.getTime() ?? 0
    const bTime = getDate(b)?.getTime() ?? 0
    return aTime - bTime
  },
})

const config = await loadQuartzConfig()

export default config

export const layout = await loadQuartzLayout()
