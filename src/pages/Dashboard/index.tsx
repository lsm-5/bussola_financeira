/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-duplicates */

import React, {useState, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import * as Sentry from '@sentry/react';

import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';
import formatValue from '../../utils/formatValue';
import BannerAdmob from '../../components/BannerAdmob';

import {useUser} from '../../hooks/user';
import {useGoals} from '../../hooks/goals';
import ModalCreateGoal from '../../components/ModalCreateGoal';
import ModalAnimation from '../../components/ModalAnimation';

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
  TitleEmpty,
  ViewEmpty,
} from './styles';

import {Goals, TransactionsObject} from '../../interfaces/goals';

const Dashboard: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  const {user} = useUser();
  const {navigate} = useNavigation();
  const {goals, setHistoric, showAnimation} = useGoals();

  const [showModal, setShowModal] = useState(false);

  const arrayGoals: Goals[] = goals;

  const handleModalFalse = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <Container>
      <ModalCreateGoal
        showModal={showModal}
        showCancelModal={handleModalFalse}
      />

      <ModalAnimation visible={showAnimation} />

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

      {arrayGoals.length === 0 ? (
        <ViewEmpty>
          <TitleEmpty>Ops... Você ainda não possui metas</TitleEmpty>
        </ViewEmpty>
      ) : (
        <GoalsContainer>
          <GoalsList
            data={arrayGoals}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{paddingBottom: 90}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return item.achievementAchieved === false ? (
                <CardContainer
                  onPress={() => {
                    setHistoric(
                      item.transactions === null
                        ? ([] as TransactionsObject[])
                        : item.transactions,
                    );
                    navigate('DetailsAndHistoric', {
                      screen: 'Details',
                      params: {item},
                    });
                  }}>
                  <ViewRow>
                    <ViewColumn style={{flex: 1}}>
                      <CardTitle color={item.color}>{item.title}</CardTitle>
                      <CardTime>
                        {item.date !== null &&
                          format(
                            new Date(
                              Number(item.date.split('-')[2]),
                              Number(item.date.split('-')[1]) - 1,
                              Number(item.date.split('-')[0]),
                            ),
                            "'Em 'dd' de 'MMMM' de 'yyyy",
                            {locale: pt},
                          )}
                      </CardTime>
                    </ViewColumn>
                    {item.iconName !== null ? (
                      <Icon
                        name={item.iconName}
                        size={50}
                        color={
                          item.color === null
                            ? themeContext.primary
                            : item.color
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </ViewRow>

                  <Progress.Bar
                    progress={item.moneyCurrent / item.amount}
                    width={Dimensions.get('screen').width - 60}
                    height={12}
                    borderRadius={6}
                    color={
                      item.color === null ? themeContext.primary : item.color
                    }
                  />
                  <MoneyView>
                    <MoneyCurrent color={item.color}>
                      {formatValue(item.moneyCurrent)}
                    </MoneyCurrent>
                    <Amount color={item.color}>
                      {formatValue(item.amount)}
                    </Amount>
                  </MoneyView>
                </CardContainer>
              ) : (
                <></>
              );
            }}
          />
        </GoalsContainer>
      )}

      <BannerAdmob />

      <ActionButton
        buttonColor={themeContext.primary}
        offsetX={20}
        offsetY={65}
        onPress={() => setShowModal(true)}
      />
    </Container>
  );
};

export default Sentry.withProfiler(Dashboard);
