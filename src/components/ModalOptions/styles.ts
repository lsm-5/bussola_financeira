import styled from 'styled-components/native';
import {lighten} from 'polished';

export const Container = styled.View`
  width: 100px;
  height: 80px;
  background-color: ${(props) => props.theme.background2};

  border-color: ${(props) => lighten(0.04, props.theme.background)};
  border-width: 1px;

  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0px;
  right: 3px;
`;

export const TouchableEdit = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextEdit = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: 16px;
`;

export const TouchableRemove = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextRemove = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: 16px;
`;

export const Divider = styled.View`
  min-width: 100%;
  height: 1px;
  border-bottom-color: ${(props) => lighten(0.04, props.theme.background)};
  border-bottom-width: 1px;
`;
