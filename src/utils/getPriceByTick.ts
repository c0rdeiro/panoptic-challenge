export default function getPriceByTick(tick: number): number {
    const price = Math.pow(1.0001, tick)
    return price
}
