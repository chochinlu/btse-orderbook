import { useEffect, useRef, useState } from 'react'
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

  const hasWs = useRef(false)

  const prevBaseCurrencyRef = useRef()
  useEffect(() => {
    prevBaseCurrencyRef.current = baseCurrency
  })
  const prevBaseCurrency = prevBaseCurrencyRef.current

  const socketRef = useRef()
  useEffect(() => {
    if (!hasWs.current) {
      const ws = new WebSocket(BTSE_SPOT_WEBSOCKET_URL)
      ws.onopen = () => {
        console.log('websocket is open now')
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [`orderBookL2Api:${baseCurrency}-${QUOTE_CURRENCY}_0`],
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

      socketRef.current = ws
      hasWs.current = true
    }
  }, [baseCurrency])

  useEffect(() => {
    if (socketRef.current.readyState === 1) {
      socketRef.current.send(
        JSON.stringify({
          op: 'unsubscribe',
          args: [`orderBookL2Api:${prevBaseCurrency}-${QUOTE_CURRENCY}_0`],
        }),
      )
      socketRef.current.send(
        JSON.stringify({
          op: 'subscribe',
          args: [`orderBookL2Api:${baseCurrency}-${QUOTE_CURRENCY}_0`],
        }),
      )
    }
  }, [baseCurrency, prevBaseCurrency])

  return (
    <Flex>
      <Menu setBaseCurrency={setBaseCurrency} />
      <Main>
        <OrderBook data={data} baseCurrency={baseCurrency} />
      </Main>
    </Flex>
  )
}

export default App
