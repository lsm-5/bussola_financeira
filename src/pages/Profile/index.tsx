import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../hooks/user';

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
} from './styles';

interface User {
  name: string;
}

const Profile: React.FC = () => {
  const {user, addUserName} = useUser();
  const [userChange, setUserChange] = useState<User>({name: user.name});
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <ButtonBack onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </ButtonBack>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatars/70/3@adorable.png`,
          }}
        />
        <ViewDefault>
          <Name
            defaultValue={user.name}
            onChangeText={(text) => setUserChange({...userChange, name: text})}
          />
          <ButtonView>
            <Button onPress={() => addUserName(userChange)}>
              <ButtonName>Salvar</ButtonName>
            </Button>
          </ButtonView>
        </ViewDefault>
      </Header>
      <Goals>
        <GoalsTitle>Aqui estão suas metas alcançadas:</GoalsTitle>
      </Goals>
    </Container>
  );
};

export default Profile;
