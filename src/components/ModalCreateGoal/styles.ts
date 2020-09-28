import styled from 'styled-components/native';

interface ColorProps {
  color: string;
}

interface ColorPropsSelected {
  color: string;
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.primary};
  padding: 5px 20px 20px 20px;
  border-radius: 8px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 25px;
  align-self: center;
  margin-bottom: 10px;
`;

export const TitleGoal = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const TitleGoalInput = styled.TextInput`
  border-color: #fff;
  background-color: #fff;
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
  color: #fff;
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
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
};

export const ValueView = styled.View`
  margin-top: 5px;
`;

export const ValueText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const IconContainerView = styled.View``;

export const IconTitle = styled.Text`
  color: #fff;
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
  color: #fff;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ColorScrollView = styled.ScrollView``;

export const ColorView = styled.View<ColorPropsSelected>`
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.color};
  border-radius: 25px;
  margin-right: 10px;
  border-width: 2.5px;
  border-color: ${(props) => (props.selected ? '#33cc99' : '#fff')};
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const HeaderProfile = styled.View`
  min-width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.primary};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  flex-direction: row;

  border-bottom-left-radius: 120px;
  border-bottom-right-radius: 120px;
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

export const TextInformation = styled.Text`
  color: #fff;
`;

export const TextError = styled.Text`
  color: #ff6666;
`;

export const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const ModalDropdownStyle = {
  TextStyle: {color: '#fff', fontSize: 15},
  ModalStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingLeft: 4,
    paddingRight: 4,
    padding: 2,
  },
  dropdownTextHighlightStyle: {fontWeight: 'bold', color: '#fff'},
  dropdownTextStyle: {
    backgroundColor: '#3587a4',
    color: '#fff',
    fontSize: 13,
  },
};

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
