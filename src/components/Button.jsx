import React from "react";
import "./Button.css";

const isOperator = val => {
  // If it's not NotaNumber, ., (), we do nothing...
  // Else add class "operator"
  return !isNaN(val) || val === "." || val === "%";
};

export const Button = props => (
  <div
    className={`button-wrapper ${
      isOperator(props.children) ? null : "operator"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);
