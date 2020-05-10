import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import PickerDate from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import {Button} from 'react-native-elements';
import {format} from 'date-fns';

import {useGoals} from '../../hooks/goals';

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
  TextError,
} from './styles';

interface TransactionsObject {
  type: 'income' | 'outcome';
  value: number;
}

interface Goals {
  id: string;
  title: string;
  iconName: string | null;
  date: string | null;
  amount: number;
  moneyCurrent: number;
  color: string | null;
  transactions: TransactionsObject[] | null;
  achievementAchieved: boolean;
}

interface ModalEditGoal {
  showModal: boolean;
  showCancelModal: any;
  Goal: Goals;
}

const ModalEditGoal: React.FC<ModalEditGoal> = ({
  showModal,
  showCancelModal,
  Goal,
}) => {
  const {addGoals} = useGoals();

  const [title, setTitle] = useState(Goal.title);
  const [date, setDate] = useState(Goal.date);
  const [disableDate, setDisableDate] = useState(Goal.date === null);
  const [money, setMoney] = useState(Goal.amount);
  const [colors, setColors] = useState(() => {
    const color = [
      {
        color: '#000',
        enable: false,
      },
      {
        color: '#4169E1',
        enable: false,
      },
      {
        color: '#4682B4',
        enable: false,
      },
      {
        color: '#32CD32',
        enable: false,
      },
      {
        color: '#ADFF2F',
        enable: false,
      },
      {
        color: '#DAA520',
        enable: false,
      },
      {
        color: '#8B4513',
        enable: false,
      },
      {
        color: '#4B0082',
        enable: false,
      },
      {
        color: '#DC143C',
        enable: false,
      },
      {
        color: '#8B0000',
        enable: false,
      },
    ];

    return color.map((c) =>
      c.color === Goal.color ? {...c, enable: true} : c,
    );
  });

  const [icons, setIcons] = useState(() => {
    const icon = [
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

    return icon.map((i) =>
      i.iconName === Goal.iconName ? {...i, enable: true} : i,
    );
  });
  const [submitValidation, setSubmitValidation] = useState(false);

  const handleSelectIcon = useCallback(
    (obj) => {
      setIcons(
        icons.map((item) =>
          item.iconName === obj.iconName
            ? {...item, enable: !item.enable}
            : {...item, enable: false},
        ),
      );
    },
    [icons],
  );

  const handleSelectColor = useCallback(
    (obj) => {
      setColors(
        colors.map((item) =>
          item.color === obj.color
            ? {...item, enable: !item.enable}
            : {...item, enable: false},
        ),
      );
    },
    [colors],
  );

  const handleSubmit = useCallback(async () => {
    setSubmitValidation(true);

    if (title === '') {
      return;
    }

    if (money === 0) {
      return;
    }

    const color = colors.filter((a) => a.enable === true);
    const icon = icons.filter((a) => a.enable === true);
    const dateOn = disableDate ? null : date;

    const goal = {
      title,
      iconName: icon.length > 0 ? icon[0].iconName : null,
      color: color.length > 0 ? color[0].color : null,
      date: dateOn,
      amount: money,
      moneyCurrent: 0,
      transactions: null,
    };

    addGoals(goal);
    setSubmitValidation(false);
    showCancelModal();
  }, [
    colors,
    icons,
    date,
    disableDate,
    money,
    title,
    addGoals,
    showCancelModal,
  ]);

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
        {submitValidation && title === '' && (
          <TextError>Por favor insira um nome para sua meta</TextError>
        )}

        <DateViewContainer>
          <DateTitle>Data</DateTitle>
          <DateView>
            <PickerDate
              disabled={disableDate}
              style={PickerDateStyle}
              date={
                date !== null ? date : String(format(new Date(), 'dd-MM-yyyy'))
              }
              mode="date"
              format="DD-MM-YYYY"
              onDateChange={(dateUpdate) => setDate(dateUpdate)}
              showIcon={false}
              minDate={new Date()}
              customStyles={PickerDateCustomStyle}
            />
            <TouchableOpacity onPress={() => setDisableDate(!disableDate)}>
              <Icon
                name="calendar"
                size={40}
                color={disableDate ? '#ccc' : White}
              />
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
          {submitValidation && money === 0 && (
            <TextError>Por favor insira um valor para sua meta</TextError>
          )}
        </ValueView>

        <IconContainerView>
          <IconTitle>Icone</IconTitle>
          <IconScrollView showsHorizontalScrollIndicator={false} horizontal>
            {icons.map((icon) => {
              return (
                <TouchableOpacity
                  key={icon.iconName}
                  onPress={() => handleSelectIcon(icon)}>
                  <IconView>
                    <Icon
                      name={icon.iconName}
                      size={50}
                      color={icon.enable ? '#33cc99' : '#fff'}
                    />
                  </IconView>
                </TouchableOpacity>
              );
            })}
          </IconScrollView>
        </IconContainerView>

        <ColorContainerView>
          <ColorText>color</ColorText>
          <ColorScrollView showsHorizontalScrollIndicator={false} horizontal>
            {colors.map((color) => {
              return (
                <TouchableOpacity
                  key={color.color}
                  onPress={() => handleSelectColor(color)}>
                  <ColorView color={color.color} selected={color.enable} />
                </TouchableOpacity>
              );
            })}
          </ColorScrollView>
        </ColorContainerView>

        <ButtonView>
          <Button
            title="Criar"
            onPress={() => handleSubmit()}
            buttonStyle={{
              backgroundColor: '#33cc99',
              borderColor: '#33cc99',
              height: 46,
              width: 120,
            }}
            titleStyle={{fontSize: 18}}
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
            titleStyle={{fontSize: 18}}
          />
        </ButtonView>
      </Container>
    </Modal>
  );
};

export default ModalEditGoal;
