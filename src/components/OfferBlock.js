import { useMemo } from 'react'

export function OfferBlock({ quoteType, quote, symbol }) {
  const [baseCurrency, quoteCurrency] = useMemo(() => {
    return symbol.split('-')
  }, [symbol])

  const isBid = useMemo(() => {
    return quoteType === 'buy'
  }, [quoteType])

  const priceText = useMemo(() => {
    return isBid ? `Bid Price(${quoteCurrency})` : `Ask Price(${quoteCurrency})`
  }, [isBid, quoteCurrency])

  const sizeText = useMemo(() => {
    return isBid ? `Bid Size(${baseCurrency})` : `Ask Size(${baseCurrency})`
  }, [isBid, baseCurrency])

  return (
    <div>
      <table>
        <thead>
          <th>{priceText}</th>
          <th>{sizeText}</th>
        </thead>
      </table>
    </div>
  )
}
