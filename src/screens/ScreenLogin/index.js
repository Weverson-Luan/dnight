import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'
import { FormControl, Stack, Input } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import validator from 'validator'
import Spinner from 'react-native-loading-spinner-overlay'
import styled from 'styled-components/native'
import analytics from '@react-native-firebase/analytics'
import auth from '@react-native-firebase/auth'
import i18n from '../../i18n'
import { PrimaryButton, InputError, Logo, NetworkStatus } from '../../components'
import { Constants, Styles } from '../../commom'
import { loginWithFacebook } from '../../api/socialLogin';

import AwesomeAlert from '../../utils/AwesomeAlert'
import AppState from '../../api/AppState';

const Screen = styled.View`
  flex: 1;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  padding-bottom: ${getBottomSpace()}px;
  /* padding: ${getStatusBarHeight()}px 0 ${getBottomSpace()}px 0; */
`

const Header = styled.View`
  justify-content: space-evenly;
  align-items: center;
  background-color: ${Styles.Color.PRIMARY};
  padding-bottom: 10px;
`
class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    spinner: false,
  }

  componentDidMount = () => {
    analytics().logScreenView({
      screen_name: 'LoginScreen',
    });
  }

  onChangeText = (text, input) => {
    this.setState(previousState => ({
      [input]: text,
      errors: { ...previousState.errors, [input]: '' },
    }))
  }

  showInputError = (input, error, callback = null) => {
    this.setState(previousState => ({
      errors: {
        ...previousState.errors,
        [input]: error,
      },
    }))

    if (callback) {
      callback()
    }
  }

  onSubmit = () => {
    const { email, password } = this.state

    if (!email) {
      this.showInputError('email', i18n.t('errors.empty.email'))
    } else if (!validator.isEmail(email)) {
      this.showInputError('email', i18n.t('errors.invalid.email'))
    } else if (!password) {
      this.showInputError(
        'password',
        i18n.t('errors.empty.password'),
      )
    } else if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      this.showInputError(
        'password',
        i18n.t('errors.invalid.smallPassword'),
      )
    } else {
      this.firebaseAuth(email, password)
    }
  }

  firebaseAuth = async (email, password) => {
    this.setState({ spinner: true }) // Loading Overlap
    if(!auth().currentUser) { 
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        var user = userCredential.user
        this.setState({ spinner: false })
        analytics().logEvent('loginWithFirebase')
        this.props.navigation.navigate("TERMS_SCREEN", { login: true})
      })
      .catch(error => {
        var errorMessage = error.message
        this.setState({ spinner: false })
        AwesomeAlert.show(errorMessage)
      })
    }
  }




  loginFacebook = async () => {
    this.setState({ spinner: true })
  }

  render() {
    const { spinner, errors, showPassword } = this.state
    return (
      <Screen>
        <View
          style={{
            height: getStatusBarHeight(),
            with: '100%',
            backgroundColor: Styles.Color.PRIMARY,
          }}
        />

        <NetworkStatus />
        <View
          style={{ flex: 1, alignItems: 'center', backgroundColor: Styles.Color.PRIMARY }}
          showsVerticalScrollIndicator={false}
        >
          <Header>
            <Logo />
          </Header>
          <Spinner visible={spinner} />

          <FormControl style={{ width: '80%', marginVertical: 120 }}>
            <Stack
              space={4}
              w="100%"
              alignItems="center"
              style={{
                backgroundColor: '#465881',
                borderRadius: 10,
                paddingHorizontal: 8
              }}>

              <Input
                style={{ color: '#fff', height: 50 }}
                variant={'none'}
                value={this.state.email}
                keyboardType='email-address'
                placeholder={i18n.t('placeholders.email')}
                returnKeyType='next'
                autoCapitalize='none'
                blurOnSubmit={false}
                onChangeText={text => this.onChangeText(text, 'email')}
                placeholderTextColor='#FFF'
                InputLeftElement={
                  <Icon
                    name="email-outline"
                    size={24}
                    style={{
                      color: errors.email ? Styles.Color.ERROR : '#FFF',
                    }}
                  />
                }
              />
            </Stack>
            <InputError error={errors.email} />

            <Stack
              space={4}
              w="100%"
              alignItems="center"
              style={{
                backgroundColor: '#465881',
                borderRadius: 10,
                paddingHorizontal: 8
              }}>

              <Input
                style={{ color: '#fff', height: 50 }}
                variant={'none'}
                value={this.state.password}
                secureTextEntry={!this.state.showPassword}
                placeholder={`${i18n.t('placeholders.password')}*`}
                placeholder={i18n.t('placeholders.password')}
                returnKeyType='done'
                returnKeyLabel={i18n.t('buttons.login')}
                onChangeText={text => this.onChangeText(text, 'password')}
                placeholderTextColor='#FFF'
                InputLeftElement={
                  <Icon
                    name="lock-outline"
                    size={24}
                    style={{
                      color: errors.password ? Styles.Color.ERROR : '#FFF',
                    }}
                  />
                }
                InputRightElement={
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    style={{ marginRight: 10, color: Styles.Color.TEXT_PRIMARY }}
                    onPress={() => this.setState({ showPassword: !showPassword })}
                  />
                }
              />

            </Stack>

            <InputError error={errors.password} />

            <PrimaryButton 
              title={i18n.t('buttons.login').toUpperCase()}
              onPress={this.onSubmit}
              color={'white'}
              size={'lg'}
              radius={100}
              height={45}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate("RECOVER_PASSWORD_SCREEN") }}>
                <Text
                  style={{
                    fontSize: Styles.FontSize.NORMAL,
                    color: '#FFF',
                  }}
                >
                  {i18n.t('buttons.forgotPassword')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate("REGISTER_SCREEN", { updateMode: false }) }}>
                <Text
                  style={{
                    fontSize: Styles.FontSize.NORMAL,
                    color: '#FFF',
                  }}
                >
                  {i18n.t('buttons.signUpNow.firstMessage')}
                </Text>
              </TouchableOpacity>
            </View>
          </FormControl>

          {<ContainerSocial style={{ marginTop: 20 }}>
            <Text style={{ fontSize: Styles.FontSize.MEDIUM, color: '#FFF', marginBottom: 10 }}>
              {i18n.t('labels.loginWith')}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => { }}
                activeOpacity={0.7}
              >
                <Image
                  source={Icons.GOOGLE}
                  style={{
                    width: Styles.Metrics.WIDTH * 0.12,
                    height: Styles.Metrics.WIDTH * 0.12,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={loginWithFacebook()}
                activeOpacity={0.7}
              >
                <Image
                  source={Icons.FACEBOOK}
                  style={{
                    width: Styles.Metrics.WIDTH * 0.12,
                    height: Styles.Metrics.WIDTH * 0.12,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => { }}
                activeOpacity={0.7}
              >
                <Image
                  source={Icons.TWITTER}
                  style={{
                    width: Styles.Metrics.WIDTH * 0.12,
                    height: Styles.Metrics.WIDTH * 0.12,
                  }}
                />
              </TouchableOpacity>
            </View>
                </ContainerSocial> }
        </View>
      </Screen>
    )
  }
}

export default LoginScreen

