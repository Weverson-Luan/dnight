import React, { useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import validator from "validator";

import { FormControl, Stack, Input } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from "react-native-loading-spinner-overlay";

import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { InputError } from "../../components/Input/InputError/InputError";
import Constants from "../../commom/constants";
import { Styles } from "../../commom/styles";
import { Logo } from "../../components/Logo/Logo";

import { Container, Header } from "./style";

export default function Login({ navigation }) {
  const [loging, setLoging] = useState({
    email: "",
    password: "",
    errors: {},
    spinner: false,
  });

  const handleChange = (text, input) => {
    setLoging(...loging, {
      [input]: text,
      errors: { ...loging.errors, [input]: "" },
    });
  };

  const showInputError = (input, error, callback = null) => {
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
    <Container>
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
              value={email}
              keyboardType="email-address"
              placeholder={"placeholders.email"}
              returnKeyType="next"
              autoCapitalize="none"
              blurconst
              // HandleLogin={false}
              onChangeText={text => handleChange(text, "email")}
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
              value={password}
              secureTextEntry={true}
              placeholder={"placeholders.password"}
              returnKeyType="done"
              returnKeyLabel={"buttons.login"}
              onChangeText={text => handleChange(text, "password")}
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
                  name={password ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  style={{
                    marginRight: 10,
                    color: Styles.Color.TEXT_PRIMARY,
                  }}
                  onPress={() => setLoging({ password: !password })}
                />
              }
            />
          </Stack>

          <InputError error={errors.password} />

          <PrimaryButton
            title={"buttons.login".toUpperCase()}
            onPress={handleLogin}
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
              onPress={() => navigation.navigate("RECOVER_PASSWORD_SCREEN")}
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
              onPress={() =>
                navigation.navigate("REGISTER_SCREEN", {
                  updateMode: false,
                })
              }
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
    </Container>
  );
}
