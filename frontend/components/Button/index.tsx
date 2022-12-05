import cn from "classnames";
import React, { ReactNode } from "react";

import styles from "./Button.module.scss";

const colors = {
  green: styles.buttonGreen,
  gray: styles.buttonGray,
  blue: styles.buttonBlue,
};

export const Button = function Button(props: {
  children: ReactNode;
  disabled?: boolean;
  color: keyof typeof colors;
  onClick: VoidFunction;
  className?: string;
}) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={cn(props.className, styles.button, colors[props.color])}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
