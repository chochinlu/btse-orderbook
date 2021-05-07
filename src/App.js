import { useEffect, useState } from 'react'
import { OrderBook } from './components/OrderBook'
import styled from "styled-components";

const BTSE_SPOT_WEBSOCKET_URL = 'wss://ws.btse.com/ws/spot'

const Flex = styled.div`
  display: flex;
  justify-content: center;
`

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const ws = new WebSocket(BTSE_SPOT_WEBSOCKET_URL)

    ws.onopen = () => {
      console.log('websocket is open now')
      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: ['orderBookL2Api:BTC-USDT_0'],
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
      <OrderBook data={data} />
    </Flex>
  )
}

export default App
