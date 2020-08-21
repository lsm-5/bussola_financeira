/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import {ThemeProvider} from 'styled-components';
import AppRoutes from './app.routes';

import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

import {useUser} from '../hooks/user';

const Routes: React.FC = () => {
  const {theme} = useUser();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default Routes;
