/* eslint-disable import/no-duplicates */
import React, {useCallback, useState} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {Button} from 'react-native-elements';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';

import formatValue from '../../utils/formatValue';
import ModalAddMoney from '../../components/ModalAddMoney';
import ModalRemoveMoney from '../../components/ModalRemoveMoney';

import {
  Container,
  ViewColumn,
  HeaderName,
  HeaderProfile,
  ButtonBack,
  Goals,
  GoalsTitle,
  ButtonView,
} from './styles';
import {BlueMunsell, White} from '../../styles/colors';

interface TransactionsObject {
  type: 'income' | 'outcome';
  value: number;
}

interface Goals {
  id: string;
  title: string;
  iconName: string | null;
  date: string | null;
  amount: number;
  moneyCurrent: number;
  color: string | null;
  transactions: TransactionsObject[] | null;
  achievementAchieved: boolean;
}

type RootStackParamList = {
  item: {item: Goals};
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
  const {params} = useRoute<ProfileScreenRouteProp>();
  const goal: Goals = params.item;
  const navigation = useNavigation();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);

  const handleModalAddFalse = useCallback(() => {
    setShowModalAdd(false);
  }, []);

  const handleModalRemoveFalse = useCallback(() => {
    setShowModalRemove(false);
  }, []);

  return (
    <Container>
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
      <HeaderProfile>
        <ButtonBack onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </ButtonBack>
        {goal.iconName !== null ? (
          <Icon
            name={goal.iconName}
            size={50}
            color={White}
            style={{marginLeft: 40, marginRight: 10}}
          />
        ) : (
          <></>
        )}
        <ViewColumn
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginLeft: goal.iconName ? 0 : 25,
          }}>
          <HeaderName iconExists={!!goal.iconName} numberOfLines={2}>
            {goal.title}
          </HeaderName>
        </ViewColumn>
      </HeaderProfile>

      <Goals>
        <GoalsTitle>Aqui está seu progresso:</GoalsTitle>
      </Goals>

      <View style={{justifyContent: 'space-around', flex: 1}}>
        <View style={{paddingRight: 20, paddingLeft: 20, marginBottom: 20}}>
          <Text
            style={{
              color: BlueMunsell,
              fontSize: 14,
              marginBottom: 5,
            }}>
            Meta:
          </Text>
          <Text style={{fontSize: 20}}>{formatValue(goal.amount)}</Text>
        </View>

        {goal.date !== null && (
          <View style={{paddingRight: 20, paddingLeft: 20, marginBottom: 20}}>
            <Text
              style={{
                color: BlueMunsell,
                fontSize: 14,
                marginBottom: 5,
              }}>
              Data limite:
            </Text>
            <Text style={{fontSize: 20}}>
              {format(
                new Date(
                  Number(goal.date.split('-')[2]),
                  Number(goal.date.split('-')[1]),
                  Number(goal.date.split('-')[0]),
                ),
                "'Em 'dd' de 'MMMM' de 'yyyy",
                {locale: pt},
              )}
            </Text>
          </View>
        )}

        <View style={{paddingRight: 20, paddingLeft: 20, marginBottom: 20}}>
          <Text
            style={{
              color: BlueMunsell,
              fontSize: 14,
              marginBottom: 5,
            }}>
            Para conseguir completar sua meta no tempo desejado você precisa
            guardar:
          </Text>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              paddingTop: 5,
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16}}>{formatValue(goal.amount)}</Text>
              <Text style={{color: BlueMunsell}}>Por dia</Text>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16}}>{formatValue(goal.amount)}</Text>
              <Text style={{color: BlueMunsell}}>Por mês</Text>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16}}>{formatValue(goal.amount)}</Text>
              <Text style={{color: BlueMunsell}}>Por ano</Text>
            </View>
          </View>
        </View>

        <View style={{paddingRight: 20, paddingLeft: 20}}>
          <Text
            style={{
              color: BlueMunsell,
              fontSize: 14,
              marginBottom: 5,
            }}>
            Você já guardou:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 20}}>{formatValue(goal.moneyCurrent)}</Text>
            <Text style={{fontSize: 20}}>
              {`${Math.floor((goal.moneyCurrent / goal.amount) * 100)}%`}
            </Text>
          </View>
          <Progress.Bar
            progress={goal.moneyCurrent / goal.amount}
            width={Dimensions.get('screen').width - 40}
            height={16}
            borderRadius={6}
            color={BlueMunsell}
          />
        </View>

        <ButtonView>
          <Button
            title="Adicionar"
            onPress={() => setShowModalAdd(true)}
            buttonStyle={{
              backgroundColor: '#33cc99',
              borderColor: '#33cc99',
              height: 46,
              width: 120,
            }}
            titleStyle={{fontSize: 18}}
          />

          <Button
            title="Remover"
            onPress={() => setShowModalRemove(true)}
            buttonStyle={{
              backgroundColor: '#FF6666',
              borderColor: '#FF6666',
              height: 46,
              width: 120,
            }}
            titleStyle={{fontSize: 18}}
          />
        </ButtonView>
      </View>
    </Container>
  );
};

export default Details;
