import { PanopticPool } from '@/types/pools.types'
import calculatePanopticMarketCap from './calculateMarketCap'

export default function calculateEstimatedAPY(
    poolData: PanopticPool,
    ethPriceUSD: number
) {
    const totalCommissionsUSD = parseFloat(poolData.commissionsUSD || '0')
    const totalAssetsUSD = calculatePanopticMarketCap(
        poolData.token0,
        poolData.token1,
        poolData.collateral0,
        poolData.collateral1,
        ethPriceUSD
    )

    if (totalAssetsUSD === 0) return '0.0'

    // This is a simplified calculation - you'd want to annualize based on time period
    const roughAPY = (totalCommissionsUSD / totalAssetsUSD) * 100
    return roughAPY.toFixed(1)
}
