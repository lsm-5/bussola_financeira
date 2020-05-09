import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {BlueMunsell, White} from '../../styles/colors';

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

interface ColorProps {
  color: string | null;
}

export const Container = styled.View`
  flex: 1;
  background-color: #dcdcdc;
`;

export const HeaderProfile = styled.TouchableOpacity`
  min-width: 100%;
  height: 120px;
  background-color: ${BlueMunsell};
  padding: 20px;

  flex-direction: row;

  border-bottom-left-radius: 120px;
  border-bottom-right-radius: 120px;
`;

export const AvatarImage = styled.Image`
  margin-left: 22px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 2px;
  border-color: ${White};
`;

export const HeaderName = styled.Text`
  margin-top: 10px;
  margin-left: 15px;
  color: ${White};
  font-size: 17px;
  justify-content: center;
  align-self: center;
`;

export const HeaderGoals = styled.Text`
  margin-top: 7px;
  margin-left: 5px;
  color: ${White};
  font-size: 17px;
  justify-content: center;
  align-self: center;
`;

export const ViewColumn = styled.View``;
export const ViewRow = styled.View`
  flex-direction: row;
`;

export const GoalsContainer = styled.View`
  padding: 10px;
`;

export const CardContainer = styled.TouchableOpacity`
  background-color: ${White};
  border-radius: 8px;
  padding: 15px;
  border-width: 3px;
  border-color: #dcdcdc;
`;

export const CardTitle = styled.Text<ColorProps>`
  font-weight: bold;
  font-size: 18px;
  font-family: sans-serif;

  color: ${(props) => (props.color !== null ? props.color : BlueMunsell)};
`;

export const CardTime = styled.Text`
  color: #999;
  margin-top: 8px;
  margin-bottom: 5px;
`;

export const MoneyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 5px;
`;

export const MoneyCurrent = styled.Text<ColorProps>`
  color: ${(props) => (props.color !== null ? props.color : BlueMunsell)};
`;

export const Amount = styled.Text<ColorProps>`
  text-align: right;
  margin-right: 5px;
  color: ${(props) => (props.color !== null ? props.color : BlueMunsell)};
`;

export const GoalsList = styled(FlatList as new () => FlatList<Goals>)`
  flex: 1;
`;

export const TitleEmpty = styled.Text`
  color: #999;
  position: absolute;
  top: 30%;
`;

export const ViewEmpty = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
