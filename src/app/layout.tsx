import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ApolloCustomProvider } from '@/providers/ApolloCustomProvider'
import NavBar from '@/components/shared/NavBar'
import { WalletProvider } from '@/providers/WalletProvider'
import { Toaster } from 'sonner'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Panoptic Challenge',
    description: 'dapp for panoptic challenge',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-950 antialiased`}
            >
                <ApolloCustomProvider>
                    <WalletProvider>
                        <NavBar />
                        {children}
                        <Toaster />
                    </WalletProvider>
                </ApolloCustomProvider>
            </body>
        </html>
    )
}
