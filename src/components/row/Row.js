import './Row.css'

export function BuyRow(props) {
    const style = {
        backgroundImage: `linear-gradient(
            to left,
            rgba(2, 199, 122, 0.25),
            rgba(2, 199, 122, 0.25) ${props.percent}%,
            rgba(0, 0, 0, 0) ${props.percent}%
        `,
        animationName: props.isChanged ? 'buyFlash' : 'none',
        animationDuration: '0.2s'
    }

    return <tr className={'row'} style={style}>{props.children}</tr>
}

export function SellRow(props) {
    const style = {
        backgroundImage: `linear-gradient(
            to right,
            rgba(255, 59, 105, 0.25),
            rgba(255, 59, 105, 0.25) ${props.percent}%,
            rgba(0, 0, 0, 0) ${props.percent}%
        `,
        animationName: props.isChanged ? 'sellFlash' : 'none',
        animationDuration: '0.2s'
    }

    return <tr className={'row'}  style={style}>{props.children}</tr>
}