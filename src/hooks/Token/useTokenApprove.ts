import { Address, erc20Abi } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export default function useTokenApprove() {
    const { writeContract, data: approveData } = useWriteContract()

    const approveToken = (
        amount: number,
        spenderAddress: Address,
        tokenAddress: Address
    ) => {
        writeContract({
            abi: erc20Abi,
            address: tokenAddress,
            functionName: 'approve',
            args: [spenderAddress, BigInt(amount)],
        })
    }

    const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
        hash: approveData,
        query: {
            enabled: !!approveData,
        },
    })

    return {
        approveToken,
        isApproveLoading: isLoading,
        isApproveSuccess: isSuccess,
        isApproveError: isError,
    }
}
