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
  const buyQuote = () => {
    let culmulativeTotal = 0
    return data?.buyQuote
      .sort((a, b) => b.price - a.price)
      .map((q, index) => {
        const result = {
          ...q,
          culmulativeTotal: Big(q.size).plus(culmulativeTotal).toFixed(4),
        }
        culmulativeTotal += Number(q.size)
        return result
      })
  }

  const sellQuote = () => {
    let culmulativeTotal = 0
    return data?.sellQuote
      .sort((a, b) => a.price - b.price)
      .map((q, index) => {
        const result = {
          ...q,
          culmulativeTotal: Big(q.size).plus(culmulativeTotal).toFixed(4),
        }
        culmulativeTotal += Number(q.size)
        return result
      })
  }

  if (!data) {
    return null
  }

  return (
    <Container>
      <Title>{data.symbol} Order Book (source: BTSE spot websocket data)</Title>
      <OfferPairContainer>
        <OfferBlock quoteType="buy" quote={buyQuote()} symbol={data.symbol} />
        <OfferBlock quoteType="sell" quote={sellQuote()} symbol={data.symbol} />
      </OfferPairContainer>
    </Container>
  )
}
