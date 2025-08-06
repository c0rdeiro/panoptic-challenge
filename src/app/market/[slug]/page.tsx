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
        <div className="min-h-screen bg-gray-950 text-white">
            <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <button
                        onClick={() => back()}
                        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                    >
                        <IoIosArrowBack className="mr-2 h-5 w-5" />
                        Back to Markets
                    </button>
                </div>
            </div>
            <PoolInfoContainer poolId={slug} />
        </div>
    )
}
