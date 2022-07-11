
import { useNavigation } from "@react-navigation/native";
//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

import auth from '@react-native-firebase/auth';
import { AwesomeAlert } from '../../utils/AwesomeAlert';


export const authLogoutApp = async () => {
  const navigation = useNavigation();
  try {
    AsyncStorage.removeItem(process.env.USER_ID);
    auth()
    .signOut()
    .then((_userLogout)=>{
      navigation.navigate("Login")
    })
  } catch (error) {
    AwesomeAlert("Error em sair")
  }
}