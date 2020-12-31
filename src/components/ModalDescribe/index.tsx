import React from 'react';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';

import {
  Container,
  Title,
  ValueView,
  ValueText,
  ButtonView,
  ButtonStyle,
} from './styles';

interface ModalAddMoneyProps {
  showModal: boolean;
  showCancelModal: any;
  infoDescribe: string;
}

const ModalAddMoney: React.FC<ModalAddMoneyProps> = ({
  showModal,
  showCancelModal,
  infoDescribe,
}) => {
  return (
    <Modal isVisible={showModal} swipeDirection="down" animationInTiming={1500}>
      <Container>
        <Title>Descrição</Title>

        <ValueView>
          <ValueText>{infoDescribe}</ValueText>
        </ValueView>

        <ButtonView>
          <Button
            title="Ok"
            onPress={() => showCancelModal()}
            buttonStyle={ButtonStyle.SaveButtonStyle}
            titleStyle={ButtonStyle.TextButtonStyle}
          />
        </ButtonView>
      </Container>
    </Modal>
  );
};

export default ModalAddMoney;
