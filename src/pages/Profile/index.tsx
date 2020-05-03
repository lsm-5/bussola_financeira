import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import ImageResizer, {Response} from 'react-native-image-resizer';
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
  AvatarButton,
} from './styles';

interface User {
  name: string;
  avatarUri: string;
}

const options = {
  noData: true,
};

const Profile: React.FC = () => {
  const {user, addUserNameAndAvatar} = useUser();

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
    </Container>
  );
};

export default Profile;
