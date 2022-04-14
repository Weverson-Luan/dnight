<<<<<<< HEAD
import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

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

export default function Login({ navigation }) {
  const [loging, setLoging] = useState({
    email: "",
    password: "",
    errors: {},
    spinner: false,
  });

  // state = {
  //   email: "",
  //   password: "",
  //   errors: {},
  //   spinner: false,
  // };

  const handleChange = (text, input) => {
    // setLoging(previousState => ({
    //   [input]: text,
    //   errors: { ...previousState.errors, [input]: "" },
    // }));
    setLoging(...loging, {
      [input]: text,
      errors: { ...loging.errors, [input]: "" },
    });
  };

  const showInputError = (input, error, callback = null) => {
    // setLoging(previousState => ({
    //   errors: {
    //     ...previousState.errors,
    //     [input]: error,
    //   },
    // }));

    setLoging(...loging, {
      errors: { ...loging.errors, [input]: error },
    });
    if (callback) {
      callback();
    }
  };

  const handleLogin = () => {
    const { email, password } = loging;

    if (!email) {
      showInputError("email", "errors.empty.email");
    } else if (!validator.isEmail(email)) {
      showInputError("email", "errors.invalid.email");
    } else if (!password) {
      showInputError("password", "errors.empty.password");
    } else if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      showInputError("password", "errors.invalid.smallPassword");
    } else {
      // this.firebaseAuth(email, password);
    }
  };

  // loginFacebook = async () => {
  //   this.setState({ spinner: true });
  // };

  const { spinner, errors, email, password } = loging;
  return (
    <Screen>
=======
import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import validator from "validator";

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FormControl, Stack, Input } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from "react-native-loading-spinner-overlay";

import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { InputError } from "../../components/Input/InputError/InputError";
import Icons from "../../commom/icons";
import Constants from "../../commom/constants";
import Styles from "../../commom/styles";
import { Logo } from "../../components/Logo/Logo";

import { Container, Header } from "./style";

export default function Screen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showInputError, setShowInputError] = useState("");

  const onSubmit = () => {
    if (!email) {
      setShowInputError("email", "errors.empty.email");
    } else if (!validator.isEmail(email)) {
      setShowInputError("email", "errors.invalid.email");
    } else if (!password) {
      setShowInputError("password", "errors.empty.password");
    } else if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      setShowInputError("password", "errors.invalid.smallPassword");
    } else {
      // this.firebaseAuth(email, password);
      alert("usuario pode se logar");
    }
  };

  return (
    <Container>
>>>>>>> develop
      <View
        style={{
          height: getStatusBarHeight(),
          with: "100%",
          backgroundColor: Styles.Color.PRIMARY,
        }}
      />
<<<<<<< HEAD

      {/* 
        <NetworkStatus /> */}

=======
>>>>>>> develop
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Styles.Color.PRIMARY,
<<<<<<< HEAD
=======
          alignItems: "center",
          justifyContent: "center",
>>>>>>> develop
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <Logo />
        </Header>
<<<<<<< HEAD
=======

>>>>>>> develop
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
<<<<<<< HEAD
              value={email}
              keyboardType="email-address"
              placeholder={"placeholders.email"}
              returnKeyType="next"
              autoCapitalize="none"
              blurconst
              // HandleLogin={false}
              onChangeText={text => handleChange(text, "email")}
=======
              keyboardType="email-address"
              placeholder={"Digite seu email"}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              onChangeText={text =>
                console.log(`aqui o texto digitado ${text}`)
              }
>>>>>>> develop
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
<<<<<<< HEAD
              value={password}
              secureTextEntry={password}
              placeholder={"placeholders.password"}
              returnKeyType="done"
              returnKeyLabel={"buttons.login"}
              onChangeText={text => handleChange(text, "password")}
=======
              secureTextEntry={true}
              placeholder={"Digite sua senha"}
              returnKeyType="done"
              returnKeyLabel={"buttons.login"}
              onChangeText={text =>
                console.log(`aqui o texto digitado ${text}`)
              }
>>>>>>> develop
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
<<<<<<< HEAD
                  name={password ? "eye-off-outline" : "eye-outline"}
=======
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
>>>>>>> develop
                  size={24}
                  style={{
                    marginRight: 10,
                    color: Styles.Color.TEXT_PRIMARY,
                  }}
<<<<<<< HEAD
                  onPress={() => setLoging({ password: !password })}
=======
                  onPress={() => setShowPassword(!showPassword)}
>>>>>>> develop
                />
              }
            />
          </Stack>

          <InputError error={errors.password} />

          <PrimaryButton
<<<<<<< HEAD
            title={"buttons.login".toUpperCase()}
            onPress={handleLogin}
=======
            title={"Entrar ".toUpperCase()}
>>>>>>> develop
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
<<<<<<< HEAD
              onPress={() => navigation.navigate("RECOVER_PASSWORD_SCREEN")}
=======
              onPress={() => {
                navigation.navigate("RECOVER_PASSWORD_SCREEN");
              }}
>>>>>>> develop
            >
              <Text
                style={{
                  fontSize: Styles.FontSize.NORMAL,
                  color: "#FFF",
                }}
              >
<<<<<<< HEAD
                {"buttons.forgotPassword"}
=======
                Esqueceu sua senha?
>>>>>>> develop
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
<<<<<<< HEAD
              onPress={() =>
                navigation.navigate("REGISTER_SCREEN", {
                  updateMode: false,
                })
              }
=======
              onPress={() => {
                this.props.navigation.navigate("REGISTER_SCREEN", {
                  updateMode: false,
                });
              }}
>>>>>>> develop
            >
              <Text
                style={{
                  fontSize: Styles.FontSize.NORMAL,
                  color: "#FFF",
                }}
              >
<<<<<<< HEAD
                {"buttons.signUpNow.firstMessage"}
=======
                Criar uma conta
>>>>>>> develop
              </Text>
            </TouchableOpacity>
          </View>
        </FormControl>

        {
<<<<<<< HEAD
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
=======
          <View style={{ marginTop: 10 }}>
>>>>>>> develop
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {}}
                activeOpacity={0.7}
              >
<<<<<<< HEAD
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
=======
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
                activeOpacity={0.7}
              >
                <Image
                  source={Icons.FACEBOOK}
                  style={{
                    width: Styles.Metrics.WIDTH * 0.12,
                    height: Styles.Metrics.WIDTH * 0.12,
                  }}
                />
>>>>>>> develop
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {}}
                activeOpacity={0.7}
              >
<<<<<<< HEAD
                {/* <Image
                    source={Icons.TWITTER}
                    style={{
                      width: Styles.Metrics.WIDTH * 0.12,
                      height: Styles.Metrics.WIDTH * 0.12,
                    }}
                  /> */}
=======
                <Image
                  source={Icons.TWITTER}
                  style={{
                    width: Styles.Metrics.WIDTH * 0.12,
                    height: Styles.Metrics.WIDTH * 0.12,
                  }}
                />
>>>>>>> develop
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
<<<<<<< HEAD
    </Screen>
=======
    </Container>
>>>>>>> develop
  );
}
