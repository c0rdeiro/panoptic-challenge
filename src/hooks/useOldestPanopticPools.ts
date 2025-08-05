import { GET_OLDEST_PANOPTIC_POOLS_QUERY } from '@/queries/GetOldestPanopticPools.query'
import { PanopticPool, PanopticPoolRawData } from '@/types/pools'
import getPriceByTick from '@/utils/getPriceByTick'
import { useQuery } from '@apollo/client'

type OldestPanopticPoolsQueryReturnType = {
    panopticPools: PanopticPoolRawData[]
}

export default function useOldestPanopticPools() {
    const { data, loading } = useQuery<OldestPanopticPoolsQueryReturnType>(
        GET_OLDEST_PANOPTIC_POOLS_QUERY
    )
    if (!data) {
        return { poolsData: [], loading }
    }

    const poolsData: PanopticPool[] = data.panopticPools.map((pool) => ({
        feeTier: Number(pool.feeTier),
        token0: { symbol: pool.token0.symbol, decimals: pool.token0.decimals },
        token1: { symbol: pool.token1.symbol, decimals: pool.token1.decimals },
        price: Number(pool.underlyingPool.tick)
            ? getPriceByTick(
                  Number(pool.underlyingPool.tick),
                  pool.token0.decimals,
                  pool.token1.decimals
              )
            : 0,
        isV4Pool: pool.underlyingPool.isV4Pool ?? false,
    }))
    console.log({ data: data.panopticPools, poolsData })

    return { poolsData, loading }
}
