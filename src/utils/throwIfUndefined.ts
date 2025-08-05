export default function throwIfUndefined(
    input: string | undefined,
    errorMsg: string
) {
    if (!input) {
        throw new Error(errorMsg)
    }

    return input
}
