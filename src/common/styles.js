import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const Color = {
  PRIMARY: "#003F5C",
  PRIMARY_LIGHT: "#19526C",
  PRIMARY_DARK: "#003852",
  PRIMARY_TRANSPARENT: "rgba(0, 63, 92, 0.7)",
  PRIMARY_TRANSPARENT_2: "rgba(0, 63, 92, 0.3)",
  PLACEHOLDER: "gray",
  TEXT_PRIMARY: "#FFF",
  BLACK: "#000",
  ERROR: "#f6685e",
  GREY: "#686868",
  GREY_DARK: "#424242",
  TRANSPARENT: "transparent",
  INPUT_TRANSPARENT: "rgba(255, 255, 255, 0.7)",
  SCREEN_BACKGROUND: "#F5f5f5",
  DISABLED_INPUT: "#E8E8E8",
  MODAL_BACKGROUND: "rgba(0, 0, 0, 0.5)",
  BORDER: "#CCC",
};

const FontSize = {
  SMALL: 12,
  NORMAL: 14,
  MEDIUM: 16,
  BIG: 18,
  EXTRA_BIG: 20,
  EXTRA_BIG_24: 24,
  EXTRA_BIG_26: 26,
  EXTRA_BIG_28: 28,
};

const Metrics = {
  HEIGHT: height,
  WIDTH: width,
};

export const Styles = { Color, FontSize, Metrics };
