import { useEffect, useState } from 'react'
import { OrderBook } from './components/OrderBook'
import styled from 'styled-components'
import { Menu } from './components/Menu'
import { BTSE_SPOT_WEBSOCKET_URL, BASE_CURRENCY, QUOTE_CURRENCY } from './config'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`

function App() {
  const [baseCurrency, setBaseCurrency] = useState(BASE_CURRENCY.BTSE)
  const [data, setData] = useState(null)

  // const prevBaseCurrencyRef = useRef()
  // useEffect(() => {
  //   prevBaseCurrencyRef.current = baseCurrency
  // })
  // const prevBaseCurrency = prevBaseCurrencyRef.current

  useEffect(() => {
    const ws = new WebSocket(BTSE_SPOT_WEBSOCKET_URL)
    ws.onopen = () => {
      console.log('websocket is open now')
      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: [`orderBookL2Api:BTSE-${QUOTE_CURRENCY}_0`],
        }),
      )
    }
    ws.onmessage = (evt) => {
      // console.log(evt.data)
      const source = JSON.parse(evt.data)
      setData(source.data)
    }
    ws.onclose = () => {
      console.log('websocket is closed')
    }
    ws.onerror = (error) => {
      console.log(error)
    }
  }, [])

  return (
    <Flex>
      <Menu setBaseCurrency={setBaseCurrency} />
      <p>{baseCurrency}</p>
      <Main>
        <OrderBook data={data} baseCurrency={baseCurrency} />
      </Main>
    </Flex>
  )
}

export default App
