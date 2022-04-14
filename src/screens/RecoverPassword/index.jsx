import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Alert } from "react-native";
import { FormControl, Stack, Input } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import validator from "validator";
import Spinner from "react-native-loading-spinner-overlay";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
// import AppState from "../../api/AppState";

import i18n from "../../i18n";
import { Styles } from "../../commom/styles";
import AwesomeAlert from "../../utils/AwesomeAlert";

const RecoverPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });

  useEffect(() => {
    analytics().logScreenView({
      screen_name: "RecoverPasswordScreen",
    });
  });

  // showInputError = (input, error, callback = null) => {
  //   this.setState(previousState => ({
  //     errors: {
  //       ...previousState.errors,
  //       [input]: error,
  //     },
  //   }));

  //   if (callback) {
  //     callback();
  //   }
  // };

  const onSubmit = () => {
    analytics().logEvent("clickedRecoverPassword");

    if (!email) {
      setErrors({ email: i18n.t("errors.empty.email") });
    } else if (!validator.isEmail(email)) {
      setErrors({ email: i18n.t("errors.invalid.email") });
    } else {
      recoverPassword();
    }
  };

  const recoverPassword = async ({ navigation }) => {
    setSpinner(true);

    auth()
      .sendPasswordResetEmail(email.trim().toLowerCase())
      .then(() => {
        setSpinner(false);
        AwesomeAlert.show(i18n.t("messages.emailSent"), null, [
          {
            text: i18n.t("buttons.ok"),
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      })
      .catch(error => {
        this.setState({ spinner: false });
        AwesomeAlert.show(i18n.t("errors.generic"), err);
      });
  };

  return (
    <View
      style={{
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
        backgroundColor: Styles.Color.SCREEN_BACKGROUND,
      }}
    >
      <NetworkStatus />

      <View
        style={{
          flex: 4,
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Spinner visible={spinner} />

        <FormControl style={{ width: "100%" }}>
          <Stack
            style={{
              marginTop: 15,
              backgroundColor: Styles.Color.TEXT_PRIMARY,
              borderRadius: 5,
            }}
          >
            <Input
              style={{ color: "#000" }}
              value={this.state.email}
              placeholder={"Digite seu email"}
              placeholderTextColor={Styles.Color.PLACEHOLDER}
              keyboardType="email-address"
              returnKeyType="done"
              autoCapitalize="none"
              onChangeText={text => setEmail(text.toLowerCase())}
              InputLeftElement={
                <Icon
                  name="email-outline"
                  size={24}
                  style={{
                    marginHorizontal: 8,
                    color: errors.email
                      ? Styles.Color.ERROR
                      : Styles.Color.PLACEHOLDER,
                  }}
                />
              }
            />
          </Stack>
          <InputError error={errors.email} />
        </FormControl>

        <PrimaryButton
          onPress={onSubmit}
          title={i18n.t("buttons.recoverPassword").toUpperCase()}
          color={"error"}
          size={"full"}
          radius={100}
          height={45}
        />
      </View>
    </View>
  );
};

export default RecoverPasswordScreen;
