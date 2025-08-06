import { gql } from '@apollo/client'

export const GET_PANOPTIC_POOL_BY_ID_QUERY = gql`
    query GetPanopticPoolById($poolId: ID!) {
        panopticPool(id: $poolId) {
            id
            txCount
            feeTier
            token0 {
                id
                symbol
                name
                decimals
                derivedETH
            }
            token1 {
                id
                symbol
                name
                decimals
                derivedETH
            }
            collateral0 {
                id
                totalAssets
                poolAssets
                inAMM
                poolUtilization
                totalShares
            }
            collateral1 {
                id
                totalAssets
                poolAssets
                inAMM
                poolUtilization
                totalShares
            }
            underlyingPool {
                id
                totalValueLockedUSD
                liquidity
                tick
            }
            totalVolumeUSD
            commissionsUSD
            chunks(first: 10, where: { netLiquidity_gt: "0" }) {
                id
                tickLower
                tickUpper
                strike
                width
                tokenType
                netLiquidity
                shortLiquidity
                longLiquidity
                totalLiquidity
                shortCounts
                longCounts
            }
        }
        bundle(id: "1") {
            ethPriceUSD
        }
    }
`
