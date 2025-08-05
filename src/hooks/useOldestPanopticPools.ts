import { GET_OLDEST_PANOPTIC_POOLS_QUERY } from '@/queries/GetOldestPanopticPools.query'
import { PanopticPool, PanopticPoolRawData } from '@/types/pools'
import getPriceByTick from '@/utils/getPriceByTick'
import { useQuery } from '@apollo/client'

type OldestPanopticPoolsQueryReturnType = {
    panopticPools: PanopticPoolRawData[]
}

export default function useOldestPanopticPools(): PanopticPool[] {
    const { data } = useQuery<OldestPanopticPoolsQueryReturnType>(
        GET_OLDEST_PANOPTIC_POOLS_QUERY
    )
    if (!data) {
        return []
    }

    const poolsData: PanopticPool[] = data.panopticPools.map((pool) => ({
        feeTier: Number(pool.feeTier),
        token0Symbol: pool.token0.symbol,
        token1Symbol: pool.token1.symbol,
        price: getPriceByTick(
            pool.underlyingPool.tick ? Number(pool.underlyingPool.tick) : 0
        ),
        isV4Pool: pool.underlyingPool.isV4Pool ?? false,
    }))
    console.log({ data: data.panopticPools, poolsData })

    return poolsData
}
