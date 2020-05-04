import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {BlueMunsell, White} from '../../styles/colors';

interface ColorProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: #999999;
  padding: 5px 20px 20px 20px;
  border-radius: 8px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${White};
  font-size: 25px;
  align-self: center;
  margin-bottom: 10px;
`;

export const TitleGoal = styled.Text`
  color: ${White};
  font-size: 18px;
`;

export const TitleGoalInput = styled.TextInput`
  border-color: ${White};
  background-color: ${White};
  height: 40px;
  min-width: 180px;
  border-width: 1px;
  margin-top: 5px;
  border-radius: 4px;
`;

export const DateViewContainer = styled.View`
  min-width: 100%;
`;

export const DateTitle = styled.Text`
  color: ${White};
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const DateView = styled.View`
  flex-direction: row;
`;

export const PickerDateStyle = {
  width: '87%',
  height: 40,
  borderColor: '#fff',
  backgroundColor: '#fff',
  borderRadius: 4,
};

export const PickerDateCustomStyle = {
  dateInput: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  disabled: {
    backgroundColor: '#888',
    borderColor: '#888',
  },
};

export const ValueView = styled.View`
  margin-top: 5px;
`;

export const ValueText = styled.Text`
  color: ${White};
  font-size: 18px;
`;

export const ValueTextInput = styled.TextInput`
  border-color: ${White};
  background-color: ${White};
  height: 40px;
  min-width: 180px;
  border-width: 1px;
  margin-top: 5px;
  border-radius: 4px;
`;

export const IconContainerView = styled.View``;

export const IconTitle = styled.Text`
  color: ${White};
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const IconScrollView = styled.ScrollView``;

export const IconView = styled.View`
  margin-right: 10px;
`;

export const ColorContainerView = styled.View``;

export const ColorText = styled.Text`
  color: ${White};
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ColorScrollView = styled.ScrollView``;

export const ColorView = styled.View<ColorProps>`
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.color};
  border-radius: 25px;
  margin-right: 10px;
  border-width: 2.5px;
  border-color: ${White};
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 7px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const ButtonSave = styled(RectButton)`
  height: 46px;
  width: 35%;
  background: #33cc99;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const ButtonSaveText = styled.Text`
  color: ${White};
  font-size: 18px;
`;

export const ButtonCancel = styled(RectButton)`
  height: 46px;
  width: 35%;
  background: #ff6666;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const ButtonCancelText = styled.Text`
  color: ${White};
  font-size: 18px;
`;

export const HeaderProfile = styled.View`
  min-width: 100%;
  height: 50px;
  background-color: ${BlueMunsell};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  flex-direction: row;

  border-bottom-left-radius: 120px;
  border-bottom-right-radius: 120px;
`;
