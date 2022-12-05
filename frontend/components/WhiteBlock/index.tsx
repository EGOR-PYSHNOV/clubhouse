import cn from "classnames";
import { ReactNode } from "react";
import styles from "./WhiteBlock.module.scss";

export const WhiteBlock = function WhiteBlock(props: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div className={cn(styles.block, props.className)}>{props.children}</div>
  );
};
