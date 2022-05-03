import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { Styles } from "../../commom/styles";
import Constants from "../../commom/constants";
import { launchImageLibrary } from "react-native-image-picker";
import { FormControl, Input, Stack, Select } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import i18n from "../../i18n";
import { MaskService } from "react-native-masked-text";
import { InputError } from "../../components/Input/InputError";

// import { InputError, ProfilePicture, PrimaryButton } from "../../components";
import Slider from "@react-native-community/slider";
// import validator from "validator";
import database from "@react-native-firebase/database";
import analytics from "@react-native-firebase/analytics";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { Image } from "react-native-compressor";
import Spinner from "react-native-loading-spinner-overlay";
import HelperFunctions from "../../utils/HelperFuntions";
import AppState from "../../services/AppState";
import AwesomeAlert from "../../utils/AwesomeAlert";
import { Container, ContentForm, ContentImage, Screen } from "./style";

const IMAGE_PICKER_OPTIONS = {
  title: i18n.t("messages.selectAvatar"),
  storageOptions: {
    skipBackup: true,
    path: "Dnight",
  },
  cancelButtonTitle: i18n.t("buttons.cancel"),
  takePhotoButtonTitle: i18n.t("buttons.takePhoto"),
  chooseFromLibraryButtonTitle: i18n.t("buttons.chooseFromLibrary"),
};
function Register() {
  const [data, setData] = useState({
    picture: {},
    username: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    password: "",
    showPassword: "",
    eventDistance: 25,
    // updateMode: route.params.updateMode,
    errors: {},
    spinner: false,
    pictureLink: "",
  });
  // state = {
  //   picture: {},
  //   username: "",
  //   email: "",
  //   phone: "",
  //   birthDate: "",
  //   gender: "",
  //   password: "",
  //   showPassword: false,
  //   eventDistance: 25, // in KM
  //   updateMode: this.props.route.params.updateMode,
  //   errors: {},
  //   spinner: false,
  //   pictureLink: "",
  // };

  useEffect(() => {
    // analytics().logScreenView({
    //   screen_name: "Register",
    // });
    // const { updateMode } = data;
    // let title;
    // if (updateMode) {
    //   title = "Editar perfil";
    //   // this.getUserData();
    // } else {
    //   title = "Registrar-se";
    // }
    // navigation.setOptions({
    //   title: title,
    // });
  }, []);

  // getUserData = () => {
  //   database()
  //     .ref("users")
  //     .child(AppState.getUid())
  //     .once("value")
  //     .then(snapshot => {
  //       const data = snapshot.val();

  //       setData({
  //         picture: { uri: data.profilePicture },
  //         username: data.username,
  //         email: data.email,
  //         phone: data.phone,
  //         birthDate: data.birthDate,
  //         gender: data.gender,
  //         password: data.password,
  //         eventDistance: data.eventDistance,
  //       });
  //     });
  // };

  selectAvatar = () => {
    launchImageLibrary(IMAGE_PICKER_OPTIONS, response => {
      if (response.didCancel || response.error) {
        return;
      }
      setData({ picture: {} });
      compressImage(response.assets[0].uri);
    });
  };

  const compressImage = async uri => {
    const result = await Image.compress(uri, {
      compressionMethod: "auto",
    });
    this.setState({
      picture: {
        uri: result,
      },
    });
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

  // validateEmail(email) {
  //   var re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // }

  onSubmit = () => {
    this.setState({ errors: {} });
    const {
      picture,
      username,
      email,
      phone,
      birthDate,
      gender,
      password,
      updateMode,
    } = this.state;

    if (!picture.uri) {
      this.showInputError("picture", i18n.t("errors.empty.picture"));
    } else if (!username) {
      this.showInputError("username", i18n.t("errors.empty.username"));
    } else if (!updateMode && !email) {
      this.showInputError("email", i18n.t("errors.empty.email"));
    } else if (!updateMode && !this.validateEmail(email)) {
      this.showInputError("email", i18n.t("errors.invalid.email"));
    } else if (phone && !MaskService.isValid("cel-phone", phone)) {
      this.showInputError("phone", i18n.t("errors.invalid.phone"));
    } else if (
      birthDate &&
      !MaskService.isValid("datetime", birthDate, { format: "DD/MM/YYYY" })
    ) {
      this.showInputError("birthDate", i18n.t("errors.invalid.birthDate"));
    } else if (!updateMode && !password) {
      i18n.t("errors.empty.password");
    } else if (
      (!updateMode && password.length < Constants.PASSWORD_MIN_LENGTH) ||
      (updateMode &&
        password.length > 0 &&
        password.length < Constants.PASSWORD_MIN_LENGTH)
    ) {
      this.showInputError("password", i18n.t("errors.invalid.smallPassword"));
    } else {
      this.setState({ spinner: true });
      if (updateMode) {
        console.warn("UPDATE");
        this.updateUser({
          picture,
          username,
          email,
          phone,
          birthDate,
          gender,
          password,
        });
      } else {
        console.warn("REGISTER");
        this.registerUser({
          picture,
          username,
          email,
          phone,
          birthDate,
          gender,
          password,
        });
      }
    }
  };

  updateUser = ({ picture, username, email, phone, birthDate, gender }) => {
    this.updateData = url => {
      database()
        .ref("users/" + AppState.getUid())
        .update(
          {
            location: {
              lat: this.state.latitude,
              lng: this.state.longitude,
            },
            username: username,
            email: email.trim().toLowerCase(),
            phone: phone,
            birthDate: birthDate,
            gender: gender,
            profilePicture: url,
            eventDistance: this.state.eventDistance,
          },
          error => {
            if (error) {
              this.setState({ spinner: false });
              var errorMessage = error.message;
              AwesomeAlert.show(errorMessage);
            } else {
              this.setState({ spinner: false });
              AwesomeAlert.show("Seu usuário foi atualizado.");
            }
          }
        );
    };

    if (picture.uri.slice(0, picture.uri.indexOf(":")) !== "https") {
      let filename =
        "IMG_" +
        HelperFunctions("all") +
        "_DNIGHT_" +
        Math.floor(Math.random() * (9999 - 1000)) +
        1000;
      this.uploadImage(picture.uri, filename, "profilePictures")
        .then(snapshot => {
          this.updateData(snapshot);
          this.setState({ spinner: false });
        })
        .catch(error => {
          AwesomeAlert.show("[ERROR] - " + error);
          this.setState({ spinner: false });
        });
    } else {
      this.setState({ spinner: false });
      this.updateData(picture.uri);
    }
  };

  uploadImage = async (uri, name, firebasePath) => {
    const imageRef = storage().ref(`${firebasePath}/${name}`);
    await imageRef.putFile(uri, { contentType: "image/jpg" }).catch(error => {
      AwesomeAlert.show("[ERROR] - " + error);
    });

    return await imageRef.getDownloadURL();
  };

  registerUser = async ({
    picture,
    username,
    email,
    phone,
    birthDate,
    gender,
    password,
  }) => {
    this.setState({ spinner: true });

    // Create user
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        var user = userCredential.user;

        var filename =
          "IMG_" +
          HelperFunctions("all") +
          "_DNIGHT_" +
          Math.floor(Math.random() * (9999 - 1000)) +
          1000;

        this.uploadImage(picture.uri, filename, "profilePictures")
          .then(downloadURL => {
            database()
              .ref("users/")
              .child(user.uid)
              .set(
                {
                  create_at: database().getServerTime().getTime(),
                  location: {
                    lat: this.state.latitude,
                    lng: this.state.longitude,
                  },
                  username: username,
                  email: email.trim().toLowerCase(),
                  phone: phone,
                  birthDate: birthDate,
                  gender: gender,
                  profilePicture: downloadURL,
                  banned: false,
                  eventDistance: this.state.eventDistance,
                },
                error => {
                  if (error) {
                    this.setState({ spinner: false });
                    var errorMessage = error.message;
                    AwesomeAlert.show(errorMessage);
                  } else {
                    database()
                      .ref("users")
                      .once("value")
                      .then(snapshot => {
                        this.setState({ spinner: false });
                        if (snapshot.hasChild(user.uid)) {
                          this.props.navigation.navigate("TERMS_SCREEN");
                        }
                      });
                  }
                }
              );
          })
          .catch(error => {
            var errorMessage = error.message;
            AwesomeAlert.show(errorMessage);
            this.setState({ spinner: false });
          });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        AwesomeAlert.show(errorMessage);
        this.setState({ spinner: false });
      });
  };

  passwordRecover = () => {
    analytics().logEvent("passwordRecover");
    this.props.navigation.navigate("RECOVER_PASSWORD_SCREEN");
  };

  const { errors, showPassword, updateMode } = this.state;
  return (
    <Screen>
      <Spinner visible={this.state.spinner} />
      <Container>
        <ContentImage>
          <ProfilePicture
            picture={this.state.picture}
            onPress={() => this.selectAvatar()}
          />
          {errors.picture ? (
            <InputError
              style={{ alignSelf: "center", marginTop: 10 }}
              error={errors.picture}
            />
          ) : null}
        </ContentImage>
        <ContentForm>
          <FormControl>
            <Stack
              space={4}
              w="100%"
              style={{
                borderColor: "transparent",
                backgroundColor: Styles.Color.TEXT_PRIMARY,
                borderRadius: 10,
                marginTop: 8,
                paddingHorizontal: 8,
              }}
            >
              <Input
                variant="unstyled"
                color={"black"}
                value={this.state.username}
                placeholder={`${i18n.t("placeholders.name")}*`}
                placeholderTextColor={Styles.Color.PLACEHOLDER}
                returnKeyType="next"
                autoCapitalize="words"
                blurOnSubmit={false}
                onChangeText={text => this.setState({ username: text })}
                InputLeftElement={<Icon name="account" size={24} />}
              />
            </Stack>
            {errors.username ? <InputError error={errors.username} /> : null}

            {!updateMode ? (
              <Stack
                space={4}
                w="100%"
                style={{
                  borderColor: "transparent",
                  backgroundColor: !updateMode
                    ? Styles.Color.TEXT_PRIMARY
                    : "#dcdcdc",
                  borderRadius: 10,
                  marginTop: 8,
                  paddingHorizontal: 8,
                }}
              >
                <Input
                  variant="unstyled"
                  color={"black"}
                  value={this.state.email}
                  placeholder={`${i18n.t("placeholders.email")}*`}
                  placeholderTextColor={Styles.Color.PLACEHOLDER}
                  returnKeyType="next"
                  autoCapitalize="words"
                  blurOnSubmit={false}
                  editable={!updateMode}
                  disabled={updateMode}
                  onChangeText={text => this.setState({ email: text })}
                  InputLeftElement={<Icon name="email" size={24} />}
                />
              </Stack>
            ) : null}
            {errors.email ? <InputError error={errors.email} /> : null}
            <Stack
              space={4}
              w="100%"
              style={{
                borderColor: "transparent",
                backgroundColor: Styles.Color.TEXT_PRIMARY,
                borderRadius: 10,
                marginTop: 8,
                paddingHorizontal: 8,
              }}
            >
              <Input
                variant="unstyled"
                color={"black"}
                value={this.state.phone}
                placeholder={`${i18n.t("placeholders.phone")}*`}
                placeholderTextColor={Styles.Color.PLACEHOLDER}
                returnKeyType="next"
                autoCapitalize="words"
                blurOnSubmit={false}
                onChangeText={text => {
                  const maskedPhone = MaskService.toMask("cel-phone", text);
                  this.setState({ phone: maskedPhone });
                }}
                InputLeftElement={<Icon name="phone" size={24} />}
              />
            </Stack>
            {errors.phone ? <InputError error={errors.phone} /> : null}
            <Stack
              space={4}
              w="100%"
              style={{
                borderColor: "transparent",
                backgroundColor: Styles.Color.TEXT_PRIMARY,
                borderRadius: 10,
                marginTop: 8,
                paddingHorizontal: 8,
              }}
            >
              <Input
                variant="unstyled"
                color={"black"}
                value={this.state.birthDate}
                placeholder={i18n.t("placeholders.birthDate")}
                placeholderTextColor={Styles.Color.PLACEHOLDER}
                returnKeyType="next"
                keyboardType="number-pad"
                blurOnSubmit={false}
                onChangeText={text => {
                  const maskedDate = MaskService.toMask("datetime", text, {
                    format: "DD/MM/YYYY",
                  });
                  this.setState({ birthDate: maskedDate });
                }}
                maxLength={Constants.MASKED_BIRTHDATE_MAX_LENGTH}
                InputLeftElement={<Icon name="calendar" size={24} />}
              />
            </Stack>
            {errors.birthDate ? <InputError error={errors.birthDate} /> : null}
            <Stack
              space={4}
              w="100%"
              style={{
                borderColor: "transparent",
                backgroundColor: Styles.Color.TEXT_PRIMARY,
                borderRadius: 10,
                marginTop: 8,
                paddingHorizontal: 8,
              }}
            >
              <Select
                variant="unstyled"
                color={"black"}
                mode="dialog"
                style={{ width: 120 }}
                placeholder="Gênero*"
                selectedValue={this.state.gender}
                onValueChange={Stack => {
                  this.setState({ gender: Stack });
                }}
                InputLeftElement={<Icon name="gender-male-female" size={24} />}
              >
                <Select.Item label="Feminino" value="F" />
                <Select.Item label="Masculino" value="M" />
                <Select.Item label="Outro" value="O" />
                <Select.Item label="Indefinido" value="U" />
              </Select>
            </Stack>
            {errors.gender ? <InputError error={errors.gender} /> : null}
            {!updateMode ? (
              <Stack
                space={4}
                w="100%"
                style={{
                  borderColor: "transparent",
                  backgroundColor: !updateMode
                    ? Styles.Color.TEXT_PRIMARY
                    : "#dcdcdc",
                  borderRadius: 10,
                  marginTop: 8,
                  paddingHorizontal: 8,
                }}
              >
                <Input
                  variant="unstyled"
                  color={"black"}
                  value={this.state.password}
                  secureTextEntry={!this.state.showPassword}
                  placeholder={`${i18n.t("placeholders.password")}*`}
                  placeholderTextColor={Styles.Color.PLACEHOLDER}
                  returnKeyType="next"
                  returnKeyLabel={i18n.t("buttons.login")}
                  blurOnSubmit={false}
                  editable={!updateMode}
                  disabled={updateMode}
                  onChangeText={text => this.setState({ password: text })}
                  InputLeftElement={<Icon name="lock" size={24} />}
                  InputRightElement={
                    <Icon
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      type="MaterialCommunityIcons"
                      size={24}
                      style={{ color: Styles.Color.PLACEHOLDER }}
                      onPress={() =>
                        this.setState({ showPassword: !showPassword })
                      }
                    />
                  }
                />
              </Stack>
            ) : null}
            {errors.password ? <InputError error={errors.password} /> : null}
            <Stack
              space={4}
              w="100%"
              style={{
                borderColor: "transparent",
                backgroundColor: Styles.Color.TEXT_PRIMARY,
                borderRadius: 10,
                marginTop: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
                flexDirection: "column",
              }}
            >
              <Stack
                space={4}
                w="100%"
                style={{
                  alignSelf: "stretch",
                  borderColor: "transparent",
                  justifyContent: "flex-start",
                }}
              >
                <Text>Distância de eventos</Text>
              </Stack>
              <Stack
                space={4}
                w="100%"
                style={{
                  borderColor: "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="google-maps" size={24} />
                <Slider
                  style={{ flex: 1, height: 50 }}
                  value={this.state.eventDistance}
                  onValueChange={value => {
                    this.setState({ eventDistance: Math.floor(value) });
                  }}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={Styles.Color.PRIMARY}
                  maximumTrackTintColor={Styles.Color.PRIMARY_DARK}
                  thumbTintColor={Styles.Color.PRIMARY_DARK}
                ></Slider>
                <Text style={{ width: 50 }}>{this.state.eventDistance} KM</Text>
              </Stack>
            </Stack>
          </FormControl>

          <ContentForm
            style={{
              marginVertical: 25,
              marginHorizontal: 15,
              justifyContent: "space-between",
            }}
          >
            <PrimaryButton
              title={
                updateMode
                  ? i18n.t("buttons.update").toUpperCase()
                  : i18n.t("buttons.signUp").toUpperCase()
              }
              onPress={() => this.onSubmit()}
              color={"error"}
              size={"lg"}
              variant={"solid"}
              radius={100}
              height={45}
            />

            {updateMode ? (
              <View style={{ marginTop: 10 }}>
                <PrimaryButton
                  title={i18n.t("buttons.recoverPassword").toUpperCase()}
                  onPress={() => this.passwordRecover()}
                  color={"error"}
                  size={"lg"}
                  variant={"solid"}
                  radius={100}
                  height={45}
                />
              </View>
            ) : null}
          </ContentForm>
        </ContentForm>
      </Container>
    </Screen>
  );
}
export default Register;
