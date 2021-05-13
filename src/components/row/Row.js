import './Row.css'
import styled from 'styled-components'

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
  const flash = props.isBid ? 'buyFlash' : 'sellFlash'

  const style = {
    backgroundImage: `linear-gradient(
            to ${direction},
            ${color},
            ${color} ${props.percent}%,
            rgba(0, 0, 0, 0) ${props.percent}%
        `,
    animationName: props.isChanged ? flash : 'none',
    animationDuration: '0.2s',
  }

  const tdStyle = {
    textAlign: props.isBid ? 'right' : 'left',
  }

  return (
    <tr
      className={'row'}
      style={style}
      onMouseEnter={props.handleMouseEnter}
      onMouseLeave={props.handleMouseLeave}
    >
      <td className={'cell'} style={tdStyle}>
        {props.isBid ? (
          Number(props.quote.size).toLocaleString()
        ) : (
          <Ask>{Number(props.quote.price).toLocaleString()}</Ask>
        )}
      </td>
      <td className={'cell'} style={tdStyle}>
        {props.isBid ? (
          <Bid>{Number(props.quote.price).toLocaleString()}</Bid>
        ) : (
          Number(props.quote.size).toLocaleString()
        )}
      </td>
    </tr>
  )
}
