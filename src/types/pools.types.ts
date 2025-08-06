type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

export type PartialPanopticPoolWithPrice = Prettify<
    PartialPanopticPool & {
        price: string
    }
>
export type PartialPanopticPool = Pick<
    PanopticPool,
    'id' | 'feeTier' | 'token0' | 'token1' | 'underlyingPool'
>

export type PanopticPool = {
    id: string
    txCount: string
    feeTier: string
    token0: Token
    token1: Token
    underlyingPool: UnderlyingPool
    collateral0: Collateral
    collateral1: Collateral
    totalVolumeUSD: string
    commissionsUSD: string
    chunks: Chunk[]
}

export type Token = {
    id: string
    symbol: string
    name: string
    decimals: string
    derivedETH: string
}

export type Collateral = {
    id: string
    totalAssets: string
    poolAssets: string
    inAMM: string
    poolUtilization: string
    totalShares: string
}

export type UnderlyingPool = {
    id: string
    totalValueLockedUSD: string
    liquidity: string
    tick: string | null //may be null if pool not initialized
}

export type Chunk = {
    id: string
    tickLower: string
    tickUpper: string
    strike: string
    width: string
    tokenType: string
    netLiquidity: string
    shortLiquidity: string
    longLiquidity: string
    shortCounts: string
    longCounts: string
}

export type Bundle = {
    id: string
    ethPriceUSD: string
}
