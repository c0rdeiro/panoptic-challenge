'use client'
import useTokenAllowance from '@/hooks/Token/useTokenAllowance'
import useTokenApprove from '@/hooks/Token/useTokenApprove'
import useTokenBalance from '@/hooks/Token/useTokenBalance'
import useCollateralTrackerDeposit from '@/hooks/useCollateralTrackerDeposit'
import calculateEstimatedAPY from '@/lib/calculateEstimatedAPY'
import { PanopticPool } from '@/types/pools.types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { toast } from 'sonner'
import { Address } from 'viem'

type DepositModalProps = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    poolInfo: PanopticPool
    ethUsdPrice: number
}

const DepositModal: React.FC<DepositModalProps> = ({
    isOpen,
    setIsOpen,
    poolInfo,
    ethUsdPrice,
}) => {
    const { collateral0, collateral1, token0, token1 } = poolInfo
    const [depositAmount, setDepositAmount] = useState(0)
    const [selectedCollateral, setSelectedCollateral] = useState(collateral0)
    const { tokenBalance: token0Balance = 0n } = useTokenBalance(
        token0.id as Address
    )
    const { tokenAllowance: token0Allowance = 0n } = useTokenAllowance(
        token0.id as Address,
        collateral0.id as Address
    )
    const { tokenBalance: token1Balance = 0n } = useTokenBalance(
        token1.id as Address
    )
    const { tokenAllowance: token1Allowance = 0n } = useTokenAllowance(
        token1.id as Address,
        collateral1.id as Address
    )

    const { approveToken, isApproveError, isApproveLoading, isApproveSuccess } =
        useTokenApprove()
    const { deposit, isDepositError, isDepositLoading, isDepositSuccess } =
        useCollateralTrackerDeposit()

    useEffect(() => {
        if (isApproveSuccess && userHasEnoughAllowance) {
            toast.success('Token approved, depositing...')
            depositCurrentSelected()
        }
    }, [isApproveSuccess, isApproveError])

    useEffect(() => {
        if (isDepositSuccess) {
            toast.success('Deposit successful')
        }
        if (isDepositError) {
            toast.error('Error depositing, please try again')
        }
    }, [isDepositSuccess, isDepositError])
    if (!isOpen) return null

    const getCurrentCollateralSharePrice = () => {
        return parseFloat(selectedCollateral.totalShares) > 0
            ? parseFloat(selectedCollateral.totalAssets) /
                  parseFloat(selectedCollateral.totalShares)
            : 1
    }

    const depositCurrentSelected = () =>
        deposit(selectedCollateral, depositAmount)

    const approveCurrentToken = () =>
        approveToken(
            depositAmount,
            selectedCollateral.id as Address,
            selectedCollateral.token.id as Address
        )

    const userHasEnoughAllowance =
        (selectedCollateral.id === token0.id &&
            Number(token0Allowance) < depositAmount) ||
        (selectedCollateral.id === token1.id &&
            Number(token1Allowance) < depositAmount)

    const userHasEnoughBalance =
        (selectedCollateral.id === token0.id &&
            Number(token0Balance) < depositAmount) ||
        (selectedCollateral.id === token1.id &&
            Number(token1Balance) < depositAmount)

    const handleDeposit = () => {
        if (!depositAmount) {
            toast.error('No amount provided.')
        }
        if (!userHasEnoughBalance) {
            toast.error('Not enough funds')
        }

        //check allowance
        if (userHasEnoughAllowance) {
            approveCurrentToken()
        } else {
            depositCurrentSelected()
        }
    }

    const getActionButtonLabel = () => {
        if (!userHasEnoughBalance) {
            return 'Not enough funds.'
        } else if (!userHasEnoughAllowance) {
            return 'Approve'
        } else if (isApproveLoading) {
            return 'Approving'
        } else if (isDepositLoading) {
            return 'Depositing'
        } else {
            return 'Deposit'
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            <div className="relative mx-4 flex w-full max-w-md flex-col gap-5 rounded-2xl border border-gray-800 bg-gray-900 p-5 pt-2 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-800 p-4">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Deposit Liquidity
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            {token0.symbol}/{token1.symbol}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-2 transition-colors hover:bg-gray-800"
                    >
                        <IoCloseSharp className="h-5 w-5 text-gray-400" />
                    </button>
                </div>
                <div className="flex w-full">
                    <button
                        className={`w-full cursor-pointer rounded p-2 text-sm font-semibold text-white ${selectedCollateral.id === collateral0.id ? 'bg-blue-900 text-blue-800' : 'bg-gray-900'}`}
                        onClick={() => setSelectedCollateral(collateral0)}
                    >
                        {collateral0.token.symbol}
                    </button>
                    <button
                        className={`w-full cursor-pointer rounded p-2 text-sm font-semibold text-white ${selectedCollateral.id === collateral1.id ? 'bg-blue-900 text-blue-800' : 'bg-gray-900'}`}
                        onClick={() => setSelectedCollateral(collateral1)}
                    >
                        {collateral1.token.symbol}
                    </button>
                </div>
                <div>
                    <div className="relative">
                        <input
                            type="number"
                            value={depositAmount}
                            onChange={(e) =>
                                setDepositAmount(parseFloat(e.target.value))
                            }
                            placeholder="0.00"
                            className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-10 flex items-center pr-3">
                            <span className="text-sm text-gray-500">
                                {selectedCollateral.token.symbol}
                            </span>
                        </div>
                    </div>

                    {depositAmount > 0 && (
                        <p className="mt-1 text-sm text-gray-600">
                            You&apos;ll receive ~
                            {(
                                depositAmount / getCurrentCollateralSharePrice()
                            ).toFixed(4)}{' '}
                            PLP shares
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-600">Est. APY:</span>
                    <div className="font-medium text-green-600">
                        ~{calculateEstimatedAPY(poolInfo, ethUsdPrice)}%
                    </div>
                </div>
                <button
                    onClick={handleDeposit}
                    disabled={
                        depositAmount <= 0 ||
                        isApproveLoading ||
                        isDepositLoading ||
                        !userHasEnoughBalance
                    }
                    className="transform cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-center font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {getActionButtonLabel()}
                </button>
            </div>
        </div>
    )
}
export default DepositModal
