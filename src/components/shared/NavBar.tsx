import { ConnectButton } from '@rainbow-me/rainbowkit'

const NavBar: React.FC = () => {
    return (
        <nav className="flex w-full items-center justify-between bg-gray-800 px-4 py-2">
            <h1 className="text-lg font-semibold text-white">
                Panoptic Challenge
            </h1>
            <ConnectButton />
        </nav>
    )
}
export default NavBar
