import './Row.css'
import styled from 'styled-components'
import { toLocale } from '../../util/util'
import classNames from 'classnames'

const Ask = styled.span`
  font-weight: bold;
  color: #ff3b69;
`

const Bid = styled.span`
  font-weight: bold;
  color: #02c77a;
`

export function Row(props) {
  const direction = props.isBid ? 'left' : 'right'
  const color = props.isBid ? 'rgba(2, 199, 122, 0.25)' : 'rgba(255, 59, 105, 0.25)'

  const style = {
    backgroundImage: `linear-gradient(
            to ${direction},
            ${color},
            ${color} ${props.percent}%,
            rgba(0, 0, 0, 0) ${props.percent}%
        `,
  }

  const handleEnter = () => {
    props.handleMouseEnter(props.quote)
  }

  const rowClasses = () => {
    return classNames('row', {
      'buy-animation': props.isChanged && props.isBid,
      'sell-animation': props.isChanged && !props.isBid,
    })
  }

  const cellClasses = () => {
    return classNames('cell', { tl: !props.isBid, tr: props.isBid })
  }

  return (
    <tr className={rowClasses()} style={style} onMouseEnter={handleEnter}>
      <td className={cellClasses()}>
        {props.isBid ? toLocale(props.quote.size) : <Ask>{toLocale(props.quote.price)}</Ask>}
      </td>
      <td className={cellClasses()}>
        {props.isBid ? <Bid>{toLocale(props.quote.price)}</Bid> : toLocale(props.quote.size)}
      </td>
    </tr>
  )
}
