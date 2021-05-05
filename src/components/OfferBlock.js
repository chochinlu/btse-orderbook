export function OfferBlock({ quoteType, quote, symbol }) {
  const [baseCurrency, quoteCurrency] = symbol.split('-')

  const isBid = quoteType === 'buy'

  const priceText = isBid ? `Bid Price(${quoteCurrency})` : `Ask Price(${quoteCurrency})`

  const sizeText = isBid ? `Bid Size(${baseCurrency})` : `Ask Size(${baseCurrency})`

  const head = isBid ? (
    <thead>
      <th>{sizeText}</th>
      <th>{priceText}</th>
    </thead>
  ) : (
    <thead>
      <th>{priceText}</th>
      <th>{sizeText}</th>
    </thead>
  )

  return (
    <div>
      <table>
        {head}
        <tbody>
          {quote.map((q, index) => (
            <tr key={`${quoteType}-${index}`}>
              {isBid ? (
                <>
                  <td>{q.size}</td>
                  <td>{q.price}</td>
                </>
              ) : (
                <>
                  <td>{q.price}</td>
                  <td>{q.size}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
