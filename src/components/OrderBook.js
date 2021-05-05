import { OfferBlock } from './OfferBlock'
import styled from 'styled-components'

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
  if (!data) {
    return null
  }

  return (
    <Container>
      <Title>{data.symbol} Order Book (source: BTSE spot websocket data)</Title>
      <OfferPairContainer>
        <OfferBlock quoteType="buy" quote={data.buyQuote} symbol={data.symbol} />
        <OfferBlock
          quoteType="sell"
          quote={data.sellQuote.sort((a, b) => a.price - b.price)}
          symbol={data.symbol}
        />
      </OfferPairContainer>
    </Container>
  )
}
