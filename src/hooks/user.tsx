import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

import {User} from '../interfaces/user';

interface UserContext {
  user: User;
  addUserNameAndAvatar(item: User): Promise<void>;
  theme: 'light' | 'dark';
  changeTheme(): Promise<void>;
}

const UserContext = createContext<UserContext | null>(null);

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>({
    name: 'Anônimo',
    avatarUri: 'https://icotar.com/initials/Anônimo.png?s=200',
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const userLoad = await AsyncStorage.getItem('@BussolaFinanceira:user');
      const themeLoad = await AsyncStorage.getItem('@BussolaFinanceira:theme');

      if (userLoad) {
        setUser(JSON.parse(userLoad));
      }

      if (themeLoad) {
        setTheme(JSON.parse(themeLoad));
      }
    }

    async function loadTheme(): Promise<void> {
      const themeLoad = await AsyncStorage.getItem('@BussolaFinanceira:theme');
      if (themeLoad) {
        setTheme(JSON.parse(themeLoad));
      }
    }

    loadUser();
    loadTheme();
  }, []);

  const changeTheme = useCallback(async () => {
    const themeCurrent = theme;
    const themeSave = themeCurrent === 'light' ? 'dark' : 'light';

    setTheme(themeSave);

    await AsyncStorage.setItem(
      '@BussolaFinanceira:theme',
      JSON.stringify(themeSave),
    );
  }, [theme]);

  function checkIfAvatarNoChange(avatar: string) {
    if (avatar.includes('icotar.com')) return true;
    return false;
  }

  const addUserNameAndAvatar = useCallback(async (userSave: User) => {
    if (checkIfAvatarNoChange(userSave.avatarUri)) {
      setUser({
        name: userSave.name,
        avatarUri: `https://icotar.com/initials/${userSave.name}.png?s=200`,
      });
    } else {
      setUser(userSave);
    }

    try {
      await AsyncStorage.setItem(
        '@BussolaFinanceira:user',
        JSON.stringify(userSave),
      );

      showMessage({
        message: 'Seu perfil foi atualizado',
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'Erro ao atualizar, tente novamente',
        type: 'danger',
      });
    }
  }, []);

  const value = React.useMemo(
    () => ({user, theme, addUserNameAndAvatar, changeTheme}),
    [user, theme, addUserNameAndAvatar, changeTheme],
  );

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
