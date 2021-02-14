import { mode } from '@chakra-ui/theme-tools';

export default {
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.50')(props)
      }
    })
  }
}