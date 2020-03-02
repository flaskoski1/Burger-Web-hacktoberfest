import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";

const logo = props => (
  <div>
    <img
      className={classes.Logo}
      style={{ height: props.height }}
      src={burgerLogo}
      alt="MyBurger"
    />
  </div>
);
export default logo;
