import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import {View} from 'react-native';
import {ApolloProvider} from '@apollo/react-hooks';
import client from './apolloSetup';
import Home from './pages/Home';
//import SignIn from './pages/SignIn';

moment.locale('es');

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

export default App;
