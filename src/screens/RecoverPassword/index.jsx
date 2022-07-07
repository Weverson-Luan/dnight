import React, { useEffect, useState } from "react";
import { View } from "react-native";

//react-native-base
import { FormControl, Stack, Input } from "native-base";

//validator
import validator from "validator";

//icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//spinner
import Spinner from "react-native-loading-spinner-overlay";

//auth-firebase
import auth from '@react-native-firebase/auth';

//i18n
import i18n from "../../i18n";

//styles
import { Styles } from "../../common/styles";

//utils
import AwesomeAlert from "../../utils/AwesomeAlert";

//components
import { InputError } from "../../components/Input/InputError";
import { PrimaryButton } from "../../components/PrimaryButton";

const RecoverPassword = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });

  useEffect(() => {
    // analytics().logScreenView({
    //   screen_name: "RecoverPassword",
    // });
  });

  const onSubmit = () => {
    if (!email) {
      setErrors({ email: i18n.t("errors.empty.email") });
    } else if (!validator.isEmail(email)) {
      setErrors({ email: i18n.t("errors.invalid.email") });
    } else {
       recover();
    }
  };

  const recover = async () => {
    auth()
      .sendPasswordResetEmail(email.trim().toLowerCase())
      .then(() => {
        setSpinner(false);
        AwesomeAlert(i18n.t("messages.emailSent"), null, [
          {
            text: i18n.t("buttons.ok"),
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      })
      .catch(error => {
        setSpinner(false);
        AwesomeAlert.show(i18n.t("errors.generic"), error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Spinner visible={spinner} />

      <FormControl style={{ width: "80%" }}>
        <Stack
          style={{
            marginTop: 15,
            backgroundColor: Styles.Color.TEXT_PRIMARY,
            borderRadius: 5,
          }}
        >
          <Input
            style={{ color: "#000" }}
            value={email}
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
        <PrimaryButton
          onPress={onSubmit}
          title={i18n.t("buttons.recoverPassword").toUpperCase()}
          color={"error"}
          size={"full"}
          radius={100}
          height={45}
        />
      </FormControl>
    </View>
    // </View>
  );
};

export default RecoverPassword;
