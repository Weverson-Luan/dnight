
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { AwesomeAlert } from '../../utils/AwesomeAlert';


export const authLogoutGoogleFirebase = async () => {
  const navigation = useNavigation();
  try {
    auth()
    .signOut()
    .then((_userLogout)=> navigation.navigate("Login"))
  } catch (error) {
    AwesomeAlert("Error em sair")
  }
}