import { useEffect } from 'react'

const BTSE_SPOT_WEBSOCKET_URL = 'wss://ws.btse.com/ws/spot'
// const FTX_WEBSOCKET_URL = 'wss://ftx.com/ws/'

function App() {
  useEffect(() => {
    const ws = new WebSocket(BTSE_SPOT_WEBSOCKET_URL)

    ws.onopen = () => {
      console.log('websocket is open now')
      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: ['orderBookApi:BTSE-USDT_0'],
        }),
      )
    }
    ws.onmessage = (evt) => {
      // console.log(evt.data)
    }
    ws.onclose = () => {
      console.log('websocket is closed')
    }
    ws.onerror = (error) => {
      console.log(error)
    }
  })

  return <div>FTX-look order book (source: BTSE spot websocket data)</div>
}

export default App
