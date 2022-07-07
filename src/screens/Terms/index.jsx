import { useEffect, useState } from "react";
import {  View, Text, ScrollView } from "react-native";

//google-firebase
import database from '@react-native-firebase/database';

// async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//i18n
import i18n from "../../i18n";

//components
import { PrimaryButton } from "../../components/PrimaryButton";

//utils
import AwesomeAlert from "../../utils/AwesomeAlert";

//styles
import { Content, contextButton, placeholderTerm, Screen } from "./styles";

export function Terms({navigation}) {
  const [terms, setTerms] = useState("Carregando...");
  const [start, setStart] = useState(null);


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
    getPrivacyTerms();

    const handleTerms = async ()=> {
      const start = await AsyncStorage.getItem("dnight_start");
      setStart(start)
    };

    handleTerms();
  },[])

  return (
    <Screen>
      <ScrollView style={Content}>
        <Text style={placeholderTerm}>{terms.toUpperCase()}</Text>
      </ScrollView>

      <View style={contextButton}>
        
        {
          start ? 
          <PrimaryButton
            onPress={() => {
              appStart()
              navigation.goBack();
            }}
            title={i18n.t("buttons.back").toUpperCase()}
            color={"error"}
            size={"full"}
            variant={"solid"}
            radius={100}
            height={45}
        />
        :
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
        }

       {
        !start && 
        <>
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
        </>
       }  
      </View>
    </Screen>
  );
}
