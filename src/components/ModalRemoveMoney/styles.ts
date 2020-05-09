import styled from 'styled-components/native';
import {BlueMunsell, White} from '../../styles/colors';

export const Container = styled.View`
  width: 320px;
  height: 230px;
  background-color: ${BlueMunsell};
  padding: 5px 20px 20px 20px;
  border-radius: 8px;

  justify-content: center;
`;

export const Title = styled.Text`
  color: ${White};
  font-size: 25px;
  align-self: center;
  margin-bottom: 10px;
`;

export const ValueView = styled.View`
  margin-top: 5px;
`;

export const ValueText = styled.Text`
  color: ${White};
  font-size: 18px;
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const NumericInputView = styled.View`
  border-color: ${White};
  background-color: ${White};
  height: 40px;
  min-width: 180px;
  border-width: 1px;
  margin-top: 5px;
  border-radius: 4px;
`;

export const TextError = styled.Text`
  color: #ff6666;
`;
