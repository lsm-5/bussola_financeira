export interface TransactionsObject {
  id: number;
  type: 'income' | 'outcome';
  value: number;
  date: string;
}

export interface Goals {
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

export interface GoalsSave {
  title: string;
  iconName: string | null;
  date: string | null;
  amount: number;
  moneyCurrent: number;
  color: string | null;
  transactions: TransactionsObject[] | null;
}

export interface GoalsEdit {
  id: string;
  title: string;
  iconName: string | null;
  date: string | null;
  amount: number;
  color: string | null;
}
