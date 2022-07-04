import React from "react";
import { Button } from "native-base";
import PropTypes from "prop-types";

export const PrimaryButton = ({
  onPress,
  title,
  size,
  color,
  radius,
  variant,
  height,
}) => (
  <Button
    style={{ borderRadius: radius, height: height }}
    variant={variant}
    onPress={onPress}
    size={size}
    colorScheme={color}
  >
    {title}
  </Button>
);

PrimaryButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  radius: PropTypes.number,
  height: PropTypes.number,
  variant: PropTypes.string,
};

PrimaryButton.defaultProps = {
  onPress: () => {},
  title: "",
  size: "sm",
  color: "",
  variant: "solid",
  height: 45,
};
