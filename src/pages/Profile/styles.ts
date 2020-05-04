import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {BlueMunsell, White} from '../../styles/colors';

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
  margin: 20px;
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
