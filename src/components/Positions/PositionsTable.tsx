import calculateDelta from '@/lib/calculateDelta'
import { Chunk, Token } from '@/types/pools.types'
import { formatLiquidity } from '@/utils/formatNumber'

type PositionsTableProps = {
    chunks: Chunk[]
    currentTick: number
    token0: Token
    token1: Token
}
const PositionsTable: React.FC<PositionsTableProps> = ({
    chunks,
    currentTick,
    token0,
    token1,
}) => {
    const availablePositions = chunks
        .map((chunk) => {
            const isCall = chunk.tokenType === '0'
            const totalUsed =
                parseFloat(chunk.shortLiquidity) +
                parseFloat(chunk.longLiquidity)
            const utilization =
                parseFloat(chunk.totalLiquidity) > 0
                    ? (totalUsed / parseFloat(chunk.totalLiquidity)) * 100
                    : 0

            // Determine if ITM/OTM
            const strike = parseInt(chunk.strike)
            const isITM = isCall ? currentTick > strike : currentTick < strike

            return {
                id: chunk.id,
                type: isCall ? 'Call' : 'Put',
                asset: isCall ? token0.symbol : token1.symbol,
                strike: strike,
                tickRange: `${chunk.tickLower} → ${chunk.tickUpper}`,
                width: parseInt(chunk.width),
                availableLiquidity: chunk.netLiquidity,
                delta: calculateDelta(chunk, currentTick),
                activePositions:
                    parseInt(chunk.shortCounts) + parseInt(chunk.longCounts),
                moneyness: isITM ? 'ITM' : 'OTM',
                chunk: chunk,
            }
        })
        .sort((a, b) => a.strike - b.strike)

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Position Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Strike
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Moneyness
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Width
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Available Liquidity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Delta
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Active Positions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {availablePositions.map((position) => (
                        <tr key={position.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            position.type === 'Call'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {position.type}
                                    </span>
                                    <span className="text-sm text-gray-900">
                                        {position.asset}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-4 font-mono text-sm whitespace-nowrap text-gray-900">
                                {position.strike.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span
                                    className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
                                        position.moneyness === 'ITM'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {position.moneyness}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-900">
                                {position.width}
                            </td>
                            <td className="px-4 py-4 text-center font-mono text-sm whitespace-nowrap text-gray-900">
                                {formatLiquidity(position.availableLiquidity)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                {position.delta.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-900">
                                {position.activePositions}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {availablePositions.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                    No positions available for purchase
                </div>
            )}
        </div>
    )
}
export default PositionsTable
