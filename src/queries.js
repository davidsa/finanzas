import {gql} from 'apollo-boost';

const EXPENSE_FIELDS = gql`
  fragment ExpenseFields on Expense {
    _id
    place
    value
    date
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      name
      lastFetch
    }
  }
`;

export const GET_MONTH_EXPENSES = gql`
  query GetMonthExpenses {
    expenses {
      ...ExpenseFields
    }
  }
  ${EXPENSE_FIELDS}
`;

export const ADD_EXPENSES = gql`
  mutation AddExpenses($smsList: [String]) {
    addExpenses(smsList: $smsList) {
      ...ExpenseFields
    }
  }
  ${EXPENSE_FIELDS}
`;
