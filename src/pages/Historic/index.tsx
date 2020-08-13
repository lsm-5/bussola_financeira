import React, {useState, useEffect} from 'react';

import formatValue from '../../utils/formatValue';
import {useGoals} from '../../hooks/goals';

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
  ViewTransactionAndValue,
  ViewTypeTransaction,
  TextValue,
  TextDate,
} from './styles';

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
        <ViewTitle>
          <ViewTransaction>
            <TextTransactionOne numberOfLines={2}>Tipo de</TextTransactionOne>
            <TextTransactionTwo>Transação</TextTransactionTwo>
          </ViewTransaction>
          <TextTitleValue>Valor</TextTitleValue>
        </ViewTitle>
        <TextTitleDate>Data</TextTitleDate>
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
              <ViewTransactionAndValue>
                <ViewTypeTransaction type={item.type} />
                <TextValue>{formatValue(item.value)}</TextValue>
              </ViewTransactionAndValue>
              <TextDate>{item.date}</TextDate>
            </ViewCard>
          )}
        />
      )}
    </Container>
  );
};

export default Historic;
