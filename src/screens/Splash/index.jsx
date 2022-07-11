import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Logo } from "../../components/Logo/Logo";
import NetInfo from "@react-native-community/netinfo";
import AwesomeAlert from "../../utils/AwesomeAlert";
import i18n from "../../i18n";
import { useNavigation } from "@react-navigation/native";

//expo-location
import * as Location from 'expo-location'

import { Screen, Content, Banner, Status } from "./styles";

export function Splash() {
  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      
      setTimeout(()=> {
        if (state.isConnected) {

          const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
              navigation.navigate("Tab", { screen: "Explorer" });
            };

          });
          unsubscribe();
          sliderScreen();
        }
      }, 2000)
    });
  }, []);

  useEffect(()=> {
    const handlePermissions = async () => {
       let { status } = await Location.requestForegroundPermissionsAsync();
 
       if (status !== 'granted') {
         setErrorMsg('Permission to access location was denied');
         return;
       };
 
       let location = await Location.getCurrentPositionAsync({});
       
       setLocation(location);
 
       if(errorMsg){
         return  alert("Permissão de localização negada");;
       }
       if(location){
         const keyLocation = '@positionActual';
         const transformLocation = JSON.stringify(location);
         await AsyncStorage.setItem(keyLocation, transformLocation);
       }
     };
     handlePermissions();
 
  },[])

  const sliderScreen = async () => {
    try {
 
      //verificando se usuário está logado.
      const unsubscribe = auth().onAuthStateChanged(async (userFirebase) => {
        await AsyncStorage.setItem(process.env.USER_ID, userFirebase.uid)
        if (userFirebase) {
          navigation.navigate("Tab");
        };

      });
      unsubscribe();
      const value = await AsyncStorage.getItem("dnight_start");

      if (value == null) {
        navigation.navigate("Slider");
      } else if (value == "true") {
        navigation.navigate("Login");
      }
    } catch (e) {
      AwesomeAlert.show(
        "[ERROR] - Nossa equipe já está resolvendo esse erro, abra o app novamente."
      );
    }
  };

  return (
    <Screen>
      {!isConnected ? (
        <Banner>
          <Status>{i18n.t("messages.networkOffline")}</Status>
        </Banner>
      ) : null}
      <Content>
        <Logo />
      </Content>
    </Screen>
  );
}
