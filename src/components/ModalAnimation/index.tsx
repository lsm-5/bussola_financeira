import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import loading_animation from '../../assets/congratulation.json';

import {TextAnimation} from './styles';

interface ModalAnimationProps {
  visible: boolean;
}

const ModalAnimation: React.FC<ModalAnimationProps> = ({visible}) => {
  return (
    <Modal
      isVisible={visible}
      style={{
        backgroundColor: (props) => props.theme.primary,
        height: '70%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        resizeMode="contain"
        autoSize
        source={loading_animation}
        autoPlay
        loop
        speed={1.5}
      />
      <TextAnimation>Parabéns! Você alcançou um meta.</TextAnimation>
    </Modal>
  );
};

export default ModalAnimation;
