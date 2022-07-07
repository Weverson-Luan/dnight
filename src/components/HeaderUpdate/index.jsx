import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Header, WrapperIcon, Title} from "./styles";


export function HeaderUpdate(){
  const navigation = useNavigation();
  return(
    <Header>
      <WrapperIcon onPress={()=> navigation.goBack()}>
        <Icon name="arrowleft" size={24} color="#fff" />
        <Title>Editar Perfil</Title>
      </WrapperIcon>
      
    </Header>
  )
}