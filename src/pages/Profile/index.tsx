/* eslint-disable import/no-duplicates */
import React, {useState, useCallback} from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import ImageResizer, {Response} from 'react-native-image-resizer';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';
import * as Progress from 'react-native-progress';

import formatValue from '../../utils/formatValue';
import {useUser} from '../../hooks/user';
import {useGoals} from '../../hooks/goals';
import {BlueMunsell} from '../../styles/colors';

import {
  Container,
  Header,
  Avatar,
  Name,
  ButtonName,
  Goals,
  GoalsTitle,
  ButtonView,
  Button,
  ViewDefault,
  ButtonBack,
  AvatarButton,
  Amount,
  CardContainer,
  CardTime,
  CardTitle,
  GoalsContainer,
  GoalsList,
  MoneyCurrent,
  MoneyView,
  TitleEmpty,
  ViewEmpty,
  ViewColumn,
  ViewRow,
} from './styles';

interface User {
  name: string;
  avatarUri: string;
}

interface TransactionsObject {
  type: 'income' | 'outcome';
  value: number;
  date: string;
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

const options = {
  noData: true,
};

const Profile: React.FC = () => {
  const {user, addUserNameAndAvatar} = useUser();
  const {goals} = useGoals();

  const arrayGoals: Goals[] = goals.filter((goal) => goal.achievementAchieved);

  const [userChange, setUserChange] = useState<User>({
    name: user.name,
    avatarUri: user.avatarUri,
  });

  const [avatar, setAvatar] = useState(userChange.avatarUri);

  const navigation = useNavigation();

  const handleChooseAvatar = useCallback(() => {
    ImagePicker.launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.uri) {
        ImageResizer.createResizedImage(
          response.uri,
          200,
          200,
          'JPEG',
          100,
        ).then(({uri}: Response) => {
          setUserChange({...userChange, avatarUri: uri});
          setAvatar(uri);
        });
      }
    });
  }, [userChange]);

  const countGoalAchieved = useCallback(() => {
    const count = arrayGoals.filter((goal) => goal.achievementAchieved);
    return count.length;
  }, [arrayGoals]);

  return (
    <Container>
      <Header>
        <ButtonBack onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </ButtonBack>
        <AvatarButton onPress={handleChooseAvatar}>
          <Avatar
            source={{
              uri: avatar !== user.avatarUri ? avatar : user.avatarUri,
            }}
          />
        </AvatarButton>
        <ViewDefault>
          <Name
            defaultValue={user.name}
            onChangeText={(text) => setUserChange({...userChange, name: text})}
          />
          <ButtonView>
            <Button onPress={() => addUserNameAndAvatar(userChange)}>
              <ButtonName>Salvar</ButtonName>
            </Button>
          </ButtonView>
        </ViewDefault>
      </Header>

      <Goals>
        <GoalsTitle>Aqui estão suas metas alcançadas:</GoalsTitle>
      </Goals>

      {countGoalAchieved() === 0 && (
        <ViewEmpty>
          <TitleEmpty>Ops... você ainda não tem metas alcançadas</TitleEmpty>
        </ViewEmpty>
      )}

      <GoalsContainer>
        <GoalsList
          data={arrayGoals}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <CardContainer
                onPress={() => navigation.navigate('Details', {item})}>
                <ViewRow>
                  <ViewColumn style={{flex: 1}}>
                    <CardTitle color={item.color}>{item.title}</CardTitle>
                    <CardTime>
                      {item.date !== null &&
                        format(
                          new Date(
                            Number(item.date.split('-')[2]),
                            Number(item.date.split('-')[1]),
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
                      color={item.color === null ? BlueMunsell : item.color}
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
                  color={item.color === null ? BlueMunsell : item.color}
                />
                <MoneyView>
                  <MoneyCurrent color={item.color}>
                    {formatValue(item.moneyCurrent)}
                  </MoneyCurrent>
                  <Amount color={item.color}>{formatValue(item.amount)}</Amount>
                </MoneyView>
              </CardContainer>
            );
          }}
        />
      </GoalsContainer>
    </Container>
  );
};

export default Profile;
