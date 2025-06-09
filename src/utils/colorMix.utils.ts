export function textColorMixDark(color: string) {

    return `color-mix(in srgb, ${color}, black 20%)`
}

export function backgroundColorMixLight(color: string) {
    return `color-mix(in srgb, ${color}, white 80%)`
}



