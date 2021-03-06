/* eslint-disable consistent-return */
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {showMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import {uuid} from 'uuidv4';
import {format} from 'date-fns';

import {
  Goals,
  TransactionsObject,
  GoalsEdit,
  GoalsSave,
} from '../interfaces/goals';

interface GoalsContext {
  goals: Goals[];
  addGoals(item: GoalsSave): Promise<void>;
  editGoals(item: GoalsEdit): Promise<void>;
  removeGoals(id: string): Promise<void>;
  incrementGoals(
    id: string,
    money: number,
    describe: string | null,
  ): Promise<void>;
  decrementGoals(
    id: string,
    money: number,
    describe: string | null,
  ): Promise<void>;
  setHistoric(historic: TransactionsObject[]): void;
  getHistoric(): TransactionsObject[];
  showAnimation: boolean;
}

const GoalsContext = createContext<GoalsContext | null>(null);

const GoalsProvider: React.FC = ({children}) => {
  const [goals, setGoals] = useState<Goals[]>([]);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const [historicCurrent, setHistoricCurrent] = useState<TransactionsObject[]>(
    [],
  );

  useEffect(() => {
    async function loadGoals(): Promise<void> {
      const goalsLoad = await AsyncStorage.getItem('@BussolaFinanceira:goals');

      if (goalsLoad) {
        setGoals(JSON.parse(goalsLoad));
      }
    }

    loadGoals();
    setHistoricCurrent([]);
  }, []);

  const addGoals = useCallback(
    async (goalsSave) => {
      const id = uuid();
      const newGoals = {id, achievementAchieved: false, ...goalsSave};

      try {
        setGoals([...goals, newGoals]);

        showMessage({
          message: 'Sua meta foi criada',
          type: 'success',
        });
      } catch (err) {
        showMessage({
          message: 'Sua meta não pôde ser criada, tente novamente',
          type: 'danger',
        });
      }
    },
    [goals],
  );

  const editGoals = useCallback(
    async (goalEdit) => {
      const goalsArray = [...goals];
      const indexGoals = goalsArray.findIndex((g) => g.id === goalEdit.id);
      try {
        if (indexGoals === -1) {
          showMessage({
            message: 'Meta não encontrada',
            type: 'danger',
          });
          return;
        }

        goalsArray[indexGoals] = {...goalsArray[indexGoals], ...goalEdit};

        setGoals(goalsArray);

        showMessage({
          message: 'Sua meta foi alterada',
          type: 'success',
        });
      } catch (err) {
        showMessage({
          message: 'Meta não pôde ser alterada',
          type: 'danger',
        });
      }
    },
    [goals],
  );

  const removeGoals = useCallback(
    async (id) => {
      const indexGoals = goals.findIndex((g) => g.id === id);

      if (indexGoals === -1) {
        showMessage({
          message: 'Meta não encontrada',
          type: 'danger',
        });
        return;
      }

      const goalsArray = [...goals];
      const goalsNewArray = goalsArray.filter((g) => g.id !== id);

      try {
        setGoals(goalsNewArray);

        showMessage({
          message: 'Sua meta foi removida',
          type: 'success',
        });
      } catch (err) {
        showMessage({
          message: 'Sua meta não pôde ser removida, tente novamente',
          type: 'danger',
        });
      }
    },
    [goals],
  );

  const incrementGoals = useCallback(
    async (id, money, describe) => {
      const indexGoals = goals.findIndex((g) => g.id === id);

      if (indexGoals === -1) {
        showMessage({
          message: 'Meta não encontrada',
          type: 'danger',
        });
        return;
      }

      try {
        const goalsArray = [...goals];

        // increment money
        goalsArray[indexGoals] = {
          ...goalsArray[indexGoals],
          moneyCurrent: goalsArray[indexGoals].moneyCurrent + money,
        };

        // maybe active achievementAchieved
        if (
          goalsArray[indexGoals].moneyCurrent >= goalsArray[indexGoals].amount
        ) {
          goalsArray[indexGoals] = {
            ...goalsArray[indexGoals],
            achievementAchieved: true,
          };
          setShowAnimation(true);
        }

        // addTransaction
        if (goalsArray[indexGoals].transactions !== null) {
          goalsArray[indexGoals].transactions?.push({
            id: new Date().getTime(),
            type: 'income',
            value: money,
            date: `${format(new Date(), 'dd/MM')}`,
            describe,
          });
        } else {
          goalsArray[indexGoals].transactions = [
            {
              id: new Date().getTime(),
              type: 'income',
              value: money,
              date: `${format(new Date(), 'dd/MM')}`,
              describe,
            },
          ];
        }

        setGoals(goalsArray);

        showMessage({
          message: 'Operação realizada',
          type: 'success',
        });

        setTimeout(() => {
          setShowAnimation(false);
        }, 4000);
      } catch (err) {
        showMessage({
          message: 'Operação não pôde ser realizada',
          type: 'danger',
        });
      }
    },
    [goals],
  );

  const decrementGoals = useCallback(
    async (id, money, describe) => {
      const indexGoals = goals.findIndex((g) => g.id === id);

      if (indexGoals === -1) {
        showMessage({
          message: 'Meta não encontrada',
          type: 'danger',
        });

        return;
      }

      try {
        const goalsArray = [...goals];

        if (money <= goalsArray[indexGoals].moneyCurrent) {
          goalsArray[indexGoals] = {
            ...goalsArray[indexGoals],
            moneyCurrent: goalsArray[indexGoals].moneyCurrent - money,
          };
        } else {
          showMessage({
            message: 'Você não pode remover esse valor',
            type: 'danger',
          });
          return;
        }

        // addTransaction
        if (goalsArray[indexGoals].transactions !== null) {
          goalsArray[indexGoals].transactions?.push({
            id: new Date().getTime(),
            type: 'outcome',
            value: money,
            date: `${format(new Date(), 'dd/MM')}`,
            describe,
          });
        } else {
          goalsArray[indexGoals].transactions = [
            {
              id: new Date().getTime(),
              type: 'outcome',
              value: money,
              date: `${format(new Date(), 'dd/MM')}`,
              describe,
            },
          ];
        }

        if (
          goalsArray[indexGoals].moneyCurrent < goalsArray[indexGoals].amount
        ) {
          goalsArray[indexGoals] = {
            ...goalsArray[indexGoals],
            achievementAchieved: false,
          };
        }

        setGoals(goalsArray);

        showMessage({
          message: 'Operação realizada',
          type: 'success',
        });
      } catch (err) {
        showMessage({
          message: 'Operação não pôde ser realizada',
          type: 'danger',
        });
      }
    },
    [goals],
  );

  const setHistoric = useCallback((historic) => {
    setHistoricCurrent(historic);
  }, []);

  function compare(a: TransactionsObject, b: TransactionsObject): number {
    if (a.id < b.id) {
      return 1;
    }
    if (b.id < a.id) {
      return -1;
    }
    return 0;
  }

  const getHistoric = useCallback(() => {
    if (historicCurrent.length === 0) return [];
    return historicCurrent.sort(compare);
  }, [historicCurrent]);

  const saveGoals = useCallback(async () => {
    await AsyncStorage.setItem(
      '@BussolaFinanceira:goals',
      JSON.stringify(goals),
    );
  }, [goals]);

  useEffect(() => {
    if (goals.length !== 0) {
      saveGoals();
    }
  }, [goals, saveGoals]);

  const value = React.useMemo(
    () => ({
      goals,
      addGoals,
      editGoals,
      removeGoals,
      incrementGoals,
      decrementGoals,
      setHistoric,
      getHistoric,
      showAnimation,
    }),
    [
      goals,
      addGoals,
      editGoals,
      removeGoals,
      incrementGoals,
      decrementGoals,
      setHistoric,
      getHistoric,
      showAnimation,
    ],
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
