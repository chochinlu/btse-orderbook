import './Row.css'

export function Row(props) {
    const direction = props.isBid ? 'left' : 'right'
    const color = props.isBid ? 'rgba(2, 199, 122, 0.25)' : 'rgba(255, 59, 105, 0.25)'
    const flash = props.isBid ? 'buyFlash' : 'sellFlash'

    const style = {
        backgroundImage: `linear-gradient(
            to ${direction},
            ${color},
            ${color} ${props.percent}%,
            rgba(0, 0, 0, 0) ${props.percent}%
        `,
        animationName: props.isChanged ? flash : 'none',
        animationDuration: '0.2s'
    }

    return <tr className={'row'} style={style}>{props.children}</tr>
}
