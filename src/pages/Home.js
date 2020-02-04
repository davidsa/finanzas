import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import styled from 'styled-components';
import crocks from 'crocks';
import {useQuery, useMutation, useLazyQuery} from '@apollo/react-hooks';
import {log} from '../utils';
import {GET_USERS, ADD_EXPENSES, GET_MONTH_EXPENSES} from '../queries';
import {getSmsMessages} from '../services/sms.service';
import {requestPermission} from '../services/permission.service';
import {getUserName} from '../models';

import Header from '../components/Header';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseList from '../components/ExpenseList';
import Totals from '../components/Totals';

const {
  Async,
  getProp,
  hasProp,
  isEmpty,
  not,
  safeLift,
  map,
  curry,
  option,
  compose,
} = crocks;

const immutableCall = cb => x => (cb(x), x);
const createSmsList = smsList => ({variables: {smsList}});
const getExpenses = response => response.data.addExpenses;

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  const [fetchMonthExpenses, {data: getMonthExpensesData}] = useLazyQuery(
    GET_MONTH_EXPENSES,
  );

  const {data: usersData} = useQuery(GET_USERS);

  const [addExpenses, {data: expensesData}] = useMutation(ADD_EXPENSES);
  const asyncAdd = Async.fromPromise(addExpenses);

  const flow = users => {
    requestPermission()
      .chain(() => getSmsMessages(users))
      .map(createSmsList)
      .chain(asyncAdd)
      .map(getExpenses)
      .map(immutableCall(setExpenses))
      .fork(log('Rejected'), log('Result'));
  };

  const safeFlow = safeLift(hasProp('users'), flow);
  const safeSetExpenses = safeLift(
    not(isEmpty),
    compose(setExpenses, option([]), getProp('expenses')),
  );

  const handleOnPress = () => fetchMonthExpenses();

  useEffect(() => {
    safeFlow(usersData);
  }, [usersData]);

  useEffect(() => {
    safeSetExpenses(getMonthExpensesData);
  }, [getMonthExpensesData]);

  return (
    <View>
      <Header>
        <Totals expenses={expenses} />
        <Button title="Refresh" onPress={handleOnPress} />
      </Header>
      <ExpenseList expenses={expenses} />
    </View>
  );
};

export default Home;
