import {useEffect, useState} from 'react'
import { OrderBook } from './components/OrderBook'

const BTSE_SPOT_WEBSOCKET_URL = 'wss://ws.btse.com/ws/spot'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const ws = new WebSocket(BTSE_SPOT_WEBSOCKET_URL)

    ws.onopen = () => {
      console.log('websocket is open now')
      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: ['orderBookL2Api:BTSE-USDT_0'],
        }),
      )
    }
    ws.onmessage = (evt) => {
      // console.log(evt.data)
      setData(evt.data)
    }
    ws.onclose = () => {
      console.log('websocket is closed')
    }
    ws.onerror = (error) => {
      console.log(error)
    }
  })

  return (
    <div>
      <OrderBook data={data}/>
    </div>
  )
}

export default App
