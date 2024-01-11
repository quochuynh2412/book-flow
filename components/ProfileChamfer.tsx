export default function ProfileChamfer(props: { score: number | undefined }) {
    let chamfer = ''

    if (props.score === undefined) {
        chamfer = 'border-orange-950'
    } else if (0 <= props.score && props.score <= 3) {
        chamfer = 'border-orange-950'
    }  else if (4 <= props.score && props.score <= 6) {
        chamfer = 'border-neutral-400'
    }  else if (7 <= props.score && props.score <= 9) {
        chamfer = 'border-orange-950'
    } else {
        chamfer = 'border-indigo-600'
    }

    // switch (props.score) {
    //     case 0:
    //         chamfer = 'border-orange-950'
    //         break
    //     case 3:
    //         chamfer = 'border-neutral-400'
    //         break
    //     case 6:
    //         chamfer = 'border-yellow-300'
    //         break
    //     case undefined:
    //         chamfer = 'border-orange-950'
    //         break
    //     default:
    //         chamfer = 'border-orange-950'
    // }

    return chamfer
}