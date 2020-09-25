import styled from 'styled-components/native';
import {FlatList} from 'react-native';

import {Goals} from '../../interfaces/goals';

interface ColorProps {
  color: string | null;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const HeaderProfile = styled.TouchableOpacity`
  min-width: 100%;
  height: 120px;
  background-color: ${(props) => props.theme.primary};
  padding: 20px;

  flex-direction: row;

  border-bottom-left-radius: 120px;
  border-bottom-right-radius: 120px;
`;

export const AvatarImage = styled.Image`
  margin-left: 15px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 2px;
  border-color: #fff;
`;

export const HeaderName = styled.Text`
  margin-top: 10px;
  margin-left: 15px;
  color: #fff;
  font-size: 17px;
  justify-content: center;
  align-self: center;
  max-height: 40px;
`;

export const HeaderGoals = styled.Text`
  margin-top: 7px;
  margin-left: 5px;
  color: #fff;
  font-size: 17px;
  justify-content: center;
  align-self: center;
`;

export const ViewColumn = styled.View`
  flex: 1;
  padding-right: 11%;
`;

export const ViewRow = styled.View`
  flex-direction: row;
`;

export const GoalsContainer = styled.View`
  padding: 10px;
  flex: 1;
`;

export const CardContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.card};
  border-radius: 8px;
  padding: 15px;
  border-width: 3px;
  border-color: ${(props) => props.theme.card};
  margin-top: 5px;
`;

export const CardTitle = styled.Text<ColorProps>`
  font-weight: bold;
  font-size: 18px;
  font-family: sans-serif;

  color: ${(props) =>
    props.color !== null ? props.color : props.theme.primary};
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
  color: ${(props) =>
    props.color !== null ? props.color : props.theme.primary};
`;

export const Amount = styled.Text<ColorProps>`
  text-align: right;
  margin-right: 5px;
  color: ${(props) =>
    props.color !== null ? props.color : props.theme.primary};
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
