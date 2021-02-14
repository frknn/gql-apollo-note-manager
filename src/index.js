import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Fonts } from './fonts/Fonts'
import App from './App';


const client = new ApolloClient({
  uri: 'https://gql-todo-api.herokuapp.com/',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeScript />
        <Fonts/>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);


