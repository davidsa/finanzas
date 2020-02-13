import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import crocks from 'crocks';
import moment from 'moment';
import styled from 'styled-components';

const {safeLift, not, isNil} = crocks;

const toCapitalLetter = str => str[0].toUpperCase() + str.slice(1);
const safeToUppercase = safeLift(not(isNil), toCapitalLetter);

const ARROW_BORDER_WIDTH = '6px';
const ARROW_DIMENSION = '6px';

const Container = styled(View)`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Right = styled(TouchableOpacity)`
  position: absolute;
  right: 20px;
  border-color: black;
  border-top-width: ${ARROW_BORDER_WIDTH};
  border-left-width: ${ARROW_BORDER_WIDTH};
  transform: rotate(135deg);
  padding: ${ARROW_DIMENSION};
`;

const Left = styled(TouchableOpacity)`
  position: absolute;
  left: 20px;
  border-color: black;
  border-top-width: ${ARROW_BORDER_WIDTH};
  border-left-width: ${ARROW_BORDER_WIDTH};
  transform: rotate(-45deg);
  padding: ${ARROW_DIMENSION};
`;

const Title = styled(Text)`
  padding: 10px 0;
  font-size: 32px;
`;

export default ({month, initial, inc, dec}) => (
  <Container>
    <Left onPress={dec} />
    <Title>{safeToUppercase(month).option('')}</Title>
    {month !== initial && <Right onPress={inc} />}
  </Container>
);
