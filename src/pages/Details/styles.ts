import styled from 'styled-components/native';
import {BlueMunsell, White} from '../../styles/colors';

interface IconExistsProps {
  iconExists: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const HeaderProfile = styled.View`
  min-width: 100%;
  height: 60px;
  background-color: ${BlueMunsell};
  padding: 20px;

  flex-direction: row;
  align-items: center;

  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
`;

export const HeaderName = styled.Text<IconExistsProps>`
  margin-top: 10px;
  color: ${White};
  font-size: 20px;
  min-width: 100%;
  padding-right: 5%;

  text-align: ${(props) => (props.iconExists ? 'left' : 'center')};
`;

export const ViewColumn = styled.View``;

export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  left: 15px;
`;

export const Goals = styled.View`
  margin: 20px;
`;

export const GoalsTitle = styled.Text`
  color: ${BlueMunsell};
  font-size: 18px;
`;

export const viewProgress = styled.View``;

export const MoneyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 5px;
`;

export const MoneyCurrent = styled.Text`
  color: ${BlueMunsell};
`;

export const Amount = styled.Text`
  text-align: right;
  margin-right: 5px;
  color: ${BlueMunsell};
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
  margin-top: 20px;
`;
