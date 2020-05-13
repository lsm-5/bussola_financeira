import React from 'react';

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
  TextEmpty,
  FlatListHistoric,
  ViewCard,
  ViewTransactionAndValue,
  ViewTypeTransaction,
  TextValue,
  TextDate,
} from './styles';

interface TransactionsObject {
  type: 'income' | 'outcome';
  value: number;
  date: string;
}

const Historic: React.FC = () => {
  const {getHistoric} = useGoals();
  const historic: TransactionsObject[] = getHistoric();

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
      {historic.length === 0 ? (
        <TextEmpty>Ainda não possui extrato</TextEmpty>
      ) : (
        <FlatListHistoric
          keyExtractor={(item) => `${item.date}-${item.value}-${item.type}`}
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
