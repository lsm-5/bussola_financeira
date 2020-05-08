import React, {useState} from 'react';
import Modal from 'react-native-modal';
import PickerDate from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import {Button} from 'react-native-elements';

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
  HeaderProfile,
  NumericInputView,
  TextInformation,
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
  showModal: boolean;
  showCancelModal: any;
}

const ModalCreateGoal: React.FC<ModalCreateGoalDTO> = ({
  showModal,
  showCancelModal,
}) => {
  const [date, setDate] = useState('');
  const [disableDate, setDisableDate] = useState(false);
  const [title, setTitle] = useState('');
  const [money, setMoney] = useState('');

  return (
    <Modal isVisible={showModal} swipeDirection="down" animationInTiming={1500}>
      <Container>
        <HeaderProfile />
        <Title>Nova Meta</Title>

        <TitleGoal>Nome da meta</TitleGoal>
        <TitleGoalInput
          defaultValue={title}
          onChangeText={(text) => setTitle(text)}
        />

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
          <TextInformation>
            Clique no ícone pra desativar/ativar a data
          </TextInformation>
        </DateViewContainer>

        <ValueView>
          <ValueText>Valor</ValueText>
          <NumericInputView>
            <NumericInput
              type="currency"
              locale="pt-BR"
              currency="BRL"
              value={money}
              onUpdate={(value: any) => setMoney(value)}
            />
          </NumericInputView>
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
          <Button
            title="Criar"
            onPress={showCancelModal}
            buttonStyle={{
              backgroundColor: '#33cc99',
              borderColor: '#33cc99',
              height: 46,
              width: 120,
            }}
          />

          <Button
            title="Cancelar"
            onPress={showCancelModal}
            buttonStyle={{
              backgroundColor: '#FF6666',
              borderColor: '#FF6666',
              height: 46,
              width: 120,
            }}
          />
        </ButtonView>
      </Container>
    </Modal>
  );
};

export default ModalCreateGoal;
