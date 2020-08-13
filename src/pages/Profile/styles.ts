import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {FlatList} from 'react-native';
import {BlueMunsell, White} from '../../styles/colors';

import {Goals as IGoals} from '../../interfaces/goals';

interface ColorProps {
  color: string | null;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  min-width: 100%;
  height: 150px;
  background-color: ${BlueMunsell};
  padding: 20px;
  flex-direction: row;
  align-items: center;

  flex-direction: row;

  border-bottom-left-radius: 120px;
  border-bottom-right-radius: 120px;
`;

export const Avatar = styled.Image`
  margin-left: 22px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 2px;
  border-color: ${White};
`;

export const Name = styled.TextInput`
  border: ${White};
  background-color: ${White};
  height: 40px;
  margin-left: 15px;
  min-width: 180px;
`;

export const ButtonView = styled.View`
  max-height: 30px;
  padding-top: 30px;

  justify-content: center;
  align-items: center;
`;

export const Button = styled(RectButton)`
  height: 30px;
  width: 50px;
  background: ${White};
  border-radius: 5px;

  justify-content: center;
  align-items: center;
`;

export const ButtonName = styled.Text`
  color: ${BlueMunsell};
  font-size: 12px;
`;

export const Goals = styled.View`
  margin: 20px 20px 0 20px;
`;

export const GoalsTitle = styled.Text`
  color: ${BlueMunsell};
  font-size: 18px;
`;

export const ViewDefault = styled.View``;

export const AvatarButton = styled.TouchableOpacity``;

export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 15px;
`;

export const GoalsContainer = styled.View`
  padding: 10px;
  flex: 1;
`;

export const CardContainer = styled.TouchableOpacity`
  background-color: ${White};
  border-radius: 8px;
  padding: 15px;
  border-width: 3px;
  border-color: #fff;
  margin-bottom: 5px;
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

export const GoalsList = styled(FlatList as new () => FlatList<IGoals>)`
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

export const ViewColumn = styled.View``;
export const ViewRow = styled.View`
  flex-direction: row;
`;
