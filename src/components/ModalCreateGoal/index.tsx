import React, {useState, useCallback, useRef} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modal';
import PickerDate from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NumericInput from '@wwdrew/react-native-numeric-textinput';
import ModalDropdown from 'react-native-modal-dropdown';

import {Button} from 'react-native-elements';
import {format} from 'date-fns';

import {useGoals} from '../../hooks/goals';

import {colorsGoal, iconGoal, categories} from '../OptionGoals';

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

interface ModalCreateGoalProps {
  showModal: boolean;
  showCancelModal: any;
}

const ModalCreateGoal: React.FC<ModalCreateGoalProps> = ({
  showModal,
  showCancelModal,
}) => {
  const scrollEl = useRef(null);

  const {addGoals} = useGoals();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(String(format(new Date(), 'dd-MM-yyyy')));
  const [disableDate, setDisableDate] = useState(false);
  const [money, setMoney] = useState(0);
  const [colors, setColors] = useState(() =>
    colorsGoal.map((color) => color && {color: color.color, enable: false}),
  );
  const [icons, setIcons] = useState(() =>
    iconGoal.Todos.map(
      (icon) => icon && {iconName: icon.iconName, enable: false},
    ),
  );
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

  const handleSelectCategory = useCallback((nameCategory: string) => {
    const categoryArray: [] = iconGoal[`${nameCategory}`];
    setIcons(
      categoryArray.map(
        (item: any) => item.iconName && {...item, enable: false},
      ),
    );
  }, []);

  const clearFields = useCallback(() => {
    setTitle('');
    setDate(String(format(new Date(), 'dd-MM-yyyy')));
    setDisableDate(false);
    setMoney(0);
    setColors(() =>
      colorsGoal.map((color) => color && {color: color.color, enable: false}),
    );
    setIcons(() =>
      iconGoal.Todos.map(
        (icon) => icon && {iconName: icon.iconName, enable: false},
      ),
    );
  }, []);

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
    clearFields();
  }, [
    colors,
    icons,
    date,
    disableDate,
    money,
    title,
    addGoals,
    showCancelModal,
    clearFields,
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
                date={date}
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
                  if (scrollEl !== null) {
                    scrollEl.current?.scrollTo({y: 0});
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
              ref={scrollEl}>
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
              title="Criar"
              onPress={() => handleSubmit()}
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

export default ModalCreateGoal;
