import React from 'react';
import Modal from 'react-native-modal';

import {useNavigation} from '@react-navigation/native';

import {useGoals} from '../../hooks/goals';

import {
  Container,
  TouchableEdit,
  TextEdit,
  TouchableRemove,
  TextRemove,
  Divider,
} from './styles';

import {Goals} from '../../interfaces/goals';

interface ModalOptionsProps {
  showModal: boolean;
  showCancelModal: any;
  Goal: Goals;
  showEditModal: any;
}

const ModalOptions: React.FC<ModalOptionsProps> = ({
  showModal,
  showCancelModal,
  Goal,
  showEditModal,
}) => {
  const {removeGoals} = useGoals();
  const {navigate} = useNavigation();

  return (
    <Modal
      isVisible={showModal}
      animationIn="fadeInRight"
      animationInTiming={100}
      animationOut="fadeOutRight"
      animationOutTiming={100}
      onBackdropPress={showCancelModal}
      backdropOpacity={0}>
      <Container>
        <TouchableEdit onPress={showEditModal}>
          <TextEdit>Editar</TextEdit>
        </TouchableEdit>

        <Divider />

        <TouchableRemove
          onPress={() => removeGoals(Goal.id) && navigate('Dashboard')}>
          <TextRemove>Remover</TextRemove>
        </TouchableRemove>
      </Container>
    </Modal>
  );
};

export default ModalOptions;
