import SmsAndroid from 'react-native-get-sms-android';
import crocks from 'crocks';
import {safeParse, log} from '../utils.js';

const {
  Async,
  Maybe,
  List,
  tryCatch,
  listToArray,
  arrayToList,
  resultToAsync,
  traverse,
  getProp,
  getPath,
  option,
  compose,
} = crocks;

const FILTER = {
  address: '85784',
};

const readSmsRaw = filter =>
  Async((rej, res) =>
    SmsAndroid.list(
      JSON.stringify(filter),
      log('sms read error'),
      (count, list) => res(list),
    ),
  );

const readSms = filter =>
  readSmsRaw(filter)
    .map(safeParse)
    .chain(resultToAsync);

const getLastFetch = getPath(['users', 0, 'lastFetch']);

const createFilter = minDate => ({
  ...FILTER,
  minDate,
});

const getFilter = compose(createFilter, option(null), getLastFetch);

const getBodiesFromSms = filter =>
  readSms(filter)
    .map(arrayToList)
    .map(traverse(Maybe.of, getProp('body')))
    .map(option(List.of([])))
    .map(listToArray);

export const getSmsMessages = compose(getBodiesFromSms, getFilter);
