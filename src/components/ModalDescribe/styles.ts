import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  padding: 20px 20px 20px 20px;
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

export const ButtonStyle = {
  SaveButtonStyle: {
    backgroundColor: '#33cc99',
    borderColor: '#33cc99',
    height: 40,
    width: 110,
  },
  TextButtonStyle: {
    fontSize: 16,
  },
};
