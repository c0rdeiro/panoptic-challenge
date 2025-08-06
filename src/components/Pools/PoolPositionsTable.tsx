import calculateDelta from '@/lib/calculateDelta'
import { Chunk, Token } from '@/types/pools.types'
import { formatLiquidity } from '@/utils/formatNumber'

type PoolPositionsTableProps = {
    chunks: Chunk[]
    currentTick: number
    token0: Token
    token1: Token
}
const PoolPositionsTable: React.FC<PoolPositionsTableProps> = ({
    chunks,
    currentTick,
    token0,
    token1,
}) => {
    const availablePositions = chunks
        .map((chunk) => {
            const isCall = chunk.tokenType === '0'
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
        <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-800 bg-gray-900/50">
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Position Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Strike
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Moneyness
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Width
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Available Liquidity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Delta
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase">
                            Active Positions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {availablePositions.map((position) => (
                        <tr
                            key={position.id}
                            className="transition-colors hover:bg-gray-800/30"
                        >
                            <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            position.type === 'Call'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                        }`}
                                    >
                                        {position.type}
                                    </span>
                                    <span className="text-sm text-gray-300">
                                        {position.asset}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-4 font-mono text-sm whitespace-nowrap text-gray-300">
                                {position.strike.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span
                                    className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
                                        position.moneyness === 'ITM'
                                            ? 'bg-blue-700 text-blue-300'
                                            : 'bg-gray-700 text-gray-300'
                                    }`}
                                >
                                    {position.moneyness}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-300">
                                {position.width}
                            </td>
                            <td className="px-4 py-4 text-center font-mono text-sm whitespace-nowrap text-gray-300">
                                {formatLiquidity(position.availableLiquidity)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-gray-300">
                                {position.delta.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-300">
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
export default PoolPositionsTable
