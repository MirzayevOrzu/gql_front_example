import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:8080',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

