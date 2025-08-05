import { gql } from '@apollo/client'

export const GET_OLDEST_PANOPTIC_POOLS_QUERY = gql`
    query GetOldestPanopticPools {
        panopticPools(
            orderBy: createdTimestamp
            orderDirection: asc
            first: 50
        ) {
            feeTier
            token0 {
                symbol
            }
            token1 {
                symbol
            }
            underlyingPool {
                tick
                isV4Pool
            }
        }
    }
`
