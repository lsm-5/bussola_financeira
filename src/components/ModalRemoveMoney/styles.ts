import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 230px;
  background-color: ${(props) => props.theme.primary};
  padding: 5px 20px 20px 20px;
  border-radius: 8px;

  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 25px;
  align-self: center;
  margin-bottom: 10px;
`;

export const ValueView = styled.View`
  margin-top: 5px;
`;

export const ValueText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const NumericInputView = styled.View`
  border-color: #fff;
  background-color: #fff;
  height: 40px;
  min-width: 180px;
  border-width: 1px;
  margin-top: 5px;
  border-radius: 4px;
`;

export const TextError = styled.Text`
  color: #ff6666;
`;

export const ButtonStyle = {
  SaveButtonStyle: {
    backgroundColor: '#33cc99',
    borderColor: '#33cc99',
    height: 46,
    width: 120,
  },
  TextButtonStyle: {
    fontSize: 18,
  },
  CancelButtonStyle: {
    backgroundColor: '#FF6666',
    borderColor: '#FF6666',
    height: 46,
    width: 120,
  },
};
