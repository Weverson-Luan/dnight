// import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import { FormControl, Stack, Input } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import validator from "validator";
import Spinner from "react-native-loading-spinner-overlay";
import styled from "styled-components/native";

import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { InputError } from "../../components/Input/InputError/InputError";

import Constants from "../../commom/constants";
import { Styles } from "../../commom/styles";
import { Logo } from "../../components/Logo/Logo";
import { Header } from "./styles";

class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    spinner: false,
  };

  onChangeText = (text, input) => {
    this.setState(previousState => ({
      [input]: text,
      errors: { ...previousState.errors, [input]: "" },
    }));
  };

  showInputError = (input, error, callback = null) => {
    this.setState(previousState => ({
      errors: {
        ...previousState.errors,
        [input]: error,
      },
    }));

    if (callback) {
      callback();
    }
  };

  onSubmit = () => {
    const { email, password } = this.state;

    if (!email) {
      this.showInputError("email", "errors.empty.email");
    } else if (!validator.isEmail(email)) {
      this.showInputError("email", "errors.invalid.email");
    } else if (!password) {
      this.showInputError("password", "errors.empty.password");
    } else if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      this.showInputError("password", "errors.invalid.smallPassword");
    } else {
      // this.firebaseAuth(email, password);
    }
  };

  loginFacebook = async () => {
    this.setState({ spinner: true });
  };

  render() {
    const { spinner, errors, showPassword } = this.state;
    return (
      <Screen>
        <View
          style={{
            height: getStatusBarHeight(),
            with: "100%",
            backgroundColor: Styles.Color.PRIMARY,
          }}
        />

        {/* 
        <NetworkStatus /> */}

        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: Styles.Color.PRIMARY,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Header>
            <Logo />
          </Header>
          <Spinner visible={spinner} />

          <FormControl style={{ width: "80%", marginVertical: 120 }}>
            <Stack
              space={4}
              w="100%"
              alignItems="center"
              style={{
                backgroundColor: "#465881",
                borderRadius: 10,
                paddingHorizontal: 8,
              }}
            >
              <Input
                style={{ color: "#fff", height: 50 }}
                variant={"none"}
                value={this.state.email}
                keyboardType="email-address"
                placeholder={"placeholders.email"}
                returnKeyType="next"
                autoCapitalize="none"
                blurOnSubmit={false}
                onChangeText={text => this.onChangeText(text, "email")}
                placeholderTextColor="#FFF"
                InputLeftElement={
                  <Icon
                    name="email-outline"
                    size={24}
                    style={{
                      color: errors.email ? Styles.Color.ERROR : "#FFF",
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
                backgroundColor: "#465881",
                borderRadius: 10,
                paddingHorizontal: 8,
              }}
            >
              <Input
                style={{ color: "#fff", height: 50 }}
                variant={"none"}
                value={this.state.password}
                secureTextEntry={!this.state.showPassword}
                placeholder={"placeholders.password"}
                returnKeyType="done"
                returnKeyLabel={"buttons.login"}
                onChangeText={text => this.onChangeText(text, "password")}
                placeholderTextColor="#FFF"
                InputLeftElement={
                  <Icon
                    name="lock-outline"
                    size={24}
                    style={{
                      color: errors.password ? Styles.Color.ERROR : "#FFF",
                    }}
                  />
                }
                InputRightElement={
                  <Icon
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    style={{
                      marginRight: 10,
                      color: Styles.Color.TEXT_PRIMARY,
                    }}
                    onPress={() =>
                      this.setState({ showPassword: !showPassword })
                    }
                  />
                }
              />
            </Stack>

            <InputError error={errors.password} />

            <PrimaryButton
              title={"buttons.login".toUpperCase()}
              onPress={this.onSubmit}
              color={"white"}
              size={"lg"}
              radius={100}
              height={45}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("RECOVER_PASSWORD_SCREEN");
                }}
              >
                <Text
                  style={{
                    fontSize: Styles.FontSize.NORMAL,
                    color: "#FFF",
                  }}
                >
                  {"buttons.forgotPassword"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("REGISTER_SCREEN", {
                    updateMode: false,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: Styles.FontSize.NORMAL,
                    color: "#FFF",
                  }}
                >
                  {"buttons.signUpNow.firstMessage"}
                </Text>
              </TouchableOpacity>
            </View>
          </FormControl>

          {
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: Styles.FontSize.MEDIUM,
                  color: "#FFF",
                  marginBottom: 10,
                }}
              >
                {"labels.loginWith"}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => {}}
                  activeOpacity={0.7}
                >
                  {/* <Image
                    source={Icons.GOOGLE}
                    style={{
                      width: Styles.Metrics.WIDTH * 0.12,
                      height: Styles.Metrics.WIDTH * 0.12,
                    }}
                  /> */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={alert("Fazer login facebokk")}
                  activeOpacity={0.7}
                >
                  {/* <Image
                    source={Icons.FACEBOOK}
                    style={{
                      width: Styles.Metrics.WIDTH * 0.12,
                      height: Styles.Metrics.WIDTH * 0.12,
                    }}
                  /> */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => {}}
                  activeOpacity={0.7}
                >
                  {/* <Image
                    source={Icons.TWITTER}
                    style={{
                      width: Styles.Metrics.WIDTH * 0.12,
                      height: Styles.Metrics.WIDTH * 0.12,
                    }}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      </Screen>
    );
  }
}

export default LoginScreen;
