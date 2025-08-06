'use client'
import { Address, erc20Abi, zeroAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export default function useTokenBalance(tokenAddress: Address) {
    const { address } = useAccount()

    const { data, isLoading, error } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [address ?? zeroAddress],
        query: { enabled: !!address },
    })

    return {
        tokenBalance: data,
        isTokenBalanceLoading: isLoading,
        tokenBalanceError: error,
    }
}
