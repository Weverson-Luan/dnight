import {  View, Text } from "react-native";

// import database from "@react-native-firebase/database";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";

import i18n from "../../i18n";
import { PrimaryButton } from "../../components/PrimaryButton";
// import AwesomeAlert from "../../utils/AwesomeAlert";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Content, contextButton, placeholderTerm, Screen } from "./styles";

export function Terms({ navigation }) {
  const [terms, setTerms] = useState("Carregando...");

  // useEffect(() => {
  //   getPrivacyTerms();

  //   analytics().logScreenView({
  //     screen_name: "Terms",
  //   });
  // }, []);

  // const getPrivacyTerms = () => {
  //   // Get Privacy Policy and Terms by Firebase
  //   database()
  //     .ref("/settings/terms")
  //     .once("value")
  //     .then(snapshot => {
  //       var value = snapshot.val();
  //       setTerms(value);
  //     })
  //     .catch(error => {
  //       var msg = error.message;
  //       AwesomeAlert.show(msg);
  //     });
  // };

  // appStart = async () => {
  //   try {
  //     await AsyncStorage.setItem("dnight_start", "true");
  //   } catch (e) {
  //     AwesomeAlert.show(e);
  //   }
  // };

  return (
    <Screen>
      <View style={Content}>
        <Text style={placeholderTerm}>{terms.toUpperCase()}</Text>
      </View>

      <View style={contextButton}>
        <PrimaryButton
          onPress={() => {
            // analytics().logEvent("acceptedTermsAndPolicy");
            // this.appStart();
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
            // analytics().logEvent("refusedTermsAndPolicys");
            // auth()
            //   .signOut()
            //   .then(() => {
              //     navigation.navigate("Login");
              //   });
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
