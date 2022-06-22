import { useEffect, useState } from "react";
import {  View, Text, ScrollView } from "react-native";

//google-firebase
import database from '@react-native-firebase/database';

// async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//expo-location
import * as Location from 'expo-location'

import i18n from "../../i18n";


import { PrimaryButton } from "../../components/PrimaryButton";

import AwesomeAlert from "../../utils/AwesomeAlert";


import { Content, contextButton, placeholderTerm, Screen } from "./styles";

export function Terms({navigation}) {
  const [terms, setTerms] = useState("Carregando...");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  const getPrivacyTerms = async () => {
    database()
      .ref("/settings/terms")
      .once("value")
      .then(snapshot => {
        var value = snapshot.val();
        setTerms(value);
      })
      .catch(error => {
        var msg = error.message;
        AwesomeAlert.show(msg);
      });
  };

  
 const appStart = async () => {
    try {
      await AsyncStorage.setItem('dnight_start', "true");
    } catch (e) {
      AwesomeAlert.show(e);
    }
  }

  useEffect(()=> {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      };

      let location = await Location.getCurrentPositionAsync({});
      
      setLocation(location);

      if(errorMsg){
        return  AwesomeAlert.show("Permissão de localização negada");;
      }
      if(location){
        const keyLocation = "@positionActual";
        const transformLocation = JSON.stringify(location);
        await AsyncStorage.setItem(keyLocation, transformLocation);
      }
    })();
    getPrivacyTerms()
  },[])

  return (
    <Screen>
      <ScrollView style={Content}>
        <Text style={placeholderTerm}>{terms.toUpperCase()}</Text>
      </ScrollView>

      <View style={contextButton}>
        <PrimaryButton
          onPress={() => {
            appStart()
            navigation.navigate("Tab");
          }}
          title={i18n.t("buttons.accept").toUpperCase()}
          color={"error"}
          size={"full"}
          variant={"solid"}
          radius={100}
          height={45}
        />

        {/* {route.params.login ? ( */}
       <View style={{marginTop:20}}>
        <PrimaryButton
          onPress={() => {
              navigation.navigate("Login");
            }}
            
            title={i18n.t("buttons.cancel").toUpperCase()}
            color="primary"
            size={"full"}
            variant="outline"
            radius={100}
            height={45}
            />
        {/* ) : null} */}
       </View>
      </View>
    </Screen>
  );
}
