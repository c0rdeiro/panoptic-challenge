import { Address, erc20Abi, zeroAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export default function useTokenAllowance(
    tokenAddress: Address,
    spenderAddress: Address
) {
    const { address } = useAccount()

    const { data, isLoading, error, refetch } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'allowance',
        args: [address ?? zeroAddress, spenderAddress],
        query: { enabled: !!address },
    })

    return {
        tokenAllowance: data,
        isTokenAllowanceLoading: isLoading,
        tokenAllowanceError: error,
        refetchAllowance: refetch,
    }
}
