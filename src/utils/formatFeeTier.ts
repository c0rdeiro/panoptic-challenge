export function formatFeeTier(feeTier: number): string {
    const percentage = feeTier / 10000 // Convert from basis points to percentage
    return `${percentage}%`
}
