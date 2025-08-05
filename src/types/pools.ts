export type PanopticPoolRawData = {
    feeTier: string
    token0: {
        symbol: string
    }
    token1: {
        symbol: string
    }
    underlyingPool: {
        tick: string | null //may be null if not initialized
        isV4Pool: boolean | null
    }
}

export type PanopticPool = {
    feeTier: number
    token0Symbol: string
    token1Symbol: string
    price: number
    isV4Pool: boolean
}
