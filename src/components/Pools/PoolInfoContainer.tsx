import usePanopticPoolInfo from '@/hooks/usePanopticPoolInfo'
import calculatePanopticMarketCap from '@/lib/calculateMarketCap'
import calculatePriceByTick from '@/lib/calculatePriceByTick'
import { formatFeeTier } from '@/utils/formatFeeTier'
import { formatUSD } from '@/utils/formatNumber'
import { useState } from 'react'
import { LuWallet } from 'react-icons/lu'
import LoadingSpin from '../shared/LoadingSpin'
import DepositModal from './DepositModal'
import PoolPositionsTable from './PoolPositionsTable'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

type PoolInfoContainerProps = {
    poolId: string
}
const PoolInfoContainer: React.FC<PoolInfoContainerProps> = ({ poolId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isConnected } = useAccount()
    const { poolInfo, ethPriceUSD, loading, error } =
        usePanopticPoolInfo(poolId)

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950">
                <LoadingSpin />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6">
                    <h3 className="mb-2 font-medium text-red-400">
                        Error Loading Pool Data
                    </h3>
                    <p className="text-sm text-red-300">{error.message}</p>
                </div>
            </div>
        )
    }

    if (!poolInfo) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-6">
                    <p className="text-yellow-400">
                        Pool not found with ID: {poolId}
                    </p>
                </div>
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
        panopticPoolDayData,
        chunks,
    } = poolInfo

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">
                            {token0.symbol} / {token1.symbol}
                        </h1>
                        <p className="text-gray-400">
                            {token0.name} • {token1.name} •{' '}
                            {formatFeeTier(Number(feeTier))} Fee
                        </p>
                        <div className="mt-4 text-lg text-gray-300">
                            1 {token0.symbol} ={' '}
                            {calculatePriceByTick(
                                underlyingPool.tick,
                                Number(token0.decimals),
                                Number(token1.decimals)
                            )}{' '}
                            {token1.symbol}
                        </div>
                    </div>
                    {isConnected ? (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex transform cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                        >
                            <LuWallet className="h-5 w-5" />
                            Deposit Liquidity
                        </button>
                    ) : (
                        <ConnectButton />
                    )}
                </div>

                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur">
                        <p className="mb-1 text-xs text-gray-400">TVL (USD)</p>
                        <p className="text-xl font-semibold">
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
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur">
                        <p className="mb-1 text-xs text-gray-400">Volume 24h</p>
                        <p className="text-xl font-semibold">
                            {formatUSD(panopticPoolDayData[0]?.totalVolumeUSD)}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur">
                        <p className="mb-1 text-xs text-gray-400">Fees 24h</p>
                        <p className="text-xl font-semibold">
                            {formatUSD(panopticPoolDayData[0]?.commissionsUSD)}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur">
                        <p className="mb-1 text-xs text-gray-400">
                            Uniswap TVL
                        </p>
                        <p className="text-xl font-semibold">
                            {formatUSD(underlyingPool.totalValueLockedUSD)}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur">
                        <p className="mb-1 text-xs text-gray-400">
                            Uniswap Vol 24h
                        </p>
                        <p className="text-xl font-semibold">
                            {formatUSD(
                                underlyingPool.poolDayData[0]?.totalVolumeUSD
                            )}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur">
                        <p className="mb-1 text-xs text-gray-400">
                            Uniswap Fees 24h
                        </p>
                        <p className="text-xl font-semibold">
                            {formatUSD(
                                underlyingPool.poolDayData[0]?.commissionsUSD
                            )}
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold">
                        Available Positions
                    </h3>
                    <PoolPositionsTable
                        chunks={chunks}
                        currentTick={Number(underlyingPool.tick)}
                        token0={token0}
                        token1={token1}
                    />
                </div>
            </div>

            <DepositModal
                isOpen={isModalOpen}
                setIsOpen={() => setIsModalOpen(false)}
                poolInfo={poolInfo}
                ethUsdPrice={Number(ethPriceUSD)}
            />
        </>
    )
}
export default PoolInfoContainer
