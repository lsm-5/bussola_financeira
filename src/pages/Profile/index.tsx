/* eslint-disable import/no-duplicates */
import React, {useState, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import {useNavigation} from '@react-navigation/native';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import ImageResizer, {Response} from 'react-native-image-resizer';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';
import * as Progress from 'react-native-progress';
import formatValue from '../../utils/formatValue';
import {useUser} from '../../hooks/user';
import {useGoals} from '../../hooks/goals';

import BannerAdmob from '../../components/BannerAdmob';

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
  ButtonTheme,
} from './styles';

import {Goals as IGoals, TransactionsObject} from '../../interfaces/goals';
import {User} from '../../interfaces/user';

const options = {
  noData: true,
};

const Profile: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  const {user, addUserNameAndAvatar, theme, changeTheme} = useUser();
  const {goals, setHistoric} = useGoals();

  const arrayGoals: IGoals[] = goals.filter((goal) => goal.achievementAchieved);

  const [userChange, setUserChange] = useState<User>({
    name: user.name,
    avatarUri: user.avatarUri,
  });

  const [avatar, setAvatar] = useState(userChange.avatarUri);

  const navigation = useNavigation();
  const {navigate} = useNavigation();

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

        <ButtonTheme onPress={() => changeTheme()}>
          <Icon2
            name={theme === 'light' ? 'moon' : 'sun'}
            size={25}
            color="#fff"
          />
        </ButtonTheme>

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
                      color={
                        item.color === null ? themeContext.primary : item.color
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
                  <Amount color={item.color}>{formatValue(item.amount)}</Amount>
                </MoneyView>
              </CardContainer>
            );
          }}
        />
        <BannerAdmob/>
      </GoalsContainer>
    </Container>
  );
};

export default Profile;
