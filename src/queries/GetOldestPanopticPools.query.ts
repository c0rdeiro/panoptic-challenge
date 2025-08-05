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
                decimals
            }
            token1 {
                symbol
                decimals
            }
            underlyingPool {
                tick
                isV4Pool
            }
        }
    }
`
