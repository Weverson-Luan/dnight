import React, { useState } from "react";
import { Text, View } from "react-native";
import { FormControl, Stack, Select } from "native-base";

//google-firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


//slider react-native-community-slider
import Slider from "@react-native-community/slider";

//masked
import MaskInput, { Masks } from "react-native-mask-input";

//icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//commons
import { Styles } from "../../common/styles";

// i18n
import i18n from "../../i18n";

//components
import { InputError } from "../../components/Input/InputError";
import { ProfilePicture } from "../../components/ProfilePicture";
import { PrimaryButton } from "../../components/PrimaryButton";

//styles-components
import {
  Screen,
  formControl,
  ContentImage,
  ContentForm,
  inputError,
  maskInput,
  stack,
  stackDistanceFlexRow,
  stackDistance,
  contentForm,
  stackInputMask,
  stackBirthDate,
} from "./style";

export function Register({ navigation }) {
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ birthDate, setBirthDate ] = useState("");
  const [ gender, setGender ] = useState("");
  const [ password, setPassword ] = useState("");
  const [eventDistance, setEventDistance] = useState(25);

  const [dataLogin, setDataLogin] = useState({
    username: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    password: "",
    eventDistance: 25,
    spinner: false,
    updateMode: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    picture: "",
    username: "",
    phone: "",
    birthDate: "",
  });

  const [picture, setPicture] = useState({});
  const [selectAvatar, setSelectAvatar] = useState();
  const [showPassword, setShowPassword] = useState(false);

  getUserData = async () => {
    database().ref('users').push().set({
      picture: "foto2.png" ,
      username,
      email,
      phone,
      birthDate,
      gender,
      password,
      eventDistance,
    }).then((snapshot) => {
     auth().createUserWithEmailAndPassword(email, password)
      .then(()=> {
        navigation.navigate("Login")
        console.log("aprovado", snapshot)
      })
      .catch((error)=> console.error("error auth"))
    })
    .catch((error)=> {
      console.error("error", error);
    });
    
  };

  return (
    <Screen>
      <ContentImage>
        <ProfilePicture picture={picture} onPress={() => setSelectAvatar()} />
        {errors.picture ? (
          <InputError style={inputError} error={errors.picture} />
        ) : null}
      </ContentImage>

      <FormControl style={formControl}>
        <Stack space={4} w="100%" style={stackInputMask}>
          <Icon name="account" size={24} color={Styles.Color.PLACEHOLDER} />
          <MaskInput
            value={username}
            onChangeText={username => setUsername(username)}
            style={maskInput}
            placeholder={`${i18n.t("placeholders.name")}*`}
          />
        </Stack>
        {errors.username ? <InputError error={errors.username} /> : null}

        <Stack space={4} w="100%" style={stackInputMask}>
          <Icon name="email" size={24} color={Styles.Color.PLACEHOLDER} />
          <MaskInput
            value={email}
            onChangeText={email => setEmail(email)}
            style={maskInput}
            placeholder={`${i18n.t("placeholders.email")}*`}
          />
        </Stack>
        {errors.email ? <InputError error={errors.email} /> : null}

        <Stack space={4} w="100%" style={stackInputMask}>
          <Icon name="phone" size={24} color={Styles.Color.PLACEHOLDER} />
          <MaskInput
            value={phone}
            mask={Masks.BRL_PHONE}
            onChangeText={unmasked => setPhone(unmasked)}
            style={maskInput}
          />
        </Stack>
        {errors.phone ? <InputError error={errors.phone} /> : null}
        <Stack space={4} w="100%" style={stackInputMask}>
          <Icon name="calendar" size={24} color={Styles.Color.PLACEHOLDER} />
          <MaskInput
            value={birthDate}
            mask={Masks.DATE_DDMMYYYY}
            onChangeText={unmasked => setBirthDate(unmasked)}
            style={maskInput}
          />
        </Stack>
        {errors.birthDate ? <InputError error={errors.birthDate} /> : null}
        <Stack space={4} w="100%" style={stackBirthDate}>
          <Select
            variant="unstyled"
            color={Styles.Color.PLACEHOLDER}
            mode="dialog"
            style={{ width: 120 }}
            placeholder="Gênero*"
            selectedValue={gender}
            onValueChange={gender => setGender(gender)}
            InputLeftElement={
              <Icon
                name="gender-male-female"
                size={24}
                color={Styles.Color.PLACEHOLDER}
              />
            }
          >
            <Select.Item label="Feminino" value="F" />
            <Select.Item label="Masculino" value="M" />
            <Select.Item label="Outro" value="O" />
            <Select.Item label="Indefinido" value="U" />
          </Select>
        </Stack>
        {errors.gender ? <InputError error={errors.gender} /> : null}
        {!dataLogin.updateMode ? (
          <Stack space={4} w="100%" style={stackInputMask}>
            <Icon name="lock" size={24} color={Styles.Color.PLACEHOLDER} />
            <MaskInput
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry={!showPassword}
              style={maskInput}
              placeholder={`${i18n.t("placeholders.password")}*`}
            />
            <Icon
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              type="MaterialCommunityIcons"
              size={24}
              style={{ color: Styles.Color.PLACEHOLDER, marginLeft: "auto" }}
              onPress={() => setShowPassword(!showPassword)}
            />
          </Stack>
        ) : null}
        {errors.password ? <InputError error={errors.password} /> : null}
        <Stack space={4} w="100%" style={stack}>
          <Stack space={4} w="100%" u style={stackDistance}>
            <Text style={{ color: Styles.Color.PLACEHOLDER }}>
              Distância de eventos
            </Text>
          </Stack>
          <Stack space={4} w="100%" style={stackDistanceFlexRow}>
            <Icon
              name="google-maps"
              size={24}
              color={Styles.Color.PLACEHOLDER}
            />
            <Slider
              style={{ flex: 1, height: 50 }}
              value={eventDistance}
              onValueChange={eventDistance => setEventDistance(eventDistance)}
              minimumValue={0}
              maximumValue={50}
              minimumTrackTintColor={Styles.Color.PRIMARY}
              maximumTrackTintColor={Styles.Color.PRIMARY_DARK}
              thumbTintColor={Styles.Color.PRIMARY_DARK}
            ></Slider>

            <Text style={{ width: 50, color: Styles.Color.PLACEHOLDER }}>
              {/*utilizando interrogação(?) caso  o valor do obejto seja nulo para ele ignorar e seguir o fluxo mesmo se estiver nulo.*/}
              {dataLogin?.eventDistance?.toFixed(1)} KM
            </Text>
          </Stack>
        </Stack>

        <InputError error={errors.password} />
        <ContentForm style={contentForm}>
          <PrimaryButton
            // aqui a validacao do firabase
            onPress={() =>getUserData()}
            title={
              dataLogin.updateMode
                ? i18n.t("buttons.update").toUpperCase()
                : i18n.t("buttons.signUp").toUpperCase()
            }
            color={"error"}
            size={"lg"}
            variant={"solid"}
            radius={100}
            height={45}
          />

          {dataLogin.updateMode ? (
            <View style={{ marginTop: 10 }}>
              <PrimaryButton
                title={i18n.t("buttons.recoverPassword").toUpperCase()}
                onPress={() => console.log("hi")}
                color={"error"}
                size={"lg"}
                variant={"solid"}
                radius={100}
                height={45}
              />
            </View>
          ) : null}
        </ContentForm>
      </FormControl>
    </Screen>
  );
}
