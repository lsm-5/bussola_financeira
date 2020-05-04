import React, {useState, useCallback} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import {useNavigation} from '@react-navigation/native';

import {useUser} from '../../hooks/user';
import ModalCreateGoal from '../../components/ModalCreateGoal';

import {
  Container,
  GoalsContainer,
  HeaderProfile,
  AvatarImage,
  HeaderName,
  HeaderGoals,
  ViewColumn,
  ViewRow,
  CardContainer,
  CardTitle,
  CardTime,
  MoneyView,
  MoneyCurrent,
  Amount,
  GoalsList,
} from './styles';

interface TransactionsObject {
  type: 'income' | 'outcome';
  value: number;
}

interface Goals {
  id: string;
  title: string;
  iconName: string;
  date: Date;
  amount: number;
  moneyCurrent: number;
  color: string;
  transactions: TransactionsObject[] | null;
  achievementAchieved: boolean;
}

const Dashboard: React.FC = () => {
  const {user} = useUser();
  const {navigate} = useNavigation();

  const [loading, setLoading] = useState(false);

  const arrayGoals: Goals[] = [
    {
      id: '1',
      title: 'Viajar',
      iconName: 'airplane-takeoff',
      date: new Date(),
      amount: 1000,
      moneyCurrent: 200,
      color: '#c12',
      achievementAchieved: false,
      transactions: null,
    },
    {
      id: '2',
      title: 'Viajar',
      iconName: 'airplane-takeoff',
      date: new Date(),
      amount: 1000,
      moneyCurrent: 200,
      color: '#3587a4ff',
      achievementAchieved: false,
      transactions: null,
    },
  ];

  const handleModalFalse = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <Container>
      <ModalCreateGoal loading={loading} setLoading={handleModalFalse} />
      <HeaderProfile onPress={() => navigate('Profile')}>
        <AvatarImage
          source={{
            uri: user.avatarUri,
          }}
        />
        <ViewColumn>
          <HeaderName>{`Olá ${user.name}!`}</HeaderName>
          <HeaderGoals>Abaixo estão suas metas</HeaderGoals>
        </ViewColumn>
      </HeaderProfile>

      <GoalsContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GoalsList
            data={arrayGoals}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return item.achievementAchieved === false ? (
                <CardContainer>
                  <ViewRow>
                    <CardTitle color={item.color}>{item.title}</CardTitle>
                    <Icon
                      name={item.iconName}
                      size={20}
                      color={item.color}
                      style={{marginLeft: 10}}
                    />
                  </ViewRow>
                  <CardTime>Em 06 de agosto de 2021</CardTime>
                  <Progress.Bar
                    progress={item.moneyCurrent / item.amount}
                    width={Dimensions.get('screen').width - 60}
                    height={12}
                    borderRadius={6}
                    color={item.color}
                  />
                  <MoneyView>
                    <MoneyCurrent color={item.color}>R$ 200,00</MoneyCurrent>
                    <Amount color={item.color}>R$ 1000,00</Amount>
                  </MoneyView>
                </CardContainer>
              ) : (
                <></>
              );
            }}
          />
        </ScrollView>
      </GoalsContainer>
      <ActionButton
        buttonColor="#3587a4ff"
        offsetX={20}
        onPress={() => setLoading(true)}
      />
    </Container>
  );
};

export default Dashboard;
