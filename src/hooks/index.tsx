import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {UserProvider} from './user';
import {GoalsProvider} from './goals';

const AppProvider: React.FC = ({children}) => {
  return (
    <UserProvider>
      <GoalsProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </GoalsProvider>
    </UserProvider>
  );
};

export default AppProvider;
