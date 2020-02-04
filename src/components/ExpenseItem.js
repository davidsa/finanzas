import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const WhiteText = styled(Text)`
  font-size: 22px;
  color: white;
`;

const HorizontalContainer = styled(View)`
  flex-direction: row;
`;

const Circle = styled(View)`
  margin: 10px;
  flex: 3;
  padding: 5px 8px;
  border-radius: 5px;
  background-color: orange;
  justify-content: center;
  align-items: center;
`;

const VerticalContainer = styled(View)`
  justify-content: center;
  flex: 7;
`;

const Currency = styled(Text)`
  font-size: 18px;
`;

const Place = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

export default ({item: {value, place, date}}) => (
  <HorizontalContainer>
    <Circle>
      <WhiteText>{moment(date).format('dddd D')}</WhiteText>
    </Circle>
    <VerticalContainer style={{justifyContent: 'center'}}>
      <Currency>{numeral(value).format('$0,0')}</Currency>
      <Place>{place}</Place>
    </VerticalContainer>
  </HorizontalContainer>
);
