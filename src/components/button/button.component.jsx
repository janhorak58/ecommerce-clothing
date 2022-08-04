import React from "react";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  default: "default",
  inverted: "inverted",
};

const Button = ({ children, buttonType = "default", ...otherProps }) => {
  return (
    <button
      className={`${BUTTON_TYPE_CLASSES[buttonType]} button-container`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
