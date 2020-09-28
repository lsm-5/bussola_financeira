import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import * as Sentry from '@sentry/react-native';
import {Integrations} from '@sentry/tracing';
import Config from 'react-native-config';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => {
  Sentry.init({
    dsn: Config.SENTRY_DNS,
    integrations: [new Integrations.BrowserTracing()],
  });

  return (
    <AppContainer>
      <StatusBar barStyle="light-content" backgroundColor="#3587a4" />
      <Routes />
      <FlashMessage position="bottom" />
    </AppContainer>
  );
};

export default App;
