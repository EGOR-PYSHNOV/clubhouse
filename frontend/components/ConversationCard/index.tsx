import React from "react";
import { Avatar } from "../Avatar";
import styles from "./ConversationCard.module.scss";
import whiteBlockStyles from "../WhiteBlock/WhiteBlock.module.scss";
import cn from "classnames";
import Image from "next/image";
import { Room } from "../../api/RoomApi";

export const ConversationCard = function (
  props: Room & { avatars: Array<string> }
) {
  return (
    <div className={cn(whiteBlockStyles.block, styles.card, "mb-30")}>
      <h4 className={styles.title}>{props.title}</h4>
      <div className={cn("d-flex mt-10", styles.content)}>
        <div className={styles.avatars}>
          {props.avatars.map((url, index) => (
            <Avatar
              key={url}
              width="45px"
              height="45px"
              src={url}
              className={
                props.avatars.length > 1 && index === props.avatars.length - 1
                  ? "lastAvatar"
                  : ""
              }
            />
          ))}
        </div>
        <div className={cn(styles.info, "ml-10")}>
          <ul className={styles.users}>
            {props.speakers.map((name, index) => (
              <li key={name.id}>
                {name}
                <Image
                  src="/static/cloud.png"
                  alt="Cloud"
                  width={14}
                  height={14}
                />
              </li>
            ))}
          </ul>
          <ul className={styles.details}>
            <li>
              <Image
                src="/static/user.svg"
                alt="Users count"
                width={12}
                height={12}
              />
              {props.listenersCount}
            </li>
            <li>
              <Image
                className="ml-5"
                src="/static/message.svg"
                alt="Messages"
                width={12}
                height={12}
              />
              {props.speakers.length}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
