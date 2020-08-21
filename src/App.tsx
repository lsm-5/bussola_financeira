import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => {
  return (
    <AppContainer>
      <StatusBar barStyle="light-content" backgroundColor="#3587a4" />
      <Routes />
      <FlashMessage position="bottom" />
    </AppContainer>
  );
};

export default App;
