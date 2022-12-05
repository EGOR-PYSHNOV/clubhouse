import cn from "classnames";
import React from "react";
import Image from "next/image";

import styles from "./Avatar.module.scss";

interface AvatarProps {
  src: string;
  letters?: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  letters,
  width,
  height,
  className,
  isVoice,
}) => {
  return (
    <div
      style={{ width, height }}
      className={cn(
        styles.avatar,
        isVoice ? styles.avatarBorder : "",
        className,
        "d-ib",
        {
          [styles.emptyAvatar]: !src,
        }
      )}
    >
      {!src ? letters : <Image src={src} alt="avatar" layout="fill" />}
    </div>
  );
};
