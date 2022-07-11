import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { authLogoutApp } from '../../service/auth/AuthLogoutGoogleFirebase';

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//icons-vector-icons
import Icon from 'react-native-vector-icons/MaterialIcons';

//Authenticate google-firebase
import auth from '@react-native-firebase/auth';

//google-firebase
import database from '@react-native-firebase/database';

//i18n
import i18n from '../../i18n';

//styles
import { Styles } from '../../common/styles';

//styles-components
import {
  Screen,
  Container,
  ContainerImage,
  Content,
  ToolbarView,
  ItemDisabled,
  ItemEnabled,
  Form,
  Line,
  InnerLine,
  FormTitle,
  Name,
  Birth,
  SimpleText,
  //styles native
  touchableRippleBorderRadius,
  imageProfile
} from "./styles";


export function Profile({navigation}){
  const [user, setUser] = useState({});
  const [logout, setLogout] = useState(false);

   const AuthLogout = async () => {
    try {
      AsyncStorage.removeItem(process.env.USER_ID);
      auth()
      .signOut()
      .then((_userLogout)=>{
        navigation.navigate("Login")
      })
    } catch (error) {
      alert("Error em sair")
    }
  }
  /**
   * BUSCANDO USUÁRIO LOGADO
   */
  useEffect(()=> {
    auth().onAuthStateChanged((user) => {
      if (user) {
        database().ref('users').child(user.uid).on('value', function (snapshot) {
        let  userData = snapshot.val();
    
        setUser(userData)
        });
        
       };
    });
   
  }, []);

  if(!logout === false){
    logout === true && authLogoutApp();
  }
  user?.phone === undefined || "" && Alert.alert("Informações", "Informe um número de telefone para receber mais informações.")
  
  return(
    <Screen>
      <Container>
        <ToolbarView>
          <TouchableRipple 
            borderless={true} 
            rippleColor="rgba(255, 255, 255, .32)" 
            style={touchableRippleBorderRadius}
            onPress={()=> navigation.navigate('Register', { updateMode: true })}
            >
            <Icon name={'edit'} size={28}/>
          </TouchableRipple>

          <TouchableRipple 
            borderless={true} 
            rippleColor="rgba(255, 255, 255, .32)" 
            style={touchableRippleBorderRadius}
            onPress={()=> AuthLogout()}
            >
            <Icon name={'logout'} size={28}/>
          </TouchableRipple> 

        </ToolbarView>

        <View style={{marginTop: '20%'}}> 
          <ContainerImage>
              <Image
                source={{ uri: user?.picture }}
                style={imageProfile}
              />
            <Content>
              <Name>{user?.username}</Name>
              <Birth>{user?.birthDate}</Birth>
            </Content>
          </ContainerImage>

          <Form>
            <FormTitle>{i18n.t('profile.contact')}</FormTitle>
              <ItemDisabled>
                <Icon name='phone' size={17} color={Styles.Color.GREY_DARK} />
                <SimpleText>{user?.phone ? user?.phone : "(00) 0000-0000"}</SimpleText>
              </ItemDisabled>
            <ItemDisabled>
              <Icon name='email' size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{user?.email}</SimpleText>
            </ItemDisabled>

            <Line>
              <InnerLine />
            </Line>

            <ItemEnabled onPress={() => navigation.navigate('FavoriteEvents')}>
              <Icon name='favorite' size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{i18n.t('profile.favorites')}</SimpleText>
            </ItemEnabled>

            <ItemEnabled onPress={() => navigation.navigate('Report')}>
              <Icon name='report' size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{i18n.t('profile.report')}</SimpleText>
            </ItemEnabled>

            <ItemEnabled onPress={() => navigation.navigate('Terms', { login: false})}>
              <Icon name='policy' size={17} color={Styles.Color.GREY_DARK} />
              <SimpleText>{i18n.t('profile.terms')}</SimpleText>
            </ItemEnabled>
          </Form>
        </View>
      </Container>
  </Screen>
  );
};