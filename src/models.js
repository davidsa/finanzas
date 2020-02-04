import crocks from 'crocks';

const {getPath} = crocks;

export const getUserName = data =>
  getPath(['users', '0', 'name'], data).option('No Username found');
