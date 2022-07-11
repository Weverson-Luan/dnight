import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormControl, Stack, } from 'native-base';
import { Text, TextInput, Alert } from 'react-native';
import { PrimaryButton } from '../../components/PrimaryButton';
import styled from 'styled-components';

//google-firebase
import database from '@react-native-firebase/database';
//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//Spinner
import Spinner from "react-native-loading-spinner-overlay";

import { Styles } from '../../common/styles'
import i18n from '../../i18n'

const Screen = styled.SafeAreaView` 
padding: 8px;
background-color: ${Styles.Color.SCREEN_BACKGROUND};
`
const Content = styled.ScrollView` 
`
export function Report(){
  const navigation = useNavigation();
  const [ report, setReport ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false)



const sendRequest = async () => {

  const userUuid = await AsyncStorage.getItem(process.env.USER_ID);

  if (Object.values(report).length > 5) {

    try {
      setIsLoading(false)
      database().ref('report').push({
        uid: userUuid ? userUuid : null,
        create_at: database().getServerTime().getTime(),
        message: report
    },
    )
    Alert.alert("Reporter","Sua denuncia foi registrada com sucesso.")
    setReport("")
    navigation.goBack();
    }
    catch(err) {
      Alert.alert("Sua denuncia não foi registrada")
      console.log("ERROR DENUCIA", err)
    }
    finally {
      setIsLoading(false)
    }
  } else {
    Alert.alert("Seu texto está muito pequeno.");
    setIsLoading(false)
  };

};
  return(
    
    <Screen>

      {
        isLoading &&  <Spinner
        visible={true}
            color="white"
            size={50}
            
        /> 
      }
      
      <Content>
          <FormControl>
              <Stack last
                  style={{ borderColor: 'transparent', }}>
                  <Text>{i18n.t('messages.report')}</Text>
              </Stack>
              <Stack
                  last
                  style={{
                      marginTop: 15,
                      borderColor: 'transparent',
                      backgroundColor: Styles.Color.TEXT_PRIMARY,
                      borderRadius: 5,
                  }}>
                  <TextInput
                      placeholder={i18n.t('placeholders.report')}
                      multiline
                      editable
                      placeholderTextColor={Styles.Color.GREY}
                      maxLength={50}
                      onChangeText={text => setReport(text)}
                      value={report}
                      style={{ padding: 10, }}
                  />
              </Stack>
              <Stack last
                  style={{ marginHorizontal: 15, marginTop: '20%', borderColor: 'transparent' }}>
                  <PrimaryButton onPress={() => {
                      setIsLoading(true)
                      sendRequest()
                  }} title={i18n.t('buttons.sendReport').toUpperCase()}
                      color={'error'}
                      size={'lg'}
                      radius={100}
                      height={45}
                  />

              </Stack>
          </FormControl>
      </Content>
    </Screen>
  )
}