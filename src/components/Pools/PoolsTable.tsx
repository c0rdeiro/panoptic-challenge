'use client'
import useOldestPanopticPools from '@/hooks/useOldestPanopticPools'
import { formatFeeTier } from '@/utils/formatFeeTier'
import { useRouter } from 'next/navigation'
import LoadingSpin from '../shared/LoadingSpin'
import { FaChartLine, FaDollarSign, FaChevronRight } from 'react-icons/fa'

const PoolsTable: React.FC = () => {
    const { poolsData, loading } = useOldestPanopticPools()
    const { push } = useRouter()

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-950 p-8">
                <div className="text-center">
                    <LoadingSpin />
                    <p className="mt-4 text-sm text-gray-400">
                        Loading pools...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full max-w-7xl rounded-xl border border-gray-800 bg-gray-900/50 shadow-2xl backdrop-blur">
            {/* Header */}
            <div className="border-b border-gray-800 bg-gray-900/70 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Available Markets
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Click on any pool to start trading options
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                            {poolsData.length} Active Pools
                        </span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="h-full max-h-[65dvh] overflow-y-auto">
                <table className="w-full">
                    <thead className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                                Pool
                            </th>
                            <th className="px-4 py-4 text-center text-xs font-medium tracking-wider text-gray-400 uppercase">
                                Fee Tier
                            </th>
                            <th className="px-4 py-4 text-right text-xs font-medium tracking-wider text-gray-400 uppercase">
                                Current Price
                            </th>

                            <th className="px-4 py-4 text-center text-xs font-medium tracking-wider text-gray-400 uppercase"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {poolsData.map((pool) => (
                            <tr
                                key={pool.id}
                                onClick={() => push(`/market/${pool.id}`)}
                                className="group cursor-pointer transition-all duration-150 hover:bg-gray-800/50"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-medium text-white">
                                                {pool.token0.symbol} /{' '}
                                                {pool.token1.symbol}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className="inline-flex items-center rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                                        {formatFeeTier(Number(pool.feeTier))}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <FaDollarSign className="h-3 w-3 text-gray-500" />
                                        <span className="font-mono text-white">
                                            {pool.price}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-4 py-4 text-center">
                                    <FaChevronRight className="mx-auto h-5 w-5 text-gray-500 transition-colors group-hover:text-gray-300" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {poolsData.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                            <FaChartLine className="h-8 w-8 text-gray-600" />
                        </div>
                        <p className="text-sm text-gray-400">
                            No pools available
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Check back later for new markets
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default PoolsTable
