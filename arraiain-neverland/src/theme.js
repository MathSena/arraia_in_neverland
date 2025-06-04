import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#cc5a1e' },
    secondary: { main: '#4e2e1f' },
    background: { default: '#fef6e4', paper: '#fff7eb' },
    text: {
      primary: '#4e2e1f',
      secondary: '#5f4b3b'
    }
  },
  typography: {
    fontFamily: '"Merriweather", serif'
  }
})
export default theme
