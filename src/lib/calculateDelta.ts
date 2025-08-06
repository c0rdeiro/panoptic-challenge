import { Chunk } from '@/types/pools.types'

export default function calculateDelta(
    chunk: Chunk,
    currentTick: number
): number {
    const isCall = chunk.tokenType === '0'
    const tickLower = parseInt(chunk.tickLower)
    const tickUpper = parseInt(chunk.tickUpper)

    // For positions outside their range, delta is 0 or 1
    if (currentTick <= tickLower) {
        return isCall ? 0 : 1 // Calls have no delta below range, puts have full delta
    }
    if (currentTick >= tickUpper) {
        return isCall ? 1 : 0 // Calls have full delta above range, puts have no delta
    }

    // For positions within their range, delta changes linearly
    const tickRange = tickUpper - tickLower
    const positionInRange = (currentTick - tickLower) / tickRange

    return isCall ? positionInRange : 1 - positionInRange
}
