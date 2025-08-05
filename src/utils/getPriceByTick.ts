export default function getPriceByTick(
    tick: number,
    decimalsToken0: number,
    decimalsToken1: number
): number {
    const price =
        Math.pow(1.0001, tick) * Math.pow(10, decimalsToken0 - decimalsToken1)
    return price
}
