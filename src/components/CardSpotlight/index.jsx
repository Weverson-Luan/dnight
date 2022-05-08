//icons
import Entypo from "react-native-vector-icons/Entypo";

//commons
import { Styles } from "../../common/styles";

//styles
import { 
  Wrapper, 
  Image, 
  WrapperImage, 
  WrapperSpotlightDesc, 
  TextSpotlightText,
  WrapperLocation,
  TextSpotlightLocation, 
} from "./styles";

export function CardSpotlight({data}){
  return(
    <Wrapper>
      <WrapperImage>
        <Image source={{ uri: data.img}}/>
      </WrapperImage>
      <WrapperSpotlightDesc>
        <TextSpotlightText>{data.title}</TextSpotlightText>
        <WrapperLocation>
          <Entypo name="location-pin" size={18} color={Styles.Color.PRIMARY_DARK} />
          <TextSpotlightLocation>{data.description}</TextSpotlightLocation>
        </WrapperLocation>
      </WrapperSpotlightDesc>
    </Wrapper>
  )
}