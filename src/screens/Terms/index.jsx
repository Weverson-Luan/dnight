import { useEffect, useState } from "react";
import {  View, Text, ScrollView } from "react-native";

//google-firebase
import database from '@react-native-firebase/database';


import i18n from "../../i18n";
import { PrimaryButton } from "../../components/PrimaryButton";



// import AwesomeAlert from "../../utils/AwesomeAlert";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { Content, contextButton, placeholderTerm, Screen } from "./styles";

export function Terms({navigation}) {
  const [terms, setTerms] = useState("Carregando...");



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

  useEffect(()=> {
    getPrivacyTerms()
  })

  return (
    <Screen>
      <ScrollView style={Content}>
        <Text style={placeholderTerm}>{terms.toUpperCase()}</Text>
      </ScrollView>

      <View style={contextButton}>
        <PrimaryButton
          onPress={() => {
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
