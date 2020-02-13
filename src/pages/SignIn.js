import React from 'react';
import {View, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
//const webClientId =
// '566798308078-8m6sh12n40hg5dvibq55h9u5mc1h4ecl.apps.googleusercontent.com';
const webClientId =
  '566798308078-skqn7uh1urdtbf6val31a4k3ghbib5he.apps.googleusercontent.com';
GoogleSignin.configure({
  androidClientId: webClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

export default () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.error('User cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.error('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.error('no play service');
      } else {
        // some other error happened
        console.error('no clue', error);
      }
    }
  };
  return (
    <View>
      <Text>Sign in</Text>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};
