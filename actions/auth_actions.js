import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types'
import { AsyncStorage } from 'react-native'

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton, LoginManager,
    AccessToken,
    ShareDialog,
  } = FBSDK;

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token')

export const facebookLogin = () => {
 return async dispatch => {
    let token =  await AsyncStorage.getItem('fb_token');
    if(token) {
        //Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token});

    } else {
        // Start up FB Login process
        
        doFacebookLogin(dispatch);
    }
}

}

const doFacebookLogin = async dispatch => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
        function (result) {
            
            if (result.isCancelled) {
                return dispatch({ type: FACEBOOK_LOGIN_FAIL})
            } else {
                AccessToken.getCurrentAccessToken().then((data) =>{
                    token = data.accessToken.toString();
                    console.log(token)
                    AsyncStorage.setItem('fb_token', token)
                    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token})
                })
            }
        },
        function (error) {
          
        }
      )


   
    
}
    
