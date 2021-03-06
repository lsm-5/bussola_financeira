/* eslint-disable no-nested-ternary */
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {lighten} from 'polished';
import {TransactionsObject} from '../../interfaces/goals';

interface IndexProp {
  index: number;
}

interface TypeProp {
  type: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background2};
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${(props) => props.theme.primary};
  height: 50px;
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
`;

export const ViewTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 53%;
  padding-left: 2%;
`;

export const ViewTransaction = styled.View`
  padding-left: 15px;
`;

export const TextTransactionOne = styled.Text`
  color: #fff;
  max-width: 65px;
  font-size: 15px;
  text-align: center;
`;

export const TextTransactionTwo = styled.Text`
  color: #fff;
  max-width: 70px;
  font-size: 15px;
`;

export const TextTitleValue = styled.Text`
  color: #fff;
  font-size: 15px;
  width: 100px;
  text-align: center;
`;

export const TextTitleDate = styled.Text`
  color: #fff;
  font-size: 15px;
  width: 50px;
  text-align: center;
`;

export const TitleEmpty = styled.Text`
  color: #777;
  position: absolute;
  top: 30%;
`;

export const ViewEmpty = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const FlatListHistoric = styled(
  FlatList as new () => FlatList<TransactionsObject>,
)``;

export const ViewCard = styled.View<IndexProp>`
  justify-content: space-around;
  flex-direction: row;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: ${(props) =>
    props.index % 2 === 0
      ? props.theme.background2
      : props.theme.title === 'dark'
      ? lighten(0.04, props.theme.background2)
      : '#ededed'};
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ViewTypeTransaction = styled.View<TypeProp>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.type === 'income' ? '#33cc99' : '#ff6666'};
`;

export const TextValue = styled.Text`
  font-size: 14px;
  color: #777;
  width: 100px;
  text-align: center;
`;

export const TouchableOpacityDescrib = styled.TouchableOpacity`
  width: 100px;
  align-items: center;
`;

export const TextDate = styled.Text`
  font-size: 14px;
  color: #777;
  width: 50px;
  text-align: center;
`;

export const ViewDefault = styled.View`
  width: 100px;
`;
