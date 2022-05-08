//icons
import AntDesign from "react-native-vector-icons/AntDesign";

//commons
import { Styles } from "../../common/styles";

//styles
import { Wrapper, TextIcon } from "./styles";


export function HeaderArrow(){
  return(
    <Wrapper>
      <TextIcon>
        <AntDesign name="arrowleft" size={18} color={Styles.Color.BLACK} />
      </TextIcon>
    </Wrapper>
  )
}