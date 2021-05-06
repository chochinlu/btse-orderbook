import styled, { keyframes } from 'styled-components'
import { useEffect, useRef } from 'react'

const Wrapper = styled.div`
  width: 100%;
`

const Table = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  //border: 1px solid tomato;
`
const Th = styled.th`
  padding: 8px 16px;
  text-align: left;
  //border: 1px solid tomato;
`

const Rth = styled(Th)`
  text-align: right;
`

// flash animation
const flash = (isBid) => keyframes`
    0%, 100% {
      background: white;
    }
    50% {
      background: ${isBid ? 'rgba(2, 199, 122, 0.25)' : 'rgba(255, 59, 105, 0.25)'};
    }
  `

const Tr = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  animation-name: ${(props) => (props.isChanged ? flash(props.isBid) : 'none')};
  animation-duration: 0.3s;
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

export function OfferBlock({ quoteType, quote, symbol }) {
  const prevQuoteRef = useRef(null)
  useEffect(() => {
    prevQuoteRef.current = quote
  })
  const prevQuote = prevQuoteRef.current

  const [baseCurrency, quoteCurrency] = symbol.split('-')

  const isBid = quoteType === 'buy'

  const priceText = isBid ? `Bid Price(${quoteCurrency})` : `Ask Price(${quoteCurrency})`

  const sizeText = isBid ? `Bid Size(${baseCurrency})` : `Ask Size(${baseCurrency})`

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

  return (
    <Wrapper>
      <Table>
        {head}
        <tbody>
          {quote.map((q, index) => (
            <Tr key={`${quoteType}-${index}`} isChanged={isChanged(q, index)} isBid={isBid}>
              {isBid ? (
                <>
                  <Rtd>
                    {q.size} total: {q.culmulativeTotal}
                  </Rtd>
                  <Rtd>
                    <Bid>{q.price}</Bid>
                  </Rtd>
                </>
              ) : (
                <>
                  <Td>
                    <Ask>{q.price}</Ask>
                  </Td>
                  <Td>
                    {q.size} total: {q.culmulativeTotal}
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}
