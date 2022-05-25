import styled from "styled-components/native";

//commons
import { Styles } from "../../common/styles";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Styles.Color.SCREEN_BACKGROUND};
  margin-top: 30px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 20px 10px;
`;

export const FeaturedEventContainer = styled.View`
  background-color: #323232;
  height: 40%;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 20px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const ViewCarousel = styled.View`
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const imageBackground = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
};

export const imageView = {
  borderRadius: 10,
  margin: 15,
  paddingHorizontal: 6,
  paddingVertical: 8,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  width: Styles.Metrics.WIDTH - 80,
};

export const imageText = {
  color: Styles.Color.PRIMARY_DARK,
  fontSize: 18,
  shadowColor: "#000",
  shadowOffset: { width: 0.8, height: 0.8 },
  shadowOpacity: 1,
  shadowRadius: 3,
  marginBottom: 5,
  fontWeight: "bold",
  elevation: 5,
};

export const imageText2 = {
  color: Styles.Color.PRIMARY_DARK,
  fontSize: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0.8, height: 0.8 },
  shadowOpacity: 1,
  shadowRadius: 3,
  elevation: 5,
};
