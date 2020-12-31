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
  TextInputDescrib,
} from './styles';

interface ModalRemoveMoneyProps {
  showModal: boolean;
  showCancelModal: any;
  idGoal: string;
}

const ModalRemoveMoney: React.FC<ModalRemoveMoneyProps> = ({
  showModal,
  showCancelModal,
  idGoal,
}) => {
  const {decrementGoals} = useGoals();
  const {navigate} = useNavigation();
  const [describe, setDescribe] = useState(null);

  const [money, setMoney] = useState(0);
  const [submitValidation, setSubmitValidation] = useState(false);

  const handleSubmit = useCallback(async () => {
    setSubmitValidation(true);

    if (money === 0) {
      return;
    }

    setSubmitValidation(false);
    decrementGoals(idGoal, money, describe);
    showCancelModal();
    navigate('Dashboard');
  }, [idGoal, decrementGoals, money, showCancelModal, navigate, describe]);

  return (
    <Modal isVisible={showModal} swipeDirection="down" animationInTiming={1500}>
      <Container>
        <Title>Remover Valor</Title>

        <ValueView>
          <ValueText>Descrição:</ValueText>
          <TextInputDescrib
            value={describe === null ? '' : describe}
            onChangeText={(text: string) => setDescribe(text)}
          />
        </ValueView>

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
            title="Retirar"
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

export default ModalRemoveMoney;
