/* eslint-disable import/no-duplicates */
import React, {useCallback, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {Button} from 'react-native-elements';
import {
  format,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';
import {pt} from 'date-fns/locale';
import * as Sentry from '@sentry/react';

import formatValue from '../../utils/formatValue';
import ModalAddMoney from '../../components/ModalAddMoney';
import ModalRemoveMoney from '../../components/ModalRemoveMoney';
import ModalOptions from '../../components/ModalOptions';
import ModalEditGoal from '../../components/ModalEditGoal';

import BannerAdmob from '../../components/BannerAdmob';

import {
  Container,
  HeaderName,
  HeaderProfile,
  ButtonBack,
  Goals,
  GoalsTitle,
  ButtonView,
  ViewGoalName,
  ViewContent,
  ViewGoal,
  TextTitleGoal,
  TextAmount,
  ViewDate,
  TextTitleDate,
  TextDate,
  ViewContainerSugestion,
  TextTitleSugestion,
  ViewSugestion,
  ViewDay,
  TextDayMoney,
  TextDay,
  ViewMonth,
  TextMonthMoney,
  TextMonth,
  ViewYear,
  TextYearMoney,
  TextYear,
  ViewProgressContainer,
  TextTitleProgress,
  ViewProgress,
  TextMoneyCurrent,
  TextPercentage,
  ButtonAddStyle,
  ButtonRemoveStyle,
  ButtonOptions,
} from './styles';

import {Goals as IGoals} from '../../interfaces/goals';

type RootStackParamList = {
  item: {item: IGoals};
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'item'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'item'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const Details: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  const {params} = useRoute<ProfileScreenRouteProp>();
  const goal: IGoals = params.item;
  const navigation = useNavigation();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [showModalEditGoal, setModalEditGoal] = useState(false);

  const handleModalAddFalse = useCallback(() => {
    setShowModalAdd(false);
  }, []);

  const handleModalRemoveFalse = useCallback(() => {
    setShowModalRemove(false);
  }, []);

  const handleModalOptionsFalse = useCallback(() => {
    setShowModalOptions(false);
  }, []);

  const handleModalEditGoalCancel = useCallback(() => {
    setModalEditGoal(false);
  }, []);

  const handleModalEditGoalShow = useCallback(() => {
    setModalEditGoal(true);
  }, []);

  const countDays = useCallback(() => {
    let days;
    if (goal.date !== null) {
      days = differenceInCalendarDays(
        new Date(
          Number(goal.date.split('-')[2]),
          Number(goal.date.split('-')[1]) - 1,
          Number(goal.date.split('-')[0]),
        ),
        new Date(),
      );

      if (days <= 0) {
        return null;
      }

      return formatValue((goal.amount - goal.moneyCurrent) / days);
    }
    return null;
  }, [goal.date, goal.amount, goal.moneyCurrent]);

  const countMonth = useCallback(() => {
    let month;
    if (goal.date !== null) {
      month = differenceInCalendarMonths(
        new Date(
          Number(goal.date.split('-')[2]),
          Number(goal.date.split('-')[1]),
          Number(goal.date.split('-')[0]),
        ),
        new Date(),
      );

      if (month <= 1) {
        return null;
      }

      return formatValue((goal.amount - goal.moneyCurrent) / month);
    }
    return null;
  }, [goal.date, goal.amount, goal.moneyCurrent]);

  const countYears = useCallback(() => {
    let years;
    if (goal.date !== null) {
      years = differenceInCalendarYears(
        new Date(
          Number(goal.date.split('-')[2]) + 1,
          Number(goal.date.split('-')[1]),
          Number(goal.date.split('-')[0]),
        ),
        new Date(),
      );

      if (years <= 1) {
        return null;
      }

      return formatValue((goal.amount - goal.moneyCurrent) / years);
    }
    return null;
  }, [goal.date, goal.amount, goal.moneyCurrent]);

  return (
    <Container>
      <ModalOptions
        showModal={showModalOptions}
        showCancelModal={handleModalOptionsFalse}
        Goal={goal}
        showEditModal={handleModalEditGoalShow}
      />
      <ModalAddMoney
        idGoal={goal.id}
        showModal={showModalAdd}
        showCancelModal={handleModalAddFalse}
      />
      <ModalRemoveMoney
        idGoal={goal.id}
        showModal={showModalRemove}
        showCancelModal={handleModalRemoveFalse}
      />
      <ModalEditGoal
        showModal={showModalEditGoal}
        showCancelModal={handleModalEditGoalCancel}
        Goal={goal}
      />

      <HeaderProfile>
        <ButtonBack onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </ButtonBack>
        {goal.iconName !== null ? (
          <Icon
            name={goal.iconName}
            size={50}
            color="#fff"
            style={{marginLeft: 40, marginRight: 10}}
          />
        ) : (
          <></>
        )}
        <ViewGoalName iconExists={!!goal.iconName}>
          <HeaderName iconExists={!!goal.iconName} numberOfLines={2}>
            {goal.title}
          </HeaderName>
        </ViewGoalName>

        <ButtonOptions onPress={() => setShowModalOptions(true)}>
          <Icon name="dots-vertical" size={25} color="#fff" />
        </ButtonOptions>
      </HeaderProfile>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Goals>
          <GoalsTitle>Aqui está seu progresso:</GoalsTitle>
        </Goals>

        <ViewContent>
          <ViewGoal>
            <TextTitleGoal>Meta:</TextTitleGoal>
            <TextAmount>{formatValue(goal.amount)}</TextAmount>
          </ViewGoal>

          {goal.date !== null && (
            <ViewDate>
              <TextTitleDate>Data limite:</TextTitleDate>
              <TextDate>
                {format(
                  new Date(
                    Number(goal.date.split('-')[2]),
                    Number(goal.date.split('-')[1]) - 1,
                    Number(goal.date.split('-')[0]),
                  ),
                  "'Em 'dd' de 'MMMM' de 'yyyy",
                  {locale: pt},
                )}
              </TextDate>
            </ViewDate>
          )}

          {goal.date !== null &&
            goal.achievementAchieved === false &&
            (countDays() !== null || countMonth() !== null || countYears()) && (
              <ViewContainerSugestion>
                <TextTitleSugestion>
                  Para conseguir completar sua meta no tempo desejado você
                  precisa guardar:
                </TextTitleSugestion>
                <ViewSugestion>
                  {countDays() !== null && (
                    <ViewDay>
                      <TextDayMoney>{countDays()}</TextDayMoney>
                      <TextDay>Por dia</TextDay>
                    </ViewDay>
                  )}

                  {countMonth() !== null && (
                    <ViewMonth>
                      <TextMonthMoney>{countMonth()}</TextMonthMoney>
                      <TextMonth>Por mês</TextMonth>
                    </ViewMonth>
                  )}

                  {countYears() !== null && (
                    <ViewYear>
                      <TextYearMoney>{countYears()}</TextYearMoney>
                      <TextYear>Por ano</TextYear>
                    </ViewYear>
                  )}
                </ViewSugestion>
              </ViewContainerSugestion>
            )}

          <ViewProgressContainer>
            <TextTitleProgress>Você já guardou:</TextTitleProgress>
            <ViewProgress>
              <TextMoneyCurrent>
                {formatValue(goal.moneyCurrent)}
              </TextMoneyCurrent>
              <TextPercentage>
                {`${Math.floor((goal.moneyCurrent / goal.amount) * 100)}%`}
              </TextPercentage>
            </ViewProgress>
            <Progress.Bar
              progress={goal.moneyCurrent / goal.amount}
              width={Dimensions.get('screen').width - 40}
              height={16}
              borderRadius={6}
              color={themeContext.primary}
            />
          </ViewProgressContainer>

          <ButtonView>
            {goal.achievementAchieved === false && (
              <Button
                title="Guardar"
                onPress={() => setShowModalAdd(true)}
                buttonStyle={ButtonAddStyle.buttonStyle}
                titleStyle={ButtonAddStyle.tittleStyle}
              />
            )}

            <Button
              title="Retirar"
              onPress={() => setShowModalRemove(true)}
              buttonStyle={ButtonRemoveStyle.buttonStyle}
              titleStyle={ButtonRemoveStyle.tittleStyle}
            />
          </ButtonView>
        </ViewContent>
      </ScrollView>
      <BannerAdmob />
    </Container>
  );
};

export default Sentry.withProfiler(Details);
