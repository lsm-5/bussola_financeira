import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {ThemeProvider} from 'styled-components';

import Routes from './routes';
import AppContainer from './hooks';

import lightTheme from './theme/light';
import darkTheme from './theme/dark';

const App: React.FC = () => {
  const colorScheme: 'light' | 'dark' = 'lights';

  return (
    <ThemeProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
      <AppContainer>
        <StatusBar barStyle="light-content" backgroundColor="#3587a4" />
        <Routes />
        <FlashMessage position="bottom" />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
