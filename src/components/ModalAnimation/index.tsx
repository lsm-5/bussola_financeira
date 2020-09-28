import React from 'react';
import LottieView from 'lottie-react-native';
import loading_animation from '../../assets/congratulation.json';

import {TextAnimation, ModalView} from './styles';

interface ModalAnimationProps {
  visible: boolean;
}

const ModalAnimation: React.FC<ModalAnimationProps> = ({visible}) => {
  return (
    <ModalView isVisible={visible}>
      <LottieView
        resizeMode="contain"
        autoSize
        source={loading_animation}
        autoPlay
        loop
        speed={1.5}
      />
      <TextAnimation>Parabéns! Você alcançou um meta.</TextAnimation>
    </ModalView>
  );
};

export default ModalAnimation;
