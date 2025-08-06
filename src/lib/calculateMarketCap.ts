import { Collateral, Token } from '@/types/pools.types'

export default function calculatePanopticMarketCap(
    token0: Token,
    token1: Token,
    collateral0: Collateral,
    collateral1: Collateral,
    ethPriceUSD: number
) {
    // Convert raw token amounts to USD
    const token0ValueUSD =
        (parseFloat(collateral0.totalAssets) /
            Math.pow(10, Number(token0.decimals))) *
        parseFloat(token0.derivedETH) *
        ethPriceUSD

    const token1ValueUSD =
        (parseFloat(collateral1.totalAssets) /
            Math.pow(10, Number(token1.decimals))) *
        parseFloat(token1.derivedETH) *
        ethPriceUSD

    return token0ValueUSD + token1ValueUSD
}
