export default function calculatePriceByTick(
    tick: string | null,
    decimalsToken0: number,
    decimalsToken1: number,
    precision: number = 6
): string {
    if (!tick) {
        return 'N/A'
    }

    const price =
        Math.pow(1.0001, Number(tick)) *
        Math.pow(10, decimalsToken0 - decimalsToken1)
    return price.toFixed(precision)
}
