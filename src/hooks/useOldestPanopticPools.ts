import { GET_OLDEST_PANOPTIC_POOLS_QUERY } from '@/queries/GetOldestPanopticPools.query'
import {
    PartialPanopticPool,
    PartialPanopticPoolWithPrice,
} from '@/types/pools.types'
import calculatePriceByTick from '@/lib/calculatePriceByTick'
import { useQuery } from '@apollo/client'

type OldestPanopticPoolsQueryReturnType = {
    panopticPools: PartialPanopticPool[]
}

export default function useOldestPanopticPools() {
    const { data, loading } = useQuery<OldestPanopticPoolsQueryReturnType>(
        GET_OLDEST_PANOPTIC_POOLS_QUERY
    )
    if (!data) {
        return { poolsData: [], loading }
    }

    const poolsData: PartialPanopticPoolWithPrice[] = data.panopticPools.map(
        (pool) => ({
            ...pool,
            price: calculatePriceByTick(
                pool.underlyingPool.tick,
                Number(pool.token0.decimals),
                Number(pool.token1.decimals)
            ),
        })
    )

    return { poolsData, loading }
}
