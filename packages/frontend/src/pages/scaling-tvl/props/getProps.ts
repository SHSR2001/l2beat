import { ApiMain } from '@l2beat/types'

import { Config } from '../../../build/config'
import { getFooterProps, getNavbarProps } from '../../../components'
import { getIncludedProjects } from '../../../utils/getIncludedProjects'
import { orderByTvl } from '../../../utils/orderByTvl'
import { formatUSD, getPercentageChange } from '../../../utils/utils'
import { Wrapped } from '../../Page'
import { TvlPageProps } from '../view/ScalingTvlPage'
import { getPageMetadata } from './getPageMetadata'
import { getScalingTvlView } from './getScalingTvlView'

export function getProps(
  config: Config,
  apiMain: ApiMain,
): Wrapped<TvlPageProps> {
  const tvl = apiMain.layers2s.hourly.data.at(-1)?.[1] ?? 0
  const tvlSevenDaysAgo = apiMain.layers2s.hourly.data[0]?.[1] ?? 0
  const sevenDayChange = getPercentageChange(tvl, tvlSevenDaysAgo)

  const included = getIncludedProjects(config.layer2s, apiMain)
  const ordering = orderByTvl(included, apiMain)

  return {
    props: {
      navbar: getNavbarProps(config),
      tvl: formatUSD(tvl),
      sevenDayChange,
      apiEndpoint: '/api/scaling-tvl.json',
      tvlView: getScalingTvlView(ordering, apiMain, tvl),
      footer: getFooterProps(config),
      showActivity: config.features.activity,
    },
    wrapper: {
      preloadApi: '/api/scaling-tvl.json',
      metadata: getPageMetadata(),
    },
  }
}