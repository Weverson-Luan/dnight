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
      <View
        style={{
          height: getStatusBarHeight(),
          with: "100%",
          backgroundColor: Styles.Color.PRIMARY,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Styles.Color.PRIMARY,
          alignItems: "center",
          justifyContent: "center",
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
              keyboardType="email-address"
              placeholder={"Digite seu email"}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              onChangeText={text =>
                console.log(`aqui o texto digitado ${text}`)
              }
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
              secureTextEntry={true}
              placeholder={"Digite sua senha"}
              returnKeyType="done"
              returnKeyLabel={"buttons.login"}
              onChangeText={text =>
                console.log(`aqui o texto digitado ${text}`)
              }
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
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </Stack>

          <InputError error={errors.password} />

          <PrimaryButton
            title={"Entrar ".toUpperCase()}
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
                navigation.navigate("RECOVER_PASSWORD_SCREEN");
              }}
            >
              <Text
                style={{
                  fontSize: Styles.FontSize.NORMAL,
                  color: "#FFF",
                }}
              >
                Esqueceu sua senha?
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
                Criar uma conta
              </Text>
            </TouchableOpacity>
          </View>
        </FormControl>

        {
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {}}
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
                onPress={() => {}}
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
          </View>
        }
      </View>
    </Container>
  );
}
