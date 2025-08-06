'use client'
import PoolInfoContainer from '@/components/Pools/PoolInfoContainer'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function PoolPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = use(params)
    const { back } = useRouter()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-200 bg-white px-4 py-5">
                <button
                    onClick={() => back()}
                    className="flex cursor-pointer items-center text-gray-600 transition-colors hover:text-gray-900"
                >
                    <IoIosArrowBack className="mr-2 h-5 w-5" />
                    Back to Markets
                </button>
            </div>
            <PoolInfoContainer poolId={slug} />
        </div>
    )
}
