import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";

import { FormControl, Stack, Input } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from "react-native-loading-spinner-overlay";

import { PrimaryButton } from "../../components/PrimaryButton";
import { InputError } from "../../components/Input/InputError";
import Icons from "../../common/icons";
import Constants from "../../common/constants";
import { Styles } from "../../common/styles";
import { Logo } from "../../components/Logo/Logo";
import i18n from "../../i18n";

import {
  Container,
  flexRow,
  formControl,
  Header,
  stackInput,
  Title,
} from "./style";

export default function Screen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const onSubmit = () => {
    if (email === "") {
      setErrors({ email: i18n.t("errors.empty.email") });
    } else if (!validator.isEmail(email)) {
      setErrors({ email: i18n.t("errors.invalid.email") });
    } else if (!password) {
      setErrors({ password: i18n.t("errors.empty.password") });
    } else if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      setErrors({ password: i18n.t("errors.invalid.smallPassword") });
    } else {
      navigation.navigate("Terms");
      // this.firebaseAuth(email, password);
      alert("usuario pode se logar");
    }
  };

  return (
    <Container>
      <Header>
        <Logo />
      </Header>

      <Spinner visible={spinner} />

      <FormControl style={formControl}>
        <Stack style={stackInput}>
          <Input
            variant={"none"}
            value={email}
            keyboardType="email-address"
            placeholder={i18n.t("placeholders.email")}
            returnKeyType="next"
            autoCapitalize="none"
            blurOnSubmit={false}
            onChangeText={text => setEmail(text)}
            color="#fff"
            fontSize={16}
            placeholderTextColor="#fff"
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

        <Stack style={stackInput}>
          <Input
            variant={"none"}
            value={password}
            secureTextEntry={!showPassword}
            placeholder={i18n.t("placeholders.password")}
            returnKeyType="done"
            returnKeyLabel={"buttons.login"}
            onChangeText={text => setPassword(text)}
            placeholderTextColor="#FFF"
            color="#fff"
            fontSize={16}
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
          title={i18n.t("buttons.login").toUpperCase()}
          color={"white"}
          size={"lg"}
          radius={20}
          height={45}
          onPress={onSubmit}
        />

        <View style={flexRow}>
          <TouchableOpacity
            onPress={() => {
              navigate("RecoverPassword");
            }}
          >
            <Title>{i18n.t("buttons.forgotPassword")}</Title>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigate("Register", {
                updateMode: false,
              });
            }}
          >
            <Title>{i18n.t("buttons.signUpNow.firstMessage")}</Title>
          </TouchableOpacity>
        </View>
      </FormControl>

      <Title>{i18n.t("labels.loginWith")}</Title>
      {
        <View style={[flexRow, { width: "60%" }]}>
          <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
            <Image
              source={Icons.GOOGLE}
              style={{
                width: Styles.Metrics.WIDTH * 0.12,
                height: Styles.Metrics.WIDTH * 0.12,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={Icons.FACEBOOK}
              style={{
                width: Styles.Metrics.WIDTH * 0.12,
                height: Styles.Metrics.WIDTH * 0.12,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
            <Image
              source={Icons.TWITTER}
              style={{
                width: Styles.Metrics.WIDTH * 0.12,
                height: Styles.Metrics.WIDTH * 0.12,
              }}
            />
          </TouchableOpacity>
        </View>
      }
    </Container>
  );
}
