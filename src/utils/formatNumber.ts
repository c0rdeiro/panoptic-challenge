export function formatUSD(value: string | number) {
    const num = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(num)) return '$0.00'

    if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(2)}B`
    } else if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(2)}M`
    } else if (num >= 1e3) {
        return `$${(num / 1e3).toFixed(2)}K`
    } else {
        return `$${num.toFixed(2)}`
    }
}

export function formatLiquidity(liquidityString: string) {
    const liquidity = parseFloat(liquidityString)

    if (liquidity === 0) return '0'

    if (liquidity >= 1e12) {
        return (liquidity / 1e12).toFixed(2) + 'T'
    } else if (liquidity >= 1e9) {
        return (liquidity / 1e9).toFixed(2) + 'B'
    } else if (liquidity >= 1e6) {
        return (liquidity / 1e6).toFixed(2) + 'M'
    } else if (liquidity >= 1e3) {
        return (liquidity / 1e3).toFixed(2) + 'K'
    } else {
        return liquidity.toFixed(2)
    }
}
