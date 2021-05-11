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
`
const Th = styled.th`
  white-space: nowrap;
  padding: 8px 16px;
  text-align: left;
`

const Rth = styled(Th)`
  text-align: right;
`

const Td = styled.td`
  padding: 4px 16px;
`
const Rtd = styled(Td)`
  text-align: right;
`
const Ask = styled.span`
  font-weight: bold;
  color: #ff3b69;
`

const Bid = styled.span`
  font-weight: bold;
  color: #02c77a;
`

export function OfferBlock({ quoteType, quote, symbol, maxOrderSize }) {
  const prevQuoteRef = useRef(null)
  useEffect(() => {
    prevQuoteRef.current = quote
  })
  const prevQuote = prevQuoteRef.current

  const [baseCurrency, quoteCurrency] = symbol.split('-')

  const isBid = quoteType === 'buy'

  const priceText = isBid ? `Bid Price(${quoteCurrency})` : `Ask Price(${quoteCurrency})`

  const sizeText = isBid ? `Bid Size(${baseCurrency})` : `Ask Size(${baseCurrency})`

  const percent = (culmulativeTotal) =>
    Big(100).times(culmulativeTotal).div(maxOrderSize).toString()

  const head = isBid ? (
    <thead>
      <tr>
        <Rth>{sizeText}</Rth>
        <Rth>{priceText}</Rth>
      </tr>
    </thead>
  ) : (
    <thead>
      <tr>
        <Th>{priceText}</Th>
        <Th>{sizeText}</Th>
      </tr>
    </thead>
  )

  const isChanged = (currentQuote, index) =>
    prevQuote &&
    (currentQuote.size !== prevQuote[index]?.size || currentQuote.price !== prevQuote[index]?.price)

  const row = (quote, index) => (
    <Row
      isBid={isBid}
      key={`buy-${index}`}
      isChanged={isChanged(quote, index)}
      percent={percent(quote.culmulativeTotal)}
    >
      {isBid ? (
        <>
          <Rtd>{quote.size}</Rtd>
          <Rtd>
            <Bid>{quote.price}</Bid>
          </Rtd>
        </>
      ) : (
        <>
          <Td>
            <Ask>{quote.price}</Ask>
          </Td>
          <Td>{quote.size}</Td>
        </>
      )}
    </Row>
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
