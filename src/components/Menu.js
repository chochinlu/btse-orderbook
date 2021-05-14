import { QUOTE_CURRENCY, BASE_CURRENCY } from '../config'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  background: #1c2230;
  color: rgba(255, 255, 255, 0.7);
`

const MenuItem = styled.div`
  padding: 6px 10px;
  cursor: pointer;
`

export function Menu({setBaseCurrency}) {
  return (
    <Wrapper>
      {Object.keys(BASE_CURRENCY).map((baseCurrency) => (
        <MenuItem key={baseCurrency} onClick={() => setBaseCurrency(baseCurrency)}>
          {baseCurrency}-{QUOTE_CURRENCY}
        </MenuItem>
      ))}
    </Wrapper>
  )
}
