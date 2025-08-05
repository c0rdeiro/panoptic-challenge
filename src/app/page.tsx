import PoolsTable from '@/components/Pools/PoolsTable'

export default function Home() {
    return (
        <div className="flex items-center justify-center p-20">
            <main className="flex flex-col">
                <PoolsTable />
            </main>
        </div>
    )
}
