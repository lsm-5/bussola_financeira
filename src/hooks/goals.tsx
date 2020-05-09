import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import {uuid} from 'uuidv4';

interface TransactionsObject {
  type: 'income' | 'outcome';
  value: number;
}

interface Goals {
  id: string;
  title: string;
  iconName: string | null;
  date: string | null;
  amount: number;
  moneyCurrent: number;
  color: string | null;
  transactions: TransactionsObject[] | null;
  achievementAchieved: boolean;
}

interface GoalsSave {
  title: string;
  iconName: string | null;
  date: string | null;
  amount: number;
  moneyCurrent: number;
  color: string | null;
  transactions: TransactionsObject[] | null;
}

interface GoalsContext {
  goals: Goals[];
  addGoals(item: GoalsSave): Promise<void>;
  removeGoals(id: string): Promise<void>;
  incrementGoals(id: string, money: number): Promise<void>;
  decrementGoals(id: string, money: number): Promise<void>;
  getHistoric(id: string): Promise<TransactionsObject[] | null>;
}

const GoalsContext = createContext<GoalsContext | null>(null);

const GoalsProvider: React.FC = ({children}) => {
  const [goals, setGoals] = useState<Goals[]>([]);

  useEffect(() => {
    async function loadGoals(): Promise<void> {
      const goalsLoad = await AsyncStorage.getItem('@BussolaFinanceira:goals');

      if (goalsLoad) {
        setGoals(JSON.parse(goalsLoad));
      }
    }

    loadGoals();
  }, []);

  const addGoals = useCallback(
    async (goalsSave) => {
      const id = uuid();
      const newGoals = {id, achievementAchieved: false, ...goalsSave};

      setGoals([...goals, newGoals]);

      try {
        await AsyncStorage.setItem(
          '@BussolaFinanceira:goals',
          JSON.stringify(goals),
        );
      } catch (err) {
        console.log(err);
      }
    },
    [goals],
  );

  const removeGoals = useCallback(
    async (id) => {
      const indexGoals = goals.findIndex((g) => g.id === id);

      if (indexGoals === -1) {
        throw new Error('goals not found');
      }

      const goalsArray = [...goals];
      const goalsNewArray = goalsArray.filter((g) => g.id !== id);

      setGoals(goalsNewArray);

      await AsyncStorage.setItem(
        '@BussolaFinanceira:goals',
        JSON.stringify(goals),
      );
    },
    [goals],
  );

  const incrementGoals = useCallback(
    async (id, money) => {
      const indexGoals = goals.findIndex((g) => g.id === id);

      if (indexGoals === -1) {
        Alert.alert('Falha', 'meta não encontrada');
      }

      const goalsArray = [...goals];

      // increment money
      goalsArray[indexGoals] = {
        ...goalsArray[indexGoals],
        moneyCurrent: goalsArray[indexGoals].moneyCurrent + money,
      };

      // addTransaction
      if (goalsArray[indexGoals].transactions !== null) {
        goalsArray[indexGoals].transactions?.push({
          type: 'income',
          value: money,
        });
      } else {
        goalsArray[indexGoals].transactions = [{type: 'income', value: money}];
      }

      // maybe active achievementAchieved
      if (
        goalsArray[indexGoals].moneyCurrent >= goalsArray[indexGoals].amount
      ) {
        goalsArray[indexGoals] = {
          ...goalsArray[indexGoals],
          achievementAchieved: true,
          moneyCurrent: goalsArray[indexGoals].amount,
        };
      }

      setGoals(goalsArray);

      await AsyncStorage.setItem(
        '@BussolaFinanceira:goals',
        JSON.stringify(goals),
      );
    },
    [goals],
  );

  const decrementGoals = useCallback(
    async (id, money) => {
      const indexGoals = goals.findIndex((g) => g.id === id);

      if (indexGoals === -1) {
        Alert.alert('Falha', 'meta não encontrada');
      }

      const goalsArray = [...goals];

      if (money <= goalsArray[indexGoals].moneyCurrent) {
        goalsArray[indexGoals] = {
          moneyCurrent: goalsArray[indexGoals].moneyCurrent - money,
          transactions: goalsArray[indexGoals].transactions?.push({
            type: 'outcome',
            value: money,
          }),
          ...goalsArray[indexGoals],
        };
      } else {
        throw new Error("You can't remove this value");
      }

      if (goalsArray[indexGoals].moneyCurrent < goalsArray[indexGoals].amount) {
        goalsArray[indexGoals] = {
          achievementAchieved: false,
          ...goalsArray[indexGoals],
        };
      }

      setGoals(goalsArray);

      await AsyncStorage.setItem(
        '@BussolaFinanceira:goals',
        JSON.stringify(goals),
      );
    },
    [goals],
  );

  const getHistoric = useCallback(
    async (id) => {
      const indexGoals = goals.findIndex((g) => g.id === id);

      if (indexGoals === -1) {
        throw new Error('goals not found');
      }

      const goalsArray = [...goals];
      const historic = goalsArray[indexGoals].transactions;

      return historic;
    },
    [goals],
  );

  const value = React.useMemo(
    () => ({
      goals,
      addGoals,
      removeGoals,
      incrementGoals,
      decrementGoals,
      getHistoric,
    }),
    [goals, addGoals, removeGoals, incrementGoals, decrementGoals, getHistoric],
  );

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
};

function useGoals(): GoalsContext {
  const context = useContext(GoalsContext);

  if (!context) {
    throw new Error(`useGoals must be used within a GoalsProvider`);
  }

  return context;
}

export {GoalsProvider, useGoals};
