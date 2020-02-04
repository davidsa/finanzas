import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import ExpenseItem from './ExpenseItem';
import Separator from './Separator';

export default ({expenses}) => (
  <FlatList
    data={expenses}
    renderItem={ExpenseItem}
    ItemSeparatorComponent={Separator}
    keyExtractor={item => item._id}
  />
);
