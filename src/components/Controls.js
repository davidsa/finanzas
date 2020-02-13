import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export default ({children}) => <Container>{children}</Container>;
