import styled from 'styled-components'
import { toLocale } from '../util/util'

const Wrapper = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  //box-shadow: #e0e0e0 2px 2px 2px 2px;
  //box-shadow: 5px 8px 24px 5px rgba(224, 224, 224, 1);
  box-shadow: 2px 3px 11px 7px rgba(224, 224, 224, 0.5);
  font-size: 12px;

  background: white;
  position: absolute;
  top: ${props => props.top}px;
  ${props => props.isBid ? 'left: 20px' : 'right: 20px'};
  z-index: 2;

  span:first-child {
    padding-right: 8px;
    border-right: 1px solid #e0e0e0;
  }

  span:nth-child(2) {
    padding-left: 8px;
  }
`

export function InfoPopup(props) {
  const top = (Number(props.currentIndex) + 1) * 28 + 84
  return (
    <Wrapper top={top} isBid={props.isBid}>
      <span>
        {props.currentIndex} Average Price: {toLocale(props.quote.avg)}
      </span>
      <span>
        Total: {toLocale(props.quote.culmulativeTotal)} {props.currency}
      </span>
    </Wrapper>
  )
}
