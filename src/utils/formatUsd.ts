export default function formatUSD(value: string | number) {
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
