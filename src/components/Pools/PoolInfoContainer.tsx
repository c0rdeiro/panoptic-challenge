import usePanopticPoolInfo from '@/hooks/usePanopticPoolInfo'
import { formatFeeTier } from '@/utils/formatFeeTier'
import calculatePriceByTick from '@/lib/calculatePriceByTick'
import LoadingSpin from '../shared/LoadingSpin'
import calculatePanopticMarketCap from '@/lib/calculateMarketCap'
import PositionsTable from '../Positions/PositionsTable'
import { formatUSD } from '@/utils/formatNumber'

type PoolInfoContainerProps = {
    poolId: string
}
const PoolInfoContainer: React.FC<PoolInfoContainerProps> = ({ poolId }) => {
    const { poolInfo, ethPriceUSD, loading, error } =
        usePanopticPoolInfo(poolId)

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <LoadingSpin />
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-2 font-medium text-red-800">
                    Error Loading Pool Data
                </h3>
                <p className="text-sm text-red-600">{error.message}</p>
            </div>
        )
    }

    if (!poolInfo) {
        return (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                <p className="text-yellow-800">
                    Pool not found with ID: {poolId}
                </p>
            </div>
        )
    }

    const {
        token0,
        token1,
        underlyingPool,
        feeTier,
        collateral0,
        collateral1,
        totalVolumeUSD,
        commissionsUSD,
        chunks,
    } = poolInfo

    return (
        <div className="m-5 flex flex-col gap-10 rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        {token0.symbol} / {token1.symbol}
                    </h1>
                    <p className="text-gray-600">
                        {token0.name} • {token1.name} •{' '}
                        {formatFeeTier(Number(feeTier))} Fee
                    </p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                    {calculatePriceByTick(
                        underlyingPool.tick,
                        Number(token0.decimals),
                        Number(token1.decimals)
                    )}
                </p>
            </div>

            <div className="flex flex-row justify-evenly gap-5 rounded bg-gray-50 p-4 md:items-center">
                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-600">TVL (USD)</p>
                    <p className="text-2xl font-bold text-black">
                        {formatUSD(
                            calculatePanopticMarketCap(
                                token0,
                                token1,
                                collateral0,
                                collateral1,
                                Number(ethPriceUSD)
                            )
                        )}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-600">Total Volume (USD)</p>
                    <p className="text-2xl font-bold text-black">
                        {formatUSD(totalVolumeUSD)}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-600">Total Fees (USD)</p>
                    <p className="text-2xl font-bold text-black">
                        {formatUSD(commissionsUSD)}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-600">Uniswap TVL (USD)</p>
                    <p className="text-2xl font-bold text-black">
                        {formatUSD(underlyingPool.totalValueLockedUSD)}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Available Positions</h3>
                <PositionsTable
                    chunks={chunks}
                    currentTick={Number(underlyingPool.tick)}
                    token0={token0}
                    token1={token1}
                />
            </div>
        </div>
    )
}
export default PoolInfoContainer
