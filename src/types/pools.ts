export type PanopticPoolRawData = {
    feeTier: string
    token0: {
        symbol: string
        decimals: number
    }
    token1: {
        symbol: string
        decimals: number
    }
    underlyingPool: {
        tick: string | null //may be null if not initialized
        isV4Pool: boolean | null
    }
}

export type PanopticPool = {
    feeTier: number
    token0: Token
    token1: Token
    price: number
    isV4Pool: boolean
}

export type Token = {
    symbol: string
    decimals: number
}
