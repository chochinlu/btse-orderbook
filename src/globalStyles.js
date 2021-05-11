import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;400&display=swap');
  body {
    font-family: 'Lato', 'Noto Sans TC', sans-serif ;
  }
`
export default GlobalStyle
