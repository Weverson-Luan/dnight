import styled from "styled-components/native";
import Styles from "../../common/styles";
import i18n from "../../i18n";

export const Screen = styled.SafeAreaView`
  height: 100%;
`;

export const Content = styled.View``;

export const ViewFilter = styled.View`
  width: 87%;
  padding: 10px 16px;
  background-color: transparent;
  flex-direction: row;
  position: absolute;
`;

// export const InputSearch = styled.TextInput.attrs({
//   placeholder: i18n.t("placeholders.searchMap"),
//   placeholderTextColor: Styles.Color.PLACEHOLDER,
//   returnKeyType: "send",
//   autoCapitalize: "none",
//   autoCorrect: false,
// })`
//   width: 100%;
//   background-color: #fff;
//   border-top-right-radius: 4px;
//   border-bottom-right-radius: 4px;
//   padding: 10px 0px;
// `;
export const SearchIcon = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  justify-content: flex-start;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
