import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import PickerDate from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TouchableOpacity} from 'react-native';
import {White} from '../../styles/colors';

import {
  Container,
  Title,
  TitleGoal,
  TitleGoalInput,
  DateViewContainer,
  DateTitle,
  DateView,
  ValueView,
  ValueText,
  ValueTextInput,
  IconContainerView,
  IconTitle,
  IconScrollView,
  IconView,
  ColorContainerView,
  ColorText,
  ColorScrollView,
  ColorView,
  PickerDateStyle,
  PickerDateCustomStyle,
  ButtonView,
  ButtonSave,
  ButtonSaveText,
  ButtonCancel,
  ButtonCancelText,
  HeaderProfile,
} from './styles';

const colors = [
  {
    cor: '#000',
    enable: false,
  },
  {
    cor: '#4169E1',
    enable: false,
  },
  {
    cor: '#4682B4',
    enable: false,
  },
  {
    cor: '#32CD32',
    enable: false,
  },
  {
    cor: '#ADFF2F',
    enable: false,
  },
  {
    cor: '#DAA520',
    enable: false,
  },
  {
    cor: '#8B4513',
    enable: false,
  },
  {
    cor: '#4B0082',
    enable: false,
  },
  {
    cor: '#DC143C',
    enable: false,
  },
  {
    cor: '#8B0000',
    enable: false,
  },
];

const icons = [
  {
    iconName: 'account',
    enable: false,
  },
  {
    iconName: 'airplane',
    enable: false,
  },
  {
    iconName: 'anchor',
    enable: false,
  },
  {
    iconName: 'bike',
    enable: false,
  },
  {
    iconName: 'boombox',
    enable: false,
  },
  {
    iconName: 'brightness-5',
    enable: false,
  },
  {
    iconName: 'bus-side',
    enable: false,
  },
  {
    iconName: 'cake-variant',
    enable: false,
  },
  {
    iconName: 'calculator',
    enable: false,
  },
  {
    iconName: 'city',
    enable: false,
  },
  {
    iconName: 'compass-outline',
    enable: false,
  },
  {
    iconName: 'cow',
    enable: false,
  },
  {
    iconName: 'desktop-mac',
    enable: false,
  },
  {
    iconName: 'dog-side',
    enable: false,
  },
  {
    iconName: 'emoticon-excited-outline',
    enable: false,
  },
  {
    iconName: 'heart',
    enable: false,
  },
  {
    iconName: 'rocket',
    enable: false,
  },
  {
    iconName: 'tshirt-crew-outline',
    enable: false,
  },
];

interface ModalCreateGoalDTO {
  loading: boolean;
  setLoading: any;
}

const ModalCreateGoal: React.FC<ModalCreateGoalDTO> = ({
  loading,
  setLoading,
}) => {
  const [date, setDate] = useState('');
  const [disableDate, setDisableDate] = useState(false);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <Modal isVisible={loading} swipeDirection="down" animationInTiming={1500}>
      <Container>
        <HeaderProfile />
        <Title>Nova Meta</Title>

        <TitleGoal>Nome da meta</TitleGoal>
        <TitleGoalInput />

        <DateViewContainer>
          <DateTitle>Data</DateTitle>
          <DateView>
            <PickerDate
              disabled={disableDate}
              style={PickerDateStyle}
              date={date}
              mode="date"
              format="DD-MM-YYYY"
              onDateChange={(dateUpdate) => setDate(dateUpdate)}
              showIcon={false}
              minDate={new Date()}
              customStyles={PickerDateCustomStyle}
            />
            <TouchableOpacity onPress={() => setDisableDate(!disableDate)}>
              <Icon name="calendar" size={40} color={White} />
            </TouchableOpacity>
          </DateView>
          <Text style={{color: White}}>
            Clique no ícone pra desativar/ativar a data
          </Text>
        </DateViewContainer>

        <ValueView>
          <ValueText>Valor</ValueText>
          <ValueTextInput keyboardType="number-pad" />
        </ValueView>

        <IconContainerView>
          <IconTitle>Icone</IconTitle>
          <IconScrollView showsHorizontalScrollIndicator={false} horizontal>
            {icons.map((icon) => {
              return (
                <IconView>
                  <Icon name={icon.iconName} size={50} color="#fff" />
                </IconView>
              );
            })}
          </IconScrollView>
        </IconContainerView>

        <ColorContainerView>
          <ColorText>Cor</ColorText>
          <ColorScrollView showsHorizontalScrollIndicator={false} horizontal>
            {colors.map((color) => {
              return <ColorView color={color.cor} />;
            })}
          </ColorScrollView>
        </ColorContainerView>

        <ButtonView>
          <ButtonSave>
            <ButtonSaveText>Criar</ButtonSaveText>
          </ButtonSave>

          <ButtonCancel onPress={setLoading()}>
            <ButtonCancelText>Cancelar</ButtonCancelText>
          </ButtonCancel>
        </ButtonView>
      </Container>
    </Modal>
  );
};

export default ModalCreateGoal;
