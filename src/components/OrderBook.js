import { OfferBlock } from './OfferBlock'
import styled from 'styled-components'
import Big from 'big.js'

const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  box-shadow: #e0e0e0 2px 2px;
  max-width: 100%;
  position: relative;
`

const Title = styled.div`
  text-align: center;
  padding: 16px 0;
  background: white;
  position: sticky;
  top: 0;
  z-index: 1;
`

const OfferPairContainer = styled.div`
  display: flex;
  //height: calc(100vh - 70px);
  //overflow: scroll;
`

export function OrderBook({ data }) {
  // console.log(data)
  const getQuote = (quoteType, quote, length = 20) => {
    if (!quote) {
      return {}
    }
    let culmulativeTotal = 0
    let sum = Big(0)
    return quote
      .sort((a, b) => (quoteType === 'buy' ? b.price - a.price : a.price - b.price))
      .slice(0, length - 1)
      .map((q) => {
        const base = Big(q.price).times(q.size)
        sum = sum.plus(base)
        const total = Big(q.size).plus(culmulativeTotal)
        const avg = Big(sum).div(total)

        const result = {
          ...q,
          culmulativeTotal: total.toFixed(4),
          avg: avg.toFixed(4),
        }
        culmulativeTotal += Number(q.size)
        return result
      })
  }

  const buyQuote = getQuote('buy', data?.buyQuote)
  const sellQuote = getQuote('sell', data?.sellQuote)
  const maxOrderSize = data
    ? Math.max(
        Number(buyQuote[buyQuote.length - 1].culmulativeTotal),
        Number(sellQuote[sellQuote.length - 1].culmulativeTotal),
      )
    : 0

  if (!data) {
    return null
  }

  return (
    <Container>
      <Title>{data.symbol} Order Book (source: BTSE spot websocket data)</Title>
      <OfferPairContainer>
        <OfferBlock
          quoteType="buy"
          quote={buyQuote}
          symbol={data.symbol}
          maxOrderSize={maxOrderSize}
        />
        <OfferBlock
          quoteType="sell"
          quote={sellQuote}
          symbol={data.symbol}
          maxOrderSize={maxOrderSize}
        />
      </OfferPairContainer>
    </Container>
  )
}
