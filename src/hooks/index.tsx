import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {UserProvider} from './user';

const AppProvider: React.FC = ({children}) => {
  return (
    <UserProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </UserProvider>
  );
};

export default AppProvider;
