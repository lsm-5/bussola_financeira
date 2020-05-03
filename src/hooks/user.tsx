import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface User {
  name: string;
}

interface UserContext {
  user: User;
  addUserName(item: User): Promise<void>;
}

const UserContext = createContext<UserContext | null>(null);

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const userLoad = await AsyncStorage.getItem('@BussolaFinanceira:user');

      if (userLoad) {
        setUser(JSON.parse(userLoad));
      }
    }

    loadUser();
  }, []);

  const addUserName = useCallback(async (userName) => {
    setUser(userName);

    await AsyncStorage.setItem(
      '@BussolaFinanceira:user',
      JSON.stringify(userName),
    );
  }, []);

  const value = React.useMemo(() => ({addUserName, user}), [user, addUserName]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUser(): UserContext {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  return context;
}

export {UserProvider, useUser};
