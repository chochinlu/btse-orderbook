import styled from 'styled-components'

export function OfferBlock({ quoteType, quote, symbol }) {
  const [baseCurrency, quoteCurrency] = symbol.split('-')

  const isBid = quoteType === 'buy'

  const priceText = isBid ? `Bid Price(${quoteCurrency})` : `Ask Price(${quoteCurrency})`

  const sizeText = isBid ? `Bid Size(${baseCurrency})` : `Ask Size(${baseCurrency})`

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

  const Tr = styled.tr`
    border-bottom: 1px solid rgba(0, 0, 0, 0.075);
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

  return (
    <Wrapper>
      <Table>
        {head}
        <tbody>
          {quote.map((q, index) => (
            <Tr key={`${quoteType}-${index}`}>
              {isBid ? (
                <>
                  <Rtd>{q.size}</Rtd>
                  <Rtd>
                    <Bid>{q.price}</Bid>
                  </Rtd>
                </>
              ) : (
                <>
                  <Td>
                    <Ask>{q.price}</Ask>
                  </Td>
                  <Td>{q.size}</Td>
                </>
              )}
            </Tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}
