import styled from 'styled-components/native';
import {BlueMunsell, White} from '../../styles/colors';

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
  margin-top: 7;
  margin-left: 5;
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
  border-radius: 8;
  padding: 15px;
  border-width: 3px;
  border-color: #dcdcdc;
`;

export const CardTitle = styled.Text`
  font-weight: bold;
  font-size: 18;
  font-family: sans-serif;
  color: ${BlueMunsell};
`;

export const CardTime = styled.Text`
  color: #999;
  margin-top: 8;
  margin-bottom: 5;
`;

export const MoneyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4;
  margin-bottom: 5;
`;

export const MoneyCurrent = styled.Text`
  color: ${BlueMunsell};
`;

export const Amount = styled.Text`
  text-align: right;
  margin-right: 5;
`;
