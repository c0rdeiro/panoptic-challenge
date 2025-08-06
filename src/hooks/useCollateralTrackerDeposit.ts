import { CollateralTrackerAbi } from '@/abis/CollateralTracker.abi'
import { Collateral } from '@/types/pools.types'
import { Address } from 'viem'
import {
    useAccount,
    useWaitForTransactionReceipt,
    useWriteContract,
} from 'wagmi'

export default function useCollateralTrackerDeposit() {
    const { address } = useAccount()
    const { writeContract, data } = useWriteContract()

    const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
        hash: data,
        query: {
            enabled: !!data,
        },
    })

    const deposit = (collateral: Collateral, amount: number) => {
        if (!address) throw new Error('No user address found.')
        writeContract({
            abi: CollateralTrackerAbi,
            functionName: 'deposit',
            address: collateral.id as Address,
            args: [BigInt(amount), address],
        })
    }

    return {
        deposit,
        isDepositLoading: isLoading,
        isDepositSuccess: isSuccess,
        isDepositError: isError,
    }
}
