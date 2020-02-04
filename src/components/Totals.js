import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import {View, Text} from 'react-native';

const Container = styled(View)`
  flex-direction: row;
`;

const TotalLabel = styled(Text)`
  padding: 10px;
  font-size: 24px;
`;

const ValueLabel = styled(Text)`
  padding: 10px;
  font-size: 24px;
`;

export default ({expenses}) => {
  const total = expenses.reduce((acc, item) => acc + item.value, 0);
  return (
    <Container>
      <TotalLabel>Total:</TotalLabel>
      <ValueLabel>{numeral(total).format('$0,0')}</ValueLabel>
    </Container>
  );
};
