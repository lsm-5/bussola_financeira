import styled from 'styled-components/native';
import {BlueMunsell, White} from '../../styles/colors';

interface IconExistsProps {
  iconExists: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const HeaderProfile = styled.View`
  min-width: 100%;
  height: 60px;
  background-color: ${BlueMunsell};
  padding: 20px;

  flex-direction: row;
  align-items: center;

  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
`;

export const HeaderName = styled.Text<IconExistsProps>`
  margin-top: 10px;
  color: ${White};
  font-size: 20px;
  min-width: 100%;
  padding-right: 5%;

  text-align: ${(props) => (props.iconExists ? 'left' : 'center')};
`;

export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  left: 15px;
`;

export const Goals = styled.View`
  margin: 20px;
`;

export const GoalsTitle = styled.Text`
  color: ${BlueMunsell};
  font-size: 18px;
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const ViewGoalName = styled.View<IconExistsProps>`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-left: ${(props) => (props.iconExists ? 0 : 25)};
`;

export const ViewContent = styled.View`
  justify-content: space-around;
  flex: 1;
`;

export const ViewGoal = styled.View`
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 20px;
`;

export const TextTitleGoal = styled.Text`
  color: ${BlueMunsell};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const TextAmount = styled.Text`
  font-size: 20px;
`;

export const ViewDate = styled.View`
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 20px;
`;

export const TextTitleDate = styled.Text`
  color: ${BlueMunsell};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const TextDate = styled.Text`
  font-size: 20px;
`;

export const ViewContainerSugestion = styled.View`
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 20px;
`;

export const TextTitleSugestion = styled.Text`
  color: ${BlueMunsell};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ViewSugestion = styled.View`
  justify-content: space-around;
  flex-direction: row;
  padding-top: 5px;
`;

export const ViewDay = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextDayMoney = styled.Text`
  font-size: 16px;
`;

export const TextDay = styled.Text`
  color: ${BlueMunsell};
`;

export const ViewMonth = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextMonthMoney = styled.Text`
  font-size: 16px;
`;

export const TextMonth = styled.Text`
  color: ${BlueMunsell};
`;
export const ViewYear = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextYearMoney = styled.Text`
  font-size: 16px;
`;

export const TextYear = styled.Text`
  color: ${BlueMunsell};
`;

export const ViewProgressContainer = styled.View`
  padding-right: 20px;
  padding-left: 20px;
`;

export const TextTitleProgress = styled.Text`
  color: ${BlueMunsell};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ViewProgress = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 5px;
`;

export const TextMoneyCurrent = styled.Text`
  font-size: 20px;
`;

export const TextPercentage = styled.Text`
  font-size: 20px;
`;

export const ButtonAddStyle = {
  buttonStyle: {
    backgroundColor: '#33cc99',
    borderColor: '#33cc99',
    height: 46,
    width: 120,
  },
  tittleStyle: {
    fontSize: 18,
  },
};

export const ButtonRemoveStyle = {
  buttonStyle: {
    backgroundColor: '#FF6666',
    borderColor: '#FF6666',
    height: 46,
    width: 120,
  },
  tittleStyle: {
    fontSize: 18,
  },
};

export const ButtonOptions = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 10px;
`;
