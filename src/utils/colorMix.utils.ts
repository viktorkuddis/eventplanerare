export function textColorMixVibrant(color: string) {
    return `color-mix(in srgb, ${color}, black 20%)`
}
// export function textColorMixDark(color: string) {
//     return `color-mix(in srgb, ${color}, black 75%)`
// }

// export function textColorMixGrey(color: string) {
//     return `color-mix(in srgb, ${color}, grey 50%)`
// }

export function backgroundColorMixLight(color: string) {
    return `color-mix(in srgb, color-mix(in srgb, ${color}, grey 60%), white 90%)`



}





