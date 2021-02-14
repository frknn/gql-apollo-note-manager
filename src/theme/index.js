import { extendTheme } from '@chakra-ui/react'
import fonts from './fonts'
import styles from './styles'

const overrides = {
  ...fonts,
  ...styles
}

export default extendTheme(overrides)