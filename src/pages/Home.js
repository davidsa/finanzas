import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {View, Button} from 'react-native';
import styled from 'styled-components';
import crocks from 'crocks';
import {useQuery, useMutation, useLazyQuery} from '@apollo/react-hooks';
import {log, useDidMountEffect} from '../utils';
import {GET_USERS, ADD_EXPENSES, GET_MONTH_EXPENSES} from '../queries';
import {getSmsMessages} from '../services/sms.service';
import {requestPermission} from '../services/permission.service';
import {getUserName} from '../models';

import Controls from '../components/Controls';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseList from '../components/ExpenseList';
import Totals from '../components/Totals';
import Header from '../components/Header';

const {
  Async,
  getProp,
  getPath,
  hasProp,
  isEmpty,
  isNil,
  and,
  not,
  safeLift,
  map,
  curry,
  option,
  compose,
  ifElse,
} = crocks;

const initialMonth = moment().format('MMMM');

const immutableCall = cb => x => (cb(x), x);
const createSmsList = smsList => ({variables: {smsList}});
const getExpenses = response => response.data.addExpenses;

const INITIAL_EXPENSES = [];

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const [fetchMonthExpenses, {data: monthExpenses}] = useLazyQuery(
    GET_MONTH_EXPENSES,
  );

  const {data: usersData} = useQuery(GET_USERS);
  const [addExpenses, {data: expensesData}] = useMutation(ADD_EXPENSES);

  const asyncAdd = Async.fromPromise(addExpenses);

  const flow = users =>
    requestPermission()
      .chain(() => getSmsMessages(users))
      .map(createSmsList)
      .chain(asyncAdd)
      .fork(log('Rejected'), log('Result'));

  const safeFlow = safeLift(and(not(isNil), hasProp('users')), flow);

  const handleOnPress = () =>
    fetchMonthExpenses({variables: {month: currentMonth}});

  const increaseMonth = () =>
    setCurrentMonth(state => {
      const result = moment(state, 'MMMM')
        .add(1, 'month')
        .format('MMMM');
      fetchMonthExpenses({variables: {month: result}});
      return result;
    });

  const decreaseMonth = () =>
    setCurrentMonth(state => {
      const result = moment(state, 'MMMM')
        .subtract(1, 'month')
        .format('MMMM');
      fetchMonthExpenses({variables: {month: result}});
      return result;
    });

  const getExpenses = compose(option(INITIAL_EXPENSES), getProp('addExpenses'));
  const getMonthExpenses = compose(option(null), getProp('expenses'));

  useEffect(() => {
    safeFlow(usersData);
  }, [usersData]);

  const expenses = getMonthExpenses(monthExpenses) || getExpenses(expensesData);

  return (
    <View>
      <Header
        initial={initialMonth}
        month={currentMonth}
        inc={increaseMonth}
        dec={decreaseMonth}
      />
      <Controls>
        <Totals expenses={expenses} />
      </Controls>
      <ExpenseList expenses={expenses} />
    </View>
  );
};

export default Home;
