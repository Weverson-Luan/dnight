import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Alert, ActivityIndicator, Text } from "react-native";

import { GoogleSignin, statusCodes,} from '@react-native-google-signin/google-signin';

//react-native-base
import { FormControl, Stack, Input } from "native-base";

//google-firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//validation
import validator from "validator";

//icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//Spinner
import Spinner from "react-native-loading-spinner-overlay";

//i18n
import i18n from "../../i18n";

//components
import { PrimaryButton } from "../../components/PrimaryButton";
import { InputError } from "../../components/Input/InputError";
import { Logo } from "../../components/Logo/Logo";
import { Button } from "../../components/Button";

//commons
import Icons from "../../common/icons";
import Constants from "../../common/constants";
import { Styles } from "../../common/styles";

//services
import { AuthGoogleFirebase } from "../../service/auth/AuthGoogleFirebase";

//styled-components
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
  const [start, setStart] = useState("");
  const [_logado, setLogado] = useState({});
  const [_userPositionActual, setUserPositionActual] = useState({
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 1,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
    mocked: false,
    timestamp: 0,
  });

  const onSubmit = () => {
    setSpinner(true)
    if (email === "") {
      setErrors({ email: i18n.t("errors.empty.email") });
      setSpinner(false)
    } else if (!validator.isEmail(email)) {
      setErrors({ email: i18n.t("errors.invalid.email") });
      setSpinner(false)
    } else if (!password) {
      setSpinner(false)
      setErrors({ password: i18n.t("errors.empty.password") });
    } else if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      setSpinner(false)
      setErrors({ password: i18n.t("errors.invalid.smallPassword") });
      setSpinner(false)
    } else {
      
      auth().signInWithEmailAndPassword(email, password)
      .then(async(responseUserAth) => {
        await AsyncStorage.setItem(process.env.USER_ID, responseUserAth.user.uid)
        setSpinner(false);
        setEmail("");
        setPassword("");
        if(start){
          return navigation.navigate("Tab");
        }
        else{
          return navigation.navigate("Terms");
        }
      })
      .catch(error => {
        Alert.alert(
          "Usuário não Cadastrado",
          "Senha ou email invalidos!",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => navigation.navigate("Register", {
               updateMode: false 
            })}
          ]
        );
       
      })
      .finally(()=> setSpinner(false)) 
    }
  };
// Somewhere in your code
const authenticationGoogleFirebase = async () => {
  // setSpinner(true)
  try {
    // configuration of firebase  
    AuthGoogleFirebase();

    await GoogleSignin.hasPlayServices();
    const { user } = await GoogleSignin.signIn();
    setLogado(user)
 
    //verificando se usuário está logado.
    const unsubscribe = auth().onAuthStateChanged( async (userFirebase) => {
      if (userFirebase) {
        await AsyncStorage.setItem(process.env.USER_ID, userFirebase.uid)
        navigation.navigate("Tab", { screen: "Explorer" });
      };
    });
    unsubscribe();

          //criação para autenticação do google-firebase
    auth().createUserWithEmailAndPassword(user.email, user.id).then(async(userCredential)=> {
      await AsyncStorage.setItem(process.env.USER_ID,userCredential.user.uid)
      setEmail("");
      setPassword("");
      //Pegando localização do usuário
      const userLocation = await AsyncStorage.getItem("@positionActual");
      setUserPositionActual(userLocation)
      const useLocationTransform  = JSON.parse(userLocation);

        database().ref(`users/${userCredential.user.uid}`).set({
          location: {
            lat: useLocationTransform?.coords.latitude,
            lng: useLocationTransform?.coords.latitude,
          },
          picture: user.photo,
          username: user.name,
          email: user.email,
          phone: '',
          birthDate: '',
          gender: '',
          password: user.id,
          eventDistance: '',
        }).then((snapshot) => {
          Alert.alert("Usuário", "Usuário foi cadastrado com sucesso .")
          navigation.navigate("Terms");
      });
    })
    .catch((error)=>{
      auth().signInWithEmailAndPassword(user.email, user.id)
      .then(async(res)=> {
         await AsyncStorage.setItem(process.env.USER_ID, res.user.uid)
        start ? navigation.navigate("Tab") : navigation.navigate("Terms")
      })
    })
    .finally(()=> setSpinner(false)); 

  } catch (error) {
    Alert.alert("Error em cadastratar", "Não foi possivel realizar o cadastro fecha o app e tente novamente.")
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};


 useEffect(()=> {
  const handleDnightStart = async () => {
    const user = await GoogleSignin.addScopes({
      scopes: ['https://www.googleapis.com/auth/user.gender.read'],
    });
   const key = "dnight_start";
   const start = await AsyncStorage.getItem(key);
   setStart(start);
   //Pegando localização do usuário
   const userLocation = await AsyncStorage.getItem("@positionActual");
   setUserPositionActual(userLocation);
  }; 
  handleDnightStart();

//verificando se usuário está logado.
  const unsubscribe = auth().onAuthStateChanged(async (userFirebase) => {
    await AsyncStorage.setItem(process.env.USER_ID, userFirebase.uid)
    if (userFirebase) {
      navigation.navigate("Tab");
    };

  });
  unsubscribe();
}, []);
 
  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      
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

        <Button
          disabled={spinner}
          onPress={()=>{
            setSpinner(true)
            onSubmit()
          }}  
        >
          {
            spinner ? <ActivityIndicator size={24} color={Styles.Color.SCREEN_BACKGROUND}/> :  <Title>{i18n.t("buttons.login").toUpperCase()}</Title>
          }
    
        </Button>
        <View style={flexRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RecoverPassword");
            }}
          >
            <Title>{i18n.t("buttons.forgotPassword")}</Title>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register", {
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
          <TouchableOpacity onPress={authenticationGoogleFirebase} activeOpacity={0.7}>
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
