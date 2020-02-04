import {PermissionsAndroid} from 'react-native';
import crocks from 'crocks';

const {Async} = crocks;

export const requestPermission = Async.fromPromise(() =>
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS),
);
