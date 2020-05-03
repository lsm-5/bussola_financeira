import React from 'react';
import {ScrollView, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from '../../assets/avatar.jpg';

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
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <HeaderProfile>
        <AvatarImage source={Avatar} />
        <ViewColumn>
          <HeaderName>Olá Lucas Mendonça!</HeaderName>
          <HeaderGoals>Abaixo estão suas metas</HeaderGoals>
        </ViewColumn>
      </HeaderProfile>

      <GoalsContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>

          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>

          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>

          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>

          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>

          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>

          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>

          <CardContainer>
            <ViewRow>
              <CardTitle>Viajar</CardTitle>
              <Icon
                name="airplane-takeoff"
                size={20}
                color="#3587a4ff"
                style={{marginLeft: 10}}
              />
            </ViewRow>
            <CardTime>Em 06 de agosto de 2021</CardTime>
            <Progress.Bar
              progress={0.2}
              width={Dimensions.get('screen').width - 60}
              height={12}
              borderRadius={6}
              color="#3587a4ff"
            />
            <MoneyView>
              <MoneyCurrent>R$ 200,00</MoneyCurrent>
              <Amount>R$ 1000,00</Amount>
            </MoneyView>
          </CardContainer>
        </ScrollView>
      </GoalsContainer>
    </Container>
  );
};

export default Dashboard;
