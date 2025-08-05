'use client'
import useOldestPanopticPools from '@/hooks/useOldestPanopticPools'
import { formatFeeTier } from '@/utils/formatFeeTier'
import PoolsTableSkeleton from './PoolsTableSkeleton'

const PoolsTable: React.FC = () => {
    const { poolsData, loading } = useOldestPanopticPools()

    if (loading) {
        return <PoolsTableSkeleton />
    }

    return (
        <div className="h-full w-full rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Scrollable container with max height */}
            <div className="h-full max-h-[90dvh] overflow-y-auto">
                <table className="w-full">
                    {/* Fixed header */}
                    <thead className="sticky top-0 z-10 bg-gray-300">
                        <tr className="[&>th]: border-b [&>th]:border-b-gray-400 [&>th]:px-4 [&>th]:py-3 [&>th]:text-sm [&>th]:font-semibold [&>th]:text-gray-700">
                            <th className="text-left">Token 0</th>
                            <th className="text-left">Token 1</th>
                            <th className="text-center">Fee Tier</th>
                            <th className="text-right">Current Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {poolsData.map((pool, index) => (
                            <tr
                                key={index}
                                className="even:bg-gray-25 transition-colors duration-150 hover:bg-gray-50 [&>td]:px-4 [&>td]:py-4 [&>td]:text-sm [&>td]:font-medium [&>td]:text-gray-900"
                            >
                                <td>{pool.token0Symbol}</td>
                                <td>{pool.token1Symbol}</td>
                                <td>{formatFeeTier(pool.feeTier)}</td>
                                <td className="text-right">
                                    {pool.price.toFixed(6)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer with total count */}
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
                <p className="text-center text-xs text-gray-600">
                    {poolsData.length} pools loaded
                </p>
            </div>
        </div>
    )
}
export default PoolsTable
