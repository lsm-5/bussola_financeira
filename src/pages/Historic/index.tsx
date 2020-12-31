import React, {useState, useEffect, useCallback} from 'react';
import * as Sentry from '@sentry/react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import formatValue from '../../utils/formatValue';
import {useGoals} from '../../hooks/goals';
import ModalDescribe from '../../components/ModalDescribe';

import {
  Container,
  ViewHeader,
  ViewDefault,
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
  TouchableOpacityDescrib,
} from './styles';

import BannerAdmob from '../../components/BannerAdmob';

import {TransactionsObject} from '../../interfaces/goals';

const Historic: React.FC = () => {
  const {getHistoric} = useGoals();
  const [historic, setHistoric] = useState<TransactionsObject[]>();
  const [showDescribe, setShowDescribe] = useState(false);
  const [describe, setDescribe] = useState('');

  useEffect(() => {
    setHistoric(getHistoric());
  }, [getHistoric]);

  const handleModalDescribeFalse = useCallback(() => {
    setShowDescribe(false);
  }, []);

  return (
    <>
      <ModalDescribe
        infoDescribe={describe}
        showModal={showDescribe}
        showCancelModal={handleModalDescribeFalse}
      />
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
                {item.describe !== null ? (
                  <TouchableOpacityDescrib
                    onPress={() => {
                      setDescribe(item.describe);
                      setShowDescribe(true);
                    }}>
                    <Icon name="file-document-outline" size={25} color="#777" />
                  </TouchableOpacityDescrib>
                ) : (
                  <ViewDefault />
                )}
              </ViewCard>
            )}
          />
        )}

        <BannerAdmob />
      </Container>
    </>
  );
};

export default Sentry.withProfiler(Historic);
