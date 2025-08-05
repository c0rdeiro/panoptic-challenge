import PoolsTable from '@/components/Pools/PoolsTable'

export default function Home() {
    return (
        <div className="flex items-center justify-center p-10">
            <main className="flex w-full flex-col items-center justify-center">
                <PoolsTable />
            </main>
        </div>
    )
}
