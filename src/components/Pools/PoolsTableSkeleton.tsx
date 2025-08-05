const PoolsTableSkeleton: React.FC = () => {
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
                {[...Array(10)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                        {[...Array(4)].map((_, index) => (
                            <td className="p-2" key={index}>
                                <div className="h-4 w-full rounded bg-gray-300"></div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PoolsTableSkeleton
