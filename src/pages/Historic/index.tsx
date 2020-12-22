import React, {useState, useEffect} from 'react';
import * as Sentry from '@sentry/react';
import {View} from 'react-native';
import formatValue from '../../utils/formatValue';
import {useGoals} from '../../hooks/goals';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  ViewHeader,
  ViewTitle,
  ViewTransaction,
  TextTransactionOne,
  TextTransactionTwo,
  TextTitleValue,
  TextTitleDate,
  TitleEmpty,
  ViewEmpty,
  FlatListHistoric,
  ViewCard,
  ViewTypeTransaction,
  TextValue,
  TextDate,
  TouchableOpacityDescrib
} from './styles';

import BannerAdmob from '../../components/BannerAdmob';

import {TransactionsObject} from '../../interfaces/goals';

const Historic: React.FC = () => {
  const {getHistoric} = useGoals();
  const [historic, setHistoric] = useState<TransactionsObject[]>();

  useEffect(() => {
    setHistoric(getHistoric());
  }, [getHistoric]);

  return (
    <Container>
      <ViewHeader>
        <ViewTransaction>
          <TextTransactionOne numberOfLines={2}>Tipo de</TextTransactionOne>
          <TextTransactionTwo>Transação</TextTransactionTwo>
        </ViewTransaction>


        <TextTitleValue>Valor</TextTitleValue>
        <TextTitleDate>Data</TextTitleDate>
        <TextTitleValue>Descrição</TextTitleValue>
      </ViewHeader>
      {historic && historic.length === 0 ? (
        <ViewEmpty>
          <TitleEmpty>Ainda não possui extrato</TitleEmpty>
        </ViewEmpty>
      ) : (
        <FlatListHistoric
          keyExtractor={(item) => String(item.id)}
          data={historic}
          renderItem={({item, index}) => (
            <ViewCard index={index}>
              <View
                style={{
                  width: 75,
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <ViewTypeTransaction type={item.type} />
              </View>
              <TextValue>{formatValue(item.value)}</TextValue>
              <TextDate>{item.date}</TextDate>
              <TouchableOpacityDescrib onPress={() => {}}>
                <Icon
                  name="file-document-outline"
                  size={25}
                  color={'#777'}
                />
              </TouchableOpacityDescrib>
            </ViewCard>
          )}
        />
      )}

      <BannerAdmob />
    </Container>
  );
};

export default Sentry.withProfiler(Historic);
