import styled from 'styled-components'

export const BuyRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  background: linear-gradient(
    to left,
    rgba(2, 199, 122, 0.25),
    rgba(2, 199, 122, 0.25) ${(props) => props.percent}%,
    rgba(0, 0, 0, 0) ${(props) => props.percent}%
  );
`

export const SellRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  background: linear-gradient(
    to right,
    rgba(255, 59, 105, 0.25),
    rgba(255, 59, 105, 0.25) ${(props) => props.percent}%,
    rgba(0, 0, 0, 0) ${(props) => props.percent}%
  );
`
