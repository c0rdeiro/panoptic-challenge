import { GET_PANOPTIC_POOL_BY_ID_QUERY } from '@/queries/GetPanopticPoolById.query'
import { Bundle, PanopticPool } from '@/types/pools.types'
import { useQuery } from '@apollo/client'

export type GetPanopticPoolByIdQueryReturnType = {
    panopticPool: PanopticPool | null
    bundle: Bundle | null
}

export default function usePanopticPoolInfo(poolId: string) {
    const { data, error, loading } =
        useQuery<GetPanopticPoolByIdQueryReturnType>(
            GET_PANOPTIC_POOL_BY_ID_QUERY,
            {
                variables: { poolId },
                skip: !poolId,
            }
        )
    console.log('usePanopticPoolInfo', { poolId, data, error, loading })
    return {
        poolInfo: data?.panopticPool,
        ethPriceUSD: data?.bundle?.ethPriceUSD,
        loading,
        error,
    }
}
