import { OfferBlock } from './OfferBlock'
import styled from 'styled-components'
import Big from 'big.js'

const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  box-shadow: #e0e0e0 2px 2px;
`

const Title = styled.p`
  text-align: center;
`

const OfferPairContainer = styled.div`
  display: flex;
`

export function OrderBook({ data }) {
  const buyQuote = data?.buyQuote.map((q, index) => {
    const size = index - 1 < 0 ? 0 : data.buyQuote[index - 1].size
    return {
      ...q,
      culmulativeTotal: Big(q.size).plus(size).toFixed(4),
    }
  })

  const sellQuote = data?.sellQuote.map((q, index) => {
    const size = index - 1 < 0 ? 0 : data.sellQuote[index - 1].size
    return {
      ...q,
      culmulativeTotal: Big(q.size).plus(size).toFixed(4),
    }
  })

  if (!data) {
    return null
  }

  return (
    <Container>
      <Title>{data.symbol} Order Book (source: BTSE spot websocket data)</Title>
      <OfferPairContainer>
        <OfferBlock quoteType="buy" quote={buyQuote} symbol={data.symbol} />
        <OfferBlock
          quoteType="sell"
          quote={sellQuote.sort((a, b) => a.price - b.price)}
          symbol={data.symbol}
        />
      </OfferPairContainer>
    </Container>
  )
}
