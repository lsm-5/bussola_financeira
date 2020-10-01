import React, {useState, useCallback, useRef} from 'react';
import Modal from 'react-native-modal';
import PickerDate from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, ScrollView} from 'react-native';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import {Button} from 'react-native-elements';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';

import {useGoals} from '../../hooks/goals';

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
  ViewRow,
  ModalDropdownStyle,
  ButtonStyle,
} from './styles';

import {Goals} from '../../interfaces/goals';

import {colorsGoal, iconGoal, categories} from '../OptionGoals';

interface ModalEditGoalProps {
  showModal: boolean;
  showCancelModal: any;
  Goal: Goals;
}

const ModalEditGoal: React.FC<ModalEditGoalProps> = ({
  showModal,
  showCancelModal,
  Goal,
}) => {
  const scrollElem = useRef(null);

  const {navigate} = useNavigation();
  const {editGoals} = useGoals();

  const [title, setTitle] = useState(Goal.title);
  const [date, setDate] = useState(Goal.date);
  const [disableDate, setDisableDate] = useState(Goal.date === null);
  const [money, setMoney] = useState(Goal.amount);
  const [colors, setColors] = useState(() => {
    return colorsGoal.map((c) =>
      c.color === Goal.color ? {...c, enable: true} : {...c, enable: false},
    );
  });

  const [icons, setIcons] = useState(() => {
    return iconGoal.Todos.map((i) =>
      i.iconName === Goal.iconName
        ? {...i, enable: true}
        : {...i, enable: false},
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

  const handleSelectCategory = useCallback((nameCategory: string) => {
    const categoryArray: [] = iconGoal[`${nameCategory}`];
    setIcons(
      categoryArray.map(
        (item: any) => item.iconName && {...item, enable: false},
      ),
    );
  }, []);

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
      id: Goal.id,
      title,
      iconName: icon.length > 0 ? icon[0].iconName : null,
      color: color.length > 0 ? color[0].color : null,
      date: dateOn,
      amount: money,
    };

    editGoals(goal);
    setSubmitValidation(false);
    showCancelModal();
  }, [
    Goal.id,
    colors,
    icons,
    date,
    disableDate,
    money,
    title,
    editGoals,
    showCancelModal,
  ]);

  return (
    <Modal isVisible={showModal} swipeDirection="down" animationInTiming={1500}>
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <HeaderProfile />
          <Title>Alterar Meta</Title>
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
                  date !== null
                    ? date
                    : String(format(new Date(), 'dd-MM-yyyy'))
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
                  color={disableDate ? '#ccc' : '#fff'}
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
            <ViewRow>
              <IconTitle>Ícone</IconTitle>
              <ModalDropdown
                onSelect={(index: number) => {
                  handleSelectCategory(categories[index]);
                  if (scrollElem !== null) {
                    scrollElem.current?.scrollTo({y: 0});
                  }
                }}
                defaultValue="Selecione categoria"
                options={categories}
                textStyle={ModalDropdownStyle.TextStyle}
                style={ModalDropdownStyle.ModalStyle}
                dropdownTextHighlightStyle={
                  ModalDropdownStyle.dropdownTextHighlightStyle
                }
                dropdownTextStyle={ModalDropdownStyle.dropdownTextStyle}
              />
            </ViewRow>
            <IconScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              ref={scrollElem}>
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
            <ColorText>Cor</ColorText>
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
              title="Alterar"
              onPress={() => handleSubmit() && navigate('Dashboard')}
              buttonStyle={ButtonStyle.SaveButtonStyle}
              titleStyle={ButtonStyle.TextButtonStyle}
            />

            <Button
              title="Cancelar"
              onPress={showCancelModal}
              buttonStyle={ButtonStyle.CancelButtonStyle}
              titleStyle={ButtonStyle.TextButtonStyle}
            />
          </ButtonView>
        </ScrollView>
      </Container>
    </Modal>
  );
};

export default ModalEditGoal;
