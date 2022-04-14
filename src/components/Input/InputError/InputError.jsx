import React from "react";
import { StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { Styles } from "../../../commom/styles";

const styles = StyleSheet.create({
  error: {
    marginHorizontal: 8,
    marginBottom: 10,
    color: Styles.Color.ERROR,
    fontSize: 13,
    alignSelf: "flex-end",
  },
});

export const InputError = ({ error, style }) => (
  <Text style={[styles.error, style]}>{error}</Text>
);

InputError.propTypes = {
  error: PropTypes.string,
  style: ViewPropTypes.style,
};

InputError.defaultProps = {
  error: "",
  style: {},
};
