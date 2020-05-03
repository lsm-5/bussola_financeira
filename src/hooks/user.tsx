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
  avatarUri: string;
}

interface UserContext {
  user: User;
  addUserNameAndAvatar(item: User): Promise<void>;
}

const UserContext = createContext<UserContext | null>(null);

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>({
    name: 'Anônimo',
    avatarUri: 'https://api.adorable.io/avatars/70/3@adorable.png',
  });

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const userLoad = await AsyncStorage.getItem('@BussolaFinanceira:user');

      if (userLoad) {
        setUser(JSON.parse(userLoad));
      }
    }

    loadUser();
  }, []);

  const addUserNameAndAvatar = useCallback(async (userSave) => {
    setUser(userSave);

    await AsyncStorage.setItem(
      '@BussolaFinanceira:user',
      JSON.stringify(userSave),
    );
  }, []);

  const value = React.useMemo(() => ({user, addUserNameAndAvatar}), [
    user,
    addUserNameAndAvatar,
  ]);

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
