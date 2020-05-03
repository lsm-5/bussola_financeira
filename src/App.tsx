import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => {
  return (
    <AppContainer>
      <StatusBar barStyle="light-content" backgroundColor="#3587a4ff" />
      <Routes />
    </AppContainer>
  );
};

export default App;
