import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from "react-native";
import { Image } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

import i18n from "../../i18n";
import { Styles } from "../../commom/styles";

const styles = StyleSheet.create({
  pictureContainer: {
    height: 144,
    width: 144,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "lightgray",
  },
  avatar: {
    fontSize: 120,
  },
  picture: {
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: Styles.FontSize.BIG,
    color: Styles.Color.PLACEHOLDER,
  },
});

export const ProfilePicture = ({ picture, onPress, style }) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={onPress}
    style={[styles.pictureContainer, style]}
  >
    {picture.uri ? (
      <Image source={{ uri: picture.uri }} style={styles.picture} />
    ) : (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.description}>{i18n.t("buttons.uploadPhoto")}</Text>
        <Icon
          style={{ marginTop: 10 }}
          name={"camera-outline"}
          size={24}
          color={Styles.Color.PLACEHOLDER}
        ></Icon>
      </View>
    )}
  </TouchableOpacity>
);

ProfilePicture.propTypes = {
  picture: PropTypes.shape({
    uri: PropTypes.string,
    path: PropTypes.string,
  }),
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

ProfilePicture.defaultProps = {
  picture: { uri: "", path: "" },
  onPress: () => {},
  style: {},
};


