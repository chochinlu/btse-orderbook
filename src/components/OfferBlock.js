import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import Big from 'big.js'
import { Row } from './row/Row'

const Wrapper = styled.div`
  width: 100%;
`
const Table = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 16px;
  font-weight: 300;
`
const Th = styled.th`
  color: rgba(0, 0, 0, 0.54);
  white-space: nowrap;
  padding: 8px 16px;
  text-align: ${(props) => (props.isBid ? 'right' : 'left')};
  background: white;
  position: sticky;
  top: 0;
  z-index: 1;
`

export function OfferBlock({ quoteType, quote, symbol, maxOrderSize }) {
  const prevQuoteRef = useRef(null)
  useEffect(() => {
    prevQuoteRef.current = quote
  })
  const prevQuote = prevQuoteRef.current

  const [baseCurrency, quoteCurrency] = symbol.split('-')

  const isBid = quoteType === 'buy'

  const priceText = `${isBid ? 'Bid' : 'Ask'} Price(${quoteCurrency})`

  const sizeText = `${isBid ? 'Bid' : 'Ask'} Size(${baseCurrency})`

  const percent = (culmulativeTotal) =>
    Big(100).times(culmulativeTotal).div(maxOrderSize).toString()

  const head = (
    <thead>
      <tr>
        <Th isBid={isBid}>{isBid ? sizeText : priceText}</Th>
        <Th isBid={isBid}>{isBid ? priceText : sizeText}</Th>
      </tr>
    </thead>
  )

  const isChanged = (currentQuote, index) =>
    prevQuote &&
    (currentQuote.size !== prevQuote[index]?.size || currentQuote.price !== prevQuote[index]?.price)

  const row = (quote, index) => (
    <Row
      quote={quote}
      isBid={isBid}
      key={`buy-${index}`}
      isChanged={isChanged(quote, index)}
      percent={percent(quote.culmulativeTotal)}
    />
  )
  return (
    <Wrapper>
      <Table>
        {head}
        <tbody>{quote.map((q, index) => row(q, index))}</tbody>
      </Table>
    </Wrapper>
  )
}
