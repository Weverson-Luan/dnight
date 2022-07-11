import styled from "styled-components/native";

//styles
import { Styles } from "../../common/styles";

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 45px;

  border-radius: 50px;
  background-color: ${Styles.Color.PRIMARY_MEDIUM};

  align-items: center;
  justify-content: center;
`;
