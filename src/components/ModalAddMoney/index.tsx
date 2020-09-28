import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import {useGoals} from '../../hooks/goals';

import {
  Container,
  Title,
  ValueView,
  ValueText,
  ButtonView,
  NumericInputView,
  TextError,
  ButtonStyle,
} from './styles';

interface ModalAddMoneyProps {
  showModal: boolean;
  showCancelModal: any;
  idGoal: string;
}

const ModalAddMoney: React.FC<ModalAddMoneyProps> = ({
  showModal,
  showCancelModal,
  idGoal,
}) => {
  const {incrementGoals} = useGoals();
  const [money, setMoney] = useState(0);
  const [submitValidation, setSubmitValidation] = useState(false);
  const {navigate} = useNavigation();

  const handleSubmit = useCallback(async () => {
    setSubmitValidation(true);

    if (money === 0) {
      return;
    }

    setSubmitValidation(false);
    incrementGoals(idGoal, money);
    showCancelModal();
    navigate('Dashboard');
  }, [idGoal, incrementGoals, money, showCancelModal, navigate]);

  return (
    <Modal isVisible={showModal} swipeDirection="down" animationInTiming={1500}>
      <Container>
        <Title>Adicionar Valor</Title>

        <ValueView>
          <ValueText>Valor:</ValueText>
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

        <ButtonView>
          <Button
            title="Guardar"
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
      </Container>
    </Modal>
  );
};

export default ModalAddMoney;
