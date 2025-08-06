import PoolsTable from '@/components/Pools/PoolsTable'

export default function Home() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-gray-950 p-10">
            <main className="flex w-full flex-col items-center justify-center">
                <PoolsTable />
            </main>
        </div>
    )
}
