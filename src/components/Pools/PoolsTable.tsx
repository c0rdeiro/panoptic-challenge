'use client'
import useOldestPanopticPools from '@/hooks/useOldestPanopticPools'
import { formatFeeTier } from '@/utils/formatFeeTier'

const PoolsTable: React.FC = () => {
    const poolsData = useOldestPanopticPools()

    return (
        <table className="w-full">
            <thead className="bg-gray-300">
                <tr>
                    <th>Token 0</th>
                    <th>Token 1</th>
                    <th>Fee Tier</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {poolsData.map((pool, index) => (
                    <tr key={index}>
                        <td>{pool.token0Symbol}</td>
                        <td>{pool.token1Symbol}</td>
                        <td>{formatFeeTier(pool.feeTier)}</td>
                        <td>{pool.price.toFixed(6)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default PoolsTable
